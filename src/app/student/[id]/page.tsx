"use client"

import UserCalendar from "@/app/components/calendar/Calendar";
import { DateProvider } from "@/app/components/contexts/DateAndTimeContext";

const StudentPage = () => {


  return (
    <div>
      <DateProvider>
        <h1>Student Page</h1>
        <UserCalendar />
      </DateProvider>
    </div>
  );
};

export default StudentPage;