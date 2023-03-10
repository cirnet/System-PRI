import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Team() {
  const [content, setContent] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_API_TEAM + `${id}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      setContent(data);
      console.log(data);
    };
    fetch();
  }, []);

  return (
    <div>
      <p>id: {content.id}</p>
      <p>name: {content.name}</p>
      <p>supervior: {content.supervisor}</p>
      <p>project: {content.project}</p>

      {/* <button onClick={aaa}>Delete</button> */}
    </div>
  );
}
