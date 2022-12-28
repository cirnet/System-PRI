import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function AvailableTimeSlot() {
  const [time_start_min, setTime_start_min] = useState("");
  const [time_end_max, setTime_end_max] = useState("");
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
      setTime_start_min(
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
      // console.log("format po formacie: ",time_start)
      // console.log(time_end)
    };
    fetch();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(time_start, time_end, person);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time_start,
        time_end,
        person,
      }),
    };
    fetch(
      "http://localhost:8000/api/available-time-slot/",
      requestOptions
    ).then((response) => response.json());
  };
  const options = [
    {
      label: "jankow1@st.amu.edu.pl",
      value: "1",
    },
    {
      label: "marnow1@st.amu.edu.pl",
      value: "2",
    },
    {
      label: "michal.hanckowiak@amu.edu.pl",
      value: "3",
    },
    {
      label: "Pinemicwis1@st.amu.edu.pl",
      value: "4",
    },
  ];

  return (
    <>
      <p>
        Formularz wybrania daty przez profesorów. Data jest OD Do wynikająca z
        tego co wybierze koordynator
      </p>
      <div className="Auth-form-container" onSubmit={handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Available Time Slot</h3>

            <div className="form-group mt-3">
              <label>
                Data od:
                <input
                  type="datetime-local"
                  className="form-control mt-1"
                  value={time_start}
                  placeholder={time_start_min}
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
            <div className="form-group mt-3">
              <label>
                Wybierz osobe:
                <select
                  className="form-control mt-1"
                  onChange={(e) => setPerson(e.target.value)}
                >
                  {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Wyslij
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
