import React from "react";
import { formatTime } from "./utils";

interface Props {
  salahTimes: SalahTimes | null;
}

const SalahTable = ({ salahTimes }: Props) => {
  const sunriseTime = salahTimes ? formatTime(salahTimes.sunrise) : "-";

  const blankTimes = {
    fajr: "-",
    dhuhr: "-",
    asr: "-",
    maghrib: "-",
    ishaa: "-",
  };

  const adhaanTimes = salahTimes
    ? {
        fajr: formatTime(salahTimes.fajr.adhaanTime),
        dhuhr: formatTime(salahTimes.dhuhr.adhaanTime),
        asr: formatTime(salahTimes.asr.adhaanTime),
        maghrib: formatTime(salahTimes.maghrib.adhaanTime),
        ishaa: formatTime(salahTimes.ishaa.adhaanTime),
      }
    : blankTimes;

  const iqamahTimes = salahTimes
    ? {
        fajr: formatTime(salahTimes.fajr.iqamahTime),
        dhuhr: formatTime(salahTimes.dhuhr.iqamahTime),
        asr: formatTime(salahTimes.asr.iqamahTime),
        maghrib: formatTime(salahTimes.maghrib.iqamahTime),
        ishaa: formatTime(salahTimes.ishaa.iqamahTime),
      }
    : blankTimes;

  return (
    <table className="salah-table">
      <thead>
        <tr>
          <th>Salah</th>
          <th>Adhaan</th>
          <th>Iqamah</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fajr</td>
          <td className="adhaan">{adhaanTimes.fajr}</td>
          <td className="iqamah">{iqamahTimes.fajr}</td>
        </tr>
        <tr>
          <td>Sunrise</td>
          <td>{sunriseTime}</td>
          <td>-</td>
        </tr>
        <tr>
          <td>Dhuhr</td>
          <td className="adhaan">{adhaanTimes.dhuhr}</td>
          <td className="iqamah">{iqamahTimes.dhuhr}</td>
        </tr>
        <tr>
          <td>Asr</td>
          <td className="adhaan">{adhaanTimes.asr}</td>
          <td className="iqamah">{iqamahTimes.asr}</td>
        </tr>
        <tr>
          <td>Maghrib</td>
          <td className="adhaan">{adhaanTimes.maghrib}</td>
          <td className="iqamah">{iqamahTimes.maghrib}</td>
        </tr>
        <tr>
          <td>Isha'a</td>
          <td className="adhaan">{adhaanTimes.ishaa}</td>
          <td className="iqamah">{iqamahTimes.ishaa}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SalahTable;
