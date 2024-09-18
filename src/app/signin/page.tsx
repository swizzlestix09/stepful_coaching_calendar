"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UserInfo = {
  email: string,
  password: string,
  type: ''
}

export default function Page() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
    type: ''
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



/*
 * get information on how to make a function that posts information to the database
 * double checking the user information  if successful we have to check who is a coach and who is a student
 * otherwise they have to be redirected to the homepage (/signin)
 *
 * Once this is complete can move on to calendar
 *  1) allow a coach to create bookings
 *    - pick a day
 *     -how do i enable a coach to pick a day?
 * Create a calendar with shadcn , use state for date
 *   how to select a time? Input?
 *   also what is the format of the time
 *   how to store time in postgrs sql
 *     do not book past (before today) time
 *   once  time + day is selected enable save
 *     is booked in slots needs to be updated
 *      booking needs slot id and student id updated
 *
 *
 * - 2 hour time slot
 *