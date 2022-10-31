import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing, TodayButton, Toolbar, DateNavigator } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentForm
} from '@devexpress/dx-react-scheduler-material-ui';

const dane = [
  { startDate: '2022-10-20T09:45', endDate: '2022-10-20T10:00', title: 'Student 1' },
  { startDate: '2022-10-20T10:00', endDate: '2022-10-20T10:15', title: 'Student 2' },
  { startDate: '2022-10-20T10:30', endDate: '2022-10-20T10:45', title: 'Student 3' },
  { startDate: '2022-10-18T12:00', endDate: '2022-10-18T12:15', title: 'Student 4' },
  { startDate: '2022-10-21T12:00', endDate: '2022-10-21T12:30', title: 'Student 5' },
];
const saveAppointment=(data)=>{
  console.log('funkcja zapisywania')
  console.log(data)
}
const Calendar=()=> {
  return(<div id='calendar'>
    <Paper>
<Scheduler data={dane}>
      <ViewState />
      <EditingState onCommitChanges={saveAppointment}/>
      {/* <IntegratedEditing/> */}
      <WeekView startDayHour={9} endDayHour={19} cellDuration={15}/>
<Appointments />
      <AppointmentForm/>
      {/* <Toolbar/> */}
      {/* <DateNavigator/> */}
      {/* <TodayButton/> */}
      
    </Scheduler>

    </Paper>
    
  </div>
  
  )
};

export default Calendar