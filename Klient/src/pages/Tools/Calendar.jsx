import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { pl } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import Spinner from "../../components/Spinner";
import Schedule from "../../components/Schedule";


import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../../features/schedule/formatDate";
import {
  updateSchedule,
  getSchedule,
  reset,
} from "../../features/schedule/scheduleSlice";

registerLocale("pl", pl);
function Calendar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = startOfWeek(new Date(), { weekStartsOn: 1 });
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());
  const [scheduleLocal, setScheduleLocal] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { schedule, isUpdated, isLoading, isError, message } = useSelector(
    (state) => state.schedule
  );


  const onSubmit = (e) => {

    const schedulePostBody = {
      schedule: scheduleLocal,
      opiekun: user.imie + " " + user.nazwisko,
    }
    dispatch(updateSchedule({ scheduleId: user.id, scheduleData: schedulePostBody }));
  };

  function handleDateChange(date, jump) {
    if (jump > 0) {
      setStartDate(startOfWeek(addWeeks(startDate, 1), { weekStartsOn: 1 }));
      setEndDate(startOfWeek(addWeeks(startDate, 2), { weekStartsOn: 0 }));
    }
    else if (jump < 0) {
      setStartDate(startOfWeek(subWeeks(startDate, 1), { weekStartsOn: 1 }));
      setEndDate(startOfWeek(startDate, { weekStartsOn: 0 }));
    }
    else {
      setStartDate(startOfWeek(date, { weekStartsOn: 1 }));
      setEndDate(startOfWeek(addWeeks(date, 1), { weekStartsOn: 0 }));
    }
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (schedule === undefined && !isError) {;
      dispatch(getSchedule(user.id)).then((value) => {
        const what = value.payload.schedule.map((date) => { return new Date(date) })
        setScheduleLocal(what)

      });
     
      
    } else {
      setScheduleLocal(schedule.schedule)
    }


    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, isUpdated, schedule, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "900px",
              paddingBottom: "50px",
              // height: "900px",
              // overflow: "auto",
            }}
          >
            <div>
              <p>{formatDate(startDate)} - {formatDate(endDate)}</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-center",
                  paddingBottom: "10px",
                }}
              >
                <button
                  className="btn-arrow "
                  onClick={(date) => {
                    handleDateChange(date, -1);
                  }}
                >
                  &#x025C2;
                </button>

                <button
                  className="btn-arrow "
                  onClick={(date) => {
                    handleDateChange(date, 1);
                  }}
                >
                  &#x025B8;
                </button>
              </div>
              <DatePicker
                className="datetimebox"
                selected={startDate}
                onChange={(date) => {
                  handleDateChange(date);
                }}
                calendarStartDay={1}
                closeOnScroll={false}
                todayButton="Dzisiaj"
                locale={pl}
              ></DatePicker>
            </div>
            <div className="schedule">
            <Schedule
              startDate={startDate}
              schedule={scheduleLocal}
              setSchedule={setScheduleLocal}
              />
              </div>
          </div>
        </div>
        <button className="btn-confirm " onClick={onSubmit}>
          Confirm
        </button>
      </div>
    </>
  );
}

export default Calendar;
