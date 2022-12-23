import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import "./style.css"
import ScheduleElement from "./SheduleElement"

export default function Schedule(props) {

  const [content, setContent] = useState([])

  useEffect(()=>{
    const fetch = async()=>{
      const {data} = await axios.get('http://localhost:8000/api/commission/')
          setContent(data)
          console.log(data)
    }
      fetch()
  },[])

  // Create an empty schedule
  const schedule = {};
  // http://localhost:8000/api/commission/
// const data=[
//     {
//         "id": 1,
//         "time_start": "2022-12-12T06:00:00+01:00",
//         "time_end": "2022-12-12T06:30:00+01:00"
//     },
//     {
//         "id": 2,
//         "time_start": "2022-12-13T06:30:00+01:00",
//         "time_end": "2022-12-13T07:00:00+01:00"
//     },
//     {
//         "id": 3,
//         "time_start": "2022-12-14T07:00:00+01:00",
//         "time_end": "2022-12-14T07:30:00+01:00"
//     },
//     {
//         "id": 4,
//         "time_start": "2022-12-16T06:21:00+01:00",
//         "time_end": "2022-12-16T06:51:00+01:00"
//     },
//     {
//         "id": 5,
//         "time_start": "2022-12-15T06:21:00+01:00",
//         "time_end": "2022-12-15T06:51:00+01:00"
//     },
//     {
//         "id": 6,
//         "time_start": "2022-12-16T06:21:00+01:00",
//         "time_end": "2022-12-16T06:51:00+01:00"
//     },
    
// ]
  // Loop through each item in the data
  content.forEach(item => {
    // Parse the start and end times
    const startTime = moment(item.time_start);
    const endTime = moment(item.time_end);

    // Get the day of the week for the start time
    const dayOfWeek = startTime.format('dddd');
    const nowadata = new Date(startTime)
    const dayOfWeek2 = nowadata.toLocaleDateString()

    // If the day of the week is not in the schedule, add it with an empty list
    if (!schedule[dayOfWeek]) {
      schedule[dayOfWeek] = [];
    }

    // Add the item to the schedule for the corresponding day of the week
    schedule[dayOfWeek].push(item);
  });

  // Create a list of days and their items to render in the component
  // const days = Object.keys(schedule).map(day => (
  //   <div key={day}>
  //     <h3>{day}</h3>
  //     <ul>
  //       {schedule[day].map(item => (
  //         <li key={item.id}>
  //           {item.time_start} - {item.time_end}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // ));
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
            time_start={item.time_start}
            time_end={item.time_end}
            />
          </div>
        ))}
      
    </div>
  ));

  return (
    <>
    <div className='container'>
      
      {days}
    
    </div>
    
    
    </>
    
  );
}
