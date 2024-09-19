import { DateAndTimeType } from "../components/contexts/DateAndTimeContext"

export const createBeginningAndEndTimesForSlot = ({ date, time }: DateAndTimeType) => {
  //set for time selected & two hours ahead
  //if at 23h when add two should be 1 am not 25h
  const [h, m] = time.split(':')
  //take time
  //break with :
  // first val h second val m
  //take date
  date.setHours(Number(h))
  date.setMinutes(Number(m))
  const endTime = new Date(date)
  endTime.setHours(endTime.getHours() + 2)
  // date.SetHours(h)
  // date.setMinutes(m)
  //create var for endTime
  // take date
  // .getHours() + 2
  console.log(date, endTime)

  //return both
  return {
    beginTime: date,
    endTime
  }
}