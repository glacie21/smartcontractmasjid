"use client"

import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/dashboard/jamaah" },
  { name: "Donasi Saya", href: "/dashboard/jamaah/donasi" },
  { name: "Transaksi", href: "/dashboard/jamaah/transaksi" },
  { name: "Proposal Aktif", href: "/dashboard/jamaah/proposal" },
]

export default function JamaahTransaksiPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const transactions = [
    {
      id: "TRX-001",
      category: "Infaq",
      amount: "Rp 500,000",
      date: "15 Des 2024, 10:30",
      txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      blockNumber: "12345678",
      status: "confirmed",
    },
    {
      id: "TRX-002",
      category: "Zakat",
      amount: "Rp 1,000,000",
      date: "10 Des 2024, 14:20",
      txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
      blockNumber: "12345123",
      status: "confirmed",
    },
    {
      id: "TRX-003",
      category: "Wakaf",
      amount: "Rp 750,000",
      date: "5 Des 2024, 09:15",
      txHash: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
      blockNumber: "12344890",
      status: "confirmed",
    },
    {
      id: "TRX-004",
      category: "Infaq",
      amount: "Rp 250,000",
      date: "1 Des 2024, 16:45",
      txHash: "0x9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h",
      blockNumber: "12344567",
      status: "confirmed",
    },
  ]

  const filteredTransactions = transactions.filter(
    (tx) =>
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AuthGuard allowedRoles={["jamaah"]}>
      <DashboardLayout userRole="jamaah" navigation={navigation}>
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Riwayat Transaksi</h1>
            <p className="text-gray-600 mt-2">Semua donasi Anda yang terverifikasi di blockchain</p>
          </div>

          <Card className="border-emerald-100">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Daftar Transaksi</CardTitle>
                  <CardDescription>Total {transactions.length} transaksi</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Cari transaksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((tx) => (
                  <div key={tx.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                            {tx.category}
                          </span>
                          <span className="text-sm text-gray-500">{tx.id}</span>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">{tx.amount}</p>
                        <p className="text-sm text-gray-600">{tx.date}</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-500">TX Hash:</p>
                            <code className="text-xs font-mono text-gray-700 bg-white px-2 py-1 rounded">
                              {tx.txHash.substring(0, 20)}...
                            </code>
                            <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                              <ExternalLink className="w-3 h-3" />
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500">Block: {tx.blockNumber}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start lg:items-end gap-2">
                        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          <span className="text-sm font-medium text-emerald-700">Terkonfirmasi</span>
                        </div>
                        <Button size="sm" variant="outline" className="w-full lg:w-auto bg-transparent">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Verifikasi di Blockchain
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">Tidak ada transaksi ditemukan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </AuthGuard>
  )
}
