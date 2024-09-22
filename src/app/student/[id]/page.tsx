"use client"

import SlotDisplay from "@/app/components/slotDisplay/SlotDisplay";
import { getUserTypeAndUserId } from "@/app/utils/utils";
import { usePathname } from "next/navigation";



const StudentPage = () => {
  const pathname = usePathname().split('/')
  const { userType, userId } = getUserTypeAndUserId(pathname)


  return (
    <div>
      <h1>Student Page</h1>
      <SlotDisplay userType={userType} userId={userId} />
    </div>
  );
};

export default StudentPage;