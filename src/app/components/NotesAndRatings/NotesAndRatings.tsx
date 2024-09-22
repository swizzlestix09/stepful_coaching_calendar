import { memo } from "react"
import Notes from "../notes/Notes"
import Rating from "../rating/Rating"


//which completed appointment is selected
const NotesAndRatings = () => {

  return (
    <div className="p-8 flex flex-col w-100">
      <Rating />
      <Notes />
    </div>
  )
}

export default memo(NotesAndRatings)