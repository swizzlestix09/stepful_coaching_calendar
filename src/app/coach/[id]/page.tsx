"use client"

import { DateProvider } from "@/app/components/calendar/DateContext";
import DayAndTimeSelector from "@/app/components/dayAndTimeSelector/DayAndTimeSelector";


const CoachPage = () => {


  return (
    <div className="w-1/3 mx-auto justify-center items-center">
      <DateProvider>
        <h1>Coach Page</h1>
        <DayAndTimeSelector />
      </DateProvider>
    </div>
  );
};

export default CoachPage;