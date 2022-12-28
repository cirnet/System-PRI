import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Project() {
  const [content, setContent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/project/${id}/`
      );
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <p>id: {content.id}</p>
      <p>topic: {content.topic}</p>

      {/* <button onClick={aaa}>Delete</button> */}
    </div>
  );
}
