import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import LoginContext from "../context/LoginContext";
import AvailableTimeSlot from "../AvailableTimeSlot/AvailableTimeSlot";
import jwt_decode from "jwt-decode";

// import Cookies from 'js-cookie';
export default function Profile() {
 const [user,setUser] = useState('')
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      // credentials: "include", //to wystarczy by wyslac cookies
    };
    const fetch2 = async()=>{
      const data= await fetch("http://localhost:8000/dj-rest-auth/user", requestOptions)
      
      .then((response) => response.json())
      setUser(data.email.split('@')[0])
      console.log(user)
    }
    fetch2()
  }, []);

  return (
    <>
    
    
       {user?<h1>Witaj <b> {user}!</b></h1>:''}

       <AvailableTimeSlot/>
      
    </>
  );
}
