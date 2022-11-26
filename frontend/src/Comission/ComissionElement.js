export default function ComissionElement(props){

    return(
        <div>
    
    <h2>id: {props.id}</h2>
    
    <p>time_start: {props.time_start}</p>
    <p>time_end: {props.time_end}</p>
    <p>is_complete: {props.is_complete}</p>
    <p>is_accepted: {props.is_accepted}</p>
    <p>is_selected: {props.is_selected}</p>
    <p>is_valid: {props.is_valid?"True":"False"}</p>
    <p>members: {props.members}</p>
  
        </div>
    )
}