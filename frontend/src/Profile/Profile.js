import React, { useState, useContext, useEffect } from "react";
// import LoginContext from "./Context/LoginContext";
import AvailableTimeSlot from "../AvailableTimeSlot/AvailableTimeSlot";
import AvailableTimeSlotCalendar from "../AvailableTimeSlot/CalendarTEST/TimeSlotTEST";
import Comission from "../Comission/Comission";
import CoordinatorTimeSlot from "../CoordinatorTimeSlot/CoordinatorTimeSlot";
import "./Profile.css";
import SwitchComponent from "../AvailableTimeSlot/SwitchComponent";
import Loader from "../Loader/Loader";
export default function Profile() {
  const [user, setUser] = useState("");
  const [pk, setPk] = useState("");
  let num = 0;
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
      setUser(data.email.split("@")[0]);
      setPk(data.pk);
      console.log(data.pk);
      console.log(data);
    };
    request();
  }, []);
  console.log(pk);
  return (
    <>
      <span>Dla pk=8 ustawiony tryb koordynatora dla pk=9 tryb opiekuna</span>
      {user ? (
        <h1>
          Witaj <b> {user}!</b>
        </h1>
      ) : (
        ""
      )}

      <div className="data_pick">
        {pk === 8 || pk === 9 ? <SwitchComponent /> : ""}

        <CoordinatorTimeSlot pk={pk} />
      </div>
      <br />
      <br />

      {pk === 8 ? (
        <div className="AvailableTimeSlotCalendar">
          <div className="children">
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <AvailableTimeSlotCalendar />
          </div>
        </div>
      ) : (
        ""
      )}

      {/* <div className="comissionSetting">
        <Comission />
      </div> */}
    </>
  );
}
