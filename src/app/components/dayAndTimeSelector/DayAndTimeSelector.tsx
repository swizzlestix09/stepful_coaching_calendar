import { Calendar } from "@/components/ui/calendar"

import { useDateTime } from "../contexts/DateAndTimeContext"
import UserCalendar from "../calendar/Calendar"
import TimePicker from "../timeSelector/TimeSelector"
import { Button } from "@/components/ui/button"
import { convert24hrTimeto12hrTime, createBeginningAndEndTimesForSlot } from "@/app/utils/utils"
import { memo, useMemo } from "react"


const DayAndTimeSelector = () => {
  const { dateAndTime } = useDateTime();
  const formattedDate = dateAndTime.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const handleDayandTimeSaveClick = () => {
    const { beginTime, endTime } = createBeginningAndEndTimesForSlot(dateAndTime);
    //get slot end time
    //create POST handler for slot save
    //
  }

  const twelveHourTime = useMemo(() => {
    console.log('triggered')
    const { time } = dateAndTime;
    return convert24hrTimeto12hrTime(time)
  }, [dateAndTime.time])

  return (
    <>
      <UserCalendar />
      <TimePicker />
      {dateAndTime.time.length > 0 && <span>{`You have selected ${formattedDate} at ${twelveHourTime}. Click the button to save the slot.`}</span>}
      <Button onClick={handleDayandTimeSaveClick}>Save Slot</Button>
    </>
  )
}

export default memo(DayAndTimeSelector);