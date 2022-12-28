import ProjectsElement from "./ProjectsElement";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Projects() {
  const [content, setContent] = useState();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("http://localhost:8000/api/project/");
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <div className="content">
      {content
        ? content.map((e) => <ProjectsElement topic={e.topic} id={e.id} />)
        : ""}
    </div>
  );
}
