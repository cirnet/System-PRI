import React from 'react';
import moment from 'moment';
import "./style.css"
import ScheduleElement from "./SheduleElement"

export default function Schedule(props) {
  // Create an empty schedule
  const schedule = {};
  const hours=[
    "7:00",
    "7:30",
    "8:00",
    "8:30",
    "9:00",
    "9:30",
    "10:00",
    "10:30",
  ]
const data=[
    {
        "id": 1,
        "time_start": "2022-12-12T06:00:00+01:00",
        "time_end": "2022-12-12T06:30:00+01:00"
    },
    {
        "id": 2,
        "time_start": "2022-12-12T06:30:00+01:00",
        "time_end": "2022-12-12T07:00:00+01:00"
    },
    {
        "id": 3,
        "time_start": "2022-12-12T07:00:00+01:00",
        "time_end": "2022-12-12T07:30:00+01:00"
    },
    {
        "id": 4,
        "time_start": "2022-12-16T06:21:00+01:00",
        "time_end": "2022-12-16T06:51:00+01:00"
    },
    {
        "id": 5,
        "time_start": "2022-12-12T06:21:00+01:00",
        "time_end": "2022-12-12T06:51:00+01:00"
    },
    {
        "id": 6,
        "time_start": "2022-12-16T06:21:00+01:00",
        "time_end": "2022-12-16T06:51:00+01:00"
    },
    
]
  // Loop through each item in the data
  data.forEach(item => {
    // Parse the start and end times
    const startTime = moment(item.time_start);
    const endTime = moment(item.time_end);

    // Get the day of the week for the start time
    const dayOfWeek = startTime.format('dddd');

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
    const days = Object.keys(schedule).map(day => (
    <div key={day}>
      <h3>{day}</h3>
      
        {schedule[day].map(item => (
          <div key={item.id}>
            <ScheduleElement
            id={item.id}
            person={item.person}
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

      {hours.map(item=>
        <div className='hours'>{item}</div>)}
    <div className='containerDay'>
      
      {days}
    </div>
    </div>
    
    
    </>
    
  );
}
