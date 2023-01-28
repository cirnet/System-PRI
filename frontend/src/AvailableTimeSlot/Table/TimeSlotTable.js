import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID" },
  { field: "person", headerName: "Person", width: "300" },
  {
    field: "time_start",
    headerName: "Od",
    width: 250,
    renderCell: (params) => {
      return <span>{new Date(params.row.time_start).toLocaleString()}</span>;
    },
  },
  {
    field: "time_end",
    headerName: "Do",
    width: 250,
    renderCell: (params) => {
      return <span>{new Date(params.row.time_end).toLocaleString()}</span>;
    },
  },
];

export default function TimeSlotTable() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/available-time-slot/"
      );
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);
  console.log(content);
  return (
    <>
      <div className="content">
        <h1>Time Slots</h1>

        {content.length > 0 ? (
          <div style={{ height: 500, width: "95%" }}>
            <DataGrid rows={content} columns={columns} pageSize={100} />
          </div>
        ) : (
          "Brak wolnych slotow"
        )}
      </div>
    </>
  );
}
