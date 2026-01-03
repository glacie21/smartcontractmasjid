import { Card } from "@/components/ui/card"
import { Shield, Vote, FileText, Lock, Users, Bell } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Transparansi Total",
    description: "Semua transaksi tercatat di blockchain dan dapat diverifikasi oleh jamaah kapan saja.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Vote,
    title: "Sistem Voting",
    description: "Pengeluaran besar memerlukan persetujuan dari dewan pengawas melalui voting transparan.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: FileText,
    title: "Laporan Real-time",
    description: "Akses laporan keuangan kapan saja dengan data yang selalu update dan akurat.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Lock,
    title: "Keamanan Terjamin",
    description: "Data terenkripsi dan tidak dapat dimanipulasi setelah tersimpan di blockchain.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description: "Sistem dengan 3 role: Bendahara, Pengawas, dan Jamaah dengan hak akses berbeda.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Bell,
    title: "Notifikasi Otomatis",
    description: "Dapatkan notifikasi untuk proposal baru, voting, dan update transaksi penting.",
    color: "bg-chart-3/10 text-chart-3",
  },
]

export function FeatureCards() {
  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Fitur Utama</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Dibangun dengan teknologi blockchain untuk memastikan integritas dan transparansi pengelolaan dana masjid
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card key={index} className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
