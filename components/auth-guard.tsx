"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthGuardProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    if (!allowedRoles.includes(userData.role)) {
      alert("Anda tidak memiliki akses ke halaman ini")
      router.push("/login")
      return
    }

    setIsAuthorized(true)
  }, [router, allowedRoles])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
