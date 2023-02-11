import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./CoordinatorTimeSlot.css";

export default function CoordinatorTimeSlot(pk) {
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");
  const [person, setPerson] = useState("");
  const [content, setContent] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_COORDINATOR_TIME_SLOT
      );
      setContent(data);
      setTime_start(
        new Date(data[0]?.time_start)
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
    const a = new Date(time_start).toISOString();
    const b = new Date(time_end).toISOString();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        time_start: a,
        time_end: b,
        person: 1,
      }),
    };
    fetch(process.env.REACT_APP_API_COORDINATOR_TIME_SLOT, requestOptions)
      .then((response) => response.json())
      .then(console.log(requestOptions))
      .then(
        swal({
          text: "Dodano zakres obron",
          icon: "success",
          buttons: false,
          timer: 1000,
        })
      );
    window.location.reload(false);
  };
  if (pk.pk !== 8) {
    return;
  } else {
    return (
      <>
        <div className="form-container" onSubmit={handleSubmit}>
          <form className="form">
            <div className="form-content">
              <h3 className="form-title">Zakres obron</h3>

              <div className="form-group mt-3">
                <label>
                  Data od:
                  <input
                    type="datetime-local"
                    className="form-control mt-1"
                    value={time_start}
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
                    onChange={(event) => setTime_end(event.target.value)}
                  />
                </label>
              </div>

              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
                  Wyślij
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}
