import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { StringToBoolean } from "class-variance-authority/types";

type Props = {
  ratingTitle?: string;
}
const ratings = [
  { value: '0', label: "Catastrophe! 🚨" },
  { value: '1', label: "Could Use Some Serious Help! 🤦" },
  { value: '2', label: "Mediocre at Best... 😐" },
  { value: '3', label: "Not Too Shabby! 👍" },
  { value: '4', label: "Outstanding! I Can't Even! 🤩" },
];


const Rating = ({ ratingTitle = "Select a rating" }: Props) => {
  return (

    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={ratingTitle} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {ratings.map((ratingValue) => (
            <SelectItem key={ratingValue.value} value={ratingValue.value}>{ratingValue.label}</SelectItem>

          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export default Rating;