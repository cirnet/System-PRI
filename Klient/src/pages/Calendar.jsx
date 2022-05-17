import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { format, startOfWeek, addWeeks, subWeeks } from "date-fns";
import { pl } from "date-fns/locale";
import DatePicker, { registerLocale } from "react-datepicker";
import Spinner from "../components/Spinner";
import Schedule from "../components/Schedule";
import "react-datepicker/dist/react-datepicker.css";
import formatDate from "../features/schedule/formatDate";
import {
  updateSchedule,
  getSchedule,
  reset,
} from "../features/schedule/scheduleSlice";

registerLocale("pl", pl);
function Calendar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const date = startOfWeek(new Date(), { weekStartsOn: 1 });
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());

  const { user } = useSelector((state) => state.auth);
  const { schedule, isUpdated, isLoading, isError, message } = useSelector(
    (state) => state.schedule
  );

  // console.log("user:", user);
  // console.log("schedule:", schedule);

  //const [scheduleLocal, setScheduleLocal] = useState(schedule);
  const [scheduleLocal, setScheduleLocal] = useState([
    '2022-05-18T10:00:00.000Z',
    '2022-05-19T10:00:00.000Z',
    '2022-05-20T10:00:00.000Z',
    '2022-05-19T09:30:00.000Z',
    '2022-05-19T08:30:00.000Z',
    '2022-05-19T07:30:00.000Z',
    '2022-05-19T08:00:00.000Z',
    '2022-05-19T09:00:00.000Z',
    '2022-05-18T09:30:00.000Z',
    '2022-05-20T09:30:00.000Z',
    '2022-05-19T07:00:00.000Z'
  ],)

  const onSubmit = (e) => {
    dispatch(updateSchedule(scheduleLocal));
  };

  function handleDateChange(date, jump) {
    if (jump > 0) {
      setStartDate(startOfWeek(addWeeks(startDate, 1), { weekStartsOn: 1 }));
      setEndDate(startOfWeek(addWeeks(startDate, 2), { weekStartsOn: 0 }));
    } else if (jump < 0) {
      setStartDate(startOfWeek(subWeeks(startDate, 1), { weekStartsOn: 1 }));
      setEndDate(startOfWeek(startDate, { weekStartsOn: 0 }));
    } else {
      setStartDate(startOfWeek(date, { weekStartsOn: 1 }));
      setEndDate(startOfWeek(addWeeks(date, 1), { weekStartsOn: 0 }));
    }
  }

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //    navigate("/login");
    //  }

    // if (schedule === undefined) {
    //   dispatch(getSchedule()).then((value) => {
    //     setScheduleLocal(value.payload);
    //   });
    //   setScheduleLocal(schedule);
    // }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, isUpdated, schedule, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Organizacja harmonogramu</p>
      </section>
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
              height: "600px",
              overflow: "auto",
            }}
          >
            <div>
              od {formatDate(startDate)} do {formatDate(endDate)}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-center",
                  paddingBottom: "20px",
                }}
              >
                <button
                  className="btn "
                  onClick={(date) => {
                    handleDateChange(date, -1);
                  }}
                >
                  &lt;
                </button>
                <button
                  className="btn "
                  onClick={(date) => {
                    handleDateChange(date, 1);
                  }}
                >
                  &gt;
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
            <Schedule
              startDate={startDate}
              schedule={scheduleLocal}
              setSchedule={setScheduleLocal}
            />
          </div>
        </div>
        <button className="btn " onClick={onSubmit}>
          Confirm
        </button>
      </div>
    </>
  );
}

export default Calendar;
