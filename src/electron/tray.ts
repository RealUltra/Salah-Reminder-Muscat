import { BrowserWindow, nativeImage, Tray } from "electron";
import path from "path";
import { getAssetsPath } from "./path-resolver.js";

export function createTray(mainWindow: BrowserWindow): Tray {
  const sizes = [16, 22, 32, 48];

  const iconPaths = sizes.map((s) =>
    path.join(getAssetsPath(), "icons", `icon_${s}.png`)
  );
  const images = iconPaths.map((p) => nativeImage.createFromPath(p));

  const trayIcon = images[0];

  for (let i = 1; i < sizes.length; i++) {
    trayIcon.addRepresentation({
      scaleFactor: sizes[i] / sizes[0],
      buffer: images[i].toPNG(),
    });
  }

  const tray = new Tray(trayIcon);

  tray.setToolTip("Salah Reminder (Muscat)");

  tray.on("click", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  return tray;
}
