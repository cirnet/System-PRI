import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function TeamAdd() {
  const [name, setName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [project, setProject] = useState("");

  const handle = (e) => {
    e.preventDefault();
    console.log(name, supervisor, project);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        supervisor,
        project,
      }),
    };
    fetch("http://localhost:8000/api/team/", requestOptions).then((response) =>
      response.json()
    );
    window.location.reload(false);
  };

  return (
    <form onSubmit={handle}>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Supervisor:{" "}
        <input
          type="text"
          value={supervisor}
          onChange={(e) => setSupervisor(e.target.value)}
        />
      </label>
      <br />
      <label>
        Project:{" "}
        <input
          type="text"
          value={project}
          onChange={(e) => setProject(e.target.value)}
        />
      </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  );
}
