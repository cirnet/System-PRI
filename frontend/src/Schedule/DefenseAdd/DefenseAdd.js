import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export default function ScheduleDescription() {
  const { id } = useParams();
  const [comisja, setComisja] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const commissionResponse = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_COMMISSION + `${id}/`
      );

      setComisja(data.members);
      console.log(comisja);
    };
    commissionResponse();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_USER);
      console.log(data);
      setUsers(data);
    };
    fetch();
  }, []);

  const reducedOptions = users
    .filter((user) => comisja.includes(user.id))
    .reduce(function (filtered, option) {
      let someNewValue = { email: option.email, id: option.id };
      filtered.push(someNewValue);
      return filtered;
    }, []);

  const navigate = useNavigate();
  const [content, setContent] = useState({});
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");

  const dane = {
    time_start: time_start,
    time_end: time_end,
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_COMMISSION + `${id}/`
      );
      setContent(data);
      setTime_start(moment(data.time_start).format("YYYY-MM-DDTkk:mm"));
      setTime_end(moment(data.time_end).format("YYYY-MM-DDTkk:mm"));

      console.log(data);
    };
    fetch();
  }, []);

  const handle = (e) => {
    fetch(process.env.REACT_APP_API_COMMISSION + `${id}/`, {
      method: "PUT",
      body: JSON.stringify(dane),
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
    navigate("/schedule");
    window.location.reload();
  };

  return (
    <>
      <div className="centerH">
        <h1>{moment(time_start).format("LL")}</h1>
        <h2>
          {moment(time_start).format("LT")} - {moment(time_end).format("LT")}
        </h2>
      </div>
      <br />
      <br />
      <div className="divide">
        <div>
          <h3>Opiekunowie obrony:</h3>
          {(() => {
            const arr = [];
            for (let i = 0; i < comisja.length + 1; i++) {
              arr.push(
                <div>
                  <label>
                    <select
                      className="form-control mt-1 center-option-text"
                      // onChange={(e) => setPerson(e.target.value)}
                    >
                      {/* <option value="">--------Wybierz osobe--------</option> */}
                      {reducedOptions.map((option, index) => (
                        <option value={option.id} selected={index === i}>
                          {option.email}
                        </option>
                      ))}
                    </select>
                  </label>
                  <br />
                  <br />
                </div>
              );
            }
            return arr;
          })()}
        </div>

        <form onSubmit={handle}>
          <button type="submit">Zapisz się</button>
        </form>
      </div>
    </>
  );
}
