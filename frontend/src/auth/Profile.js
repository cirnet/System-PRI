import React, { useState, useContext } from "react";

import LoginContext from "../context/LoginContext";

export default function Profile() {
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const user = JSON.parse(localStorage.getItem('user'));

  // const handleMenu = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("user");
  //   window.location.href = "/";
  // };

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
