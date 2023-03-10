import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../AvailableTimeSlot.css";
import CalendarTimeSlotElementTEST from "./CalendarTimeSlotElementTEST";
import "moment/locale/pl";
import swal from "sweetalert";
import Loader from "../../Loader/Loader";
export default function CalendarTimeSlotTEST(id_opiekun) {
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changeHandleStatus, setChangeHandleStatus] = useState(false);
  const [pickedTimeSlots, setPickedTimeSlots] = useState([]);

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
  });

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

  const handle = (e) => {
    console.log("pickedTimeSlots: ", pickedTimeSlots);
    const time_start = e.currentTarget.getAttribute("time_start");
    const time_end = e.currentTarget.getAttribute("time_end");
    const id = e.currentTarget.getAttribute("date_id");

    setChangeHandleStatus((prev) => !prev);
    if (!reducedOptions.includes(time_start)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ id, time_start, time_end }),
      };

      fetch("http://localhost:3000/AVAILABLE_TIME_SLOT_PICKED", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    } else {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      fetch(
        `http://localhost:3000/AVAILABLE_TIME_SLOT_PICKED/${id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const fetch = async () => {
      const { data } = await axios(
        `http://localhost:3000/AVAILABLE_TIME_SLOT_PICKED/?id_opiekun=${id_opiekun.id_opiekun}`,
        // "http://localhost:3000/AVAILABLE_TIME_SLOT_PICKED",
        requestOptions
      );
      console.log(`fetch data dla ${id_opiekun.id_opiekun}: `, data);

      setPickedTimeSlots(data);
    };
    fetch();
  }, [changeHandleStatus]);

  const reducedOptions = pickedTimeSlots.reduce(function (filtered, option) {
    let someNewValue = option.time_start;
    filtered.push(someNewValue);
    return filtered;
  }, []);

  // console.log(reducedOptions);
  const days = Object.keys(schedule).map((day) => (
    <div key={day} className="day">
      <span className="spanDay">
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </span>
      <br />
      {schedule[day].slice(0, 1).map((item) => (
        <span className="spanData" key={item}>
          {new Date(item.time_start).toLocaleDateString()}
        </span>
      ))}

      {schedule[day].map((item) => (
        <div
          key={item.id}
          time_start={item.time_start}
          time_end={item.time_end}
          date_id={item.id}
          onClick={handle}
        >
          <CalendarTimeSlotElementTEST
            time_start={item.time_start}
            test={reducedOptions.includes(item.time_start)}
          />
        </div>
      ))}
    </div>
  ));

  return (
    <>
      <div className="container">
        {loading ? (
          <Loader />
        ) : content.length !== 0 ? (
          <>{days}</>
        ) : (
          <h1>Jeszcze nie ustalono termin??w obron</h1>
        )}
      </div>
    </>
  );
}
