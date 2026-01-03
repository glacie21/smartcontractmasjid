"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      if (userData.role === "bendahara") {
        router.push("/dashboard/bendahara")
      } else if (userData.role === "jamaah") {
        router.push("/dashboard/jamaah")
      } else if (userData.role === "pengawas") {
        router.push("/dashboard/pengawas")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Memuat...</p>
      </div>
    </div>
  )
}
