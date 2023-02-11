import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import NavHeader from "../NavHeader/NavHeader";
import Footer from "../Footer/Footer";
import Teams from "../Teams/Teams";
import "./App.css";
import AvailableTimeSlot from "../AvailableTimeSlot/AvailableTimeSlot";
import Signin from "../Auth/Sigin";
import Profile from "../Profile/Profile";
import TimeSlot from "../AvailableTimeSlot/Calendar/TimeSlot";
import Comission from "../Comission/Comission";
import CoordinatorTimeSlot from "../CoordinatorTimeSlot/CoordinatorTimeSlot";
import Schedule from "../Schedule/Schedule";
import ScheduleDescription from "../Schedule/ScheduleDescription";
import Team from "../Teams/Team";
import TeamAdd from "../Teams/TeamAdd";
import Error404 from "../Error404";
import Project from "../Projects/Project";
import Projects from "../Projects/Projects";
import ProjectAdd from "../Projects/ProjectAdd";
import TimeSlotTEST from "../AvailableTimeSlot/CalendarTEST/TimeSlotTEST";
// import { LoginContext } from "./context/LoginContext";
function App() {
  // const [usertest, setUsertest] = useState('')
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Signin />;
  }

  return (
    <BrowserRouter>
      <NavHeader />

      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/caregivers" element={<Caregivers/>} /> */}
          {/* <Route path='/login' element={<Login setToken={setToken} />}/> */}
          <Route path="/teams" element={<Teams />} />
          <Route path="/teamadd" element={<TeamAdd />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectadd" element={<ProjectAdd />} />
          <Route path="/projects/:id" element={<Project />} />

          {/* <Route path="/:id" element={<Tools />} /> */}
          {/* <Route path="/:id/:id" element={<Home />} /> */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Profile />} />
          <Route path="/timeslot" element={<TimeSlot />} />
          <Route path="/timeslotTEST" element={<TimeSlotTEST />} />
          <Route path="/comission" element={<Comission />} />
          <Route path="/availableTimeSlot" element={<AvailableTimeSlot />} />
          <Route
            path="/coordinatorTimeSlot"
            element={<CoordinatorTimeSlot />}
          />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/schedule/:id" element={<ScheduleDescription />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}
export default App;
