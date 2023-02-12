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
        <button onClick={handle}>Zmień widok</button>
        {pick ? <AvailableTimeSlot /> : <TimeSlot />}
      </div>
    </>
  );
}
