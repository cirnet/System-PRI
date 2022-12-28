import { useState, useEffect } from "react";

export default function TeamEdit() {
  const [name, setName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [project, setProject] = useState("");
  const { id } = useParams();

  const deleteTeam = () => {
    fetch(`http://localhost:8000/api/team/${id}`, {
      method: "delete",
    });
  };

  const editTeam = () => {
    fetch(`http://localhost:8000/api/team/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        supervisor,
        project,
      }),
    });
  };
  const handle = (e) => {
    e.preventDefault();
    // console.log(name, supervisor, project)

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
      <button onClick={deleteTeam}>Delete</button>
    </form>
  );
}
