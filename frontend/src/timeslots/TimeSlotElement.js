export default function TimeSlotElement({id,person,time_start,time_end}){

    return(
        <div>
            <h2>id: {id}</h2>
            <p>start: {time_start}</p>
            <p>end: {time_end}</p>
            <p>person: {person}</p>
    
        </div>
    )
}