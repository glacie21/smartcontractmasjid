"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ReportSummary } from "@/components/report-summary"
import { ReportChart } from "@/components/report-chart"
import { ReportTable } from "@/components/report-table"

const navigation = [
  { name: "Dashboard", href: "/dashboard/bendahara" },
  { name: "Catat Pemasukan", href: "/dashboard/bendahara/pemasukan" },
  { name: "Ajukan Pengeluaran", href: "/dashboard/bendahara/pengeluaran" },
  { name: "Laporan", href: "/dashboard/bendahara/laporan" },
]

export default function BendaharaLaporanPage() {
  return (
    <AuthGuard allowedRoles={["bendahara"]}>
      <DashboardLayout userRole="bendahara" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laporan Keuangan</h1>
            <p className="text-gray-600 mt-2">Ringkasan dan detail transaksi keuangan masjid</p>
          </div>

          <ReportSummary />
          <ReportChart />
          <ReportTable />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
