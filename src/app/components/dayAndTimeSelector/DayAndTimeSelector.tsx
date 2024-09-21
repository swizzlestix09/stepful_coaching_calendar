import { useDateTime } from "../contexts/DateAndTimeContext"
import UserCalendar from "../calendar/Calendar"
import TimePicker from "../timeSelector/TimeSelector"
import { Button } from "@/components/ui/button"
import { convert24hrTimeto12hrTime, createBeginningAndEndTimesForSlot } from "@/app/utils/utils"
import { memo, useMemo } from "react"

type Props = {
  userId: number
}
const DayAndTimeSelector = ({ userId }: Props) => {

  const { dateAndTime } = useDateTime();
  const formattedDate = dateAndTime.date.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });

  const handleDayandTimeSaveClick = async () => {
    const { startTime, endTime } = createBeginningAndEndTimesForSlot(dateAndTime);

    try {
      const res = await fetch('/api/coach/[id]', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          user_id: userId,
          start_time: startTime,
          end_time: endTime,

        })
      })

      console.log('RES IN SELECTOR: ', res)
    } catch (error) {
      console.error(error)
      //edge cases - time already stored
      // before time already handeled with calendar
    }
    //get slot end time
    //get coach id
    //create POST handler for slot save
    //
  }

  const twelveHourTime = useMemo(() => {

    const { time } = dateAndTime;
    return convert24hrTimeto12hrTime(time)
  }, [dateAndTime.time])

  return (
    <div className="mx-auto">
      <UserCalendar />
      <TimePicker />
      {dateAndTime.time.length > 0 && <p className="pt-1">{`You have selected ${formattedDate} at ${twelveHourTime}. Click the button to save the slot.`}</p>}
      <Button onClick={handleDayandTimeSaveClick}>Save Slot</Button>
    </div>
  )
}

export default memo(DayAndTimeSelector);