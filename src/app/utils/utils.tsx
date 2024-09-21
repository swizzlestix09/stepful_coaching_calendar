import { DateAndTimeType } from "../components/contexts/DateAndTimeContext"

export const createBeginningAndEndTimesForSlot = ({ date, time }: DateAndTimeType) => {

  const [h, m] = time.split(':');

  date.setHours(Number(h));
  date.setMinutes(Number(m));

  const endTime = new Date(date);
  endTime.setHours(endTime.getHours() + 2);

  // console.log(date, endTime)

  return {
    startTime: date,
    endTime
  }
}


export const convert24hrTimeto12hrTime = (time: string) => {
  let [h, m] = time.split(':').map(Number);
  const meridiem = h > 12 ? 'PM' : 'AM'
  if (h > 12) {
    h = h - 12;
  }
  if (h === 0) {
    h = 12;
  }
  const min = m === 0 ? '00' : m
  return `${h}:${min} ${meridiem}`
}

//postgres will save as UTC apparently.
//idea for how to convert for viewing: const dateUTC = new Date('2024-09-20T15:00:00Z'); // Example UTC time

// Convert to local time zone
//console.log(dateUTC.toLocaleString()); // Output will be in local time zone