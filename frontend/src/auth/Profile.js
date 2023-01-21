import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoginContext from "../context/LoginContext";


// import Cookies from 'js-cookie';
export default function Profile() {
 const [user,setUser] = useState("")
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      // credentials: "include", //to wystarczy by wyslac cookies
    };
    fetch("http://localhost:8000/dj-rest-auth/user", requestOptions)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
   { String(localStorage.getItem("user"))}
    <h1>Profil</h1>
    <br/>
       <h2>Witaj <b>{user.email}</b></h2>
      
    </>
  );
}
