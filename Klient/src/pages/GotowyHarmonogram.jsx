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
  createMainSchedule,
  updateMainSchedule,
  getMainSchedules,
  reset,
} from "../features/mainSchedule/mainScheduleSlice";

registerLocale("pl", pl);

export default function GotowyHarmonogram() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [preventScheduleSelection, setPreventScheduleSelection] =
    useState(true);
  const [selectedList, setSelectedList] = useState({});
  const [opiekunowieList, setOpiekunowieList] = useState([]);
  const [opiekunowieDict, setOpiekunowieDict] = useState({});
  const [excludedOpiekunowie, setExcludedOpiekunowie] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState(
    startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 0 })
  );
  const [scheduleLocal, setScheduleLocal] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { mainSchedule, isUpdated, isLoading, isError, message } = useSelector(
    (state) => state.mainSchedule
  );

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

    if (!user) {
      navigate("/login");
    }
    const selectedList2 = {};
    let opiekunList = [];
    let dataOpiekunowie = [];
    let dict = {};
    if (mainSchedule === undefined && !isError) {
      dispatch(getMainSchedules()).then((value) => {
        value.payload
          .filter((o) => o.opiekun === "Koordynator")[0]
          .schedule.map((date) => {
            dataOpiekunowie = date.split(",");
            const data = dataOpiekunowie.shift();
            selectedList2[new Date(data)] = {
              tak: dataOpiekunowie,
              nie: [],
            };
            dataOpiekunowie.map((i) => opiekunList.push(i));
          });

        opiekunList = [...new Set(opiekunList)];
      });
    } else if (!isError) {
      mainSchedule
        .filter((o) => o.opiekun === "Koordynator")[0]
        .schedule.map((date) => {
          dataOpiekunowie = date.split(",");
          const data = dataOpiekunowie.shift();
          selectedList2[new Date(data)] = {
            tak: dataOpiekunowie,
            nie: [],
          };
          dataOpiekunowie.map((i) => opiekunList.push(i));
        });
      opiekunList = [...new Set(opiekunList)];
    }
    opiekunList.map((opiekun, indeks) => (dict[opiekun] = indeks));
    setSelectedList(selectedList2);
    setOpiekunowieList(opiekunList);
    setOpiekunowieDict(dict);
    setScheduleLocal([]);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, isUpdated, mainSchedule, message, dispatch]);

  const excludeOpiekun = (opiekun) => {
    setExcludedOpiekunowie((oldExcludedOpiekunowie) =>
      oldExcludedOpiekunowie.concat(opiekun)
    );
  };

  const includeOpiekun = (opiekun) => {
    setExcludedOpiekunowie(
      excludedOpiekunowie.filter((item) => item !== opiekun)
    );
  };

  return (
    <div>
      <div>
        <p>
          {formatDate(startDate)} - {formatDate(endDate)}
        </p>
        <div className="calendar-tools">
          <div>
            <div>
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
          <ul className="opiekunowie-list">
            {opiekunowieList.map((opiekun, indeks) =>
              excludedOpiekunowie.includes(opiekun) ? (
                <li
                  key={indeks}
                  onClick={() => includeOpiekun(opiekun)}
                  style={{ color: "gray" }}
                >
                  {opiekunowieDict[opiekun]}: {opiekun}
                </li>
              ) : (
                <li key={indeks} onClick={() => excludeOpiekun(opiekun)}>
                  {opiekunowieDict[opiekun]}: {opiekun}
                </li>
              )
            )}
          </ul>
        </div>
      </div>
      <div className="schedule">
        <Schedule
          startDate={startDate}
          schedule={scheduleLocal}
          setSchedule={setScheduleLocal}
          renderDateCell={(date, selected, refSetter) => {
            const target = (i) => i === date.toString();
            let size;
            let listaTak;
            if (Object.keys(selectedList).findIndex(target) !== -1) {
              listaTak = selectedList[date].tak.filter(
                (i) => !excludedOpiekunowie.includes(i)
              );
              size = listaTak.length;
            }
            return Object.keys(selectedList).findIndex(target) !== -1 ? (
              <div
                className="time-block-confirm"
                style={
                  size === 0
                    ? { background: "#aaaa" }
                    : { opacity: colorList[size] }
                }
                ref={refSetter}
              >
                {listaTak.map((opiekun, indeks) => (
                  <li
                    key={indeks}
                    style={{
                      listStyle: "none",
                      display: "inline-block",
                      fontWeight: "bold",
                      order: opiekunowieDict[opiekun],
                    }}
                    ref={refSetter}
                  >
                    {opiekunowieDict[opiekun]}
                  </li>
                ))}
              </div>
            ) : (
              <div
                className="test-confirm block"
                ref={refSetter}
                style={{
                  height: "40px",
                  border: "1px solid #E0E0E0",
                  rowGap: "-1",
                  columnGap: "-1",
                }}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
