import { useState } from 'react';

const TimePicker: React.FC = () => {
  const [time, setTime] = useState<string>('');

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTime(e.target.value);
  };

  return (
    <div className="p-8 justify-center align-center">
      <label htmlFor="time-picker">Select Time:</label>
      <input
        id="time-picker"
        type="time"
        value={time}
        onChange={handleTimeChange}
      />
      <p>Selected Time: {time}</p>
    </div>
  );
};

export default TimePicker;