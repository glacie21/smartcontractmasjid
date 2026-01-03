"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Vote, CheckCircle2, AlertCircle, Search } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard/pengawas" },
  { name: "Voting Aktif", href: "/dashboard/pengawas/voting" },
  { name: "Riwayat Voting", href: "/dashboard/pengawas/riwayat" },
  { name: "Laporan", href: "/dashboard/pengawas/laporan" },
]

export default function PengawasVotingPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const proposals = [
    {
      id: "PROP-001",
      title: "Renovasi Mihrab Masjid",
      description: "Renovasi mihrab yang sudah rusak untuk mempercantik masjid",
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
      description: "Membangun tempat wudhu tambahan untuk jamaah",
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
      description: "Memperbaiki atap yang bocor untuk kenyamanan jamaah",
      amount: "Rp 12,000,000",
      proposer: "Ahmad Bendahara",
      date: "2 hari yang lalu",
      votes: 4,
      required: 5,
      hasVoted: true,
      urgency: "high",
    },
    {
      id: "PROP-006",
      title: "Pengadaan AC Masjid",
      description: "Membeli AC untuk ruang utama masjid",
      amount: "Rp 18,000,000",
      proposer: "Ahmad Bendahara",
      date: "3 hari yang lalu",
      votes: 1,
      required: 5,
      hasVoted: false,
      urgency: "low",
    },
  ]

  const filteredProposals = proposals.filter((proposal) => {
    const matchesSearch =
      proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "not-voted" && !proposal.hasVoted) ||
      (filterStatus === "voted" && proposal.hasVoted)

    return matchesSearch && matchesFilter
  })

  return (
    <AuthGuard allowedRoles={["pengawas"]}>
      <DashboardLayout userRole="pengawas" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Voting Aktif</h1>
            <p className="text-gray-600 mt-2">Berikan voting untuk proposal pengeluaran yang diajukan</p>
          </div>

          {/* Filters */}
          <Card className="border-emerald-100">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Cari proposal..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="not-voted">Belum Voting</SelectItem>
                    <SelectItem value="voted">Sudah Voting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Proposals List */}
          <div className="space-y-6">
            {filteredProposals.map((proposal) => {
              const progress = (proposal.votes / proposal.required) * 100

              return (
                <Card key={proposal.id} className="border-emerald-100">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-xl">{proposal.title}</CardTitle>
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
                        <CardDescription>{proposal.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{proposal.id}</span>
                          <span>•</span>
                          <span>Oleh {proposal.proposer}</span>
                          <span>•</span>
                          <span>{proposal.date}</span>
                        </div>
                      </div>
                      <div className="text-left lg:text-right">
                        <p className="text-2xl font-bold text-gray-900">{proposal.amount}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress Voting</span>
                        <span className="font-medium text-gray-900">
                          {proposal.votes} / {proposal.required} suara
                        </span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/voting/${proposal.id}`} className="flex-1">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Vote className="w-4 h-4 mr-2" />
                          {proposal.hasVoted ? "Lihat Detail Voting" : "Beri Voting Sekarang"}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredProposals.length === 0 && (
            <Card className="border-emerald-100">
              <CardContent className="py-12">
                <div className="text-center">
                  <p className="text-gray-500">Tidak ada proposal ditemukan</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
