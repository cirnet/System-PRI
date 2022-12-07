import ComissionElement from "./ComissionElement"
import { useEffect, useState } from "react";
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import './style.css'

import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const divStyle = {
  color: 'blue',
};

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'time_start', headerName: 'Od', width: 150,renderCell:(params)=>{return(<span>{new Date(params.row.time_start).toLocaleString()}</span>)} },
  { field: 'time_end', headerName: 'Do', width: 150,renderCell:(params)=>{return(<span>{new Date(params.row.time_end).toLocaleString()}</span>)} },
  { field: 'is_valid', headerName: 'is_valid', width: 150, renderCell:(params)=>{return(
<>
{params?"sdsd":"nie"}
</>
  
  
  
  
  )} },
  { field: 'is_complete', headerName: 'is_complete', width: 150 },
  { field: 'is_accepted', headerName: 'is_accepted', width: 150 },
  { field: 'is_selected', headerName: 'is_selected', width: 150 }
]

export default function Comission(){
     const [content, setContent] = useState([])

    useEffect(()=>{
      const fetch = async()=>{
        const {data} = await axios.get('http://localhost:8000/api/commission/')
            setContent(data)
            console.log(data)
      }
        fetch()
    },[])
console.log(content)
    console.log(content.is_valid)


    if(content.length>0){
    <DataGrid rows={content} columns={columns} pageSize={100} align="center"/>
  }


    return(
<div className="content">


<h1>Comission</h1>

{content.length>0?<><div style={{ height: 500, width: '95%' }}>
      <DataGrid
        rows={content}
        columns={columns}
        pageSize={100}
        align="center"/>
    </div>
</>
:"Brak wolnych slotow"}




{/* {content ? content.map(e=>(
        <ComissionElement 
        key={e.id}
        id={e.id}
        time_start={e.time_start}
        time_end={e.time_end}
        is_complete={e.is_complete}
        is_accepted={e.is_accepted}
        is_selected={e.is_selected}
        is_valid={e.is_valid}
        members={e.members}
        />)
    ):"Brak comission"} */}

</div>
    
    )
}