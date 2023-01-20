import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import {useParams} from "react-router-dom";
import moment from "moment";

export default function ScheduleDescription(){

    const {id} = useParams()

    const [content, setContent] = useState({})

  const [is_accepted, setIs_accepted] = useState("");
  const [is_complete, setIs_complete] = useState("");
  const [is_selected, setIs_selected] = useState("");
  const [is_valid, setIs_valid] = useState("");
  const [time_start, setTime_start] = useState("");
  const [time_end, setTime_end] = useState("");


const dane={
  time_start:time_start,
  time_end:time_end,
  is_accepted:is_accepted,
  is_complete:is_complete,
  is_selected:is_selected,
  is_valid:is_valid,
}

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get(`http://localhost:8000/api/commission/${id}/`)
            setContent(data)
            setIs_accepted(data.is_accepted)
            setIs_complete(data.is_complete)
            setIs_selected(data.is_selected)
            setIs_valid(data.is_valid)
      setTime_start(moment(data.time_start).format("YYYY-MM-DDTkk:mm"))
      setTime_end(moment(data.time_end).format("YYYY-MM-DDTkk:mm"))
            
            console.log(data)
      }
        fetch()
    },[])

    const handle = (e)=>{
       
        fetch(`http://localhost:8000/api/commission/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(dane),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
    }
    

    return(
        
        // <div>
        //   <p>id {content.id}</p>
        //   <p> is_accepted {content.is_accepted?"tak":"nie"}</p>
        //   <p> is_complete {content.is_complete?"tak":"nie"}</p>
        //   <p> is_selected {content.is_selected?"tak":"nie"}</p>
        //   <p> is_valid {content.is_valid?"tak":"nie"}</p>
        //   <p> members {JSON.stringify(content.members)}</p>
        //   <p> time_end {content.time_end}</p>
        //   <p>time_start {content.time_start}</p>
        // </div>
        <div>
        <span>EDYCJA</span>
          <p>id {content.id}</p>
         
          <p> members {JSON.stringify(content.members)}</p>
        

<form onSubmit={handle}>
  <label>
                Data od:
                <input
                  type="datetime-local"
                  className="form-control mt-1"
                  value={time_start}
                  onChange={(event) => setTime_start(event.target.value)}
                />
              </label><br/>
    <label>
                Data do:
                <input
                  type="datetime-local"
                  className="form-control mt-1"
                  value={time_end}
                  onChange={(event) => setTime_end(event.target.value)}
                />
              </label><br/><br/>
   <label>
      <input type="checkbox" checked={is_accepted} 
       onChange={()=>setIs_accepted(!is_accepted)} 
      />
      <span>is_accepted</span>
    </label> <br/>
    <label>
      <input type="checkbox" checked={is_complete} 
       onChange={()=>setIs_complete((prev)=>!prev)} 
      />
      <span>is_complete</span>
    </label><br/>
    <label>
      <input type="checkbox" checked={is_selected} 
      onChange={()=>setIs_selected((prev)=>!prev)} 
      />
      <span>is_selected</span>
    </label><br/>
    <label>
      <input type="checkbox" checked={is_valid} 
      onChange={()=>setIs_valid((prev)=>!prev)} 
      />
      <span>is_valid</span>
    </label>
<br/><br/>

    <button type="submit">Wyślij</button>
</form>



</div>
    
        

        
    )

}