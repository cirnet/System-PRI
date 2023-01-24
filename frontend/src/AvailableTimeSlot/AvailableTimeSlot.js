import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./style.css";
import swal from "sweetalert";

export default function AvailableTimeSlot() {
  const [time_start_min, setTime_start_min] = useState("");
  const [time_end_max, setTime_end_max] = useState("");
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");
  const [person, setPerson] = useState("");
  const [content, setContent] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:8000/api/user/");
      console.log(data);
      setOptions(data);
    };
    fetch();
  }, []);

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
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      // credentials: "include",
      body: JSON.stringify({
        time_start,
        time_end,
      }),
    };
    fetch("http://localhost:8000/api/available-time-slot/", requestOptions)
      .then((response) => response.json())
      .then(
        swal({
          text: "Dodano twoj zakres dostepności",
          icon: "success",
          buttons: false,
          timer: 1000,
        })
      );
  };

  //reduced only group 2
  const reducedOptions = options.reduce(function (filtered, option) {
    if (option.groups[0] === 2) {
      let someNewValue = { email: option.email, id: option.id };
      filtered.push(someNewValue);
    }
    return filtered;
  }, []);

  return (
    <>
      {/* <p>
        Formularz wybrania daty przez profesorów. Data jest OD Do wynikająca z
        tego co wybierze koordynator
      </p> */}
      <div className="Auth-form-container" onSubmit={handleSubmit}>
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Wybierz swój zakres dostępności</h3>

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
            {/* <div className="form-group mt-3">
              <label>
                Wybierz osobe:
                <select
                  className="form-control mt-1"
                  onChange={(e) => setPerson(e.target.value)}
                >
                  {reducedOptions.map((option) => (
                    <option value={option.id}>{option.email}</option>
                  ))}
                </select>
              </label>
            </div> */}

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Wyslij
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* {dataOptions.map((item=>(
        <p>{item.email} - {item.id}</p>
        )))} */}
    </>
  );
}
