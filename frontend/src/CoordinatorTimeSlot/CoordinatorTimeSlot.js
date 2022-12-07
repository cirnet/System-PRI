import React, { useState, useEffect } from "react";
// /api/coordinator-time-slot/
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function CoordinatorTimeSlot(){

const [startDate, setStartDate] = useState(null);
 const [endDate, setEndDate] = useState(null);
 const [poczatek, setPoczatek] = useState(new Date("2022/12/5"))
 const [koniec, setKoniec] = useState(new Date("2022/12/9"))

const [content, setContent] = useState([])

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/coordinator-time-slot/')
            setContent(data)
            console.log(data)
            // console.log(content[0])
      }
        fetch()
    },[])

  const handle=()=>{
    console.log(startDate)
    console.log(endDate)
 }
    return(<>
    <form  style={{ display: "flex" }}>
     <DatePicker
       placeholderText="Select Start Date"
    //    showTimeSelect
    //    dateFormat="MMMM d, yyyy h:mmaa"
       selected={startDate}
       selectsStart
       startDate={startDate}
       endDate={endDate}
       onChange={date => setStartDate(date)}
       withPortal
       timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
      
      
     />
     <DatePicker
       placeholderText="Select End Date"
    //    showTimeSelect
    //    dateFormat="MMMM d, yyyy h:mmaa"
       selected={endDate}
       selectsEnd
       startDate={startDate}
       endDate={endDate}
       minDate={startDate}
       onChange={date => setEndDate(date)}
       withPortal
       timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
       
     />
      {/* <button onClick={send}></button> */}
      <input type="submit" value="Submit" />
      <input onClick={handle}></input>
   </form>
    

    
    </>

   
 );
}
