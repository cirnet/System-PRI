import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
export default function Calendar2 () {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch the events data from the API endpoint
    fetch('http://localhost:8000/api/commission/')
      .then(response => response.json())
      .then(data => setEvents(data));
  }, []);

  // Map the events data to an array of calendar event objects
  const calendarEvents = events.map(event => ({
    start: new Date(event.start_time),
    end: new Date(event.end_time),
    id: event.id
  }));

  return (
    <Calendar
      events={calendarEvents}
    />
  );
};
