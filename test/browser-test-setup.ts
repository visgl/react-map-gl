import {getVersion, setWorkerUrl} from 'maplibre-gl';

(globalThis as typeof globalThis & {IS_REACT_ACT_ENVIRONMENT: boolean}).IS_REACT_ACT_ENVIRONMENT =
  true;

// Keep browser tests independent of the host browser's geolocation permission state.
const queryPermission = navigator.permissions.query.bind(navigator.permissions);
Object.defineProperty(navigator.permissions, 'query', {
  value: (permissionDescriptor: PermissionDescriptor) =>
    permissionDescriptor.name === 'geolocation'
      ? Promise.resolve({state: 'granted'} as PermissionStatus)
      : queryPermission(permissionDescriptor)
});

// MapLibre v6 resolves its worker relative to import.meta.url. Vite prebundles
// dependencies into .vite/deps, where the sibling worker file is not present.
if (Number.parseInt(getVersion(), 10) >= 6) {
  setWorkerUrl('/node_modules/maplibre-gl/dist/maplibre-gl-worker.mjs');
}
