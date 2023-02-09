import * as React from 'react';

import {useCallback, useState, useEffect} from 'react';
import {useMap} from 'react-map-gl';

export default function Controls() {
  const {mymap} = useMap();
  const [inputValue, setInputValue] = useState('');
  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (!mymap) return undefined;

    const onMove = () => {
      const {lng, lat} = mymap.getCenter();
      setInputValue(`${lng.toFixed(3)}, ${lat.toFixed(3)}`);
      setError(false);
    };
    mymap.on('move', onMove);
    onMove();

    return () => {
      mymap.off('move', onMove);
    };
  }, [mymap]);

  const onChange = useCallback(evt => {
    setInputValue(evt.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    if (!mymap) return undefined;

    const [lng, lat] = inputValue.split(',').map(Number);
    if (Math.abs(lng) <= 180 && Math.abs(lat) <= 85) {
      mymap.easeTo({
        center: [lng, lat],
        duration: 1000
      });
    } else {
      setError(true);
    }
  }, [mymap, inputValue]);

  return (
    <div style={{padding: 12, fontFamily: 'sans-serif'}}>
      <span>MAP CENTER: </span>
      <input
        type="text"
        value={inputValue}
        onChange={onChange}
        style={{color: hasError ? 'red' : 'black'}}
      />
      <button onClick={onSubmit}>GO</button>
    </div>
  );
}
