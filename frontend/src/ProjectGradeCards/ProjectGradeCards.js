import axios from "axios";
import { useEffect, useState } from "react";
import "./ProjectGradeCards.css";
export default function ProjectGradeCards() {
  const [points, setPoints] = useState([]);
  const [projectGradeCards, setProjectGradeCards] = useState({});
  const [teams, setTeams] = useState([]);
  const [pickedTeam, setPickedTeam] = useState();

  const [grades, setGrades] = useState({
    question0: { points_1: "", points_2: "" },
  });

  const handleGradeChange = (event) => {
    const { name, value } = event.target;
    const [question, semester] = name.split("-");
    setGrades((prevGrades) => ({
      ...prevGrades,
      [question]: { ...prevGrades[question], [semester]: parseInt(value) },
    }));
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(process.env.REACT_APP_API_TEAM, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setTeams(data);
      // console.log(data);
    };
    fetch();
  }, []);

  const readuceTeams = teams.reduce(function (filter, option) {
    let tempValue = { id: option.id, name: option.name };
    filter.push(tempValue);
    return filter;
  }, []);

  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/PPPPP/?pickedTeam=${pickedTeam}`
      );
      setPoints(data[0]?.grade);
    };
    request();
  }, [pickedTeam]);

  const dane = [
    "Czy przeprowadzono i udokumentowano testy?",
    "Czy przygotowano prototyp projektu zgodnie ze sztuką?",
    "Czy projekt jest użyteczny dla grupy docelowej; Czy spełnia kryteria użyteczności i został przetestowany pod tym kątem?",
    "Czy projekt został wdrożony?",
    "Czy projekt dobrze rokuje?",
    "Czy wdrożone zostały wszystkie zakładane na dany semestr funkcjonalności (ocenia prowadzący)?",
    "Spełnienie kryteriów akceptacji",
    "Dostęp do produktu projektu dla komisji do testów dwa tygodnie przed prezentacją",
    "Brak krytycznych błędów w tym: bezpieczeństwa oraz uniemożliwiających korzystanie z systemu",
    "Dostęp do produktu projektu dla komisji do testów podczas prezentacji * (obowiązkowe w II sem)",
    "Czy złożoność produktu projektu odpowiada wielkości zespołu? Czy jakość produktu odpowiada wielkości projektu DevOps",
    "Zarządzanie kodem źródłowym",
    "Metodyka pracy i narzędzia ją wspierające",
    "Zarządzanie ryzykiem i zakresem projektu",
    "Kontakt z klientem/grupą docelową, testy w grupie docelowej",
    "Podział prac w semestrze",
    "Licencja i podział praw własności",
    "Dokumentacja deweloperska",
    "Dokumentacja dla klienta/grupy docelowej/użytkownika",
    "Dokument wymagań projektowych",
    "Odpowiedzi na pytania komisji",
    "Demonstracja systemu",
    "Czy prezentacja była przeprowadzona zgodnie ze sztuką?",
    "Systematyczność pracy w semestrze",
    "Dokument wizji projektu",
    "Czy prezentacja zawierała wszystkie wymagane treści",
  ];

  //muszą byc points_1 oraz points_2
  const date = {
    pickedTeam: pickedTeam,
    grade: grades,
  };

  const handle = (e) => {
    axios.post("http://localhost:3000/PPPPP", date);
    e.preventdefault();
  };
  return (
    <>
      <h1>ProjectGradeCards</h1>
      <br />
      <div>
        <select
          className="form-control mt-1 center-option-text"
          onChange={(e) => {
            setPickedTeam(e.target.value);
          }}
        >
          <option value="">Wybierz zespoł </option>
          {readuceTeams.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="gradeForm">
        <form onSubmit={handle}>
          {dane.map((item, index) => (
            <>
              <div key={index} className="gradeField">
                <p>{item}</p>
                <div className="inputs">
                  <input
                    key={index + "_1"}
                    name={"question" + index + "-points_1"}
                    type="number"
                    value={points && points[`question${index}`]?.points_1}
                    onChange={handleGradeChange}
                  ></input>
                  <input
                    type="number"
                    key={index + "_2"}
                    name={"question" + index + "-points_2"}
                    value={points && points[`question${index}`]?.points_2}
                    onChange={handleGradeChange}
                  ></input>
                </div>
              </div>
            </>
          ))}
          <button>Zapisz punkty</button>
        </form>
      </div>
    </>
  );
}
