import React from 'react';
import moment from 'moment';

export default function Schedule3() {
  // Create an empty schedule
  const schedule = {};
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
    const startTime = moment(item.time_start);
    const endTime = moment(item.time_end);

    // Get the day of the week for the start time
    const dayOfWeek = startTime.format('dddd');

    // If the day of the week is not in the schedule, add it with an empty object
    if (!schedule[dayOfWeek]) {
      schedule[dayOfWeek] = {};
    }

    // Get the hour for the start time
    const hour = startTime.format('HH:mm');

    // If the hour is not in the schedule for the current day, add it with an empty array
    if (!schedule[dayOfWeek][hour]) {
      schedule[dayOfWeek][hour] = [];
    }

    // Add the item to the schedule for the corresponding day of the week and hour
    schedule[dayOfWeek][hour].push(item);
  }

  // Create a list of days from the schedule
  const days = Object.keys(schedule);

  return (
    <div>
      {days.map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          {Object.keys(schedule[day]).map((hour) => (
            <div key={hour}>
              <p>{hour}</p>
              {schedule[day][hour].map((item) => (
                <div key={item.id}>{item.id}</div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
