"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, TrendingUp, TrendingDown, CheckCircle, FileText, Vote } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard/bendahara" },
  { name: "Catat Pemasukan", href: "/dashboard/bendahara/pemasukan" },
  { name: "Ajukan Pengeluaran", href: "/dashboard/bendahara/pengeluaran" },
  { name: "Laporan", href: "/dashboard/bendahara/laporan" },
]

export default function BendaharaDashboardPage() {
  const stats = [
    {
      title: "Total Pemasukan",
      value: "Rp 125,000,000",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Total Pengeluaran",
      value: "Rp 45,000,000",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Saldo Tersedia",
      value: "Rp 80,000,000",
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Proposal Aktif",
      value: "3 Proposal",
      icon: Vote,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  const quickActions = [
    {
      title: "Catat Pemasukan Baru",
      description: "Tambahkan transaksi pemasukan ke blockchain",
      icon: TrendingUp,
      href: "/dashboard/bendahara/pemasukan",
      color: "bg-emerald-600 hover:bg-emerald-700",
    },
    {
      title: "Ajukan Pengeluaran",
      description: "Buat proposal pengeluaran untuk voting",
      icon: FileText,
      href: "/dashboard/bendahara/pengeluaran",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Lihat Laporan",
      description: "Akses laporan keuangan lengkap",
      icon: FileText,
      href: "/dashboard/bendahara/laporan",
      color: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  const recentActivities = [
    {
      type: "pemasukan",
      description: "Pemasukan dari Infaq Jumat",
      amount: "Rp 2,500,000",
      date: "2 jam yang lalu",
      status: "confirmed",
    },
    {
      type: "proposal",
      description: "Proposal Renovasi Mihrab",
      amount: "Rp 15,000,000",
      date: "5 jam yang lalu",
      status: "voting",
    },
    {
      type: "pengeluaran",
      description: "Pembayaran Listrik",
      amount: "Rp 1,200,000",
      date: "1 hari yang lalu",
      status: "executed",
    },
  ]

  return (
    <AuthGuard allowedRoles={["bendahara"]}>
      <DashboardLayout userRole="bendahara" navigation={navigation}>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Bendahara</h1>
            <p className="text-gray-600 mt-2">Kelola keuangan masjid dengan transparansi blockchain</p>
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

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.title} href={action.href}>
                    <Card className="border-emerald-100 hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardContent className="pt-6">
                        <div className={`p-3 ${action.color} rounded-lg w-fit mb-4`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Recent Activities */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Transaksi dan proposal terkini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "pemasukan"
                            ? "bg-emerald-100"
                            : activity.type === "proposal"
                              ? "bg-amber-100"
                              : "bg-red-100"
                        }`}
                      >
                        {activity.type === "pemasukan" ? (
                          <TrendingUp
                            className={`w-5 h-5 ${
                              activity.type === "pemasukan"
                                ? "text-emerald-600"
                                : activity.type === "proposal"
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          />
                        ) : activity.type === "proposal" ? (
                          <Vote
                            className={`w-5 h-5 ${
                              activity.type === "pemasukan"
                                ? "text-emerald-600"
                                : activity.type === "proposal"
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          />
                        ) : (
                          <TrendingDown
                            className={`w-5 h-5 ${
                              activity.type === "pemasukan"
                                ? "text-emerald-600"
                                : activity.type === "proposal"
                                  ? "text-amber-600"
                                  : "text-red-600"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{activity.amount}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {activity.status === "confirmed" && (
                          <>
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-xs text-emerald-600">Terkonfirmasi</span>
                          </>
                        )}
                        {activity.status === "voting" && (
                          <>
                            <Vote className="w-4 h-4 text-amber-600" />
                            <span className="text-xs text-amber-600">Voting</span>
                          </>
                        )}
                        {activity.status === "executed" && (
                          <>
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-xs text-blue-600">Dieksekusi</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
