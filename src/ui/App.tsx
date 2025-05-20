import { useEffect, useState } from "react";
import SalahTimesDisplay from "./SalahTimesDisplay";

function App() {
  const [salahTimesPayload, setSalahTimesPayload] =
    useState<SalahTimesPayload | null>(null);
  const [reload, setReload] = useState(0);
  const [view, setView] = useState(0);

  useEffect(() => {
    window.electron.getSalahTimes().then((payload) => {
      setSalahTimesPayload(payload);
    });
  }, [reload]);

  function doReload() {
    setSalahTimesPayload(null);
    setReload((prev) => prev + 1);
  }

  const viewNames: ["yesterday", "today", "tomorrow"] = [
    "yesterday",
    "today",
    "tomorrow",
  ];
  const salahTimes = salahTimesPayload
    ? salahTimesPayload[viewNames[view + 1]]
    : null;

  return (
    <>
      <SalahTimesDisplay
        salahTimes={salahTimes}
        onReload={doReload}
        view={view}
        setView={(view: number) => setView(view)}
      />
    </>
  );
}

export default App;
