/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPTILER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
