/// <reference types="vite-plugin-svgr/client" />
import ArrowSvg from "../assets/arrow-repeat.svg?react";

interface InputsDashboardProps {
  local: string;
  setLocal: (local: string) => void;
  errors: number;
  setErrors: (errors: number) => void;
  seed: number;
  setSeed: (seed: number) => void;
  exportToCSV: () => void;
}

export default function InputsDashboard({
  local,
  setLocal,
  errors,
  setErrors,
  seed,
  setSeed,
  exportToCSV,
}: InputsDashboardProps) {
  function redoSeed() {
    setSeed(Math.floor(Math.random() * 899999 + 100000));
  }

  return (
    <section className="flex items-center justify-between rounded-md border p-5">
      <div className="flex gap-2">
        <label htmlFor="local">Region:</label>
        <select
          className="border px-1 py-0.5"
          id="local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
        >
          <option value={"us"}>USA</option>
          <option value={"tr"}>Turkey</option>
          <option value={"uk"}>Ukraine</option>
        </select>
      </div>

      <div className="flex gap-2">
        <label htmlFor="errors">Errors:</label>
        <input
          id="errors"
          type="range"
          min={0}
          max={1000}
          step={0.25}
          value={errors}
          onChange={(e) => setErrors(+e.target.value)}
        />
        <input
          className="border px-1 py-0.5"
          id="errors"
          type="number"
          min={0}
          max={1000}
          step={0.25}
          value={errors}
          onChange={(e) => setErrors(+e.target.value)}
        />
      </div>

      <div className="flex gap-2">
        <label>Seed:</label>
        <input
          className="border px-1 py-0.5"
          type="number"
          value={seed}
          onChange={(e) => setSeed(+e.target.value)}
        />
        <button onClick={redoSeed}>
          <ArrowSvg />
        </button>
      </div>
      <button className="h-10 w-20 rounded-md border" onClick={exportToCSV}>
        Export
      </button>
    </section>
  );
}
