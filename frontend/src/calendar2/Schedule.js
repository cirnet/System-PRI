import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./style.css";
import ScheduleElement from "./SheduleElement";
import "moment/locale/pl";
import socketIOClient from 'socket.io-client';

export default function Schedule() {
  const [hourStart, setHourStart] = useState(9);
  const [hourEnd, setHourEnd] = useState(17);

  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);


  // useEffect(() => {
  //   const socket = socketIOClient('http://localhost:8000/api/commission/');
  //   socket.on('data_updated', data => {
  //     console.log('Dane zmieniły się na backendzie:', data);
  //     // tutaj można wykonać akcję, która odświeży dane na froncie
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:8000/api/commission/");
      setContent(
        data
          .sort((a, b) => (a.time_start > b.time_start ? 1 : -1))
          .filter(filterDates())
      );
      setLoading(false);
      console.log("render")
    };
    fetch();
    const interval = setInterval(()=>{
      fetch();
    },5000)
    return()=>clearInterval(interval)
  }, [hourStart, hourEnd]);


  function filterDates() {
    return (e) =>
      new Date(e.time_start).getHours() >= hourStart &&
      new Date(e.time_start).getHours() <= hourEnd;
  }

  const schedule = {};

  content.forEach((item) => {
    const startTime = moment(item.time_start);
    const dayOfWeek = startTime.locale("pl").format("dddd").toLocaleLowerCase();

    if (!schedule[dayOfWeek]) {
      schedule[dayOfWeek] = [];
    }

    schedule[dayOfWeek].push(item);
  });

  const days = Object.keys(schedule).map((day) => (
    <div key={day} className="day">
      <h3>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>

      {schedule[day].slice(0, 1).map((item) => (
        <h6 key={item}>{new Date(item.time_start).toLocaleDateString()}</h6>
      ))}

      {schedule[day].map((item) => (
        <div key={item.id}>
          <ScheduleElement
            id={item.id}
            // person={item.person}
            is_complete={item.is_complete}
            time_start={item.time_start}
            time_end={item.time_end}
            is_accepted={item.is_accepted}
          />
        </div>
      ))}
    </div>
  ));
  const styleForm = {
    display: "flex",
    flexDirection: "column",
    alignItems: "end",
  };
  return (
    <>
      <form style={styleForm}>
        <span>Chwilowy formularz z mozliwościa zmiany zakresu godzin</span>
        <br />
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
      </form>

      <div className="container">
        {loading ? (
          <span class="loader"></span>
        ) : content.length !== 0 ? (
          days
        ) : (
          <h1>Jeszcze nie ustalono terminów obron</h1>
        )}
      </div>
    </>
  );
}
