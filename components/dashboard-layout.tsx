"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MSquare as Mosque, LogOut, Menu } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: string
  navigation: { name: string; href: string; icon?: React.ReactNode }[]
}

export function DashboardLayout({ children, userRole, navigation }: DashboardLayoutProps) {
  const router = useRouter()
  const [userName, setUserName] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      setUserName(userData.name)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/login")
  }

  const roleLabel = {
    bendahara: "Bendahara Masjid",
    jamaah: "Jamaah / Donatur",
    pengawas: "Dewan Pengawas",
  }[userRole]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Mosque className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MasjidChain</h1>
                <p className="text-xs text-emerald-600">{roleLabel}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{roleLabel}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="hidden sm:flex bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden border-t border-emerald-100 bg-white">
            <nav className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-emerald-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                Keluar
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-emerald-100 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 py-3 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-t-lg border-b-2 border-transparent hover:border-emerald-600 transition-colors whitespace-nowrap flex items-center gap-2"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  )
}
