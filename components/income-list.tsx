"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownLeft, ExternalLink, Search, Filter } from "lucide-react"

// Mock data
const mockIncomeData = [
  {
    id: "0x1a2b3c4d5e6f",
    donorAddress: "0x7a8b9c1d2e3f4g5h",
    category: "Infaq Jumat",
    amount: 5000000,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345678,
    verified: true,
  },
  {
    id: "0x2b3c4d5e6f7g",
    donorAddress: "0x8b9c1d2e3f4g5h6i",
    category: "Zakat Fitrah",
    amount: 2500000,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345650,
    verified: true,
  },
  {
    id: "0x3c4d5e6f7g8h",
    donorAddress: "0x9c1d2e3f4g5h6i7j",
    category: "Wakaf",
    amount: 10000000,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345620,
    verified: true,
  },
  {
    id: "0x4d5e6f7g8h9i",
    donorAddress: "0x1d2e3f4g5h6i7j8k",
    category: "Donasi Umum",
    amount: 1500000,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345610,
    verified: true,
  },
  {
    id: "0x5e6f7g8h9i0j",
    donorAddress: "0x2e3f4g5h6i7j8k9l",
    category: "Zakat Mal",
    amount: 7500000,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    blockNumber: 12345590,
    verified: true,
  },
]

export function IncomeList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

  const filteredData = mockIncomeData.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donorAddress.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffHours < 24) {
      return `${diffHours} jam yang lalu`
    } else if (diffDays === 1) {
      return "1 hari yang lalu"
    } else {
      return `${diffDays} hari yang lalu`
    }
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan ID atau alamat wallet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="Infaq Jumat">Infaq Jumat</SelectItem>
                <SelectItem value="Zakat Fitrah">Zakat Fitrah</SelectItem>
                <SelectItem value="Zakat Mal">Zakat Mal</SelectItem>
                <SelectItem value="Wakaf">Wakaf</SelectItem>
                <SelectItem value="Donasi Umum">Donasi Umum</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {filteredData.map((income) => (
          <Card key={income.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <ArrowDownLeft className="w-6 h-6 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{income.category}</Badge>
                      {income.verified && (
                        <Badge variant="default" className="bg-primary text-primary-foreground">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground font-mono">Donatur: {income.donorAddress}</p>
                  </div>
                  <p className="text-2xl font-bold text-primary whitespace-nowrap">{formatCurrency(income.amount)}</p>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span className="font-mono">TX: {income.id}</span>
                  <span>•</span>
                  <span>Block #{income.blockNumber}</span>
                  <span>•</span>
                  <span>{formatDate(income.timestamp)}</span>
                </div>
              </div>

              <Button variant="ghost" size="icon" className="flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredData.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">Tidak ada data pemasukan yang sesuai dengan pencarian</p>
        </Card>
      )}
    </div>
  )
}
