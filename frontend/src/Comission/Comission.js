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
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_COORDINATOR_TIME_SLOT,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      setHourStart(new Date(data[0]?.time_start).getHours());
      setHourEnd(new Date(data[0]?.time_end).getHours());
    };
    fetch();
  }, []);

  function filterDates(e) {
    return (e) =>
      new Date(e.time_start).getHours() >= hourStart &&
      new Date(e.time_start).getHours() <= hourEnd;
  }
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_COMMISSION, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setContent(data);
      setLoading(false);
    };
    fetch();
    const interval = setInterval(() => {
      fetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [refreshData]);

  const Check = (value) => {
    if (value) {
      return <CheckCircleIcon className="yes" />;
    } else {
      return <DoNotDisturbOnIcon className="no" />;
    }
  };

  const Handle = (...value) => {
    console.log(value);
    let is_accepted = value[0].is_accepted;
    let is_complete = value[0].is_complete;
    let is_selected = value[0].is_selected;
    let is_valid = value[0].is_valid;

    if (value[1] === "is_accepted") {
      is_accepted = !value[0].is_accepted;
    }
    if (value[1] === "is_complete") {
      is_complete = !value[0].is_complete;
    }
    if (value[1] === "is_selected") {
      is_selected = !value[0].is_selected;
    }
    if (value[1] === "is_valid") {
      is_valid = !value[0].is_valid;
    }
    setRefreshData(!refreshData);
    const time_start = value[0].time_start;
    const time_end = value[0].time_end;

    const id = value[0].id;
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
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
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
      const { data } = await axios.get(process.env.REACT_APP_API_USER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
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
        const name_field = "is_valid";
        return (
          <>
            <span
              className="pointer"
              onClick={() => {
                Handle(params.row, name_field);
              }}
            >
              {Check(params.row.is_valid)}
            </span>
          </>
        );
      },
    },
    {
      field: "is_complete",
      headerName: "Complete",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        const name_field = "is_complete";
        return (
          <>
            <span
              className="pointer"
              onClick={() => {
                Handle(params.row, name_field);
              }}
            >
              {Check(params.row.is_complete)}
            </span>
          </>
        );
      },
    },
    {
      field: "is_selected",
      headerName: "Selected",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        const name_field = "is_selected";
        return (
          <>
            <span
              className="pointer"
              onClick={() => {
                Handle(params.row, name_field);
              }}
            >
              {Check(params.row.is_selected)}
            </span>
          </>
        );
      },
    },
    {
      field: "is_accepted",
      headerName: "Accepted",
      headerAlign: "center",
      width: 100,
      renderCell: (params) => {
        const name_field = "is_accepted";
        return (
          <>
            <span
              className="pointer"
              onClick={() => {
                Handle(params.row, name_field);
              }}
            >
              {Check(params.row.is_accepted)}
            </span>
          </>
        );
      },
    },

    {
      field: "Edycja",
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
      width: 1000,
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
          <div className="displayEmails">
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
            <DataGrid
              rows={content.filter(filterDates())}
              columns={columns}
              pageSize={100}
            />
          </div>
        </>
      ) : (
        "Brak wolnych slotow"
      )}
    </div>
  );
}
