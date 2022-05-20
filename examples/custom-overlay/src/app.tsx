import * as React from 'react';
import {useMemo, useState} from 'react';
import {createRoot} from 'react-dom/client';
import Map from 'react-map-gl';
import {arc, pie} from 'd3-shape';

import CustomOverlay from './custom-overlay';
import ControlPanel, {COLORS} from './control-panel';

import electionData from '../../.data/us-election-2016.json';

import type {MapboxMap} from 'react-map-gl';

const TOKEN = ''; // Set your mapbox token here

// Shape of the sample data
type CountyElectionData = {
  dem: number;
  rep: number;
  total: number;
  name: string;
  coordinates: [number, number];
};

export default function App() {
  return (
    <>
      <Map
        initialViewState={{
          longitude: -100,
          latitude: 40,
          zoom: 4
        }}
        minZoom={2}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={TOKEN}
      >
        <CustomOverlay>
          <PieCharts data={electionData} />
        </CustomOverlay>
      </Map>
      <ControlPanel />
    </>
  );
}

function PieCharts({map, data}: {map?: MapboxMap; data: any[]}) {
  const [hoveredCounty, setHoveredCounty] = useState<CountyElectionData>(null);

  const width = map.getContainer().clientWidth;
  const height = map.getContainer().clientHeight;

  // Create pie chart shapes for each row
  const pies = useMemo(() => data.map(d => makePieChart(d, setHoveredCounty)), [map, data]);

  // Position each pie chart at the map location
  const [originLngLat, content] = useMemo(() => {
    const scale = 2 ** Math.max(0, map.getZoom() - 6);
    return [
      map.unproject([0, 0]),
      data.map((d, i) => {
        const centroid = map.project(d.coordinates);
        return (
          <g key={d.name} transform={`translate(${centroid.x},${centroid.y}) scale(${scale})`}>
            {pies[i]}
          </g>
        );
      })
    ];
  }, [map.getZoom(), pies]);

  const origin = map.project(originLngLat);

  let tooltip;
  if (hoveredCounty) {
    const {dem = 0, rep = 0, total, coordinates, name} = hoveredCounty;
    const tooltipLocation = map.project(coordinates);
    tooltip = (
      <div
        id="tooltip"
        style={{
          left: tooltipLocation.x,
          top: tooltipLocation.y
        }}
      >
        <div>
          <b>{name}</b>
        </div>
        <div>
          Democrats: {dem} ({((dem / total) * 100).toPrecision(3)}%)
        </div>
        <div>
          Republican: {rep} ({((rep / total) * 100).toPrecision(3)}%)
        </div>
      </div>
    );
  }

  return (
    <>
      <svg width={width} height={height} viewBox={`${-origin.x} ${-origin.y} ${width} ${height}`}>
        {content}
      </svg>
      {tooltip}
    </>
  );
}

function makePieChart(datum: CountyElectionData, onHover: (target: CountyElectionData) => void) {
  const {dem = 0, rep = 0, total} = datum;

  const pathGenerator = arc();
  const arcs = pie()([dem, rep, total - dem - rep]);
  const radius = Math.sqrt(total) / 60;

  return (
    <g
      className="pie"
      pointerEvents="painted"
      onMouseMove={() => onHover(datum)}
      onMouseOut={() => onHover(null)}
    >
      {arcs.map((a, i) => (
        <path
          key={i}
          fill={COLORS[i]}
          d={pathGenerator({
            innerRadius: radius * 0.3,
            outerRadius: radius,
            startAngle: a.startAngle,
            endAngle: a.endAngle
          })}
        />
      ))}
    </g>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
