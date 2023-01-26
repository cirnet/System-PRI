import "./AvailableTimeSlot.css";
import moment from "moment";
export default function TimeSlotElement({ id, time_start, time_end, test }) {
  console.log(test);
  return (
    <>
      <div
        className="box"
        // style={{ backgroundColor: time_start === test ? "gray" : "" }
        style={{ backgroundColor: test ? "gray" : "" }}
      >
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
