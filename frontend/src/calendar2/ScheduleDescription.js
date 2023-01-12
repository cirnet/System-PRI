import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import {useParams} from "react-router-dom";

import Test from "./Test"


export default function ScheduleDescription(){

    const {id} = useParams()

    const [content, setContent] = useState({})


    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get(`http://localhost:8000/api/commission/${id}/`)

            setContent(data)
            console.log(data)
      }
        fetch()
    },[])

    return(
        
        <div>
          <p>id {content.id}</p>
          <p> is_accepted {content.is_accepted?"tak":"nie"}</p>
          <p> is_complete {content.is_complete?"tak":"nie"}</p>
          <p> is_selected {content.is_selected?"tak":"nie"}</p>
          <p> is_valid {content.is_valid?"tak":"nie"}</p>
          <p> members {JSON.stringify(content.members)}</p>
          <p> time_end {content.time_end}</p>
          <p>time_start {content.time_start}</p>
        </div>


    
        

        
    )

}