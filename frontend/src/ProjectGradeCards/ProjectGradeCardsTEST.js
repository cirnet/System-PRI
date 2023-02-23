import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
export default function ProjectGradeCardsTEST() {
  const [project, setProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [ifPost, setifPost] = useState(true);
  const [idObjectProject, setIdObjectProject] = useState("");
  const [questionsFetch, setQuestionsFetch] = useState([]);
  const [questions, setQuestions] = useState([
    1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30,
  ]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/api/evaluation-criteria/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      setQuestions(data);
      console.log(data);
      console.log("questions w useeffect: ", questions);
    };
    fetch();
  }, []);

  const generateObjecs = questions.map((e) => ({
    criteria: "",
    points_1: "",
    points_2: "",
  }));

  const [grades, setGrades] = useState(generateObjecs);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      project: { id: project },
      grades,
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
        `http://localhost:3000/PPPPP/${idObjectProject}`,
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
      const { data } = await axios.get(process.env.REACT_APP_API_PROJECT, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      setProjects(data);
      console.log(data);
    };
    fetch();
  }, []);
  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get(
        `http://localhost:3000/PPPPP/?project.id=${project}`
      );
      console.log("pobranie danych z picketeam: ", data);
      if (data.length === 0) {
        console.log("pusto");
        setifPost(true);
        setGrades(generateObjecs);
      } else {
        setifPost(false);
        setGrades(data[0].grades);
        setIdObjectProject(data[0].id);
      }

      // setQuestion(data[0].question);
    };
    request();
  }, [project]);

  const readuceProjects = projects.reduce(function (filter, option) {
    let tempValue = { id: option.id, topic: option.topic };
    filter.push(tempValue);
    return filter;
  }, []);
  // const dane = [1, 1, 1];
  const dane = [
    1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30,
  ];
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
              setProject(e.target.value);
            }}
          >
            <option value="">
              -- Wybierz zespoł, któremu zmienisz punkty --
            </option>
            {readuceProjects.map((item) => (
              <option value={item.id}>{item.topic}</option>
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
                  value={grades[index].criteria}
                  onChange={(e) =>
                    setGrades([
                      ...grades.slice(0, index),
                      {
                        ...grades[index],
                        criteria: e.target.value,
                      },
                      ...grades.slice(index + 1),
                    ])
                  }
                >
                  <option value="">-- Wybierz pytanie--</option>
                  {questions.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="inputs">
                  <input
                    type="number"
                    className="point1Input"
                    value={grades[index].points_1}
                    onChange={(e) =>
                      setGrades([
                        ...grades.slice(0, index),
                        {
                          ...grades[index],
                          points_1: e.target.value,
                        },
                        ...grades.slice(index + 1),
                      ])
                    }
                  />

                  <input
                    type="number"
                    value={grades[index].points_2}
                    onChange={(e) =>
                      setGrades([
                        ...grades.slice(0, index),
                        {
                          ...grades[index],
                          points_2: e.target.value,
                        },
                        ...grades.slice(index + 1),
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
