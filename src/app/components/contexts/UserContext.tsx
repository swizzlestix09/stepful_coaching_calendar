'use client'
import { getUserTypeAndUserId } from '@/app/utils/utils';
import { usePathname } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

type UserState = {
  userType: string,
  userId?: number,
  timezone: string,
}

type UserContextType = UserState

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserState>({
    userType: '',
    userId: undefined,
    timezone: ''
  });

  const pathname = usePathname().split('/')

  useEffect(() => {
    const { userType, userId } = getUserTypeAndUserId(pathname)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserData({ userType, userId, timezone });
  }, [pathname])


  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};