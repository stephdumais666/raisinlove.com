/// <reference types="vite/client" />

interface ImportMetaGlob {
  [key: string]: {
    default: string;
  };
}

interface ImportMeta {
  glob(pattern: string, options?: { eager: boolean }): Promise<ImportMetaGlob>;
  readonly env: Record<string, string>;
  readonly hot?: {
    readonly data: any;
    accept(): void;
    dispose(cb: (data: any) => void): void;
    invalidate(): void;
    on(event: string, cb: (payload: any) => void): void;
  };
}
