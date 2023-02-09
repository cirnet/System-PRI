import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "../AvailableTimeSlot.css";
import TimeSlotElement from "./TimeSlotElement";
import "moment/locale/pl";
import swal from "sweetalert";
import Loader from "../../Loader/Loader";
export default function TimeSlot() {
  const [hourStart, setHourStart] = useState("");
  const [hourEnd, setHourEnd] = useState("");
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changeHandleStatus, setChangeHandleStatus] = useState(false);
  const [pickedTimeSlots, setPickedTimeSlots] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_COORDINATOR_TIME_SLOT
      );
      setHourStart(new Date(data[0]?.time_start).getHours());
      setHourEnd(new Date(data[0]?.time_end).getHours());
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_COMMISSION);
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
    const time_start = e.currentTarget.getAttribute("time_start");
    const time_end = e.currentTarget.getAttribute("time_end");
    setChangeHandleStatus((prev) => !prev);
    if (!reducedOptions.includes(time_start)) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        body: JSON.stringify({ time_start, time_end }),
      };

      fetch(process.env.REACT_APP_API_AVAILABLE_TIME_SLOT, requestOptions)
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
        body: JSON.stringify({ time_start, time_end }),
      };
      //id rekordu daty (+trzeba zmienic backend)
      fetch(process.env.REACT_APP_API_AVAILABLE_TIME_SLOT, requestOptions)
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
        // Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const fetch = async () => {
      const { data } = await axios(
        process.env.REACT_APP_API_AVAILABLE_TIME_SLOT,
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
      <h5>{day.charAt(0).toUpperCase() + day.slice(1)}</h5>

      {schedule[day].slice(0, 1).map((item) => (
        <h6 key={item}>{new Date(item.time_start).toLocaleDateString()}</h6>
      ))}

      {schedule[day].map((item) => (
        <div
          key={item.id}
          time_start={item.time_start}
          time_end={item.time_end}
          onClick={handle}
        >
          <TimeSlotElement
            time_start={item.time_start}
            test={reducedOptions.includes(item.time_start)}
            // time_end={item.time_end}
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
