import React, { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function ProjectsElement({ topic, id }) {
  const navigate = useNavigate();

  //   function readCookie(name) {
  //     var nameEQ = name + "=";
  //     var ca = document.cookie.split(";");
  //     for (var i = 0; i < ca.length; i++) {
  //       var c = ca[i];
  //       while (c.charAt(0) == " ") c = c.substring(1, c.length);
  //       if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  //     }
  //     return null;
  //   }
  //   var csrftoken = readCookie("csrftoken");

  //   console.log(csrftoken);

  async function deleteFetch(id) {
    const request = await fetch(`http://localhost:8000/api/project/${id}/`, {
      method: "DELETE",
      //   headers: { "X-CSRFToken": csrftoken },
    });
  }

  const deleteTeam = (id) => {
    console.log(id);
    deleteFetch(id);
    window.location.reload(false);
  };

  return (
    <>
      <div className="projects">
        <div className="details" onClick={() => navigate(`/projects/${id}`)}>
          {/* <span>{id? `${id}`:" __________"}</span> */}
          <span>
            topic <b>{topic ? `${topic}` : " __________"}</b>
          </span>
        </div>
        <button className="delete_button" onClick={() => deleteTeam(id)}>
          DELETE
        </button>
      </div>
    </>
  );
}
