import CaregiversElement from "./CaregiversElement"
import { useEffect, useState } from "react";
import axios from 'axios'

export default function Caregivers(){
     const [content, setContent] = useState()

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:3000/caregivers')
            setContent(data)
            console.log(data)
      }
        fetch()
    },[1])

    return(
<div className="content">

{content ? content.map(e=>(
        <CaregiversElement 
        
        name={e.name} 
        key={e.id} 
        id={e.id}  
        />)
    ):""}

</div>
    
    )
}