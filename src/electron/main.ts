import { app, BrowserWindow, Menu } from "electron";
import path from "path";

import { isDev } from "./utils.js";
import { getAssetsPath, getPreloadPath, getUIPath } from "./path-resolver.js";
import { scheduleReminders } from "./salah-monitor.js";
import { createTray } from "./tray.js";
import { handleEvents } from "./event-handler.js";

Menu.setApplicationMenu(null);

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
    width: 400,
    height: 650,
    resizable: false,
    alwaysOnTop: true,
    icon: path.join(getAssetsPath(), "icons/icon_1024.png"),
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
