import "../AvailableTimeSlot.css";
import moment from "moment";
export default function TimeSlotElement({ id, time_start, test }) {
  console.log(time_start);
  return (
    <>
      <div className="box" style={{ backgroundColor: test ? "gray" : "" }}>
        <p>{moment(time_start).format("LT")}</p>
      </div>
    </>
  );
}
