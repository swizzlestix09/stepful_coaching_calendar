import { DateAndTimeType } from "../components/contexts/DateAndTimeContext"

export const createBeginningAndEndTimesForSlot = ({ date, time }: DateAndTimeType) => {

  const [h, m] = time.split(':')

  date.setHours(Number(h))
  date.setMinutes(Number(m))

  const endTime = new Date(date)
  endTime.setHours(endTime.getHours() + 2)

  console.log(date, endTime)

  //return both
  return {
    beginTime: date,
    endTime
  }
}

//postgres will save as UTC apparently.
//idea for how to convert for viewing: const dateUTC = new Date('2024-09-20T15:00:00Z'); // Example UTC time

// Convert to local time zone
//console.log(dateUTC.toLocaleString()); // Output will be in local time zone