"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UserInfo = {
  email: string,
  password: string
}

export default function Page() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: ''
  })
  const router = useRouter();

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }))

  }

  const handleUserInfoSubmit = () => {
    //send info to database
    //if error update UI
    //if no errors progress to next page
  }

  const handleSignUpClick = () => router.push('/signup')

  return (

    <div className="w-1/3 mx-auto justify-center items-center" onSubmit={(e) => e.preventDefault()}>
      <form className="flex-col align-center">
        <p>Sign-in</p>
        <Input
          name='email'
          placeholder="Email"
          value={userInfo.email}
          onChange={handleUserInfoChange}
        />
        <Input
          name='password'
          placeholder="Password"
          type="password"
          value={userInfo.password}
          onChange={handleUserInfoChange} />
        <Button type="submit">Sign-In</Button>
        <Button type="button" onClick={handleSignUpClick}>Sign-Up</Button>
      </form>
    </div>

  )
}

