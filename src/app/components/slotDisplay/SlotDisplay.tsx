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
import { getTimeZone } from "@/app/utils/utils"

type Props = {
  userType: string,
  userId: number
}

const SlotDisplay = ({ userType, userId }: Props) => {
  const timeZone = getTimeZone()
  console.log('in slotDisplay', userType, timeZone)
  const listResult = useUpcomingSlots(timeZone, userId, `/api/${userType}/[id]`)


  return (
    <Tabs defaultValue="upcoming" >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="booked">Booked</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <AppointmentsTable list={listResult} />
      </TabsContent>
      <TabsContent value="booked">
        {'coming soon'}
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
