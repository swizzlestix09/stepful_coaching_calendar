import { DateAndTimeType } from "../components/contexts/DateAndTimeContext"

export const createBeginningAndEndTimesForSlot = ({ date, time }: DateAndTimeType) => {

  const [h, m] = time.split(':');

  date.setHours(Number(h));
  date.setMinutes(Number(m));

  const endTime = new Date(date);
  endTime.setHours(endTime.getHours() + 2);

  return {
    startTime: date,
    endTime
  }
}


export const convert24hrTimeto12hrTime = (time: string) => {
  let [h, m] = time.split(':').map(Number);

  let meridiem = 'AM'
  if (h >= 12) {
    h = h > 12 ? h - 12 : h;
    meridiem = 'PM'
  }
  if (h === 0) {
    h = 12;
  }

  const min = m === 0 ? '00' : m
  return `${h}:${min} ${meridiem}`
}
