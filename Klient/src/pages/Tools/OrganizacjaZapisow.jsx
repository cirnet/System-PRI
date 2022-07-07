import { useEffect, useState, useRef } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import GotowyHarmonogram from "../GotowyHarmonogram"
function OrganizacjaZapisow() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentSection, setCurrentSection] = useState(-1);
  const [skill, setSkill] = useState("CSS to moja pasja");
  const { user } = useSelector((state) => state.auth);
  const nav = [
    "Oferowane tematy",
    "Zespoły rezerwowe",
    "Oferty współpracy",
    "Formowanie zespołów studenckich",
    "Harmonogram"
  ];
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

  const onSubmit = (e) => {
    e.preventDefault();
  };
  function renderList(list) {
    return (
      <ul className="opiekunowie-list">
        {[...Array(5)].map((e, i) => (
          <li key={i} style={{ padding: "8px" }}>
            {list} {i + 1}
          </li>
        ))}
      </ul>
    );
  }

  const renderCurrentSelection = () => {
    switch (currentSection) {
      case 0:
        return renderList("Temat");
      case 1:
        return renderList("Zespół");
      case 2:
        return renderList("Temat");
      case 3:
        return;
      case 4:
        return <div style={{marginTop: "55vh"}}><GotowyHarmonogram/></div>

      default:
        return null;
    }
  };

  return (
    <div
      className="calendar-tools"
      style={{ marginTop: "10vh", justifyContent: "left", height: "100px" }}
    >
      <ul className="opiekunowie-list ">
        {nav.map((nav, i) => (
          <li
            key={i}
            onClick={() => setCurrentSection(i)}
            style={{ padding: "8px" }}
          >
            {nav}
          </li>
        ))}
      </ul>

      {renderCurrentSelection()}
    </div>
  );
}

export default OrganizacjaZapisow;
