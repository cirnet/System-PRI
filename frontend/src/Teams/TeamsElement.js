import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function TeamsElement({ name, id, supervisor, project }) {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const  {data}  = await axios.get(
        "http://localhost:8000/api/project/"
      );
      
      setProjects(data);
      
    };
    fetch();
  }, []);

   useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/user/"
      );
     
      setUsers(data);
    };
    fetch();
  }, []);

  async function deleteFetch(id) {
    const request = await fetch(`http://localhost:8000/api/team/${id}/`, {
      method: "DELETE",
    });
  }

  const deleteTeam = (id) => {
    console.log(id);
    deleteFetch(id);
    // const filtr = [...projects].filter(team => team.id !==id)
    // setProjects(filtr)
    window.location.reload(false);
  };


  const emailToDisplay = users
  .filter(item => item.id === supervisor)
  .map(user => user.email);

   const projectToDisplay = projects
  .filter(item => item.id === project)
  .map(project => project.topic);

console.log("projectToDisplay" ,projectToDisplay)

  return (
    <>
      <div className="teams">
        <div className="details" onClick={() => navigate(`/teams/${id}`)}>
          {/* <span>{id? `${id}`:" __________"}</span> */}
          <span>
            nazwa zespolu <b>{name.length ? `${name}` : " __________"}</b>
          </span>
          <span>opiekun <b>{emailToDisplay.length ? `${emailToDisplay}` : " __________"}</b></span>
          <span>project <b>{projectToDisplay.length? projectToDisplay : " __________"}</b></span>
        </div>
        <button className="delete_button" onClick={() => deleteTeam(id)}>
          DELETE
        </button>
      </div>
    </>
  );
}
