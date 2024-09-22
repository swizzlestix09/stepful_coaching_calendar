import { useDateTime } from "../contexts/DateAndTimeContext"
import UserCalendar from "../calendar/Calendar"
import TimePicker from "../timeSelector/TimeSelector"
import { Button } from "@/components/ui/button"
import { convert24hrTimeto12hrTime, createBeginningAndEndTimesForSlot } from "@/app/utils/utils"
import { memo, useMemo, useState } from "react"

type Props = {
  userId: number
}
const DayAndTimeSelector = ({ userId }: Props) => {
  const [successOrErrorMessage, setSuccessOrErrorMessage] = useState<string>('')
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

      if (res.ok) {
        setSuccessOrErrorMessage('Time Slot Saved Successfully!')
      } else {
        setSuccessOrErrorMessage('Error with date/time, or this slot is already saved.')
      }
    } catch (error) {
      console.error(error)
      setSuccessOrErrorMessage('Error with date/time, or this slot is already saved.')
    }


  }

  const twelveHourTime = useMemo(() => {
    const { time } = dateAndTime;
    return convert24hrTimeto12hrTime(time)
  }, [dateAndTime.time])

  return (
    <div className="w-1/3 flex flex-col items-center">
      <UserCalendar />
      <TimePicker />
      {dateAndTime.time.length > 0 && <p className="pt-1 text-center">{`You have selected ${formattedDate} at ${twelveHourTime}. Click the button to save the slot.`}</p>}
      <div className="pt-1">
        <Button onClick={handleDayandTimeSaveClick}>Save Slot</Button>
      </div>
      {successOrErrorMessage.length > 0 ? <p className="pt-1 text-center">{successOrErrorMessage}</p> : null}
    </div>
  )
}

export default memo(DayAndTimeSelector);