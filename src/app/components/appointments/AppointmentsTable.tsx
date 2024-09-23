import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { memo } from "react"
import { formatTitle } from "../../utils/utils";
import { useUserContext } from "../contexts/UserContext";

import AllAppointmentsRow from "./AllAppointmentsRow";
import AllBookingsRow from "./AllBookingsRow";

export type AppointmentItem = {
  id: number,
  coach_id: number,
  coach_name: string
  created_at: Date,
  end_time: Date,
  is_booked: boolean,
  start_time: Date,
}

export type BookingItem = {
  booking_id: number,
  booking_time: Date,
  coach_telephone?: string,
  slot_id: number,
  student_name?: string,
  student_id?: number
  student_telephone?: string
  end_time: Date,
  is_booked: boolean,
  start_time: Date,
}

type Props = {
  bookedAppointments?: boolean;
  list: AppointmentItem[] | BookingItem[];
}

const excludedKeys = ['id', 'coach_id', 'booking_id', 'slot_id', 'student_id', 'booking_time']
const dateString = 'Date'

const AppointmentsTable = ({ bookedAppointments, list }: Props) => {
  const { userType } = useUserContext();

  if (!list || list.length === 0) {
    return <div>Nothing to show yet</div>;
  }



  const listKeys = Object.keys(list[0]).filter((key) => !excludedKeys.includes(key))

  console.log(list)
  return (
    <Table className="pt-8">
      <TableHeader>
        <TableRow>
          <TableHead>{dateString}</TableHead>
          {listKeys.map((title) => (
            <TableHead key={title}>{formatTitle(title)}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((listItem) => {
          if (bookedAppointments) {
            const bookingItem = listItem as BookingItem; // Assert the type
            return (
              <AllBookingsRow key={bookingItem.booking_id} listItem={bookingItem} />
            );
          } else {
            const appointmentItem = listItem as AppointmentItem; // Assert the type
            return (
              <AllAppointmentsRow key={appointmentItem.id} listItem={appointmentItem} userType={userType} />
            );
          }
        })}
      </TableBody>
      <TableFooter>
        <TableRow className="w-100">
          <TableCell className="w-100">Total Appointments</TableCell>
          <TableCell className="w-100 text-right">{list.length > 0 ? list.length : 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default memo(AppointmentsTable)
