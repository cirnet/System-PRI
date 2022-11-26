import TimeSlotElement from "./TimeSlotElement"
import { useEffect, useState } from "react";
import axios from 'axios'
import DenseTable from "./DenseTable"
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'person', headerName: 'Person', width: 300 },
  { field: 'time_start', headerName: 'time_start', width: 300 },
  { field: 'time_end', headerName: 'time_end', width: 300 }
]

export default function TimeSlots(){

    const [content, setContent] = useState([])

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/available-time-slot/')
            setContent(data)
            console.log(data)
      }
        fetch()
    },[])
console.log(content)
    return(
        <>
<div className="content">
  {content?
    <div style={{ height: 500, width: '95%' }}>
      <DataGrid
        rows={content}
        columns={columns}
        pageSize={100}/>
    </div>
  :"'Brak wolnych slotow'"}

{/* <DenseTable rows={content}/> */}
{/* 

{content?content.map(e=>(
    <TimeSlotElement
    key={e.id}
    id={e.id}
    person={e.person}
    time_start={e.time_start}
    time_end={e.time_end}
    />
)):'Brak wolnych slotow'} */}



</div>

</>
    )
}