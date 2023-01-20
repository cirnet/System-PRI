import "./style.css"
import { Navigate, useNavigate } from "react-router-dom"

export default function SheduleElement({
    id,
    person,
    time_start,
    time_end,
    is_complete,
    is_accepted
}){
    const navigate = useNavigate()
    const od2 = new Date(time_start).toISOString().replace('T', ' ').split('.')[0]
    const do2 = new Date(time_end).toISOString().replace('T', ' ').split('.')[0]
    const start_time = new Date(time_start).getHours() + ":" + new Date(time_start).getMinutes()
    const end_time = new Date(time_end).getHours() + ":" + new Date(time_end).getMinutes()
    return(
        <>
        <div className="box" style={{'background':is_complete&&is_accepted?'#3ca832':is_complete?'#cc9900':'rgb(255 107 107)'}}onClick={()=>navigate(`/schedule/${id}`)}>
            {/* <span>{id}</span> */}
            {/* <span>{person}</span> */}
            {/* <p>{new Date(time_start).toISOString().replace('T', ' ').split('.')[0]}</p> */}

            {/* <p>{new Date(time_end).toISOString().replace('T', ' ').split('.')[0]}</p> */}
            <p>{start_time + '-'+ end_time}</p>
            


        </div>

        </>
    )
}