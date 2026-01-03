"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, XCircle, Users, FileText } from "lucide-react"
import Link from "next/link"

type ProposalStatus = "pending" | "approved" | "rejected" | "executed"

interface Proposal {
  id: string
  title: string
  purpose: string
  amount: number
  recipient: string
  recipientAddress: string
  details: string
  status: ProposalStatus
  votes: {
    approve: number
    reject: number
    total: number
    required: number
  }
  timestamp: string
  blockNumber: number
  executedHash?: string
}

// Mock data
const mockProposals: Proposal[] = [
  {
    id: "0xprop001",
    title: "Renovasi Masjid Fase 2",
    purpose: "Perbaikan atap dan pengecatan",
    amount: 15000000,
    recipient: "PT Renovasi Makmur",
    recipientAddress: "0x9c1d2e3f4g5h6i7j8k9l",
    details: "Renovasi meliputi perbaikan atap yang bocor dan pengecatan ulang seluruh masjid",
    status: "pending",
    votes: {
      approve: 3,
      reject: 1,
      total: 4,
      required: 5,
    },
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345690,
  },
  {
    id: "0xprop002",
    title: "Operasional Rutin Bulan Ini",
    purpose: "Listrik, air, dan kebersihan",
    amount: 3500000,
    recipient: "Bendahara Masjid",
    recipientAddress: "0x1d2e3f4g5h6i7j8k9l0m",
    details: "Biaya operasional rutin untuk bulan ini termasuk listrik, air, dan biaya kebersihan",
    status: "approved",
    votes: {
      approve: 5,
      reject: 0,
      total: 5,
      required: 5,
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345650,
  },
  {
    id: "0xprop003",
    title: "Pembelian Sound System Baru",
    purpose: "Upgrade peralatan audio masjid",
    amount: 25000000,
    recipient: "Toko Elektronik Al-Makmur",
    recipientAddress: "0x2e3f4g5h6i7j8k9l0m1n",
    details: "Pembelian sound system berkualitas tinggi untuk meningkatkan kualitas audio saat kajian",
    status: "rejected",
    votes: {
      approve: 2,
      reject: 3,
      total: 5,
      required: 5,
    },
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345620,
  },
  {
    id: "0xprop004",
    title: "Santunan Fakir Miskin",
    purpose: "Program santunan bulanan",
    amount: 5000000,
    recipient: "Tim Sosial Masjid",
    recipientAddress: "0x3f4g5h6i7j8k9l0m1n2o",
    details: "Distribusi santunan untuk 50 keluarga fakir miskin di sekitar masjid",
    status: "executed",
    votes: {
      approve: 5,
      reject: 0,
      total: 5,
      required: 5,
    },
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345600,
    executedHash: "0xexec123456",
  },
]

const statusConfig = {
  pending: {
    label: "Menunggu Voting",
    color: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    icon: Clock,
  },
  approved: {
    label: "Disetujui",
    color: "bg-primary/10 text-primary",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Ditolak",
    color: "bg-destructive/10 text-destructive",
    icon: XCircle,
  },
  executed: {
    label: "Telah Dieksekusi",
    color: "bg-accent/10 text-accent",
    icon: CheckCircle2,
  },
}

export function ProposalList() {
  const [filter, setFilter] = useState<"all" | ProposalStatus>("all")

  const filteredProposals = mockProposals.filter((p) => filter === "all" || p.status === filter)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 24) {
      return `${diffHours} jam yang lalu`
    } else if (diffDays === 1) {
      return "1 hari yang lalu"
    } else {
      return `${diffDays} hari yang lalu`
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
            className="rounded-full"
          >
            Semua
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("pending")}
            className="rounded-full"
          >
            Menunggu Voting
          </Button>
          <Button
            variant={filter === "approved" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("approved")}
            className="rounded-full"
          >
            Disetujui
          </Button>
          <Button
            variant={filter === "rejected" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("rejected")}
            className="rounded-full"
          >
            Ditolak
          </Button>
          <Button
            variant={filter === "executed" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("executed")}
            className="rounded-full"
          >
            Dieksekusi
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredProposals.map((proposal) => {
          const config = statusConfig[proposal.status]
          const StatusIcon = config.icon
          const votePercentage = (proposal.votes.total / proposal.votes.required) * 100
          const approvePercentage = proposal.votes.total > 0 ? (proposal.votes.approve / proposal.votes.total) * 100 : 0

          return (
            <Card key={proposal.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-accent" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{proposal.title}</h3>
                      <p className="text-muted-foreground">{proposal.purpose}</p>
                    </div>
                    <Badge className={config.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {config.label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Jumlah Dana</p>
                      <p className="text-2xl font-bold text-accent">{formatCurrency(proposal.amount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Penerima</p>
                      <p className="font-semibold">{proposal.recipient}</p>
                      <p className="text-xs text-muted-foreground font-mono">{proposal.recipientAddress}</p>
                    </div>
                  </div>

                  {proposal.status === "pending" && (
                    <div className="mt-4 p-4 bg-yellow-500/5 rounded-lg border border-yellow-500/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Progress Voting: {proposal.votes.total} / {proposal.votes.required}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {proposal.votes.approve} setuju, {proposal.votes.reject} tolak
                        </span>
                      </div>
                      <Progress value={votePercentage} className="h-2 mb-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{approvePercentage.toFixed(0)}% menyetujui</span>
                        <span>{votePercentage.toFixed(0)}% kuorum tercapai</span>
                      </div>
                    </div>
                  )}

                  {proposal.status === "executed" && proposal.executedHash && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-sm text-muted-foreground mb-1">Hash Eksekusi</p>
                      <p className="text-sm font-mono text-primary">{proposal.executedHash}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="font-mono">ID: {proposal.id}</span>
                      <span>•</span>
                      <span>Block #{proposal.blockNumber}</span>
                      <span>•</span>
                      <span>{formatDate(proposal.timestamp)}</span>
                    </div>

                    {proposal.status === "pending" && (
                      <Link href={`/voting/${proposal.id}`}>
                        <Button size="sm" variant="outline">
                          Lihat & Vote
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {filteredProposals.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Tidak ada proposal dengan status {filter}</p>
        </Card>
      )}
    </div>
  )
}
