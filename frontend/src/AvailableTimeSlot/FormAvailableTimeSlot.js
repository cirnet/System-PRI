import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./AvailableTimeSlot.css";
import swal from "sweetalert";

export default function FormAvailableTimeSlot() {
  const [time_start_min, setTime_start_min] = useState("");
  const [time_end_max, setTime_end_max] = useState("");
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");
  const [person, setPerson] = useState("");
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
      setContent(data);
      setTime_start_min(
        new Date(data[0]?.time_start)
          .toISOString()
          .replace("T", " ")
          .split(".")[0]
      );
      setTime_start(
        new Date(data[0]?.time_start)
          .toISOString()
          .replace("T", " ")
          .split(".")[0]
      );
      setTime_end_max(
        new Date(data[0]?.time_end)
          .toISOString()
          .replace("T", " ")
          .split(".")[0]
      );
      setTime_end(
        new Date(data[0]?.time_end)
          .toISOString()
          .replace("T", " ")
          .split(".")[0]
      );
    };
    fetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(time_start, time_end, person);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        time_start,
        time_end,
      }),
    };
    fetch(process.env.REACT_APP_API_AVAILABLE_TIME_SLOT, requestOptions)
      .then((response) => response.json())
      .then(
        swal({
          text: "Dodano Twoj zakres dostepności",
          icon: "success",
          buttons: false,
          timer: 1000,
        })
      );
  };

  //reduced only group 2
  // const reducedOptions = options.reduce(function (filtered, option) {
  //   if (option.groups[0] === 2) {
  //     let someNewValue = { email: option.email, id: option.id };
  //     filtered.push(someNewValue);
  //   }
  //   return filtered;
  // }, []);

  return (
    <>
      <div className="available_form-container" onSubmit={handleSubmit}>
        <form className="form">
          <div className="form-content">
            {content.length > 0 ? (
              <>
                <h3 className="form-title">Twój zakres dostępności</h3>

                <div className="form-group mt-3">
                  <label>
                    Data od:
                    <input
                      type="datetime-local"
                      className="form-control mt-1"
                      value={time_start}
                      min={time_start_min}
                      max={time_end_max}
                      onChange={(event) => setTime_start(event.target.value)}
                    />
                  </label>
                </div>
                <div className="form-group mt-3">
                  <label>
                    Data do:
                    <input
                      type="datetime-local"
                      className="form-control mt-1"
                      value={time_end}
                      min={time_start_min}
                      max={time_end_max}
                      onChange={(event) => setTime_end(event.target.value)}
                    />
                  </label>
                </div>
                <div className="d-grid gap-2 mt-3">
                  <button type="submit" className="btn btn-primary">
                    Wyslij
                  </button>
                </div>
              </>
            ) : (
              <h4 style={{ textAlign: "center" }}>
                Jeszcze nie ustalono terminów obron!
              </h4>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
