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

  const [scheduleLocal, setScheduleLocal] = useState([]);
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState(
    startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 0 })
  );
  const { user } = useSelector((state) => state.auth);
  const { schedule, isUpdated, isLoading, isError, message } = useSelector(
    (state) => state.schedule
  );
  const onSubmit = (e) => {
    const schedulePostBody = {
      schedule: scheduleLocal,
      opiekun: user.name + " " + user.surname,
    };

    dispatch(
      updateSchedule({ scheduleId: user.id, scheduleData: schedulePostBody })
    );
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
  const renderCustomDateCell = (date, selected, refSetter) => {
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

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    if (schedule === undefined && !isError) {
      dispatch(getSchedule(user.id)).then((value) => {
        const daty = value.payload.schedule.map((date) => {
          return new Date(date);
        });
        setScheduleLocal(daty);
      });
    } else {
      setScheduleLocal(schedule.schedule);
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
        <div>
          <div
            style={
              {
                // paddingBottom: "0px",
                // height: "900px",
                // overflow: "auto",
              }
            }
          >
            <div>
              <p>
                {formatDate(startDate)} - {formatDate(endDate)}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-center",
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
                renderDateCell={renderCustomDateCell}
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
