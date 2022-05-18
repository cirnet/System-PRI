import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./Calendar";
import OrganizacjaZapisów from "./OrganizacjaZapisów";
function Tools() {
  const [state, setState] = useState(undefined);
  return (
    <>
      <div className="header">
        <button className="btn " onClick={() => setState(true)}>
          Organizacja Harmonogramu
        </button>
        <button className="btn " onClick={() => setState(false)}>
          Organizacja Zapisów
        </button>
      </div>
      <div>
        {state === true ? (
          <>
            <Calendar />
          </>
        ) : state === false ? (
          <>
            <OrganizacjaZapisów />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Tools;
