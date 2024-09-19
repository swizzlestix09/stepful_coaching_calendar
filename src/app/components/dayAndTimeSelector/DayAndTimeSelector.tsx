import { Calendar } from "@/components/ui/calendar"

import { useDateTime } from "../contexts/DateAndTimeContext"
import UserCalendar from "../calendar/Calendar"
import TimePicker from "../timeSelector/TimeSelector"
import { Button } from "@/components/ui/button"
import { createBeginningAndEndTimesForSlot } from "@/app/utils/utils"


const DayAndTimeSelector = () => {
  const { dateAndTime } = useDateTime()
  const formattedDate = dateAndTime.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const handleDayandTimeSaveClick = () => {
    createBeginningAndEndTimesForSlot(dateAndTime)
    //get slot end time
    //create POST handler for slot save
    //
  }
  return (
    <>
      <UserCalendar />
      <TimePicker />
      {dateAndTime && <span>{`You have selected ${formattedDate} at ${dateAndTime.time} . Click the button to save the slot.`}</span>}
      <Button onClick={handleDayandTimeSaveClick}>Save Slot</Button>
    </>
  )
}

export default DayAndTimeSelector;