"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ReportSummary } from "@/components/report-summary"
import { ReportChart } from "@/components/report-chart"
import { ReportTable } from "@/components/report-table"

const navigation = [
  { name: "Dashboard", href: "/dashboard/pengawas" },
  { name: "Voting Aktif", href: "/dashboard/pengawas/voting" },
  { name: "Riwayat Voting", href: "/dashboard/pengawas/riwayat" },
  { name: "Laporan", href: "/dashboard/pengawas/laporan" },
]

export default function PengawasLaporanPage() {
  return (
    <AuthGuard allowedRoles={["pengawas"]}>
      <DashboardLayout userRole="pengawas" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laporan Keuangan</h1>
            <p className="text-gray-600 mt-2">Pantau dan awasi seluruh transaksi keuangan masjid</p>
          </div>

          <ReportSummary />
          <ReportChart />
          <ReportTable />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
