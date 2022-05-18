import { useEffect, useState, useRef } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
      <ul>
        {[...Array(5)].map((e, i) => (
          <li key={i}>
            <button>
              {list} {i + 1}
            </button>
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
        return;

      default:
        return null;
    }
  };

  return (
    <div className="content">
      <div className="header">
        <ul className="opiekunowie">
          {nav.map((nav, i) => (
            <li key={i}>
              <button onClick={() => setCurrentSection(i)}>{nav}</button>
            </li>
          ))}
        </ul>
      </div>

      {renderCurrentSelection()}
    </div>
  );
}

export default OrganizacjaZapisow;
