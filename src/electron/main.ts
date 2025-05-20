import { app, BrowserWindow } from "electron";

import { isDev } from "./utils.js";
import { getPreloadPath, getUIPath } from "./path-resolver.js";
import { scheduleReminders } from "./salah-monitor.js";
import { createTray } from "./tray.js";
import { handleEvents } from "./event-handler.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 400,
    height: 650,
    resizable: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:7000");
  } else {
    mainWindow.loadFile(getUIPath());

    app.setLoginItemSettings({
      openAtLogin: false,
      path: app.getPath("exe"),
    });
  }

  createTray(mainWindow);

  handleEvents(mainWindow);

  await scheduleReminders(mainWindow);
});
