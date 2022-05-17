import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./Calendar";

function Tools() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState(undefined);

  const { user } = useSelector((state) => state.auth);
 

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button className="btn " onClick={() => setState(true)}>
          Organizacja Harmonogramu
        </button>
        <button className="btn " onClick={() => setState(false)}>
          Organizacja Zapisów
        </button>
          </div>
          <div>
        {state ? (
          <>
            <Calendar/>
          </>
        ) : (
          <>
            
          </>
        )}
      </div>
    </>
  );
}

export default Tools;
