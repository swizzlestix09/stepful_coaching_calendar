import { useDateTime } from '../contexts/DateAndTimeContext';


const TimePicker: React.FC = () => {
  const { dateAndTime, setDateAndTime } = useDateTime();

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateAndTime(prev => ({ ...prev, time: e.target.value }));
  };

  return (
    <div className="p-4 justify-center align-center w-max mx-auto ">
      <label className="p-1" htmlFor="time-picker" > Select Time:</label >
      <input
        id="time-picker"
        type="time"
        value={dateAndTime.time}
        onChange={handleTimeChange}
      />
    </div >
  );
};

export default TimePicker;