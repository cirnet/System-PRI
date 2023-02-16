import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

export default function ScheduleDescription() {
  const { id } = useParams();
  const [comisja, setComisja] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [team, setTeam] = useState();

  useEffect(() => {
    const commissionResponse = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_COMMISSION + `${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      setComisja(data.members);
      console.log(comisja);
    };
    commissionResponse();
  }, []);

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

  const reducedOptions = users
    .filter((user) => comisja.includes(user.id))
    .reduce(function (filtered, option) {
      let someNewValue = { email: option.email, id: option.id };
      filtered.push(someNewValue);
      return filtered;
    }, []);

  const reducedTeams = teams.reduce(function (filtered, option) {
    let someNewValue = { email: option.name, id: option.id };
    filtered.push(someNewValue);
    return filtered;
  }, []);

  console.log(reducedTeams);
  const navigate = useNavigate();
  const [content, setContent] = useState({});
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");

  const dane = {
    defense_type: 0, // defence 0-half, 1-full
    grade: 0,
    commission: id,
    team: team,
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
    fetch(process.env.REACT_APP_API_DEFENSE, {
      method: "POST",
      body: JSON.stringify(dane),
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
    navigate(`/schedule2/${id}`);
    window.location.reload();
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_TEAM, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setTeams(data);
      console.log(data);
    };
    fetch();
  }, []);

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

          <div>
            <label>
              <div className="form-control mt-1 center-option-text">
                {reducedOptions.map((option, index) => (
                  <p value={option.id}>{option.email}</p>
                ))}
              </div>
            </label>
            <br />
            <br />
          </div>
        </div>

        <form onSubmit={handle}>
          <h3>Wybierz swój zespół:</h3>
          <div>
            <label>
              <select
                className="form-control mt-1 center-option-text"
                onChange={(e) => setTeam(e.target.value)}
              >
                <option value="">--------Wybierz zespół--------</option>
                {reducedTeams.map((option) => (
                  <option value={option.id}>{option.email}</option>
                ))}
              </select>
            </label>
            <br />
            <br />
          </div>

          <button type="submit">Zapisz się</button>
        </form>
      </div>
    </>
  );
}
