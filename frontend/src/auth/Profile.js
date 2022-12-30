import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoginContext from "../context/LoginContext";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

// import Cookies from 'js-cookie';
export default function Profile() {
  const [cookies, setCookie] = useCookies();

  // const user = JSON.parse(localStorage.getItem('user'));

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("user");
  //   window.location.href = "/";
  // };

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(localStorage.getItem("accessToken")),
      },
      // credentials: "include", //to wystarczy by wyslac cookies
    };
    fetch("http://localhost:8000/dj-rest-auth/user", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* {user?<div>
 
      <p>Welcome {user.fname} {user.lname}</p>

      <img src={user.avatar} alt="avatar" width={100}></img>
      
</div>:''} */}
      <h1>Profile</h1>
    </>
  );
}
