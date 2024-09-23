import { useUpcomingSlots } from "@/app/hooks/useUpcomingSlots"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { memo } from "react"
import AppointmentsTable from "../AppointmentsTable"

import { useUserContext } from "../contexts/UserContext"
import { useBookedSlots } from "@/app/hooks/useBookedSlots"



const SlotDisplay = () => {

  const { userType, userId, timezone } = useUserContext();


  const allAppointmentsList = useUpcomingSlots(timezone, `/api/${userType}/[id]`, userId)

  const allBookedList = useBookedSlots('/api/appointments', userId)

  console.log(`${userType}: `, allAppointmentsList, allBookedList)

  if (!allAppointmentsList || !allBookedList) return null;

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
        <AppointmentsTable list={allBookedList} />
      </TabsContent>
    </Tabs>
  )
}

export default memo(SlotDisplay)



//coach
//using userId, fetch all slots.
//once slots are recieved, should be viewable in Upcoming
//booked ones can be rendered once student can book


//both show upcoming and booked appts
//students should have ability to book upcoming appt
//booked slots should show phone numbers

//show all bookings with coach id and fetch the students telephone number
//show all slots for coach

//nice to have - delete bookings ( coach ) and pagination
