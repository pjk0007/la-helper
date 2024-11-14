import { DesktopCapturerSource } from 'electron';

/* Preload */
declare global {
  interface Window {
    auth: IAuthAPI;
    work: IWorkAPI;
  }
}

/* Main */
export interface IToken {
  token: string | null;
  error: string | null;
}

export interface IUserData {
  email: string;
  password: string;
  remember: boolean;
}

export interface IAuthAPI {
  login: (userData: IUserData) => Promise<IToken>;
  getUserData: () => Promise<IUserData>;
}

export interface IWorkAPI {
  startWork: () => Promise<boolean>;
  finishWork: () => Promise<boolean>;
}

export interface IWorkData {
  mouse: number;
  keyboard: number;
  startDateTime: Date;
  endDateTime: Date;
  total: number;
}

/* Renderer */
export interface IScreenImage {
  display_id: string;
  id: string;
  name: string;
  dataURL: string;
}
