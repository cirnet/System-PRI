import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Calendar from "./Calendar";
import GłównyHarmonogram from "./GłównyHarmonogram";
import OrganizacjaZapisow from "./OrganizacjaZapisow";
function Tools() {
  const [state, setState] = useState(undefined);
  return (
    <>
      <div>
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
            <OrganizacjaZapisow />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Tools;
