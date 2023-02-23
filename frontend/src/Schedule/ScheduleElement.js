import "./Schedule.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
export default function SheduleElement({
  id,
  person,
  time_start,
  time_end,
  is_complete,
  is_accepted,
  group_id,
}) {
  const navigate = useNavigate();

  return (
    <>
      {group_id === 1 ? (
        <div
          className="boxSchedule"
          style={{
            background:
              is_complete && is_accepted
                ? "#3ca832"
                : is_complete
                ? "#cc9900"
                : "#FF6B6B",
          }}
          onClick={() => navigate(`/schedule/${id}`)}
        >
          <p>
            {moment(time_start).format("LT") +
              "-" +
              moment(time_end).format("LT")}
          </p>
        </div>
      ) : (
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
          onClick={() => navigate(`/DefenseAdd/${id}`)}
        >
          <p>
            {moment(time_start).format("LT") +
              "-" +
              moment(time_end).format("LT")}
          </p>
        </div>
      )}
    </>
  );
}
