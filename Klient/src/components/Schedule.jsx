import { useEffect, useState } from "react";
import ScheduleSelector from "react-schedule-selector";

export default function Schedule({ startDate, schedule, setSchedule, renderDateCell }) {


  return (
    <>
      <ScheduleSelector
        selection={schedule}
        // numDays="7"
        dateFormat="ddd"
        timeFormat="H:mm"
        minTime={8}
        maxTime = {20}
        columnGap="-1px"
        rowGap="-1px"
        onChange={(newSchedule) => {
          setSchedule(newSchedule) 
        }}
        startDate={startDate}
        hourlyChunks={2}
        renderDateCell={renderDateCell}
        style={{overflow: 'auto'}}
      />
    </>
  );
}
