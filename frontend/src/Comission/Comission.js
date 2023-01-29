import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./Comission.css";
import moment from "moment";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";

export default function Comission() {
  const [is_accepted, setIs_accepted] = useState("");
  const [is_complete, setIs_complete] = useState("");
  const [is_selected, setIs_selected] = useState("");
  const [is_valid, setIs_valid] = useState("");
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");
  const [change, setChange] = useState(1);
  const [value, setValue] = useState("");
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:8000/api/commission/");
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);
  const [content, setContent] = useState([]);

  useEffect(() => {
    Check();
  }, [refreshData]);

  const Check = (value) => {
    if (value) {
      return <CheckCircleIcon className="yes" />;
    } else {
      return <DoNotDisturbOnIcon className="no" />;
    }
  };

  // const Check = (value) => {
  //   useEffect(() => {
  //     if (value) {
  //       return <CheckCircleIcon className="yes" />;
  //     } else {
  //       return <DoNotDisturbOnIcon className="no" />;
  //     }
  //   }, [refreshData]);
  // };

  const Handle = (value) => {
    console.log(change);
    Check(!value.is_accepted);
    setChange(change + 1);
    console.log(change);
    const time_start = value.time_start;
    const time_end = value.time_end;
    const is_accepted = !value.is_accepted;
    const is_complete = value.is_complete;
    const is_selected = value.is_selected;
    const is_valid = value.is_valid;
    const id = value.id;
    const request = async () => {
      await fetch(`http://localhost:8000/api/commission/${id}/`, {
        method: "PUT",
        body: JSON.stringify({
          time_start,
          time_end,
          is_accepted,
          is_complete,
          is_selected,
          is_valid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    request();
    // window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "tak",
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
        return <span>{Check(params.row.is_valid)}</span>;
      },
    },
    {
      field: "is_complete",
      headerName: "Complete",
      width: 150,
      renderCell: (params) => {
        return <span>{Check(params.row.is_complete)}</span>;
      },
    },

    {
      field: "is_accepted",
      headerName: "Accepted",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <span
              onClick={() => {
                Handle(params.row);
                setRefreshData(!refreshData);
              }}
            >
              {Check(params.row.is_accepted)}
            </span>
          </>
        );
      },
    },
    {
      field: "is_selected",
      headerName: "Selected",
      width: 150,
      renderCell: (params) => {
        return <span>{Check(params.row.is_selected)}</span>;
      },
    },
    {
      field: "",
      headerName: "Edycja",
      width: 150,
      renderCell: (params) => {
        return (
          <span onClick={() => navigate(`/schedule/${params.row.id}`)}>
            <EditIcon className="edit" />
          </span>
        );
      },
    },
  ];

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
