/*
  const options = {
    buttons: ["Yes", "No"],
    title: "Confirm",
    message: "Do you want to proceed?",
    detail: "Choose Yes to continue or No to cancel.",
  };

  dialog.showMessageBox(mainWindow, options).then((response) => {
    console.log(response);
  });
*/

import { getSalahTimesPayload } from "./salah-times-muscat.js";
import { getSalahEndTime } from "./salah-times-utils.js";

const IQAMAH_REMINDER_INTERVALS: number[] = [25, 20, 15, 10, 5]; // in minutes

// When the app starts up, if there is a prayer that is approaching the end of its time, remind me of it.
// Remind me 25, 20, 15, 10 & 5 minutes before iqamah.
// If the 25 minute mark has been exceeded, a reminder should be sent immediately.
// We must keep track of the current prayer. This is because a reminder for fajr should not be sent at asr time. Similarly, in the case of maghrib, a reminder for asr should not be sent within the 25 minutes before maghrib iqamaah as the reminders being sent will be for maghrib.
// After the iqamah has ended, reminders must be sent at 60, 45, 30, 25, 20, 15, 10, 5 minutes before salah time ends.
// We must keep track of if the user has already prayed to stop reminding.

/*
> How to get current salah?
- Loop backwards from ishaa time. Check which adhaan has happened. For example, if it is past ishaa but before 12am, ishaa will be selected.
- If no prayer is selected, it is yesterday's ishaa time.
- Then, we check if we are still within the selected prayer's time frame. If not, the current prayer is null. For example, time for fajr does not last until dhuhr, only until sunrise.

> 

*/

interface SalahReminderInfo {
  salah: Salah;
  endTime: Date;
}

export async function scheduleReminders() {
  let payload = null;

  while (!payload) {
    payload = await getSalahTimesPayload();

    if (!payload) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  for (const salahName in payload.today) {
    if (salahName !== "sunrise") {
      const salah = payload.today[salahName as SalahName];
      const reminderTime = new Date(salah.iqamahTime);

      for (const minutes of IQAMAH_REMINDER_INTERVALS) {
        reminderTime.setMinutes(reminderTime.getMinutes() - minutes);
        scheduleReminderAt(reminderTime);
      }
    }
  }
}

function getCurrentSalahInfo(payload: SalahTimesPayload): SalahReminderInfo {
  const salahNames: SalahName[] = ["ishaa", "maghrib", "asr", "dhuhr", "fajr"];

  const now = Date.now();

  for (const salahName of salahNames) {
    const salah = payload.today[salahName];
    const endTime = getSalahEndTime(payload, salahName);

    if (now > salah.adhaanTime.getTime() && now < endTime.getTime()) {
      return { salah, endTime };
    }
  }

  return {
    salah: payload.yesterday.ishaa,
    endTime: payload.today.fajr.adhaanTime,
  };
}

async function scheduleReminderAt(reminderTime: Date) {
  const delay = reminderTime.getTime() - Date.now();

  if (delay <= 0) {
    return;
  }

  setTimeout(() => {
    console.log("This is the reminder for some prayer idk go check.");
    //callback();
    //scheduleTaskAt(hour, minute, second, callback);
  }, delay);
}
