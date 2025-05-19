import { useEffect, useState } from "react";

function App() {
  const [salahTimes, setSalahTimes] = useState<SalahTimesPayload | null>(null);

  useEffect(() => {
    window.electron.getSalahTimes().then((payload) => {
      setSalahTimes(payload);
    });
  }, []);

  return (
    <>
      <h1> Salah-Reminder-Muscat </h1>
      <p> {JSON.stringify(salahTimes)} </p>
    </>
  );
}

export default App;
