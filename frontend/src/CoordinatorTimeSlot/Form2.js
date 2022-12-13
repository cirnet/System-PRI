import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Form2() {
  const [time_start, setTime_start] = useState('');
  const [time_end, setTime_end] = useState('');
  const [person, setPerson] = useState('1')
  const [content, setContent] = useState([])

// const dane={
//         time_start: time_start, 
//         time_end: time_end,
//         person: person
// }



  useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/coordinator-time-slot/')
            setContent(data)
            console.log("format z backendu: ",data[0]?.time_start)
            console.log(data[0]?.time_end)
            setTime_start(new Date(data[0]?.time_start).toISOString().replace('T', ' ').split('.')[0])
            setTime_end(new Date(data[0]?.time_end).toISOString().replace('T', ' ').split('.')[0])
            
            console.log("format po formacie: ",time_start)
            console.log(time_end)

            
            
      }
        fetch()
    },[])


  const handleSubmit = (event) => {
const dateObject1 = new Date(time_start);
const dateObject2 = new Date(time_end);
const time_start2 = dateObject1.toISOString();
const time_end2 = dateObject2.toISOString();

console.log(time_start2)
console.log(time_end2)
    event.preventDefault();

    
    fetch('http://localhost:8000/api/coordinator-time-slot/', {
      method: 'POST',
      headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
      body: JSON.stringify({ 
        time_start: time_start2, 
        time_end: time_end2,
        person: person
      })
      
    }).then((res) => {
         console.log(`Response: ${res}`)
     })
  };

  return (
    <>

  
    <form onSubmit={handleSubmit}>

      <p>{time_start}  
      {time_end}</p>
      
      <label>
        Data od:
        <input type="datetime-local" value={time_start} onChange={(event) => setTime_start(event.target.value)} />
      </label>
      <label>
        Data do:
        <input type="datetime-local"  value={time_end} onChange={(event) => setTime_end(event.target.value)} />
      </label>
      <label>
      Person:
      <input type="string" value={person} onChange={(e) => setPerson(e.target.value)}/>
      </label>
      <input type="submit" value="Wyślij" />
    </form>
    
    
    
    </>
    
  );
}