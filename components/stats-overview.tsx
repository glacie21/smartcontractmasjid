import { Card } from "@/components/ui/card"
import { TrendingUp, Wallet, Users, FileCheck } from "lucide-react"

const stats = [
  {
    title: "Total Pemasukan",
    value: "Rp 125.000.000",
    change: "+12.5% dari bulan lalu",
    icon: Wallet,
    positive: true,
  },
  {
    title: "Total Pengeluaran",
    value: "Rp 85.000.000",
    change: "Rp 40jt tersedia",
    icon: TrendingUp,
    positive: true,
  },
  {
    title: "Total Donatur",
    value: "1,247",
    change: "+23 donatur baru",
    icon: Users,
    positive: true,
  },
  {
    title: "Proposal Aktif",
    value: "8",
    change: "3 menunggu voting",
    icon: FileCheck,
    positive: false,
  },
]

export function StatsOverview() {
  return (
    <section className="container mx-auto px-4 -mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className={`text-sm ${stat.positive ? "text-primary" : "text-muted-foreground"}`}>{stat.change}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
