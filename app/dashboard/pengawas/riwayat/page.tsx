"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, ExternalLink } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard/pengawas" },
  { name: "Voting Aktif", href: "/dashboard/pengawas/voting" },
  { name: "Riwayat Voting", href: "/dashboard/pengawas/riwayat" },
  { name: "Laporan", href: "/dashboard/pengawas/laporan" },
]

export default function PengawasRiwayatPage() {
  const votingHistory = [
    {
      id: "VOTE-024",
      proposal: "Pembelian Karpet Baru",
      proposalId: "PROP-002",
      decision: "approve",
      amount: "Rp 8,000,000",
      date: "15 Des 2024, 14:30",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      blockNumber: "12345678",
      finalResult: "approved",
    },
    {
      id: "VOTE-023",
      proposal: "Pengadaan Sound System",
      proposalId: "PROP-004",
      decision: "approve",
      amount: "Rp 5,000,000",
      date: "10 Des 2024, 10:15",
      txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
      blockNumber: "12345123",
      finalResult: "approved",
    },
    {
      id: "VOTE-022",
      proposal: "Renovasi Kantor Takmir",
      proposalId: "PROP-007",
      decision: "reject",
      amount: "Rp 20,000,000",
      date: "5 Des 2024, 16:45",
      txHash: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
      blockNumber: "12344890",
      finalResult: "rejected",
    },
    {
      id: "VOTE-021",
      proposal: "Pembelian Generator Listrik",
      proposalId: "PROP-008",
      decision: "approve",
      amount: "Rp 12,000,000",
      date: "1 Des 2024, 09:20",
      txHash: "0x9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h",
      blockNumber: "12344567",
      finalResult: "approved",
    },
  ]

  const stats = [
    { label: "Total Voting", value: votingHistory.length },
    { label: "Disetujui", value: votingHistory.filter((v) => v.decision === "approve").length },
    { label: "Ditolak", value: votingHistory.filter((v) => v.decision === "reject").length },
  ]

  return (
    <AuthGuard allowedRoles={["pengawas"]}>
      <DashboardLayout userRole="pengawas" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Riwayat Voting</h1>
            <p className="text-gray-600 mt-2">Semua voting yang telah Anda berikan tercatat di blockchain</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-emerald-100">
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Voting History List */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle>Daftar Riwayat Voting</CardTitle>
              <CardDescription>Semua voting terverifikasi di blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {votingHistory.map((vote) => (
                  <div key={vote.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{vote.proposal}</h3>
                          {vote.decision === "approve" ? (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Anda Setuju
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              <XCircle className="w-3 h-3 mr-1" />
                              Anda Tolak
                            </Badge>
                          )}
                          {vote.finalResult === "approved" && (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Hasil: Disetujui</Badge>
                          )}
                          {vote.finalResult === "rejected" && (
                            <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Hasil: Ditolak</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{vote.id}</span>
                          <span>•</span>
                          <span>{vote.proposalId}</span>
                          <span>•</span>
                          <span>{vote.date}</span>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">TX Hash:</p>
                            <code className="text-xs font-mono text-gray-700 bg-white px-2 py-1 rounded">
                              {vote.txHash.substring(0, 20)}...
                            </code>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">Block: {vote.blockNumber}</p>
                        </div>
                      </div>

                      <div className="text-left lg:text-right">
                        <p className="text-2xl font-bold text-gray-900">{vote.amount}</p>
                        <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verifikasi di Blockchain
                        </Button>
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
