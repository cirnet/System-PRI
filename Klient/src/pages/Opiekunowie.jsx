import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Opiekunowie() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const opiekunowie = [
    "Patryk Żywica",
    "Tomasz Piłka",
    "Marcin Witkowski",
    "4",
    "5",
  ];

  useEffect(() => {
    // if (!user) {
    //   navigate("/login")
    // }
    return () => {};
  }, [user, navigate]);

  return (
    <>
      <ul className="opiekunowie">
        {opiekunowie.map((opiekun, i) => (
          <li key={i}>{opiekun}</li>
        ))}
      </ul>
    </>
  );
}

export default Opiekunowie;
