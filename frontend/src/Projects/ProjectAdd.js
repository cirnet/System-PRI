import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function ProjectAdd() {
  const [topic, setTopic] = useState("");

  const handle = (e) => {
    e.preventDefault();
    console.log(topic);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        topic,
      }),
    };
    fetch("http://localhost:8000/api/project/", requestOptions)
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
    <form className="form" onSubmit={handle}>
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
