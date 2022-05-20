/* global window */
import * as React from 'react';
import {useState, useCallback, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import Map from 'react-map-gl';

import ControlPanel, {Mode} from './control-panel';

const TOKEN = ''; // Set your mapbox token here

const LeftMapStyle: React.CSSProperties = {
  position: 'absolute',
  width: '50%',
  height: '100%'
};
const RightMapStyle: React.CSSProperties = {
  position: 'absolute',
  left: '50%',
  width: '50%',
  height: '100%'
};

export default function App() {
  const [viewState, setViewState] = useState({
    longitude: -122.43,
    latitude: 37.78,
    zoom: 12,
    pitch: 30
  });
  const [mode, setMode] = useState<Mode>('side-by-side');

  // Two maps could be firing 'move' events at the same time, if the user interacts with one
  // while the other is in transition.
  // This state specifies which map to use as the source of truth
  // It is set to the map that received user input last ('movestart')
  const [activeMap, setActiveMap] = useState<'left' | 'right'>('left');

  const onLeftMoveStart = useCallback(() => setActiveMap('left'), []);
  const onRightMoveStart = useCallback(() => setActiveMap('right'), []);
  const onMove = useCallback(evt => setViewState(evt.viewState), []);

  const width = typeof window === 'undefined' ? 100 : window.innerWidth;
  const leftMapPadding = useMemo(() => {
    return {left: mode === 'split-screen' ? width / 2 : 0, top: 0, right: 0, bottom: 0};
  }, [width, mode]);
  const rightMapPadding = useMemo(() => {
    return {right: mode === 'split-screen' ? width / 2 : 0, top: 0, left: 0, bottom: 0};
  }, [width, mode]);

  return (
    <>
      <div style={{position: 'relative', height: '100%'}}>
        <Map
          id="left-map"
          {...viewState}
          padding={leftMapPadding}
          onMoveStart={onLeftMoveStart}
          onMove={activeMap === 'left' && onMove}
          style={LeftMapStyle}
          mapStyle="mapbox://styles/mapbox/light-v9"
          mapboxAccessToken={TOKEN}
        />
        <Map
          id="right-map"
          {...viewState}
          padding={rightMapPadding}
          onMoveStart={onRightMoveStart}
          onMove={activeMap === 'right' && onMove}
          style={RightMapStyle}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          mapboxAccessToken={TOKEN}
        />
      </div>
      <ControlPanel mode={mode} onModeChange={setMode} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
