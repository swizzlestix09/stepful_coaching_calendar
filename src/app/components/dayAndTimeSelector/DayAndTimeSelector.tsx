import { Calendar } from "@/components/ui/calendar"

import { useDateTime } from "../contexts/DateAndTimeContext"
import UserCalendar from "../calendar/Calendar"
import TimePicker from "../timeSelector/TimeSelector"


const DayAndTimeSelector = () => {
  const { dateAndTime } = useDateTime()
  const formattedDate = dateAndTime.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });


  return (
    <>
      <UserCalendar />
      <TimePicker />
      {dateAndTime && <span>{`You have selected ${formattedDate} at ${dateAndTime.time} . Click the button to save the slot.`}</span>}
    </>
  )
}

export default DayAndTimeSelector;