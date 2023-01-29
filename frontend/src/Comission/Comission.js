import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import "./Comission.css";
import moment from "moment";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../Loader/Loader";

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
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_COMMISSION);
      setContent(data);
      setLoading(false);
      console.log(data);
    };
    fetch();
  }, [refreshData]);
  const [content, setContent] = useState([]);

  const Check = (value) => {
    if (value) {
      return <CheckCircleIcon className="yes" />;
    } else {
      return <DoNotDisturbOnIcon className="no" />;
    }
  };

  const Handle = (value) => {
    setRefreshData(!refreshData);
    const time_start = value.time_start;
    const time_end = value.time_end;
    const is_accepted = !value.is_accepted;
    const is_complete = value.is_complete;
    const is_selected = value.is_selected;
    const is_valid = value.is_valid;
    const id = value.id;
    const request = async () => {
      await fetch(process.env.REACT_APP_API_COMMISSION + `${id}/`, {
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
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_USER);
      console.log(data);
      setUsers(data);
    };
    fetch();
  }, []);

  const columns = [
    // { field: "id", headerName: "ID", width: 50 },
    {
      field: "time_end",
      headerName: "Data",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return <span>{moment(params.row.time_end).format("L")}</span>;
      },
    },
    {
      field: "time_start",
      headerName: "Godzina",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return <span>{moment(params.row.time_start).format("LT")}</span>;
      },
    },
    {
      field: "is_valid",
      headerName: "Valid",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return <span>{Check(params.row.is_valid)}</span>;
      },
    },
    {
      field: "is_complete",
      headerName: "Complete",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return <span>{Check(params.row.is_complete)}</span>;
      },
    },
    {
      field: "is_selected",
      headerName: "Selected",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return <span>{Check(params.row.is_selected)}</span>;
      },
    },
    {
      field: "is_accepted",
      headerName: "Accepted",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <span
              className="accepted"
              onClick={() => {
                Handle(params.row);
              }}
            >
              {Check(params.row.is_accepted)}
            </span>
          </>
        );
      },
    },

    {
      field: "",
      headerName: "Edycja",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        return (
          <span onClick={() => navigate(`/schedule/${params.row.id}`)}>
            <EditIcon className="edit" />
          </span>
        );
      },
    },
    {
      field: "members",
      headerName: "Opiekunowie ",
      headerAlign: "center",
      width: 800,
      renderCell: (params) => {
        // return <span>{params.row.members}</span>;
        const reducedOptions = users
          .filter((user) => params.row.members.includes(user.id))
          .reduce(function (filtered, option) {
            let someNewValue = { email: option.email, id: option.id };
            filtered.push(someNewValue);
            return filtered;
          }, []);
        return (
          <div>
            {reducedOptions.map((option) => (
              <span className="emailShow">{option.email}</span>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : content.length > 0 ? (
        <>
          <div
            style={{
              height: "100%",
              width: "100%",
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
