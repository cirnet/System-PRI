 import React, {useState} from "react"
import Harmonogram from "./Harmonogram"
import Zapisy from "./Zapisy"
import Schedule from "../calendar2/Schedule"

export default function Tools(){
    let [choice, setChoice] = useState("harmo")

const changeChoiceHarmo=()=>{
    setChoice(choice="harmo")
}
const changeChoiceZapisy=()=>{
    setChoice(choice="zapisy")
}

    

    if (choice==="harmo"){
        return(

            
        <div>
            
            <button onClick={changeChoiceHarmo} >Organizacja harmonogramu</button>
            <button onClick={changeChoiceZapisy}>Organizacja zapisów</button>
            <Schedule/>
        </div>
    )
    }

if (choice==="zapisy"){
    return(
        
        <div>
            <button onClick={changeChoiceHarmo}>Organizacja harmonogramu</button>
            <button onClick={changeChoiceZapisy}>Organizacja zapisów</button>
            <Zapisy/>
        </div>
    )
    
    }
}