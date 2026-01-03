"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MSquare as Mosque } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user data in localStorage (demo purposes)
    const demoUsers = {
      "bendahara@masjid.com": { role: "bendahara", name: "Ahmad Bendahara" },
      "jamaah@masjid.com": { role: "jamaah", name: "Fatimah Jamaah" },
      "pengawas@masjid.com": { role: "pengawas", name: "Usman Pengawas" },
    }

    const user = demoUsers[formData.email as keyof typeof demoUsers]
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect based on role
      if (user.role === "bendahara") {
        router.push("/dashboard/bendahara")
      } else if (user.role === "jamaah") {
        router.push("/dashboard/jamaah")
      } else if (user.role === "pengawas") {
        router.push("/dashboard/pengawas")
      }
    } else {
      alert("Email atau password salah")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-emerald-600 rounded-xl">
              <Mosque className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">MasjidChain</h1>
          <p className="text-gray-600 mt-2">Transparansi Keuangan Berbasis Blockchain</p>
        </div>

        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle>Masuk ke Akun</CardTitle>
            <CardDescription>Masukkan email dan password Anda untuk melanjutkan</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@masjid.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Belum punya akun?{" "}
                <Link href="/register" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Daftar di sini
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
              <p className="text-xs font-medium text-emerald-900 mb-2">Demo Login:</p>
              <div className="text-xs text-emerald-700 space-y-1">
                <p>Bendahara: bendahara@masjid.com</p>
                <p>Jamaah: jamaah@masjid.com</p>
                <p>Pengawas: pengawas@masjid.com</p>
                <p className="text-emerald-600 mt-2">Password: apapun</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
