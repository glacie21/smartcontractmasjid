"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { IncomeForm } from "@/components/income-form"
import { IncomeList } from "@/components/income-list"

const navigation = [
  { name: "Dashboard", href: "/dashboard/bendahara" },
  { name: "Catat Pemasukan", href: "/dashboard/bendahara/pemasukan" },
  { name: "Ajukan Pengeluaran", href: "/dashboard/bendahara/pengeluaran" },
  { name: "Laporan", href: "/dashboard/bendahara/laporan" },
]

export default function BendaharaPemasukanPage() {
  return (
    <AuthGuard allowedRoles={["bendahara"]}>
      <DashboardLayout userRole="bendahara" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Catat Pemasukan</h1>
            <p className="text-gray-600 mt-2">Tambahkan transaksi pemasukan ke blockchain</p>
          </div>

          <IncomeForm />
          <IncomeList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
