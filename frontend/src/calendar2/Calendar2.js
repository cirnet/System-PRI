import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import SheduleElement from './SheduleElement';
import "./style.css"
export default function Calendar2 () {
  const [events, setEvents] = useState([]);
    const [time_start, setTime_start] = useState('');
  const [time_end, setTime_end] = useState('');

  // useEffect(() => {
  //   // Fetch the events data from the API endpoint
  //   fetch('http://localhost:8000/api/commission/')
  //     .then(response => response.json())
  //     .then(data => setEvents(data));
  // }, []);

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/commission/?format=json')
            setEvents(data)
            console.log(data)

      }
        fetch()
    },[])

  // Map the events data to an array of calendar event objects
  // const calendarEvents = events.map(event => ({
  //   start: new Date(event.time_start).toISOString().replace('T', ' ').split('.')[0],
  //   end: new Date(event.time_end).toISOString().replace('T', ' ').split('.')[0],
  //   id: event.id
  // }));

  return (
    
    <div className='container'>
      {/* {calendarEvents} */}
{events.map(e=>(
    <SheduleElement
    key={e.id}
    id={e.id}
    person={e.person}
    time_start={e.time_start}
    time_end={e.time_end}
    />))} 

    </div>
    

    
  );
};
