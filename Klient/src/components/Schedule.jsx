import { useEffect, useState } from "react";
import ScheduleSelector from "react-schedule-selector";

export default function Schedule({ startDate, schedule, setSchedule }) {
  const renderCustomDateCell = (date, selected, refSetter) => {
    //const filter = (element) => element.getTime() === date.getTime();
    return (
      <div
        style={{
          height: "40px",
          border: "1px solid #E0E0E0",
          background: selected ? "#ff5595" : "#FFF",
          rowGap: "-1",
          columnGap: "-1",
        }}
        ref={refSetter}
      />
    );
  };

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
          setSchedule(newSchedule);
        }}
        startDate={startDate}
        hourlyChunks={2}
        renderDateCell={renderCustomDateCell}
      />
    </>
  );
}
