import { useEffect, useState } from "react";
import ScheduleSelector from "react-schedule-selector";

export default function Calendar({ startDate, schedule, setSchedule }) {
  const renderCustomDateCell = (date, selected, refSetter) => {
    //const filter = (element) => element.getTime() === date.getTime();
    return (
      <div
        style={{
          height: "40px",
          border: "1px solid #E0E0E0",
          background: selected ? "#0223fe" : "#FFF",
        }}
        ref={refSetter}
      />
    );
  };

  return (
    <>
      <ScheduleSelector
        selection={schedule}
        numDays="7"
        dateFormat="ddd"
        timeFormat="H:mm"
        onChange={(newSchedule) => {
          setSchedule(newSchedule);
        }}
        columnGap="0px"
        rowGap="0px"
        startDate={startDate}
        hourlyChunks={2}
        renderDateCell={renderCustomDateCell}
      />
    </>
  );
}
