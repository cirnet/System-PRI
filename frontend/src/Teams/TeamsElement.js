import React from "react";


import { useNavigate } from "react-router-dom";

export default function TeamsElement({name, id}){
    const navigate = useNavigate()
return(


<div className="card"  onClick={()=>navigate(`${id}`)}>
        <p>{name? `${name}`:" __________"}</p>
        
       
    </div>
    
)

}
