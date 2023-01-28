import "./Schedule.css";
import { Navigate, useNavigate } from "react-router-dom";
import moment from "moment";
export default function SheduleElement({
  id,
  person,
  time_start,
  time_end,
  is_complete,
  is_accepted,
}) {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="boxSchedule"
        style={{
          background:
            is_complete && is_accepted
              ? "#3ca832"
              : is_complete
              ? "#cc9900"
              : "rgb(255 107 107)",
        }}
        onClick={() => navigate(`/schedule/${id}`)}
      >
        {/* <span>{id}</span> */}
        {/* <span>{person}</span> */}
        {/* <p>{new Date(time_start).toISOString().replace('T', ' ').split('.')[0]}</p> */}

        {/* <p>{new Date(time_end).toISOString().replace('T', ' ').split('.')[0]}</p> */}
        {/* {time_start} */}
        <p>
          {moment(time_start).format("LT") +
            "-" +
            moment(time_end).format("LT")}
        </p>
        {/* <p>{moment(time_start).format("LT")}</p> */}
      </div>
    </>
  );
}
