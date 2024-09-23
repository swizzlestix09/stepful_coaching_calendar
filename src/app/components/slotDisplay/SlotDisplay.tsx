import { useUpcomingSlots } from "@/app/hooks/useUpcomingSlots"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { memo } from "react"
import AppointmentsTable from "../appointments/AppointmentsTable"

import { useUserContext } from "../contexts/UserContext"
import { useBookedSlots } from "@/app/hooks/useBookedSlots"



const SlotDisplay = () => {
  const { userType, userId, timezone } = useUserContext();
  const urlParam = userType ? `/api/${userType}/[id]` : null;

  const allAppointmentsList = useUpcomingSlots(timezone, urlParam, userId)
  const allBookedList = useBookedSlots('/api/appointments', userId)

  if (!userType || !timezone || !userId || !allAppointmentsList || !allBookedList) {
    return null;
  }

  return (
    <Tabs defaultValue="upcoming" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="booked">Booked</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <AppointmentsTable list={allAppointmentsList} />
      </TabsContent>
      <TabsContent value="booked">
        <AppointmentsTable bookedAppointments={true} list={allBookedList} />
      </TabsContent>
    </Tabs>
  )
}

export default memo(SlotDisplay)
