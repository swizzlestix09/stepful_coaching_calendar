import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { memo } from "react"

type SlotItem = {
  id: number;
  coach_id: number,
  start_time: Date,
  end_time: Date,
  is_booked: boolean,
  created_at: Date
}

type Props = {
  list: SlotItem[];
  timeZone: string,
}

const AppointmentsTable = ({ timeZone, list }: Props) => {
  return (
    <Table className="pt-8">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead>Booked</TableHead>
          <TableHead >Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((listItem) => {
          const { start_time, end_time, created_at, is_booked } = listItem;
          const date = new Date(start_time)
          console.log(date)
          const appointmentDate = date.toLocaleDateString()
          const startTime = date.toLocaleTimeString()
          const endTime = new Date(end_time).toLocaleTimeString()
          const creation = new Date(created_at).toLocaleString()
          return (
            <TableRow key={listItem.id}>
              <TableCell className="font-medium">{appointmentDate}</TableCell>
              <TableCell>{startTime}</TableCell>
              <TableCell>{endTime}</TableCell>
              <TableCell>{is_booked ? 'yes' : 'no'}</TableCell>
              <TableCell>{creation}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow className="w-100">
          <TableCell className="w-100">Total Appointments</TableCell>
          <TableCell className="w-100 text-right">{list.length > 0 ? list.length - 1 : 0}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default memo(AppointmentsTable)