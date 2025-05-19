interface SalahTimes {
  fajr: Date;
  sunrise: Date;
  dhuhr: Date;
  asr: Date;
  maghrib: Date;
  ishaa: Date;
}

interface SalahTimesPayload {
  yesterday: SalahTimes;
  today: SalahTimes;
  tomorrow: SalahTimes;
}

interface EventPayloadMapping {
  getSalahTimes: Promise<SalahTimesPayload | null>;
}

interface Window {
  electron: {
    getSalahTimes: () => Promise<SalahTimesPayload | null>;
  };
}
