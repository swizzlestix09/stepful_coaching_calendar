"use client"

import UserCalendar from "@/app/components/calendar/Calendar";
import { DateTimeProvider } from "@/app/components/contexts/DateAndTimeContext";


const StudentPage = () => {


  return (
    <div>
      <DateTimeProvider>
        <h1>Student Page</h1>
        <UserCalendar />
      </DateTimeProvider>
    </div>
  );
};

export default StudentPage;