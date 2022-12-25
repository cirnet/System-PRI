import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function CoordinatorTimeSlot() {
  const [time_start, setTime_start] = useState('');
  const [time_end, setTime_end] = useState('');
  const [person, setPerson] = useState('')
  const [content, setContent] = useState([])


  useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/coordinator-time-slot/')
            setContent(data)
            // console.log("format z backendu: ",data[0]?.time_start)
            // console.log(data[0]?.time_end)
            // setTime_start(new Date(data[0]?.time_start).toISOString().replace('T', ' ').split('.')[0])
            // setTime_end(new Date(data[0]?.time_end).toISOString().replace('T', ' ').split('.')[0])
            
            // console.log("format po formacie: ",time_start)
            // console.log(time_end)  
      }
        fetch()
    },[])

    const handleSubmit = e=>{
      e.preventDefault()
      console.log(time_start,time_end,person)
  
      const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            time_start,time_end,person
           })
      };
      fetch('http://localhost:8000/api/coordinator-time-slot/', requestOptions)
          .then(response => response.json())
      
  }
    

  return (
    <>

  <input type="datetime-local" id="meeting-time" name="meeting-time" value="2018-06-7T08:30" min="2018-06-07T08:00" max="2018-06-07T10:00"/>

    <form onSubmit={handleSubmit}>

      <p>{time_start}</p>
      <p>{time_end}</p>

      {/* <p>{test}</p> */}


      
      
      <label>
        Data od:
        <input type="datetime-local" value={time_start}  onChange={(event) => setTime_start(event.target.value)} />
      </label>
      <label>
        Data do:
        <input type="datetime-local"  value={time_end} onChange={(event) => setTime_end(event.target.value)} />
      </label>
      <label>
      Person:
      <input type="string" value={person} required onChange={(e) => setPerson(e.target.value)}/>
      </label>
      <input type="submit" value="Wyślij" />
    </form>
    
    
    
    </>
    
  );
}