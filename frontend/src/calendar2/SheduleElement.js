// import "./style.css"


export default function SheduleElement({
    id,
    person,
    time_start,
    time_end
}){
    return(
        <>
        <div className="box">
            <span>{id}</span>
            <span>{person}</span>
            <p>{new Date(time_start).toISOString().replace('T', ' ').split('.')[0]}</p>

            <p>{new Date(time_end).toISOString().replace('T', ' ').split('.')[0]}</p>

        </div>

        </>
    )
}