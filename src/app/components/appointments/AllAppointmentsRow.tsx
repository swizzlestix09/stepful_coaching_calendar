import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AppointmentItem } from "./AppointmentsTable"
import { memo, MouseEvent } from "react"
import { useUserContext } from "../contexts/UserContext"

const buttonLabel = 'Book'

type Props = {
  listItem: AppointmentItem,
  userType: string,
}

const AllAppointmentsRow = ({ listItem, userType }: Props) => {
  const { start_time, end_time, created_at, is_booked, coach_name, id } = listItem;
  const date = new Date(start_time)
  const appointmentDate = date.toLocaleDateString()
  const startTime = date.toLocaleTimeString()
  const endTime = new Date(end_time).toLocaleTimeString()
  const creation = new Date(created_at).toLocaleString()
  const { userId } = useUserContext();

  const handleAppointmentClick = async (event: MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.value;

    if (userType === 'student') {
      try {
        await fetch(`/api/student/${userId}`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            userId,
            id,
          })
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <TableRow key={listItem.id}>
      <TableCell className="font-medium">{appointmentDate}</TableCell>
      {coach_name && <TableCell>{coach_name}</TableCell>}
      <TableCell>{startTime}</TableCell>
      <TableCell>{endTime}</TableCell>
      <TableCell>{is_booked ? 'yes' : 'no'}</TableCell>
      <TableCell>{creation}</TableCell>
      {(userType === 'student' && !is_booked) && <TableCell>
        <Button value={id} onClick={handleAppointmentClick}>{buttonLabel}</Button></TableCell>}
    </TableRow>
  )
}

export default memo(AllAppointmentsRow)