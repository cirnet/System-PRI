import axios from "axios";
import { useEffect, useState } from "react";
import "./ProjectGradeCards.css";
export default function ProjectGradeCards() {
  const [points, setPoints] = useState();
  const [projectGradeCards, setProjectGradeCards] = useState({});
  const [teams, setTeams] = useState([]);
  const [pickedTeam, setPickedTeam] = useState(1);

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
      console.log("dane po fetchu: ", data);
      setPoints(data[0].points);
    };
    request();
  }, [pickedTeam]);
  console.log("pickedTeam: ", pickedTeam);
  console.log("points: ", points);
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
    grade: points,
  };

  const handle = (e) => {
    axios.post("http://localhost:3000/PPPPP", date);
    e.preventDefault();
    console.log(pickedTeam);
    console.log(points);
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
          <option value="33">Wybierz zespoł 33 </option>
          {readuceTeams.map((item) => (
            <option value={item.id}>{item.name}</option>
          ))}
        </select>
      </div>
      <div className="gradeForm">
        <form onSubmit={handle}>
          {dane.map((item, index) => (
            <div key={index} className="gradeField">
              <p>{item}</p>
              <div className="inputs">
                <input
                  type="number"
                  value={points && points[`question${index}_1`]}
                  onChange={(e) => {
                    setPoints({
                      ...points,
                      [`question${index}`]: {
                        sem: e.target.value,
                      },
                    });
                  }}
                ></input>
                <input
                  type="number"
                  value={points && points[`question${index}_2`]}
                  onChange={(e) => {
                    setPoints({
                      ...points,
                      [`question${index}`]: { sem: e.target.value },
                    });
                  }}
                ></input>
              </div>
            </div>
          ))}
          <button>Zapisz punkty</button>
        </form>
      </div>
    </>
  );
}
