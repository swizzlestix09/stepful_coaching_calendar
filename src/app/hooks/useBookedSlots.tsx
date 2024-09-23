import { useState, useEffect } from "react"

export const useBookedSlots = (url: string, userId?: number) => {
  if (!userId) return null;
  const [slots, setSlots] = useState([])

  useEffect(() => {
    const fetchSlots = async () => {
      try {

        const res = await fetch(`${url}?userId=${userId}`)
        const data = await res.json()
        console.log(data)
        setSlots(data)
      } catch {
        console.error('error with fetch')
      }
    }
    fetchSlots()

    const intervalId = setInterval(fetchSlots, 30000);
    return () => clearInterval(intervalId);

  }, [])

  return slots
}