"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Heart } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard/jamaah" },
  { name: "Donasi Saya", href: "/dashboard/jamaah/donasi" },
  { name: "Transaksi", href: "/dashboard/jamaah/transaksi" },
  { name: "Proposal Aktif", href: "/dashboard/jamaah/proposal" },
]

export default function JamaahDonasiPage() {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    name: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert("Donasi berhasil dicatat ke blockchain!")
    setFormData({ category: "", amount: "", name: "", message: "" })
  }

  return (
    <AuthGuard allowedRoles={["jamaah"]}>
      <DashboardLayout userRole="jamaah" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Berikan Donasi</h1>
            <p className="text-gray-600 mt-2">Salurkan donasi Anda dengan transparansi blockchain</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle>Form Donasi</CardTitle>
                  <CardDescription>Isi formulir di bawah ini untuk melakukan donasi</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori Donasi</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih kategori donasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="infaq">Infaq</SelectItem>
                          <SelectItem value="zakat">Zakat</SelectItem>
                          <SelectItem value="wakaf">Wakaf</SelectItem>
                          <SelectItem value="qurban">Qurban</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Jumlah Donasi (Rp)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Masukkan jumlah donasi"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        required
                        min="1000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Donatur (Opsional)</Label>
                      <Input
                        id="name"
                        placeholder="Nama Anda atau 'Hamba Allah'"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <p className="text-xs text-gray-500">Kosongkan jika ingin anonim</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Pesan / Doa (Opsional)</Label>
                      <Textarea
                        id="message"
                        placeholder="Tulis pesan atau doa Anda..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                      <Heart className="w-4 h-4 mr-2" />
                      Kirim Donasi
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
                <CardHeader>
                  <CardTitle>Keuntungan Donasi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Transparan</h4>
                      <p className="text-sm text-gray-600">Tercatat permanen di blockchain</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">🔒</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Aman</h4>
                      <p className="text-sm text-gray-600">Tidak dapat diubah atau dihapus</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">📊</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Terverifikasi</h4>
                      <p className="text-sm text-gray-600">Dapat dicek siapa saja</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="text-2xl">💰</div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Akuntabel</h4>
                      <p className="text-sm text-gray-600">Penggunaan dana diawasi dewan</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-emerald-100">
                <CardHeader>
                  <CardTitle>Info Rekening</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500">Bank Syariah Indonesia</p>
                    <p className="font-mono font-semibold text-gray-900">1234567890</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Atas Nama</p>
                    <p className="font-semibold text-gray-900">Masjid Al-Falah</p>
                  </div>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-gray-600">Setelah transfer, isi form di samping untuk mencatat donasi</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
