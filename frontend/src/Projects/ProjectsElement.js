import React, { useState } from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";

export default function ProjectsElement({ topic, id }) {
  const navigate = useNavigate();

  async function deleteFetch(id) {
    const request = await fetch(process.env.REACT_APP_API_PROJECT + `${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
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
