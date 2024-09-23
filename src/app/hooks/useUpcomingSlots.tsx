import { useEffect, useState } from "react"

export const useUpcomingSlots = (timezone: string, url: string | null, userId?: number) => {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch(`${url}?userId=${userId}&timezone=${timezone}`)
        const data = await res.json()

        setSlots(data)
      } catch {
        console.error('error with fetch')
      }
    }
    fetchSlots()

    const intervalId = setInterval(fetchSlots, 30000);
    return () => clearInterval(intervalId);

  }, [timezone, url, userId])

  return slots
}