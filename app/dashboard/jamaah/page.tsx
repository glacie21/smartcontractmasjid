"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Search, TrendingUp, CheckCircle2, Building, Users } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard/jamaah" },
  { name: "Donasi Saya", href: "/dashboard/jamaah/donasi" },
  { name: "Transaksi", href: "/dashboard/jamaah/transaksi" },
  { name: "Proposal Aktif", href: "/dashboard/jamaah/proposal" },
]

export default function JamaahDashboardPage() {
  const stats = [
    {
      title: "Total Donasi Saya",
      value: "Rp 5,500,000",
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      title: "Jumlah Transaksi",
      value: "12 Transaksi",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Proposal Disetujui",
      value: "8 Proposal",
      icon: CheckCircle2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Dana Masjid",
      value: "Rp 125,000,000",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const donationCategories = [
    {
      name: "Infaq",
      description: "Donasi umum untuk operasional masjid",
      icon: "🕌",
      total: "Rp 1,200,000",
      transactions: 5,
    },
    {
      name: "Zakat",
      description: "Zakat fitrah dan zakat mal",
      icon: "💰",
      total: "Rp 2,500,000",
      transactions: 3,
    },
    {
      name: "Wakaf",
      description: "Wakaf untuk pembangunan dan renovasi",
      icon: "🏗️",
      total: "Rp 1,500,000",
      transactions: 2,
    },
    {
      name: "Qurban",
      description: "Dana untuk ibadah qurban",
      icon: "🐑",
      total: "Rp 300,000",
      transactions: 2,
    },
  ]

  const recentDonations = [
    {
      category: "Infaq",
      amount: "Rp 500,000",
      date: "3 hari yang lalu",
      txHash: "0x1a2b3c...",
      status: "confirmed",
    },
    {
      category: "Zakat",
      amount: "Rp 1,000,000",
      date: "1 minggu yang lalu",
      txHash: "0x4d5e6f...",
      status: "confirmed",
    },
    {
      category: "Wakaf",
      amount: "Rp 750,000",
      date: "2 minggu yang lalu",
      txHash: "0x7g8h9i...",
      status: "confirmed",
    },
  ]

  return (
    <AuthGuard allowedRoles={["jamaah"]}>
      <DashboardLayout userRole="jamaah" navigation={navigation}>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Assalamu'alaikum, Jamaah!</h1>
            <p className="text-emerald-50 mb-6">
              Terima kasih atas kontribusi Anda untuk masjid. Semua donasi tercatat transparan di blockchain.
            </p>
            <div className="flex gap-4">
              <Button className="bg-white text-emerald-600 hover:bg-emerald-50">
                <Heart className="w-4 h-4 mr-2" />
                Donasi Sekarang
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                <Search className="w-4 h-4 mr-2" />
                Lihat Proposal
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.title} className="border-emerald-100">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                      </div>
                      <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                        <Icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Donation Categories */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Riwayat Donasi per Kategori</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {donationCategories.map((category) => (
                <Card key={category.name} className="border-emerald-100 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-emerald-600">{category.total}</p>
                      <p className="text-xs text-gray-500">{category.transactions} transaksi</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Donations */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle>Donasi Terbaru Saya</CardTitle>
              <CardDescription>Riwayat donasi yang telah terverifikasi di blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDonations.map((donation, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{donation.category}</p>
                      <p className="text-sm text-gray-500">{donation.date}</p>
                      <p className="text-xs text-gray-400 mt-1">TX: {donation.txHash}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{donation.amount}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs text-emerald-600">Terkonfirmasi</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/dashboard/jamaah/donasi">
                  <Button variant="outline" className="w-full bg-transparent">
                    Lihat Semua Donasi
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Transparency Info */}
          <Card className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-green-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-emerald-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Transparansi Penuh</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Semua transaksi donasi Anda tercatat permanen di blockchain dan dapat diverifikasi oleh siapa saja.
                    Anda juga dapat melihat bagaimana dana masjid dikelola melalui sistem proposal dan voting pengawas.
                  </p>
                  <Link href="/dashboard/jamaah/transaksi">
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Verifikasi Transaksi
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
