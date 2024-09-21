"use client"

import DayAndTimeSelector from "@/app/components/dayAndTimeSelector/DayAndTimeSelector";
import { DateTimeProvider } from "@/app/components/contexts/DateAndTimeContext";
import { usePathname } from "next/navigation"


const CoachPage = () => {
  const pathname = usePathname().split('/')
  const userId = Number(pathname[pathname.length - 1])


  return (
    <div className="w-1/3 mx-auto justify-center items-center">
      <DateTimeProvider>
        <h1>Coach Page</h1>
        <DayAndTimeSelector userId={userId} />
      </DateTimeProvider>
    </div>
  );
};

export default CoachPage;