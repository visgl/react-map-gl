import siteConfig from '@generated/docusaurus.config';
import {setWorkerUrl} from 'maplibre-gl';

setWorkerUrl(`${siteConfig.baseUrl}maplibre-gl-worker.mjs`);
