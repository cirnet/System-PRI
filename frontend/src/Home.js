 import React, {useState} from "react"
 import Profile from "./Profile"

 function Home(){

let [choice, setChoice] = useState("ogolne")

//   const changeChoice = () => {
//     setChoice(choice === "ogolne" ? "projekt" : "ogolne")
//   }

const changeChoiceProjekt=()=>{
    setChoice(choice="projekt")
}
const changeChoiceOgolne=()=>{
    setChoice(choice="ogolne")
}

    

    if (choice==="ogolne"){
        return(

            
        <div>
            
            <button onClick={changeChoiceProjekt}>projekt</button>
            <button onClick={changeChoiceOgolne}>ogolne</button>
            <Profile/>
        </div>
    )
    }

if (choice==="projekt"){
    return(
        
        <div>
            <button onClick={changeChoiceProjekt}>projekt</button>
            <button onClick={changeChoiceOgolne}>ogolne</button>
            Moj projekt
        </div>
    )
    
    }

    
 }
export default Home