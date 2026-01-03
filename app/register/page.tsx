"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MSquare as Mosque } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    walletAddress: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user data
    const user = {
      name: formData.name,
      role: formData.role,
      walletAddress: formData.walletAddress,
    }
    localStorage.setItem("user", JSON.stringify(user))

    alert("Registrasi berhasil! Silakan login.")
    router.push("/login")

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
          <p className="text-gray-600 mt-2">Daftar Akun Baru</p>
        </div>

        <Card className="border-emerald-100">
          <CardHeader>
            <CardTitle>Buat Akun Baru</CardTitle>
            <CardDescription>Lengkapi data di bawah ini untuk mendaftar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

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
                  placeholder="Minimal 8 karakter"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role Anda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bendahara">Bendahara Masjid</SelectItem>
                    <SelectItem value="jamaah">Jamaah / Donatur</SelectItem>
                    <SelectItem value="pengawas">Dewan Pengawas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="wallet">Alamat Wallet (Opsional)</Label>
                <Input
                  id="wallet"
                  placeholder="0x..."
                  value={formData.walletAddress}
                  onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                />
                <p className="text-xs text-gray-500">Alamat wallet Ethereum untuk transaksi blockchain</p>
              </div>

              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                {loading ? "Memproses..." : "Daftar"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                Sudah punya akun?{" "}
                <Link href="/login" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Masuk di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
