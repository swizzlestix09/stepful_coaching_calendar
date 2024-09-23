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
  /* eslint-disable prefer-const */
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


export const getUserTypeAndUserId = (pathname: string[]) => {
  const [, userType, userId] = pathname;

  return {
    userType, userId: parseInt(userId)
  }
}

export const getTimeZone = () => (Intl.DateTimeFormat().resolvedOptions().timeZone)

export const formatTitle = (title: string) => {
  return title
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
};

export function formatUSTelephone(number?: string): string {
  if (!number) return 'No number stored. Contact system administrator'
  const cleaned = number.replace(/\D/g, '');

  if (cleaned.length !== 10) {
    throw new Error('Invalid US phone number length');
  }

  const formattedNumber = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

  return formattedNumber;
}