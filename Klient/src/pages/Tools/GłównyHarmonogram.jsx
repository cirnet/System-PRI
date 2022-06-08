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
  createMainSchedule,
  updateMainSchedule,
  getMainSchedules,
  reset,
} from "../../features/mainSchedule/mainScheduleSlice";

registerLocale("pl", pl);

export default function GłównyHarmonogram() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [preventScheduleSelection, setPreventScheduleSelection] =
    useState(true);
  const [selectedList, setSelectedList] = useState({});
  const [opiekunowieList, setOpiekunowieList] = useState([]);
  const [opiekunowieDict, setOpiekunowieDict] = useState({});
  const [excludedOpiekunowie, setExcludedOpiekunowie] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [scheduleLocal, setScheduleLocal] = useState([]);
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState(
    startOfWeek(addWeeks(new Date(), 1), { weekStartsOn: 0 })
  );
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

  const onSubmit = (e) => {
    const included = scheduleLocal.filter(
      (i) => selectedList[i] && selectedList[i].tak.length > 0
    );
    const filteredSchedule = included.map(
      (i) => JSON.parse(JSON.stringify(i)) + "," + selectedList[i].tak
    );

    const schedulePostBody = {
      schedule: filteredSchedule,
      opiekun: "Koordynator",
    };
    dispatch(
      updateMainSchedule({
        mainScheduleId: 14,
        mainScheduleData: schedulePostBody,
      })
    );
  };

  useEffect(() => {
    setColorList([]);
    const len = opiekunowieList.length - excludedOpiekunowie.length;
    if (len !== 0) {
      for (let i = 0; i <= len; i += 1) {
        setColorList((oldColorList) => [
          ...oldColorList,
          0.3 + (0.9 / len) * i,
        ]);
      }
    } else {
      setColorList([0.1]);
    }
  }, [excludedOpiekunowie]);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
    let local = [];
    let koordynatorSelected;
    const selectedList2 = {};
    const opiekunList = [];
    let dict = {};
    if (mainSchedule === undefined && !isError) {
      dispatch(getMainSchedules()).then((value) => {
        koordynatorSelected = value.payload.filter(
          (o) => o.opiekun === "Koordynator"
        );
        value.payload
          .filter((o) => o.opiekun !== "Koordynator")
          .map(
            (object) => (
              object.schedule.map((date) => {
                selectedList2[new Date(date)]
                  ? selectedList2[new Date(date)].tak.push(object.opiekun)
                  : (selectedList2[new Date(date)] = {
                      tak: [object.opiekun],
                      nie: [],
                    });
              }),
              opiekunList.push(object.opiekun)
            )
          );
        koordynatorSelected.map((object)=>(object.schedule.map((date) => local.push[new Date(date)])));
      });
      setScheduleLocal([]);
    } else {
      koordynatorSelected = mainSchedule.filter(
        (o) => o.opiekun === "Koordynator"
      );
      mainSchedule
        .filter((o) => o.opiekun !== "Koordynator")
        .map(
          (object) => (
            object.schedule.map((date) => {
              selectedList2[new Date(date)]
                ? selectedList2[new Date(date)].tak.push(object.opiekun)
                : (selectedList2[new Date(date)] = {
                    tak: [object.opiekun],
                    nie: [],
                  });
            }),
            opiekunList.push(object.opiekun)
          )
        );
        koordynatorSelected.map((object)=>(object.schedule.map((date) => local.push(new Date(date.split(",").shift())))));
    }
    opiekunList.map((opiekun, indeks) => (dict[opiekun] = indeks));
    setSelectedList(selectedList2);
    setOpiekunowieList(opiekunList);
    setOpiekunowieDict(dict);
    setScheduleLocal(local);

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

  const includeOpiekunForTile = (date, opiekunId) => {
    setPreventScheduleSelection(true);

    let selectedListCopy = { ...selectedList };
    const opiekun = selectedListCopy[date].nie.splice(opiekunId, 1);
    selectedListCopy[date].tak.push(opiekun);

    setSelectedList(selectedListCopy);
  };

  const excludeOpiekunForTile = (date, opiekunId) => {
    setPreventScheduleSelection(true);

    let selectedListCopy = { ...selectedList };
    const opiekun = selectedListCopy[date].tak.splice(opiekunId, 1);
    selectedListCopy[date].nie.push(opiekun);

    setSelectedList(selectedListCopy);
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
            let listaNie;
            if (Object.keys(selectedList).findIndex(target) !== -1) {
              listaTak = selectedList[date].tak.filter(
                (i) => !excludedOpiekunowie.includes(i)
              );
              listaNie = selectedList[date].nie.filter(
                (i) => !excludedOpiekunowie.includes(i)
              );
              size = listaTak.length;
            }
            return Object.keys(selectedList).findIndex(target) !== -1 ? (
              <div
                className="time-block-confirm"
                style={
                  selected
                    ? { background: "#55ff95" }
                    : size === 0
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
                    onClick={() => excludeOpiekunForTile(date, indeks)}
                    ref={undefined}
                  >
                    {opiekunowieDict[opiekun]}
                  </li>
                ))}
                {listaNie.map((opiekun, indeks) => (
                  <li
                    key={indeks}
                    style={{
                      listStyle: "none",
                      display: "inline-block",
                      color: "white",
                      fontWeight: "bold",
                      order: opiekunowieDict[opiekun],
                    }}
                    onClick={() => includeOpiekunForTile(date, indeks)}
                  >
                    {opiekunowieDict[opiekun]}
                  </li>
                ))}
              </div>
            ) : (
              <div
                className="test-confirm"
                ref={refSetter}
                style={{
                  height: "40px",
                  border: "1px solid #E0E0E0",
                  background: selected ? "#aaa" : "#fff",
                  rowGap: "-1",
                  columnGap: "-1",
                }}
              />
            );
          }}
        />
      </div>
      <button className="btn-confirm " onClick={onSubmit}>
        Confirm
      </button>
    </div>
  );
}
