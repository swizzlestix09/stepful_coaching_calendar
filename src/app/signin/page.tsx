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

      if (res.ok) {
        const redirectUrl = res

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
  }

  return (

    <div className="w-1/4 mx-auto justify-center items-center p-8">
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