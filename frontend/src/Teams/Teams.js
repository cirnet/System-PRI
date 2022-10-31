import TeamsElement from "./TeamsElement"
import { useEffect, useState } from "react";
import axios from 'axios'

export default function Teams(){

    const [content, setContent] = useState()

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:3000/teams')
            setContent(data)
            console.log(data)
      }
        fetch()
    },[1])

    return(
<div className="content">

{content ? content.map(e=>(
        <TeamsElement 
        
        name={e.name} 
        key={e.id} 
        id={e.id}  
        />)
    ):""}

</div>



    )
}