import { Calendar } from "@/components/ui/calendar"

import { useDate } from "../calendar/DateContext"
import UserCalendar from "../calendar/Calendar"
import TimePicker from "../timeSelector/TimeSelector"


export default function DayAndTimeSelector() {

  const { date, setDate } = useDate()
  console.log(date)

  return (
    <>
      <UserCalendar />
      <TimePicker />
    </>
  )
}