"use client"
import DayAndTimeSelector from "@/app/components/dayAndTimeSelector/DayAndTimeSelector";
import { DateTimeProvider } from "@/app/components/contexts/DateAndTimeContext";
import SlotDisplay from "@/app/components/slotDisplay/SlotDisplay";
import NotesAndRatings from "@/app/components/NotesAndRatings/NotesAndRatings";



const CoachPage = () => {
  return (
    <div>
      <h1 className="w-100 p-8">Coach Page</h1>
      <div className=" p-8 mx-auto flex flex-row">
        <div className="w-1/3 p-8 mx-auto ">
          <DateTimeProvider>
            <DayAndTimeSelector />
          </DateTimeProvider>
        </div>
        <div className="w-2/3 p-8">
          <SlotDisplay />
        </div>
      </div>
      <NotesAndRatings />
    </div>
  );
};

export default CoachPage;