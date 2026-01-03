import { ReportSummary } from "@/components/report-summary"
import { ReportChart } from "@/components/report-chart"
import { ReportTable } from "@/components/report-table"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LaporanPage() {
  return (
    <main className="min-h-screen bg-muted/30">
      <div className="bg-accent text-accent-foreground py-8">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-accent-foreground hover:bg-black/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Laporan Keuangan</h1>
          <p className="text-accent-foreground/90 mt-2">Transparansi penuh atas seluruh transaksi keuangan masjid</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <ReportSummary />
        <ReportChart />
        <ReportTable />
      </div>
    </main>
  )
}
