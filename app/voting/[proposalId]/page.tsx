"use client"

import { VotingDetail } from "@/components/voting-detail"
import { VotingHistory } from "@/components/voting-history"
import { ArrowLeft, MSquare as Mosque } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function VotingPage({ params }: { params: { proposalId: string } }) {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (!user) {
      router.push("/login")
      return
    }

    const userData = JSON.parse(user)
    setUserRole(userData.role)
    setIsAuthorized(true)
  }, [router])

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memverifikasi akses...</p>
        </div>
      </div>
    )
  }

  const getDashboardLink = () => {
    if (userRole === "bendahara") return "/dashboard/bendahara"
    if (userRole === "jamaah") return "/dashboard/jamaah"
    if (userRole === "pengawas") return "/dashboard/pengawas"
    return "/login"
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-8 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Mosque className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">MasjidChain</span>
          </div>
          <Link href={getDashboardLink()}>
            <Button variant="ghost" className="mb-4 text-white hover:bg-white/10 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Detail Voting Proposal</h1>
          <p className="text-emerald-50 mt-2">
            {userRole === "pengawas"
              ? "Berikan suara anda untuk proposal pengeluaran ini"
              : "Lihat detail proposal dan progress voting"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VotingDetail proposalId={params.proposalId} userRole={userRole || "jamaah"} />
          </div>

          <div className="lg:col-span-1">
            <VotingHistory proposalId={params.proposalId} />
          </div>
        </div>
      </div>
    </main>
  )
}
