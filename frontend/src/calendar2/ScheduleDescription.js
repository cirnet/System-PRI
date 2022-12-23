import React from "react";
import { useEffect, useState } from "react";
import axios from 'axios'
import {useParams} from "react-router-dom";

import ScheduleElement from "./SheduleElement"


export default function ScheduleDescription(){

    const {id} = useParams()

    const [content, setContent] = useState()


    useEffect(()=>{
      const fetch = async()=>{
        // const {data} = await axios.get(`http://localhost:8000/api/commission/${id}/?format=json`)
        const {data} = await axios.get(`http://localhost:8000/api/commission/10/`)

            setContent(data)
            console.log(data)
      }
        fetch()
    },[id])

    return(
        
        
    <>
{content?content.map((item) => (
        
        <p>item</p>
      )):"brak"}

    </>
        

        
    )

}