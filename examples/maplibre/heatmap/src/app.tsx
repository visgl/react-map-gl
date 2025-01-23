import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import MapGL, {Source, Layer} from 'react-map-gl/maplibre';
import ControlPanel from './control-panel';
import {heatmapLayer} from './map-style';

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter(feature => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return {type: 'FeatureCollection', features};
}

export default function App() {
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch('https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson')
      .then(resp => resp.json())
      .then(json => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      })
      .catch(err => console.error('Could not load data', err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  return (
    <>
      <MapGL
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
      <ControlPanel
        startTime={timeRange[0]}
        endTime={timeRange[1]}
        selectedTime={selectedTime}
        allDays={allDays}
        onChangeTime={selectTime}
        onChangeAllDays={useAllDays}
      />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
