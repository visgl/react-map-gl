import * as React from 'react';

import {useCallback, useState, useEffect} from 'react';
import {useMap} from 'react-map-gl';

// This component does nothing.
// It's purpose is to demo `useMap`.
// When a component is a child of `<Map>`, `useMap` has a `current` field
// that references the containing map.
// See /docs/api-reference/use-map.md
export default function Controls2() {
  const demo = useMap();
  console.log('Controls2', {demo});
  // First render:
  // {
  //     "demo": {
  //         "current": {...}, // See /docs/api-reference/types.md#mapref
  //         "mymap": {...} // See /docs/api-reference/types.md#mapref
  //     }
  // }

  return null;
}
