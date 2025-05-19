const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  getSalahTimes: () => electron.ipcRenderer.invoke("getSalahTimes"),
} satisfies Window["electron"]);
