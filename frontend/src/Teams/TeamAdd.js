import { useState, useEffect } from "react"
import axios from "axios"


export default function TeamAdd(){
    const [name, setName] = useState('')
    const [supervisor, setSupervisor] = useState('')
    const [project, setProject] = useState('')

const handle = e=>{
    e.preventDefault()
    console.log(name, supervisor, project)

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name,supervisor,project
         })
    };
    fetch('http://localhost:8000/api/team/', requestOptions)
        .then(response => response.json())
    
}



    return(
        <form onSubmit={handle}>
            <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
            <input type="text" value={supervisor} onChange={e=>setSupervisor(e.target.value)}/>
            <input type="text" value={project} onChange={e=>setProject(e.target.value)}/>
        <input type="submit" value="Submit" />
        <input type="file" />
      </form>
    )
}