import { height, padding } from "@mui/system";
import React, { useState } from "react";


import { useNavigate } from "react-router-dom";

export default function TeamsElement({name, id,supervisor,project}){
    const navigate = useNavigate()
    const style={
        width:"100%",
        height: "100px",
        border: "1px solid gray",
        display:"flex",
        flexDirection: "column",
        margin:" 10px",
        padding : "10px",
        borderRadius: "10px",
        cursor: "pointer"
    }
return(
    <>


<div style={style} onClick={()=>navigate(`/teams/${id}`)}>
        {/* <span>{id? `${id}`:" __________"}</span> */}
        <span>nazwa zespolu <b>{name? `${name}`:" __________"}</b></span>
        <span>supervior {supervisor? `${supervisor}`:" __________"}</span>
        <span>project {project? `${project}`:" __________"}</span>
        
        
       
    </div>
    </>
)

}
