import { DesktopCapturerSource } from 'electron';

/* Preload */
declare global {
  interface Window {
    api: {
      start: () => Promise<boolean>;
      finish: () => Promise<boolean>;
    };
  }
}
