import { IUserData } from './interface';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('auth', {
  login: (userData: IUserData) => ipcRenderer.invoke('login', userData),
  getUserData: () => ipcRenderer.invoke('getUserData'),
});

contextBridge.exposeInMainWorld('work', {
  startWork: () => ipcRenderer.invoke('startWork'),
  finishWork: () => ipcRenderer.invoke('finishWork'),
});
