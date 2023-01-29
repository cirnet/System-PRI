import React, { useState, useContext, useEffect } from "react";
// import LoginContext from "./Context/LoginContext";
import AvailableTimeSlot from "../AvailableTimeSlot/AvailableTimeSlot";
import Comission from "../Comission/Comission";
import "./Profile.css";
import Loader from "../Loader/Loader";
export default function Profile() {
  const [user, setUser] = useState("");
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
        "http://localhost:8000/dj-rest-auth/user",
        requestOptions
      ).then((response) => response.json());
      setUser(data.email.split("@")[0]);
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

      <AvailableTimeSlot />
      {/* <div className="comissionSetting">
        <Comission />
      </div> */}
    </>
  );
}
