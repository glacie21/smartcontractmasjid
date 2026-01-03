"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Eye, Clock, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", href: "/dashboard/jamaah" },
  { name: "Donasi Saya", href: "/dashboard/jamaah/donasi" },
  { name: "Transaksi", href: "/dashboard/jamaah/transaksi" },
  { name: "Proposal Aktif", href: "/dashboard/jamaah/proposal" },
]

export default function JamaahProposalPage() {
  const proposals = [
    {
      id: "PROP-001",
      title: "Renovasi Mihrab Masjid",
      amount: "Rp 15,000,000",
      status: "voting",
      votes: 3,
      required: 5,
      description: "Renovasi mihrab yang sudah rusak untuk mempercantik masjid",
      date: "5 jam yang lalu",
    },
    {
      id: "PROP-002",
      title: "Pembelian Karpet Baru",
      amount: "Rp 8,000,000",
      status: "approved",
      votes: 5,
      required: 5,
      description: "Mengganti karpet lama yang sudah rusak dengan karpet berkualitas",
      date: "2 hari yang lalu",
    },
    {
      id: "PROP-003",
      title: "Pembangunan Tempat Wudhu",
      amount: "Rp 25,000,000",
      status: "voting",
      votes: 2,
      required: 5,
      description: "Membangun tempat wudhu tambahan untuk jamaah",
      date: "1 minggu yang lalu",
    },
    {
      id: "PROP-004",
      title: "Pengadaan Sound System",
      amount: "Rp 5,000,000",
      status: "executed",
      votes: 5,
      required: 5,
      description: "Membeli sound system baru untuk kegiatan masjid",
      date: "2 minggu yang lalu",
    },
  ]

  return (
    <AuthGuard allowedRoles={["jamaah"]}>
      <DashboardLayout userRole="jamaah" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Proposal Aktif</h1>
            <p className="text-gray-600 mt-2">Lihat proposal pengeluaran yang sedang berlangsung</p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {proposals.map((proposal) => {
              const progress = (proposal.votes / proposal.required) * 100

              return (
                <Card key={proposal.id} className="border-emerald-100">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-xl">{proposal.title}</CardTitle>
                          {proposal.status === "voting" && (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                              <Clock className="w-3 h-3 mr-1" />
                              Voting
                            </Badge>
                          )}
                          {proposal.status === "approved" && (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Disetujui
                            </Badge>
                          )}
                          {proposal.status === "executed" && (
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Dieksekusi
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{proposal.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{proposal.id}</span>
                          <span>•</span>
                          <span>{proposal.date}</span>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
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
                        <Button variant="outline" className="w-full bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Detail
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
