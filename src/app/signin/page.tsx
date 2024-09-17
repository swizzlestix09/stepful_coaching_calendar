import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (

    <div className="w-1/3 mx-auto justify-center items-center">

      <form className="flex-col align-center">
        <p>Sign-in</p>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button type="submit">Sign-In</Button>
        <Button type="submit">Sign-Up</Button>
      </form>
    </div>

  )
}