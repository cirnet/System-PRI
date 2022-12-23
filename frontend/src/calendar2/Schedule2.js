import React, { useState } from 'react';
import "./style.css"
export default function Schedule2() {
  // Create an empty schedule
  const [schedule, setSchedule] = useState({});
  const data=[
    {
        "id": 1,
        "time_start": "2022-12-17T06:21:00+01:00",
        "time_end": "2022-12-17T06:51:00+01:00"
    },
    {
        "id": 2,
        "time_start": "2022-12-14T06:21:00+01:00",
        "time_end": "2022-12-14T06:51:00+01:00"
    },
    {
        "id": 3,
        "time_start": "2022-12-15T06:21:00+01:00",
        "time_end": "2022-12-15T06:51:00+01:00"
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
  for (const item of data) {
    // Parse the start and end times
    const startTime = new Date(item.time_start);
    const endTime = new Date(item.time_end);

    // Get the day of the week and hour for the start time
    const dayOfWeek = startTime.toLocaleString('default', { weekday: 'long' });
    const hour = startTime.getHours();

    // If the day of the week is not in the schedule, add it with an empty object
    if (!schedule[dayOfWeek]) {
      schedule[dayOfWeek] = {};
    }

    // If the hour is not in the schedule for the day, add it with an empty list
    if (!schedule[dayOfWeek][hour]) {
      schedule[dayOfWeek][hour] = [];
    }

    // Add the item to the schedule for the corresponding day of the week and hour
    schedule[dayOfWeek][hour].push(item);
  }

  return (
    // <div className='containerDay'>
    //   {Object.entries(schedule).map(([day, hours]) => (
    //     <div key={day}>
    //       <h3>{day}</h3>
    //       {Object.entries(hours).map(([hour, items]) => (
    //         <div key={hour}>
    //           <h4>{hour}:00</h4>
    //           <ul>
    //             {items.map(item => (
    //               <li key={item.id}>{item.id}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       ))}
    //     </div>
    //   ))}
    // </div>

        <div className='containerDay'>
      {Object.entries(schedule).map(([day, hours]) => (
        <div key={day}>
          <h3>{day}</h3>
          {Object.entries(hours).map(([hour, items]) => (
            <div key={hour}>
              <h4>{hour}:00</h4>
              <ul>
                {items.map(item => (
                  <li key={item.id}>{item.id}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
