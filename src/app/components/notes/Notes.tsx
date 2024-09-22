import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const Notes = () => {

  return (
    <form className=" max-w-lg">
      <label className="pt-1 block text-gray-700 text-sm font-bold mb-2" htmlFor="note">
        Your Notes
      </label>
      <Textarea placeholder="Type notes here." />
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
        >
          Save Notes
        </Button>
      </div>
    </form>
  )
}


export default Notes;