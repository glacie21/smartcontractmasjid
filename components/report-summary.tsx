import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Wallet, Activity } from "lucide-react"

const summaryData = [
  {
    title: "Total Pemasukan",
    value: "Rp 125.000.000",
    change: "+15.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Pengeluaran",
    value: "Rp 85.000.000",
    change: "+8.5%",
    trend: "up",
    icon: TrendingDown,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Saldo Tersedia",
    value: "Rp 40.000.000",
    change: "+6.7%",
    trend: "up",
    icon: Wallet,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    title: "Total Transaksi",
    value: "247",
    change: "+23 bulan ini",
    trend: "up",
    icon: Activity,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function ReportSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {summaryData.map((item, index) => {
        const Icon = item.icon
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${item.color}`} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
              <p className={`text-sm ${item.color}`}>{item.change}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
