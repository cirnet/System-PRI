import CalendarTimeSlot from "./Calendar/CalendarTimeSlot";
import FormAvailableTimeSlot from "./FormAvailableTimeSlot";
import { useState } from "react";

export default function SwitchFunction() {
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

        {pick ? <FormAvailableTimeSlot /> : <CalendarTimeSlot />}
      </div>
    </>
  );
}
