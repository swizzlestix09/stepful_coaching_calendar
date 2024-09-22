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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

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
}

const AppointmentsTable = ({ list }: Props) => {
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