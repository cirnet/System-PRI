// import "./style.css"
import { Navigate, useNavigate } from "react-router-dom"

export default function Test({
    id,
    time_start

}){

    return(
        <>
        <div>
            <span>{id}</span>
            <span>{time_start}</span>
   
            

        </div>

        </>
    )
}