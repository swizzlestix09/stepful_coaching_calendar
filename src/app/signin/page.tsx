"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UserInfo = {
  name: string,
  password: string
}

export default function Page() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: '',
    password: ''
  })
  const router = useRouter();

  const handleSignUpClick = () => router.push('/signup')

  return (

    <div className="w-1/3 mx-auto justify-center items-center">
      <form className="flex-col align-center">
        <p>Sign-in</p>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button type="submit">Sign-In</Button>
        <Button type="button" onClick={handleSignUpClick}>Sign-Up</Button>
      </form>
    </div>

  )
}

