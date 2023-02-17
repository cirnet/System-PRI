import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../AvailableTimeSlot.css";
import TimeSlotElementTEST from "./TimeSlotElementTEST";
import "moment/locale/pl";
import swal from "sweetalert";
import Loader from "../../Loader/Loader";
export default function TimeSlotTEST() {
  const [hourStart, setHourStart] = useState(9);
  const [hourEnd, setHourEnd] = useState(12);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changeHandleStatus, setChangeHandleStatus] = useState(false);
  const [pickedTimeSlots, setPickedTimeSlots] = useState([]);

  const dates = [
    {
      id: 145,
      time_start: "2023-02-06T09:00:00+01:00",
      time_end: "2023-02-06T09:30:00+01:00",
      is_complete: false,
      is_accepted: true,
      is_selected: false,
      is_valid: true,
      members: [8],
    },
    {
      id: 146,
      time_start: "2023-02-06T09:30:00+01:00",
      time_end: "2023-02-06T10:00:00+01:00",
      is_complete: false,
      is_accepted: true,
      is_selected: false,
      is_valid: true,
      members: [8],
    },
    {
      id: 147,
      time_start: "2023-02-06T10:00:00+01:00",
      time_end: "2023-02-06T10:30:00+01:00",
      is_complete: false,
      is_accepted: true,
      is_selected: false,
      is_valid: true,
      members: [],
    },
    {
      id: 151,
      time_start: "2023-02-06T12:00:00+01:00",
      time_end: "2023-02-06T12:30:00+01:00",
      is_complete: false,
      is_accepted: false,
      is_selected: false,
      is_valid: true,
      members: [],
    },
  ];
  // useEffect(() => {
  //   const fetch = async () => {
  //     const { data } = await axios.get(
  //       process.env.REACT_APP_API_COORDINATOR_TIME_SLOT
  //     );
  //     setHourStart(new Date(data[0]?.time_start).getHours());
  //     setHourEnd(new Date(data[0]?.time_end).getHours());
  //   };
  //   fetch();
  // }, []);

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

  const handle = (e) => {
    console.log("pickedTimeSlots: ", pickedTimeSlots);
    console.log("dates: ", dates);
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
        "http://localhost:3000/AVAILABLE_TIME_SLOT_PICKED",
        requestOptions
      );
      console.log("fetch data: ", data);

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
          <TimeSlotElementTEST
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
          <h1>Jeszcze nie ustalono terminów obron</h1>
        )}
      </div>
    </>
  );
}
