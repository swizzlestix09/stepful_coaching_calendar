"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { FormEvent } from "react"

type UserInfo = {
  email: string,
  password: string,
  type?: ''
}

export default function Page() {
  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo>({
    email: '',
    password: '',
    type: ''
  })
  const router = useRouter();

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo(prevInfo => ({ ...prevInfo, [name]: value }))
  }

  const handleUserInfoSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('form submitted')
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password
        })
      })
      console.log('response: ', res)
      if (res.ok) {
        const redirectUrl = res
        console.log(redirectUrl)
        if (redirectUrl) {
          router.push(res.url)
        }
        setErrorMessage('')
      } else {
        setErrorMessage('Invalid credentials. Please try again.')
      }

    } catch (error) {
      console.error('Error during login: ', error)
      setErrorMessage('Invalid credentials. Please try again.')
    }
    console.log('done')
  }

  return (

    <div className="w-1/3 mx-auto justify-center items-center">
      <form className="flex-col align-center" onSubmit={handleUserInfoSubmit}>
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
        {errorMessage.length > 0 && (
          <p style={{ color: 'red' }}>{errorMessage}</p>
        )}
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
 *      telephone number of student needs to be referenced to by student_id in booking
 *      telephone number of coach needs to be referenced to by slot_id and then coach_id
 *
 *
 * - 2 hour time slot
 */