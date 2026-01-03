import { ProposalForm } from "@/components/proposal-form"
import { ProposalList } from "@/components/proposal-list"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PengeluaranPage() {
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
          <h1 className="text-3xl font-bold">Proposal Pengeluaran</h1>
          <p className="text-accent-foreground/90 mt-2">
            Ajukan proposal pengeluaran yang memerlukan persetujuan dewan pengawas
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4">Buat Proposal Baru</h2>
              <ProposalForm />
            </Card>
          </div>

          <div className="lg:col-span-2">
            <ProposalList />
          </div>
        </div>
      </div>
    </main>
  )
}
