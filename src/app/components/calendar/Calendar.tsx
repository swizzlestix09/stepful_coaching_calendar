import { Calendar } from "@/components/ui/calendar"

import { useDateTime } from "../contexts/DateAndTimeContext"


export default function UserCalendar() {

  const { dateAndTime, setDateAndTime } = useDateTime()

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setDateAndTime(prev => ({ ...prev, date }))
    }
  }

  return (
    <Calendar
      mode="single"
      disabled={{ before: new Date() }}
      selected={dateAndTime.date}
      onSelect={handleSelectDate}
      className="w-max mx-auto rounded-md border"

    />
  )
}