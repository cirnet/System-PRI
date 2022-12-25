import {useState, useEffect} from "react"
import axios from "axios"
export default function AvailableTimeSlot(){

    const [content, setContent] = useState([])
  
    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/available-time-slot/')
            setContent(data)
  
            console.log(data)
      }
        fetch()
    },[])

    return(
        <span>{JSON.stringify(content)}</span>
        )

}