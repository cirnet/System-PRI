import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Schedule.css";
import ScheduleElement from "./ScheduleElement";
import "moment/locale/pl";
import Loader from "../Loader/Loader";

export default function Schedule() {
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const [group_id, setGroup_id] = useState("");
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const request = async () => {
      const data = await fetch(
        process.env.REACT_APP_API_AUTH_USER,
        requestOptions
      ).then((response) => response.json());
      setGroup_id(data.groups[0].id);
    };
    request();
  }, []);

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

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_COMMISSION, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setContent(data.sort((a, b) => (a.time_start > b.time_start ? 1 : -1)));
      setLoading(false);
      console.log("render");
    };
    fetch();
    // const interval = setInterval(() => {
    //   fetch();
    // }, 5000);
    // return () => clearInterval(interval);
  }, [hourStart, hourEnd]);

  function filterDates() {
    return (e) =>
      new Date(e.time_start).getHours() >= hourStart &&
      new Date(e.time_start).getHours() <= hourEnd;
  }

  const schedule = {};

  content.filter(filterDates()).forEach((item) => {
    const startTime = moment(item.time_start);
    const dayOfWeek = startTime.locale("pl").format("dddd").toLocaleLowerCase();

    if (!schedule[dayOfWeek]) {
      schedule[dayOfWeek] = [];
    }

    schedule[dayOfWeek].push(item);
  });

  const days = Object.keys(schedule).map((day) => (
    <div key={day} className="daySchedule">
      <h5>{day.charAt(0).toUpperCase() + day.slice(1)}</h5>

      {schedule[day].slice(0, 1).map((item) => (
        <h6 key={item}>{new Date(item.time_start).toLocaleDateString()}</h6>
      ))}

      {schedule[day].map((item) => (
        <div
          key={item.id}
          time_start={item.time_start}
          time_end={item.time_end}
        >
          <ScheduleElement
            id={item.id}
            is_complete={item.is_complete}
            time_start={item.time_start}
            time_end={item.time_end}
            is_accepted={item.is_accepted}
            group_id={group_id}
          />
        </div>
      ))}
    </div>
  ));
  // const styleForm = {
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "end",
  // };
  return (
    <>
      {/* <form style={styleForm}>
        <label>
          OD:
          <input
            type="number"
            onChange={(e) => {
              setHourStart(e.target.value);
            }}
          ></input>
        </label>
        <label>
          Do:
          <input
            type="number"
            onChange={(e) => {
              setHourEnd(e.target.value);
            }}
          ></input>
        </label>
      </form> */}

      <div className="containerSchedule">
        {loading ? (
          <Loader />
        ) : content.length !== 0 ? (
          days
        ) : (
          <h1>Jeszcze nie ustalono terminów obron</h1>
        )}
      </div>
    </>
  );
}
