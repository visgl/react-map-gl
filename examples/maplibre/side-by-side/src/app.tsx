/* global window */
import * as React from 'react';
import {useState, useCallback, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import {Map} from 'react-map-gl/maplibre';

import ControlPanel, {Mode} from './control-panel';

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
          onMove={onMove}
          style={LeftMapStyle}
          mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
        />
        <Map
          id="right-map"
          {...viewState}
          padding={rightMapPadding}
          onMove={onMove}
          style={RightMapStyle}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        />
      </div>
      <ControlPanel mode={mode} onModeChange={setMode} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
