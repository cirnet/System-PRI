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

           <Route path="/:id" element={<Tools />} />
           {/* <Route path="/:id/:id" element={<Home />} /> */}
              <Route path="/profile" element={<Profile2 />}/>
          <Route path="/" element={<Profile2 />}/>
          <Route path="/timeslots" element={<TimeSlots />}/>
          <Route path="/comission" element={<Comission />}/>
          <Route path="/CoordinatorTimeSlot" element={<CoordinatorTimeSlot/>}/>
          <Route path="/form" element={<Form2/>}/>
         </Routes>
         </div>
         <Footer/>
       </BrowserRouter>
 
);

   }
export default App;
