"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProposalForm } from "@/components/proposal-form"
import { ProposalList } from "@/components/proposal-list"

const navigation = [
  { name: "Dashboard", href: "/dashboard/bendahara" },
  { name: "Catat Pemasukan", href: "/dashboard/bendahara/pemasukan" },
  { name: "Ajukan Pengeluaran", href: "/dashboard/bendahara/pengeluaran" },
  { name: "Laporan", href: "/dashboard/bendahara/laporan" },
]

export default function BendaharaPengeluaranPage() {
  return (
    <AuthGuard allowedRoles={["bendahara"]}>
      <DashboardLayout userRole="bendahara" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ajukan Pengeluaran</h1>
            <p className="text-gray-600 mt-2">Buat proposal pengeluaran untuk disetujui dewan pengawas</p>
          </div>

          <ProposalForm />
          <ProposalList />
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
