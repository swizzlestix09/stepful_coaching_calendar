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
import { formatTitle } from "../utils/utils";
import { useUserContext } from "./contexts/UserContext";

import AllAppointmentsRow from "./AllAppointmentsRow";

export type AppointmentItem = {
  id: number,
  coach_id: number,
  start_time: Date,
  end_time: Date,
  is_booked: boolean,
  created_at: Date,
  coach_name?: string
}

export type BookingItem = {
  booking_id: number,
  booking_time: Date,
  coach_telephone: string,
  end_time: Date,
  slot_id: number,
  start_time: Date,
  student_id: number
}

type Props = {
  list: AppointmentItem[];

}


const excludedKeys = ['id', 'coach_id', 'booking_id', 'slot_id']
const dateString = 'Date'


const AppointmentsTable = ({ list }: Props) => {

  const { userType } = useUserContext();

  if (list.length === 0) return null
  const listKeys = Object.keys(list[0]).filter((key) => !excludedKeys.includes(key))





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
          <AllAppointmentsRow listItem={listItem} userType={userType} />
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
