import React, { useState, useContext, useEffect } from "react";
import AvailableTimeSlotCalendar from "../AvailableTimeSlot/CalendarTEST/TimeSlotTEST";
import Projects from "../Projects/Projects";
import Teams from "../Teams/Teams";
import CoordinatorTimeSlot from "../CoordinatorTimeSlot/CoordinatorTimeSlot";
import "./Profile.css";
import SwitchComponent from "../AvailableTimeSlot/SwitchComponent";

export default function Profile() {
  const [user, setUser] = useState("");
  const [group_id, setGroup_id] = useState("");
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
      setGroup_id(data.groups[0].id);
    };
    request();
  }, []);
  return (
    <>
      {user ? (
        <h1>
          Witaj <b> {user}!</b>
        </h1>
      ) : (
        ""
      )}

      <div className="data_pick">
        {group_id === 2 || group_id === 1 ? <SwitchComponent /> : ""}

        <CoordinatorTimeSlot group_id={group_id} />
      </div>
      <br />
      <br />

      {group_id === 1 ? (
        <div className="AvailableTimeSlotCalendar">
          <div className="children">
            <h5>Opiekun 1</h5>
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <h5>Opiekun 2</h5>
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <h5>Opiekun 3</h5>
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <h5>Opiekun 4</h5>
            <AvailableTimeSlotCalendar />
          </div>
          <div className="children">
            <h5>Opiekun 5</h5>
            <AvailableTimeSlotCalendar />
          </div>
        </div>
      ) : (
        ""
      )}

      {group_id === 3 ? (
        <div className="studentDiv">
          <Projects />
          <Teams />
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
