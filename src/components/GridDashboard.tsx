import { ColDef, IDatasource } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import { forwardRef, useMemo, useState } from "react";

interface GridDashboardProps {
  datasource: IDatasource;
}

const GridDashboard = forwardRef<AgGridReact, GridDashboardProps>(
  (props, ref) => {
    const [columnDefs] = useState<ColDef[]>([
      { field: "#" },
      { field: "uuid", minWidth: 350 },
      { field: "fullName", minWidth: 300 },
      { field: "address", minWidth: 600 },
      { field: "phoneNumber", minWidth: 200 },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
      return {
        flex: 1,
        minWidth: 50,
        sortable: false,
      };
    }, []);
    return (
      <div className="h-full w-full">
        <div className="ag-theme-quartz h-full w-full">
          <AgGridReact
            ref={ref}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            datasource={props.datasource}
            rowModelType={"infinite"}
            maxConcurrentDatasourceRequests={1}
            cacheBlockSize={10}
          />
        </div>
      </div>
    );
  },
);

export default GridDashboard;
