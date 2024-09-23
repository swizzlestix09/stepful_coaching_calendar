import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { BookingItem } from "./AppointmentsTable"
import { memo } from "react"
import { formatUSTelephone } from "@/app/utils/utils"




type Props = {
  listItem: BookingItem,
}

const AllBookingsRow = ({ listItem }: Props) => {
  console.log('in booking: ', listItem)

  const { booking_id, student_name, start_time, end_time, student_telephone, coach_telephone } = listItem;
  if (!start_time) { }
  const startDate = new Date(start_time)
  const endDate = new Date(end_time)
  const onlyStartDate = startDate.toLocaleDateString()
  const onlyStartTime = startDate.toLocaleTimeString()
  const onlyEndTime = endDate.toLocaleTimeString()
  const phoneNumber = coach_telephone ?? student_telephone



  return (
    <TableRow key={booking_id}>
      <TableCell className="font-medium">{onlyStartDate}</TableCell>
      <TableCell className="font-medium">{onlyStartTime}</TableCell>
      <TableCell className="font-medium">{onlyEndTime}</TableCell>
      <TableCell>{formatUSTelephone(phoneNumber)}</TableCell>
      <TableCell>{student_name}</TableCell>
    </TableRow>
  )
}

export default memo(AllBookingsRow)