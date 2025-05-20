import { app, BrowserWindow, dialog } from "electron";
import { ipcMainHandle, isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./path-resolver.js";
import { getSalahTimesPayload } from "./salah-times-muscat.js";
import "./salah-monitor.js";
import { scheduleReminders } from "./salah-monitor.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 400,
    height: 650,
    resizable: false,
    autoHideMenuBar: true,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:7000");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  ipcMainHandle("getSalahTimes", () => {
    return getSalahTimesPayload();
  });

  await scheduleReminders();
});
