import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownLeft, ExternalLink } from "lucide-react"

const transactions = [
  {
    id: "0x1a2b3c",
    type: "income",
    donor: "0x7a8b...9c1d",
    category: "Infaq Jumat",
    amount: "Rp 5.000.000",
    timestamp: "2 jam yang lalu",
    status: "verified",
  },
  {
    id: "0x4d5e6f",
    type: "expense",
    recipient: "Renovasi Masjid",
    category: "Proposal #12",
    amount: "Rp 15.000.000",
    timestamp: "5 jam yang lalu",
    status: "approved",
  },
  {
    id: "0x7g8h9i",
    type: "income",
    donor: "0x2b3c...4d5e",
    category: "Zakat Fitrah",
    amount: "Rp 2.500.000",
    timestamp: "1 hari yang lalu",
    status: "verified",
  },
  {
    id: "0x0j1k2l",
    type: "income",
    donor: "0x5f6g...7h8i",
    category: "Wakaf",
    amount: "Rp 10.000.000",
    timestamp: "1 hari yang lalu",
    status: "verified",
  },
  {
    id: "0x3m4n5o",
    type: "expense",
    recipient: "Operasional Rutin",
    category: "Proposal #11",
    amount: "Rp 3.500.000",
    timestamp: "2 hari yang lalu",
    status: "executed",
  },
]

export function RecentTransactions() {
  return (
    <section className="container mx-auto px-4 pb-20">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Transaksi Terbaru</h2>
            <p className="text-muted-foreground">Semua transaksi tercatat di blockchain</p>
          </div>
          <Button variant="outline">
            Lihat Semua
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tx.type === "income" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
                }`}
              >
                {tx.type === "income" ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{tx.type === "income" ? tx.donor : tx.recipient}</p>
                  <Badge variant="outline" className="text-xs">
                    {tx.category}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-mono text-xs">{tx.id}</span>
                  <span>•</span>
                  <span>{tx.timestamp}</span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <p className={`font-bold ${tx.type === "income" ? "text-primary" : "text-foreground"}`}>
                  {tx.type === "income" ? "+" : "-"} {tx.amount}
                </p>
                <Badge
                  variant={tx.status === "verified" || tx.status === "executed" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {tx.status}
                </Badge>
              </div>

              <Button variant="ghost" size="icon">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </section>
  )
}
