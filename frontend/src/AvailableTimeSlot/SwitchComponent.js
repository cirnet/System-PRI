import TimeSlot from "./Calendar/TimeSlot";
import AvailableTimeSlot from "./AvailableTimeSlot";
import { useState } from "react";

export default function SwitchFunction(pk) {
  let [pick, setPick] = useState(true);
  const handle = () => {
    setPick((prev) => !prev);
  };

  return (
    <>
      <div className="switchContent">
        <div className="button">
          <button onClick={handle}>
            {pick ? "Zmień na kalendarz" : "Zmień na formularz"}
          </button>
        </div>

        {pick ? <AvailableTimeSlot /> : <TimeSlot />}
      </div>
    </>
  );
}
