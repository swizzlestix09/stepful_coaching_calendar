import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { memo, MouseEvent } from "react"
import { formatTitle } from "../../utils/utils";
import { useUserContext } from "../contexts/UserContext";

import AllAppointmentsRow from "./AllAppointmentsRow";
import AllBookingsRow from "./AllBookingsRow";

export type AppointmentItem = {
  id: number,
  coach_id: number,
  start_time: Date,
  end_time: Date,
  is_booked: boolean,
  created_at: Date,
  coach_name?: string
}

export type BookingItem = AppointmentItem & {
  booking_id: number,
  booking_time: Date,
  coach_telephone: string,
  slot_id: number,
  student_name: string,
  student_id: number
  student_telephone: string
}

type Props = {
  list: AppointmentItem[];
  bookedAppointments?: boolean;
}

const excludedKeys = ['id', 'coach_id', 'booking_id', 'slot_id', 'student_id', 'booking_time']
const dateString = 'Date'

const AppointmentsTable = ({ bookedAppointments, list }: Props) => {
  const { userType } = useUserContext();
  const AppointmentComponent = bookedAppointments ? AllBookingsRow : AllAppointmentsRow
  if (list.length === 0) return null
  let listKeys = Object.keys(list[0]).filter((key) => !excludedKeys.includes(key))


  return (
    <Table className="pt-8">
      <TableHeader>
        <TableRow>
          <TableHead>{dateString}</TableHead>
          {listKeys.map((title) => (
            <TableHead>{formatTitle(title)}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((listItem) => (
          <AppointmentComponent listItem={listItem} userType={userType} />
        ))}
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
