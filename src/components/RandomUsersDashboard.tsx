import axios from "axios";
import { useRef, useState } from "react";
import InputsDashboard from "./InputsDashboard";
import GridDashboard from "./GridDashboard";
import { AgGridReact } from "ag-grid-react";
import { IDatasource } from "ag-grid-community";

export default function RandomUsersDashboard() {
  const ref = useRef<AgGridReact>(null);
  const [seed, setSeed] = useState<number>(0);
  const [local, setLocal] = useState<string>("us");
  const [errors, setErrors] = useState<number>(0);

  const datasource: IDatasource = {
    getRows: (params) => {
      const page = +params.startRow / 10;
      async function getUsers() {
        try {
          const res = await axios.get(`${import.meta.env.VITE_URL}/api/users`, {
            params: { seed, local, page, errors },
          });
          const users = res.data;
          params.successCallback(users);
        } catch (e) {
          params.failCallback();
        }
      }
      getUsers();
    },
  };

  function exportToCSV() {
    ref.current?.api.exportDataAsCsv();
  }

  return (
    <div className="flex h-full w-full flex-col">
      <InputsDashboard
        seed={seed}
        setSeed={setSeed}
        local={local}
        setLocal={setLocal}
        errors={errors}
        setErrors={setErrors}
        exportToCSV={exportToCSV}
      />
      <GridDashboard ref={ref} datasource={datasource} />
    </div>
  );
}
