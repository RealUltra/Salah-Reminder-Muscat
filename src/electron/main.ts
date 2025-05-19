import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./path-resolver.js";
import { getSalahTimesPayload } from "./salah-times-muscat.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:7000");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  ipcMainHandle("getSalahTimes", () => {
    return getSalahTimesPayload();
  });
});
