import { Calendar } from "@/components/ui/calendar"

import { useDate } from "./DateContext"


export default function UserCalendar() {

  const { setDate, date } = useDate()
  console.log(date)
  return (
    <Calendar
      mode="single"
      disabled={{ before: new Date() }}
      selected={date}
      onSelect={setDate}
      className="w-max mx-auto rounded-md border"

    />
  )
}