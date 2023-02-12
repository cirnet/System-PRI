import { useState } from "react";
import "./ProjectGradeCards.css";
export default function ProjectGradeCards() {
  const [points, setPoints] = useState({});
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
  const handle = (e) => {
    e.preventDefault();
    console.log(points);
    console.log(e);
  };
  return (
    <>
      <h1>ProjectGradeCards</h1>
      <br />
      <div className="gradeForm">
        <form onSubmit={handle}>
          {dane.map((item, index) => (
            <div key={index} className="gradeField">
              <p>{item}</p>
              <input
                type="number"
                onChange={(e) => {
                  setPoints({
                    ...points,
                    [`question${index}`]: e.target.value,
                  });
                }}
              ></input>
            </div>
          ))}
          <button>Zapisz punkty</button>
        </form>
      </div>
    </>
  );
}
