"use client"

import SlotDisplay from "@/app/components/slotDisplay/SlotDisplay";
import { getUserTypeAndUserId } from "@/app/utils/utils";
import { usePathname } from "next/navigation";



const StudentPage = () => (
  <div>
    <h1 className="w-100 p-8">Student Page</h1>
    <div className="w-2/3 p-8 mx-auto">
      <SlotDisplay />
    </div>
  </div>
);


export default StudentPage;