
import { createContext, useState, ReactNode, useContext } from 'react';

type DateContextType = {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

type DateProviderProps = {
  children: ReactNode
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider = ({ children }: DateProviderProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (context === undefined) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};