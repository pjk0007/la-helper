import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
  start: () => ipcRenderer.invoke('start'),
  finish: () => ipcRenderer.invoke('finish'),
});
