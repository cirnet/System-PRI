import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import "./Projects.css";
export default function ProjectAdd() {
  const [topic, setTopic] = useState("");

  const handle = (e) => {
    e.preventDefault();
    console.log(topic);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        topic,
      }),
    };
    fetch(process.env.REACT_APP_API_PROJECT, requestOptions)
      .then((response) => response.json())
      .then(
        swal({
          text: "Dodano projekt",
          icon: "success",
          buttons: false,
          timer: 1000,
        })
      );
    window.location.reload(false);
  };

  return (
    <form className="project_form" onSubmit={handle}>
      <h3>Dodaj projekt</h3>

      <input
        className="form-control mt-1 center-option-text"
        placeholder="Nazwa projektu"
        type="text"
        value={topic}
        required
        onChange={(e) => setTopic(e.target.value)}
      />

      <button type="submit" className="btn btn-primary">
        Wyślij
      </button>
    </form>
  );
}
