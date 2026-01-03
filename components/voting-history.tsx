"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, User } from "lucide-react"

interface Vote {
  voter: string
  voterName: string
  vote: "approve" | "reject"
  timestamp: string
  txHash: string
}

// Mock data
const mockVotes: Vote[] = [
  {
    voter: "0x1a2b3c4d5e6f7g8h",
    voterName: "Ustadz Ahmad",
    vote: "approve",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    txHash: "0xvote001",
  },
  {
    voter: "0x2b3c4d5e6f7g8h9i",
    voterName: "Bapak Hasan",
    vote: "approve",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    txHash: "0xvote002",
  },
  {
    voter: "0x3c4d5e6f7g8h9i0j",
    voterName: "Bapak Ibrahim",
    vote: "reject",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    txHash: "0xvote003",
  },
  {
    voter: "0x4d5e6f7g8h9i0j1k",
    voterName: "Ibu Fatimah",
    vote: "approve",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    txHash: "0xvote004",
  },
]

interface VotingHistoryProps {
  proposalId: string
}

export function VotingHistory({ proposalId }: VotingHistoryProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      return `${diffMins} menit yang lalu`
    } else if (diffHours < 24) {
      return `${diffHours} jam yang lalu`
    } else {
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
      return `${diffDays} hari yang lalu`
    }
  }

  return (
    <Card className="p-6 sticky top-6">
      <h3 className="text-lg font-bold mb-4">Riwayat Voting</h3>
      <p className="text-sm text-muted-foreground mb-4">Semua voting tercatat di blockchain secara transparan</p>

      <div className="space-y-3">
        {mockVotes.map((vote) => (
          <div key={vote.txHash} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm">{vote.voterName}</p>
                  <Badge
                    variant={vote.vote === "approve" ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {vote.vote === "approve" ? (
                      <>
                        <ThumbsUp className="w-3 h-3" />
                        Setuju
                      </>
                    ) : (
                      <>
                        <ThumbsDown className="w-3 h-3" />
                        Tolak
                      </>
                    )}
                  </Badge>
                </div>

                <p className="text-xs text-muted-foreground font-mono mb-1 truncate">{vote.voter}</p>
                <p className="text-xs text-muted-foreground">{formatDate(vote.timestamp)}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">TX: {vote.txHash}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mockVotes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground">Belum ada voting untuk proposal ini</p>
        </div>
      )}
    </Card>
  )
}
