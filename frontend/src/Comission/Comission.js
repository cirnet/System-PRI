import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import "./Comission.css";
import moment from "moment";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const columns = [
  { field: "id", headerName: "ID" },
  {
    field: "time_end",
    headerName: "Data",
    width: 150,
    renderCell: (params) => {
      return <span>{moment(params.row.time_end).format("L")}</span>;
    },
  },
  {
    field: "time_start",
    headerName: "Godzina",
    width: 150,
    renderCell: (params) => {
      return <span>{moment(params.row.time_start).format("LT")}</span>;
    },
  },
  {
    field: "is_valid",
    headerName: "Valid",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          {params.row.is_valid ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <DoNotDisturbOnIcon style={{ color: "red" }} />
          )}
        </>
      );
    },
  },
  {
    field: "is_complete",
    headerName: "Complete",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          {params.row.is_complete ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <DoNotDisturbOnIcon style={{ color: "red" }} />
          )}
        </>
      );
    },
  },
  {
    field: "is_accepted",
    headerName: "Accepted",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          {params.row.is_accepted ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <DoNotDisturbOnIcon style={{ color: "red" }} />
          )}
        </>
      );
    },
  },
  {
    field: "is_selected",
    headerName: "Selected",
    width: 150,
    renderCell: (params) => {
      return (
        <>
          {params.row.is_selected ? (
            <CheckCircleIcon style={{ color: "green" }} />
          ) : (
            <DoNotDisturbOnIcon style={{ color: "red" }} />
          )}
        </>
      );
    },
  },
];

export default function Comission() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:8000/api/commission/");
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <div className="content">
      {content.length > 0 ? (
        <>
          <div
            style={{
              height: "80vh",
              width: "90vw",
            }}
          >
            <DataGrid rows={content} columns={columns} pageSize={100} />
          </div>
        </>
      ) : (
        "Brak wolnych slotow"
      )}
    </div>
  );
}
