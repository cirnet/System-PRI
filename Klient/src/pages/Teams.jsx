import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Opiekunowie() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (!user) {
    //   navigate("/login")
    // }
    return () => {};
  }, [user, navigate]);

  return (
    <>
      <ul className="teams">
        {[...Array(5)].map((e, i) => (
          <li key={i}>Zespół {i + 1}</li>
        ))}
      </ul>
    </>
  );
}

export default Opiekunowie;
