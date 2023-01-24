import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home";
import Teams from "./Teams/Teams";
import Tools from "./Tools/Tools";
import "./App.css";
import "./auth/Login.css";
import Profile from "./Profile";
import AvailableTimeSlot from "./AvailableTimeSlot/AvailableTimeSlot";
import Signin from "./auth/Sigin2";
import Profile2 from "./auth/Profile";
import TimeSlot from "./AvailableTimeSlot/TimeSlot";
import Comission from "./Comission/Comission";
import CoordinatorTimeSlot from "./CoordinatorTimeSlot/CoordinatorTimeSlot";
import Calendar3 from "./calendar2/Calendar3";
import Schedule from "./calendar2/Schedule";
import ScheduleDescription from "./calendar2/ScheduleDescription";
import Team from "./Teams/Team";
import TeamAdd from "./Teams/TeamAdd";
import Error404 from "./Error404";
import Project from "./Projects/Project";
import Projects from "./Projects/Projects";
import ProjectAdd from "./Projects/ProjectAdd";
// import { LoginContext } from "./context/LoginContext";
function App() {
  // const [usertest, setUsertest] = useState('')
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Signin />;
  }

  return (
    <BrowserRouter>
      <Header />

      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          {/*            <Route path="/" element={<Home />} /> */}
          {/* <Route path="/caregivers" element={<Caregivers/>} /> */}
          {/*            <Route path='/login' element={<Login setToken={setToken} />}/> */}
          <Route path="/tools" element={<Tools />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/teamadd" element={<TeamAdd />} />
          <Route path="/teams/:id" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projectadd" element={<ProjectAdd />} />
          <Route path="/projects/:id" element={<Project />} />

          {/* <Route path="/:id" element={<Tools />} /> */}
          {/* <Route path="/:id/:id" element={<Home />} /> */}
          <Route path="/profile" element={<Profile2 />} />
          <Route path="/" element={<Profile2 />} />
          <Route path="/timeslot" element={<TimeSlot />} />
          <Route path="/comission" element={<Comission />} />
          <Route path="/availableTimeSlot" element={<AvailableTimeSlot />} />
          <Route
            path="/coordinatorTimeSlot"
            element={<CoordinatorTimeSlot />}
          />
          <Route path="/calendar3" element={<Calendar3 />} />
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
