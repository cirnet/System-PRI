import "../AvailableTimeSlot.css";
import moment from "moment";
export default function CalendarTimeSlotElementTEST({ id, time_start, test }) {
  // console.log(time_start);
  return (
    <>
      <div
        className="box, boxOriginal"
        style={{ backgroundColor: test ? "#3ca832" : "rgb(255 107 107)" }}
      >
        <p>{moment(time_start).format("LT")}</p>
      </div>
    </>
  );
}
