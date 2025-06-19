"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/login") // redirige sin dejar historial
  }, [router])

  return null // no se renderiza nada porque se redirige inmediatamente
}