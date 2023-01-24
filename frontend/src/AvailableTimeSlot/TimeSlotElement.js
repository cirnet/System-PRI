import "./AvailableTimeSlot.css";
import moment from "moment";

export default function TimeSlotElement({ id, time_start, time_end }) {
  return (
    <>
      <div className="box">
        {/* <p>
          {moment(time_start).format("LT") +
            "-" +
            moment(time_end).format("LT")}
        </p> */}
        <p>{moment(time_start).format("LT")}</p>
      </div>
    </>
  );
}
