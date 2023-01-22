import { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

export default function TeamAdd() {
  const [name, setName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetch = async () => {
      const  {data}  = await axios.get(
        "http://localhost:8000/api/project/"
      );
      console.log(data)
      setProjects(data);
      
    };
    fetch();
  }, []);

   useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/api/user/"
      );
      console.log(data)
      setUsers(data);
    };
    fetch();
  }, []);

  //reduced only group 2 
const supervisors = users.reduce(function(filtered, option) {
  if (option.groups[0]===2) {
     let someNewValue = { email: option.email, id: option.id }
     filtered.push(someNewValue);
  }
  return filtered;
}, []);


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
    fetch("http://localhost:8000/api/team/", requestOptions)
    .then((response) =>response.json())
    .then(swal({
        text: "Dodano team",
        icon: "success",
        buttons: false,
        timer: 1000,
      }))
    window.location.reload(false);
  };

  return (
    <>

     

    <form onSubmit={handle}>
      <label>
        Name:{" "}
        <input
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
      Project: 
                <select
                  className="form-control mt-1 center-option-text"
                  required
                  onChange={(e) => setProject(e.target.value)}
                >
                  <option value="">--------Wybierz projekt--------</option>
                  {projects.map((option) => (
                    <option value={option.id} >{option.topic}</option>
                    
                  ))}
                  
                </select>
              </label>
          <br/>
               <label>
                Supervisor: 
                <select
                  className="form-control mt-1 center-option-text"
                  required
                  onChange={(e) => setSupervisor(e.target.value)}
                >
                  <option value="">--------Wybierz opiekuna--------</option>
                  {supervisors.map((option) => (
                    <option value={option.id} >{option.email}</option>
                    
                  ))}
                  
                </select>
              </label>
      <br />
      <input type="submit" value="Submit" />
    </form>
    </>
  );
}
