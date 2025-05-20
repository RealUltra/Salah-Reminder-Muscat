import { BrowserWindow, Tray } from "electron";
import path from "path";
import { getAssetsPath } from "./path-resolver.js";

export function createTray(mainWindow: BrowserWindow): Tray {
  const tray = new Tray(path.join(getAssetsPath(), "icon.png"));

  tray.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  return tray;
}
