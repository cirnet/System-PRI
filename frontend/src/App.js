import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

 import React from "react"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Home from "./Home";
import Teams from "./Teams/Teams";
import Tools from "./Tools/Tools";
import "./App.css"
import Caregivers from "./Caregivers/Caregivers";
import useToken from './auth/useToken';
import Login from './auth/Login';
import './auth/Login.css';
import Profile from "./Profile";

import Signin from "./auth/Sigin";
import Profile2 from "./auth/Profile";
import TimeSlots from "./timeslots/TimeSlots";
import Comission from "./Comission/Comission";
import CoordinatorTimeSlot from "./CoordinatorTimeSlot/CoordinatorTimeSlot"
import Form2 from "./CoordinatorTimeSlot/Form2"
import Calendar2 from "./calendar2/Calendar2";
import Calendar3 from "./calendar2/Calendar3";
import Schedule from "./calendar2/Schedule";
import ScheduleDescription from "./calendar2/ScheduleDescription"
import Team from "./Teams/Team";
import TeamAdd from "./Teams/TeamAdd";
import Error404 from "./Error404";
function App() {

// const { token, setToken } = useToken();

//   if(!token) {
//     return (
//       <BrowserRouter>
//     <Header logged={false}/>
      
//         <Routes>
//           <Route path='*' element={<Login setToken={setToken} />}/>
//           {/* <Route path='/login' element={<Login setToken={setToken} />}/> */}
//         </Routes>

//         <Footer/>
//       </BrowserRouter>
//     )
//   }
//    return (
//       <BrowserRouter>
//     <Header logged={true}/>
      
//       <div className='App'>
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/" element={<Home />} />
//           <Route path="/caregivers" element={<Caregivers/>} />
//           <Route path='/login' element={<Login setToken={setToken} />}/>
//           <Route path="/tools" element={<Tools />} />
//           <Route path="/teams" element={<Teams/>} />

//           <Route path="/:id" element={<Tools />} />
//           {/* <Route path="/:id/:id" element={<Home />} /> */}
          
//         </Routes>
//         </div>
//         <Footer/>
//       </BrowserRouter>
//     )


const token = localStorage.getItem('accessToken');

if(!token) {
  return <Signin />
}

return (

    <BrowserRouter>
     <Header/>
      
       <div className='App'>
         <Routes>
           <Route path="/home" element={<Home />} />
{/*            <Route path="/" element={<Home />} /> */}
           <Route path="/caregivers" element={<Caregivers/>} />
{/*            <Route path='/login' element={<Login setToken={setToken} />}/> */}
           <Route path="/tools" element={<Tools />} />
           <Route path="/teams" element={<Teams/>} />
           <Route path="/teamadd" element={<TeamAdd/>}/>
           <Route path="/teams/:id" element={<Team/>}/>

           {/* <Route path="/:id" element={<Tools />} /> */}
           {/* <Route path="/:id/:id" element={<Home />} /> */}
              <Route path="/profile" element={<Profile2 />}/>
          <Route path="/" element={<Profile2 />}/>
          <Route path="/timeslots" element={<TimeSlots />}/>
          <Route path="/comission" element={<Comission />}/>
          <Route path="/CoordinatorTimeSlot" element={<CoordinatorTimeSlot/>}/>
          <Route path="/form" element={<Form2/>}/>
          <Route path="/calendar" element={<Calendar2/>}/>
          <Route path="/calendar3" element={<Calendar3/>}/>
          <Route path="/schedule" element={<Schedule/>}/>
          <Route path="/schedule/:id" element={<ScheduleDescription/>}/>
          <Route path="*" element={<Error404/>}/>
         </Routes>
         </div>
         <Footer/>
       </BrowserRouter>
 
);

   }
export default App;
