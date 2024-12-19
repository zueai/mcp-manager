"use strict";
const { contextBridge, ipcRenderer } = require("electron");
contextBridge.exposeInMainWorld(
  "electron",
  {
    readConfig: () => ipcRenderer.invoke("read-config"),
    executeCommand: (command) => ipcRenderer.invoke("execute-command", command)
  }
);
