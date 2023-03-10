import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from "react";
import NavHeader from "../NavHeader/NavHeader";
import Footer from "../Footer/Footer";
import Teams from "../Teams/Teams";
import "./App.css";
import FormAvailableTimeSlot from "../AvailableTimeSlot/FormAvailableTimeSlot";
import Signin from "../Auth/Sigin";
import Profile from "../Profile/Profile";
import CalendarTimeSlot from "../AvailableTimeSlot/Calendar/CalendarTimeSlot";
import Comission from "../Comission/Comission";
import CoordinatorTimeSlot from "../CoordinatorTimeSlot/CoordinatorTimeSlot";
import Schedule from "../Schedule/Schedule";
import ScheduleDescription from "../Schedule/ScheduleDescription";
import DefenseAdd from "../Schedule/DefenseAdd/DefenseAdd";
import Team from "../Teams/Team";
import TeamAdd from "../Teams/TeamAdd";
import Error404 from "../Error404/Error404";
import Project from "../Projects/Project";
import Projects from "../Projects/Projects";
import ProjectAdd from "../Projects/ProjectAdd";
import CalendarTimeSlotTEST from "../AvailableTimeSlot/CalendarTEST/CalendarTimeSlotTEST";
import ProjectGradeCards from "../ProjectGradeCards/ProjectGradeCards";
// import { LoginContext } from "./context/LoginContext";
function App() {
  // const [usertest, setUsertest] = useState('')
  const token = localStorage.getItem("accessToken");
  const [group_id, setGroup_id] = useState("");
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    };
    const request = async () => {
      const data = await fetch(
        process.env.REACT_APP_API_AUTH_USER,
        requestOptions
      ).then((response) => response.json());
      setGroup_id(data.groups[0].id);
    };
    request();
  }, []);
  if (!token) {
    return <Signin />;
  }

  return (
    <BrowserRouter>
      <NavHeader group_id={group_id} />

      <div className="App">
        <Routes>
          {group_id === 1 ? (
            <>
              <Route path="/schedule/:id" element={<ScheduleDescription />} />
              <Route path="/comission" element={<Comission />} />
              <Route
                path="/ProjectGradeCards"
                element={<ProjectGradeCards />}
              />
            </>
          ) : (
            ""
          )}
          <Route path="/teams" element={<Teams />} />
          <Route path="/teamadd" element={<TeamAdd />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectadd" element={<ProjectAdd />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Profile />} />
          {/* <Route path="/timeslot" element={<TimeSlot />} /> */}
          {/* <Route path="/timeslotTEST" element={<TimeSlotTEST />} /> */}
          {/* <Route path="/availableTimeSlot" element={<AvailableTimeSlot />} /> */}
          {/* <Route
            path="/coordinatorTimeSlot"
            element={<CoordinatorTimeSlot />}
          /> */}
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/DefenseAdd/:id" element={<DefenseAdd />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
export default App;
