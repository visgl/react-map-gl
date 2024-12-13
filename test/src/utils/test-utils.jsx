/* global setTimeout */
export function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export function waitForMapLoad(mapRef) {
  return new Promise(resolve => {
    const check = () => {
      if (mapRef.current && mapRef.current.getMap().isStyleLoaded()) {
        resolve();
      } else {
        setTimeout(check, 50);
      }
    };
    check();
  });
}
