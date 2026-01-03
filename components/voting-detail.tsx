"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { ThumbsUp, ThumbsDown, FileText, AlertCircle, CheckCircle2, Loader2 } from "lucide-react"

// Mock data - in real app this would come from blockchain
const mockProposal = {
  id: "0xprop001",
  title: "Renovasi Masjid Fase 2",
  purpose: "Perbaikan atap dan pengecatan",
  amount: 15000000,
  recipient: "PT Renovasi Makmur",
  recipientAddress: "0x9c1d2e3f4g5h6i7j8k9l",
  details:
    "Renovasi meliputi perbaikan atap yang bocor dan pengecatan ulang seluruh masjid. Proyek ini diperkirakan memakan waktu 2 bulan dengan rincian biaya: perbaikan atap Rp 10.000.000 dan pengecatan Rp 5.000.000.",
  status: "pending",
  votes: {
    approve: 3,
    reject: 1,
    total: 4,
    required: 5,
  },
  timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  blockNumber: 12345690,
}

interface VotingDetailProps {
  proposalId: string
  userRole: string
}

export function VotingDetail({ proposalId, userRole }: VotingDetailProps) {
  const { toast } = useToast()
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<"approve" | "reject" | null>(null)
  const [loading, setLoading] = useState(false)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const handleVote = async (vote: "approve" | "reject") => {
    setLoading(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log(`[v0] Voted ${vote} on proposal ${proposalId}`)

    setHasVoted(true)
    setUserVote(vote)
    setLoading(false)

    toast({
      title: "Voting Berhasil",
      description: `Anda telah memberikan suara "${vote === "approve" ? "Setuju" : "Tolak"}" untuk proposal ini.`,
    })
  }

  const votePercentage = (mockProposal.votes.total / mockProposal.votes.required) * 100
  const approvePercentage =
    mockProposal.votes.total > 0 ? (mockProposal.votes.approve / mockProposal.votes.total) * 100 : 0

  const canVote = userRole === "pengawas"

  return (
    <div className="space-y-6">
      <Card className="p-6 border-emerald-100">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-7 h-7 text-accent" />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{mockProposal.title}</h2>
            <p className="text-lg text-muted-foreground">{mockProposal.purpose}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-muted-foreground font-mono">ID: {mockProposal.id}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">Block #{mockProposal.blockNumber}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Jumlah Dana</p>
            <p className="text-2xl font-bold text-accent">{formatCurrency(mockProposal.amount)}</p>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Status</p>
            <Badge variant="outline" className="text-base">
              Menunggu Voting
            </Badge>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Penerima Dana</h3>
          <p className="text-foreground">{mockProposal.recipient}</p>
          <p className="text-sm text-muted-foreground font-mono">{mockProposal.recipientAddress}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Rincian Detail</h3>
          <p className="text-muted-foreground leading-relaxed">{mockProposal.details}</p>
        </div>

        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Progress Voting</h3>
            <span className="text-sm text-muted-foreground">
              {mockProposal.votes.total} / {mockProposal.votes.required} suara
            </span>
          </div>
          <Progress value={votePercentage} className="h-3 mb-3" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ThumbsUp className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Setuju</p>
                <p className="text-lg font-bold text-primary">{mockProposal.votes.approve}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                <ThumbsDown className="w-4 h-4 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium">Tolak</p>
                <p className="text-lg font-bold text-destructive">{mockProposal.votes.reject}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-3 text-center">
            {approvePercentage.toFixed(0)}% menyetujui proposal ini
          </p>
        </div>
      </Card>

      {canVote && !hasVoted ? (
        <Card className="p-6 border-emerald-100">
          <h3 className="text-lg font-bold mb-4">Berikan Suara Anda</h3>
          <Alert className="mb-4 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-900">Penting!</AlertTitle>
            <AlertDescription className="text-amber-700">
              Setiap pengawas hanya dapat memberikan satu suara. Keputusan anda akan tercatat permanen di blockchain.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <Button
              size="lg"
              className="h-20 flex flex-col gap-2 bg-emerald-600 hover:bg-emerald-700"
              onClick={() => handleVote("approve")}
              disabled={loading}
            >
              {loading && userVote === "approve" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <ThumbsUp className="w-6 h-6" />
                  <span>Setuju</span>
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="destructive"
              className="h-20 flex flex-col gap-2"
              onClick={() => handleVote("reject")}
              disabled={loading}
            >
              {loading && userVote === "reject" ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  <ThumbsDown className="w-6 h-6" />
                  <span>Tolak</span>
                </>
              )}
            </Button>
          </div>
        </Card>
      ) : canVote && hasVoted ? (
        <Card className="p-6 bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Anda Telah Memberikan Suara</h3>
              <p className="text-gray-600">
                Voting anda:{" "}
                <span className="font-semibold text-emerald-700">{userVote === "approve" ? "Setuju" : "Tolak"}</span>
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="font-bold text-gray-900">Informasi</h3>
              <p className="text-gray-600">Hanya dewan pengawas yang dapat memberikan voting untuk proposal ini.</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
