import { useEffect, useState } from "react";
import SalahTimesDisplay from "./SalahTimesDisplay";

function App() {
  const [salahTimesPayload, setSalahTimesPayload] =
    useState<SalahTimesPayload | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    window.electron.getSalahTimes().then((payload) => {
      setSalahTimesPayload(payload);
    });
  }, [reload]);

  function doReload() {
    setSalahTimesPayload(null);
    setReload((prev) => prev + 1);
  }

  return (
    <>
      <SalahTimesDisplay
        salahTimes={salahTimesPayload?.today ?? null}
        onReload={doReload}
      />
    </>
  );
}

export default App;
