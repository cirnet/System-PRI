import ProjectsElement from "./ProjectsElement";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectAdd from "./ProjectAdd";
import "./Projects.css";

export default function Projects() {
  const [content, setContent] = useState();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_PROJECT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <div className="content">
      <div className="division">
        <ProjectAdd />
        <div className="projectsrender">
          {content
            ? content.map((e) => (
                <ProjectsElement topic={e.topic} id={e.id} key={e.id} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
