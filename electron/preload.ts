const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
	readConfig: () => ipcRenderer.invoke("read-config"),
	executeCommand: (command: string) =>
		ipcRenderer.invoke("execute-command", command)
})

export {}
