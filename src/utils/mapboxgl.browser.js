import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp.js';
import MapboxGLWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker.js';

mapboxgl.workerClass = MapboxGLWorker;

export default mapboxgl;
