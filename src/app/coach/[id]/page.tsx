"use client"

import DayAndTimeSelector from "@/app/components/dayAndTimeSelector/DayAndTimeSelector";
import { DateTimeProvider } from "@/app/components/contexts/DateAndTimeContext";


const CoachPage = () => {



  return (
    <div className="w-1/3 mx-auto justify-center items-center">
      <DateTimeProvider>
        <h1>Coach Page</h1>
        <DayAndTimeSelector />
      </DateTimeProvider>
    </div>
  );
};

export default CoachPage;