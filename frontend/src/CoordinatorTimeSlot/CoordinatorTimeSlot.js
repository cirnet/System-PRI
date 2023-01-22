import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function CoordinatorTimeSlot() {
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");
  const [person, setPerson] = useState("");
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/coordinator-time-slot/"
      );
      setContent(data);
      // console.log("format z backendu: ",data[0]?.time_start)
      // console.log(data[0]?.time_end)
      // setTime_start(new Date(data[0]?.time_start).toISOString().replace('T', ' ').split('.')[0])
      // setTime_end(new Date(data[0]?.time_end).toISOString().replace('T', ' ').split('.')[0])

      // console.log("format po formacie: ",time_start)
      // console.log(time_end)
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
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        time_start: a,
        time_end: b,
        // person: 1,
      }),
    };
    fetch("http://localhost:8000/api/coordinator-time-slot/", requestOptions)
      .then((response) => response.json())
      .then(console.log(requestOptions));
  };

  return (
    <>
      <p>Formularz wybrania daty przez koordynatora</p>
      <div className="Auth-form-container" onSubmit={handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Coordinator Time Slot</h3>

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
