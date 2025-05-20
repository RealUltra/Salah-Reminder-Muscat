import "./SalahTimesDisplay.css";
import Clock from "./Clock";
import SalahTable from "./SalahTable";
import ReloadButton from "./ReloadButton";

interface Props {
  salahTimes: SalahTimes | null;
  onReload: () => void;
}

const SalahTimesDisplay = ({ salahTimes, onReload }: Props) => {
  return (
    <div className="container">
      <Clock />
      <ReloadButton onReload={() => onReload()} />
      <SalahTable salahTimes={salahTimes} />
    </div>
  );
};

export default SalahTimesDisplay;
