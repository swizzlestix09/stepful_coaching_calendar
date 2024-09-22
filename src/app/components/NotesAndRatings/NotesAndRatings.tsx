import { memo } from "react"
import Notes from "../notes/Notes"

const NotesAndRatings = () => {

  return (
    <div className="pt-8">
      <Notes />
    </div>
  )
}

export default memo(NotesAndRatings)