import { useState, useEffect } from "react"

export const useBookedSlots = (url: string, userId?: number) => {
  const [bookedSlots, setBookedSlots] = useState([])

  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {

        const res = await fetch(`${url}?userId=${userId}`)
        const data = await res.json()

        setBookedSlots(data)
      } catch {
        console.error('error with fetch')
      }
    }
    fetchBookedSlots()
    const intervalId = setInterval(fetchBookedSlots, 30000);
    return () => clearInterval(intervalId);
  }, [url, userId])

  return bookedSlots
}