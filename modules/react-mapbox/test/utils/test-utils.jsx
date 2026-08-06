/* global setTimeout */
import {act} from 'react-dom/test-utils';

export async function actUntil(updateFunc) {
  // Commit synchronous work first, then give asynchronous map callbacks short act boundaries.
  // A single async act can deadlock when its completion depends on an intermediate React commit.
  let promise;
  await act(() => {
    promise = new Promise(updateFunc);
  });

  let result;
  let error;
  let rejected = false;
  let completed = false;
  Promise.resolve(promise).then(
    value => {
      result = value;
      completed = true;
    },
    reason => {
      error = reason;
      rejected = true;
      completed = true;
    }
  );
  while (!completed) {
    await act(() => sleep(0));
  }
  if (rejected) {
    throw error;
  }
  return result;
}

export function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function waitForMapLoad(mapRef) {
  while (!mapRef.current || !mapRef.current.getMap().isStyleLoaded()) {
    await act(() => sleep(50));
  }
  await act(() => sleep(0));
}

export function waitForMapStyleLoad(mapRef) {
  const map = mapRef.current.getMap();
  return new Promise(resolve => {
    const onStyleData = () => {
      if (map.isStyleLoaded()) {
        map.off('styledata', onStyleData);
        setTimeout(resolve, 0);
      }
    };
    map.on('styledata', onStyleData);
  });
}
