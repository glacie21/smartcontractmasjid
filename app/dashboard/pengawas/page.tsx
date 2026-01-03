"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Vote, CheckCircle2, XCircle, Clock, Eye, AlertCircle } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard/pengawas" },
  { name: "Voting Aktif", href: "/dashboard/pengawas/voting" },
  { name: "Riwayat Voting", href: "/dashboard/pengawas/riwayat" },
  { name: "Laporan", href: "/dashboard/pengawas/laporan" },
]

export default function PengawasDashboardPage() {
  const stats = [
    {
      title: "Proposal Menunggu",
      value: "3 Proposal",
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      title: "Total Voting Saya",
      value: "24 Voting",
      icon: Vote,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Proposal Disetujui",
      value: "18 Proposal",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Proposal Ditolak",
      value: "3 Proposal",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  const pendingProposals = [
    {
      id: "PROP-001",
      title: "Renovasi Mihrab Masjid",
      amount: "Rp 15,000,000",
      proposer: "Ahmad Bendahara",
      date: "5 jam yang lalu",
      votes: 3,
      required: 5,
      hasVoted: false,
      urgency: "high",
    },
    {
      id: "PROP-003",
      title: "Pembangunan Tempat Wudhu",
      amount: "Rp 25,000,000",
      proposer: "Ahmad Bendahara",
      date: "1 minggu yang lalu",
      votes: 2,
      required: 5,
      hasVoted: false,
      urgency: "medium",
    },
    {
      id: "PROP-005",
      title: "Perbaikan Atap Masjid",
      amount: "Rp 12,000,000",
      proposer: "Ahmad Bendahara",
      date: "2 hari yang lalu",
      votes: 4,
      required: 5,
      hasVoted: true,
      urgency: "high",
    },
  ]

  const recentVotes = [
    {
      proposal: "Pembelian Karpet Baru",
      decision: "approve",
      date: "2 hari yang lalu",
      amount: "Rp 8,000,000",
    },
    {
      proposal: "Pengadaan Sound System",
      decision: "approve",
      date: "2 minggu yang lalu",
      amount: "Rp 5,000,000",
    },
    {
      proposal: "Renovasi Kantor Takmir",
      decision: "reject",
      date: "3 minggu yang lalu",
      amount: "Rp 20,000,000",
    },
  ]

  return (
    <AuthGuard allowedRoles={["pengawas"]}>
      <DashboardLayout userRole="pengawas" navigation={navigation}>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Dashboard Dewan Pengawas</h1>
            <p className="text-blue-50 mb-6">
              Anda memiliki tanggung jawab untuk mengawasi dan menyetujui setiap pengeluaran dana masjid
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard/pengawas/voting">
                <Button className="bg-white text-blue-600 hover:bg-blue-50">
                  <Vote className="w-4 h-4 mr-2" />
                  Lihat Proposal Aktif
                </Button>
              </Link>
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

          {/* Pending Proposals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Proposal Menunggu Voting</h2>
              <Link href="/dashboard/pengawas/voting">
                <Button variant="outline" size="sm" className="bg-transparent">
                  Lihat Semua
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {pendingProposals.map((proposal) => (
                <Card key={proposal.id} className="border-emerald-100">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{proposal.title}</h3>
                          {proposal.urgency === "high" && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                          {proposal.hasVoted && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Sudah Voting
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{proposal.id}</span>
                          <span>•</span>
                          <span>Oleh {proposal.proposer}</span>
                          <span>•</span>
                          <span>{proposal.date}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Voting:{" "}
                          <span className="font-semibold">
                            {proposal.votes} / {proposal.required} suara
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start lg:items-end gap-3">
                        <p className="text-2xl font-bold text-gray-900">{proposal.amount}</p>
                        <Link href={`/voting/${proposal.id}`} className="w-full lg:w-auto">
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            <Eye className="w-4 h-4 mr-2" />
                            {proposal.hasVoted ? "Lihat Detail" : "Beri Voting"}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Votes */}
          <Card className="border-emerald-100">
            <CardHeader>
              <CardTitle>Voting Terbaru Saya</CardTitle>
              <CardDescription>Riwayat voting yang telah Anda berikan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentVotes.map((vote, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{vote.proposal}</p>
                      <p className="text-sm text-gray-500">{vote.date}</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <p className="font-semibold text-gray-900">{vote.amount}</p>
                      {vote.decision === "approve" ? (
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Disetujui
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                          <XCircle className="w-3 h-3 mr-1" />
                          Ditolak
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-600 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tanggung Jawab Pengawas</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Sebagai dewan pengawas, setiap keputusan Anda akan tercatat permanen di blockchain dan tidak dapat
                    diubah. Pastikan untuk meninjau setiap proposal dengan seksama sebelum memberikan voting.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4 list-disc">
                    <li>Minimal {pendingProposals[0]?.required || 5} voting diperlukan untuk menyetujui proposal</li>
                    <li>Setiap pengawas hanya dapat memberikan 1 vote per proposal</li>
                    <li>Voting akan tercatat di blockchain dengan transparansi penuh</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
