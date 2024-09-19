import { createContext, useState, ReactNode, useContext } from 'react';

export type DateAndTimeType = {
  date: Date;
  time: string;
}

type DateTimeContextType = {
  dateAndTime: DateAndTimeType;
  setDateAndTime: React.Dispatch<React.SetStateAction<DateAndTimeType>>;
}

type DateTimeProviderProps = {
  children: ReactNode;
}


const DateTimeContext = createContext<DateTimeContextType | undefined>(undefined);

export const DateTimeProvider = ({ children }: DateTimeProviderProps) => {
  const [dateAndTime, setDateAndTime] = useState<DateAndTimeType>({
    date: new Date(),
    time: '',
  });

  return (
    <DateTimeContext.Provider value={{ dateAndTime, setDateAndTime }}>
      {children}
    </DateTimeContext.Provider>
  );
};


export const useDateTime = () => {
  const context = useContext(DateTimeContext);
  if (context === undefined) {
    throw new Error('useDateTime must be used within a DateTimeProvider');
  }
  return context;
};