import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "./style.css"
import ScheduleElement from "./SheduleElement"

export default function Schedule(props) {

  const [content, setContent] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(()=>{
    const fetch = async()=>{
      const {data} = await axios.get('http://localhost:8000/api/commission/')
          setContent(data)

          console.log(data)
          setLoader(true)
    }
      fetch()
  },[])

  const schedule = {};

  content.forEach(item => {

    const startTime = moment(item.time_start);

    const dayOfWeek = startTime.format('dddd');

    if (!schedule[dayOfWeek]) {
      schedule[dayOfWeek] = [];
    }

    schedule[dayOfWeek].push(item);
  });


    const days = Object.keys(schedule).map(day=> (
    <div key={day} className="day">
      <h3>{day}</h3>

      {schedule[day].slice(0,1).map(item=>(
        <h6 key={item}>
          {new Date(item.time_start).toLocaleDateString()}
          </h6>
      ))}


        {schedule[day].map(item => (
          <div key={item.id}>
            <ScheduleElement
            id={item.id}
            // person={item.person}
            is_complete={item.is_complete}
            time_start={item.time_start}
            time_end={item.time_end}
            />
          </div>
        ))}
      
    </div>
  ));

// if(content.length===0){
//   return (
//     <div className='container'>
      
//     <h1>Jeszcze nie ustalono terminów obron</h1>
//     </div>
//   );
// }


  return (
    <>
    {/* {JSON.stringify(content)} */}
    
    <div className='container'>

      {content.length===0?
      <span class="loader"></span>:
      loader?
      days:
      <h1>Jeszcze nie ustalono terminów obron</h1>
      }
     
      
    </div>
    </>
  );
}
