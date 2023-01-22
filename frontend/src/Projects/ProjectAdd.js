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
    .then(
      (response) => response.json()
    )
    .then(swal({
        text: "Dodano projekt",
        icon: "success",
        buttons: false,
        timer: 1000,
      }))
    window.location.reload(false);
  };

  return (
    <form onSubmit={handle}>
      <label>
        Topic:
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </label>

      <input type="submit" value="Submit" />
    </form>
  );
}
