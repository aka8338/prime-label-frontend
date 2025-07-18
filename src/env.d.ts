/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_FRONT_END: string;
  readonly VITE_SUPPORT_EMAIL: string;
  // add more keys here as you add more VITE_ variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
