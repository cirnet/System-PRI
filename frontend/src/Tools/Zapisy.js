import { useState } from "react";
import Teams from "../Teams/Teams";
import "./style.css";
export default function Zapisy() {
  let [choice, setChoice] = useState("1");

  const change1 = () => {
    setChoice((choice = "1"));
  };
  const change2 = () => {
    setChoice((choice = "2"));
  };
  const change3 = () => {
    setChoice((choice = "3"));
  };
  const change4 = () => {
    setChoice((choice = "4"));
  };

  if (choice === "1") {
    return (
      <>
        <div className="zapisyflex">
          <div className="zapisy">
            <button onClick={change1}>Zespoły</button>
            <button onClick={change2}>Zespoły rezerwowe</button>
            <button onClick={change3}>Oferty współpracy</button>
            <button onClick={change4}>Formowanie zespołów studenckich</button>
          </div>

          <Teams />
        </div>
      </>
    );
  }

  if (choice === "2") {
    return (
      <div className="zapisy">
        <button onClick={change1}>Oferowane tematy</button>
        <button onClick={change2}>Zespoły rezerwowe</button>
        <button onClick={change3}>Oferty współpracy</button>
        <button onClick={change4}>Formowanie zespołów studenckich</button>
        Zespoły rezerwowe
      </div>
    );
  }

  if (choice === "3") {
    return (
      <div className="zapisy">
        <button onClick={change1}>Oferowane tematy</button>
        <button onClick={change2}>Zespoły rezerwowe</button>
        <button onClick={change3}>Oferty współpracy</button>
        <button onClick={change4}>Formowanie zespołów studenckich</button>
        Oferty współpracy
      </div>
    );
  }

  if (choice === "4") {
    return (
      <div className="zapisy">
        <button onClick={change1}>Oferowane tematy</button>
        <button onClick={change2}>Zespoły rezerwowe</button>
        <button onClick={change3}>Oferty współpracy</button>
        <button onClick={change4}>Formowanie zespołów studenckich</button>
        Formowanie zespołów studenckich
      </div>
    );
  }
}
