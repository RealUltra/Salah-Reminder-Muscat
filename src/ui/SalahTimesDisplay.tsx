import "./SalahTimesDisplay.css";
import Clock from "./Clock";
import SalahTable from "./SalahTable";
import ReloadButton from "./ReloadButton";
import Navigation from "./Navigation";
import Alert from "./Alert";
import { formatDate } from "./utils";

interface Props {
  salahTimes: SalahTimes | null;
  onReload: () => void;
  view: number;
  setView: (view: number) => void;
}

const SalahTimesDisplay = ({ salahTimes, onReload, view, setView }: Props) => {
  const displayedDate = salahTimes
    ? formatDate(salahTimes?.fajr.adhaanTime)
    : view === -1
    ? "yesterday"
    : "tomorrow";
  const alert =
    view !== 0 ? (
      <Alert>{`These are the salah times for ${displayedDate}.`}</Alert>
    ) : null;

  return (
    <div className="container">
      {alert}
      <Navigation view={view} setView={setView} />
      <Clock />
      <ReloadButton onReload={() => onReload()} />
      <SalahTable salahTimes={salahTimes} />
    </div>
  );
};

export default SalahTimesDisplay;
