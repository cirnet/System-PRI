import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function ProjectGradeCardsTEST() {
  const [pickedTeam, setPickedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [ifPost, setifPost] = useState(true);
  const [idObjectTeam, setIdObjectTeam] = useState("");
  console.log("idObjectTeam: ", idObjectTeam);
  // const [question, setQuestion] = useState([
  //   { criteria: "", first: "", second: "" },
  //   { criteria: "", first: "", second: "" },
  //   { criteria: "", first: "", second: "" },
  //   { criteria: "", first: "", second: "" },
  // ]);
  // const [howMuch, setHowMuch] = useState(3);
  const questions = [
    { id: 1, value: "Czy przeprowadzono i udokumentowano testy?" },
    { id: 2, value: "Czy przygotowano prototyp projektu zgodnie ze sztuką?" },
    { id: 3, value: "Czy projekt jest użyteczny dla grupy docelowej" },
  ];
  const generateObjecs = questions.map((e) => ({
    criteria: "",
    first: "",
    second: "",
  }));
  const [question, setQuestion] = useState(generateObjecs);
  console.log("test: ", generateObjecs);
  console.log("pickedTeam: ", pickedTeam);
  console.log("ifPost: ", ifPost);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      pickedTeam,
      question,
    };
    console.log(formData);
    if (ifPost) {
      console.log("post");
      const response = await fetch("http://localhost:3000/PPPPP", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      swal({
        text: "Dodano punkty",
        icon: "success",
        buttons: false,
        timer: 1000,
      });
      const data = await response.json();
      console.log(data);
    } else {
      console.log("put");
      const response = await fetch(
        `http://localhost:3000/PPPPP/${idObjectTeam}`,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      swal({
        text: "Zmodyfikowano punkty",
        icon: "success",
        buttons: false,
        timer: 1000,
      });
      const data = await response.json();
      console.log(data);
    }
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    // window.location.reload();
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
  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/PPPPP/?pickedTeam=${pickedTeam}`
      );
      console.log("pobranie danych z picketeam: ", data);
      if (data.length === 0) {
        console.log("pusto");
        setifPost(true);
        setQuestion(generateObjecs);
      } else {
        setifPost(false);
        setQuestion(data[0].question);
        setIdObjectTeam(data[0].id);
      }

      // setQuestion(data[0].question);
    };
    request();
  }, [pickedTeam]);

  const readuceTeams = teams.reduce(function (filter, option) {
    let tempValue = { id: option.id, name: option.name };
    filter.push(tempValue);
    return filter;
  }, []);

  const dane = [1, 2, 3];
  // const inputList = [];
  // for (let i = 0; i < howMuch; i++) {
  //   inputList.push(<input key={i} type="text" />);
  // }
  // const handleCountChange = (event) => {
  //   setHowMuch(event.target.value);
  // };
  return (
    <>
      {/* <div>
        <label>Enter count:</label>
        <input type="number" value={howMuch} onChange={handleCountChange} />
        {inputList}
      </div> */}

      <form method="POST" onSubmit={handleSubmit}>
        <div className="flexinputteam">
          <select
            className="form-control mt-1 center-option-text"
            onChange={(e) => {
              setPickedTeam(e.target.value);
            }}
          >
            <option value="">
              -- Wybierz zespoł, któremu zmienisz punkty --
            </option>
            {readuceTeams.map((item) => (
              <option value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
        <br />
        <div className="gradeForm">
          {dane.map((item, index) => (
            <>
              <div key={index} className="gradeField">
                <select
                  name="pytanie"
                  value={question[index].criteria}
                  onChange={(e) =>
                    setQuestion([
                      ...question.slice(0, index),
                      {
                        ...question[index],
                        criteria: e.target.value,
                      },
                      ...question.slice(index + 1),
                    ])
                  }
                >
                  <option value="">-- Wybierz pytanie--</option>
                  {questions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.value}
                    </option>
                  ))}
                </select>
                <div className="inputs">
                  <input
                    type="number"
                    className="point1Input"
                    value={question[index].first}
                    onChange={(e) =>
                      setQuestion([
                        ...question.slice(0, index),
                        {
                          ...question[index],
                          first: e.target.value,
                        },
                        ...question.slice(index + 1),
                      ])
                    }
                  />

                  <input
                    type="number"
                    value={question[index].second}
                    onChange={(e) =>
                      setQuestion([
                        ...question.slice(0, index),
                        {
                          ...question[index],
                          second: e.target.value,
                        },
                        ...question.slice(index + 1),
                      ])
                    }
                  />
                </div>
              </div>
            </>
          ))}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
