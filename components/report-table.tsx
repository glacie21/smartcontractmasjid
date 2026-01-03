"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownLeft, Search, Download, ExternalLink } from "lucide-react"

type TransactionType = "income" | "expense"

interface Transaction {
  id: string
  type: TransactionType
  category: string
  description: string
  amount: number
  timestamp: string
  hash: string
  status: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    category: "Infaq Jumat",
    description: "Donasi dari jamaah",
    amount: 5000000,
    timestamp: "2025-01-03 14:30",
    hash: "0x1a2b3c4d",
    status: "verified",
  },
  {
    id: "2",
    type: "expense",
    category: "Operasional",
    description: "Pembayaran listrik bulan ini",
    amount: 2500000,
    timestamp: "2025-01-02 10:15",
    hash: "0x2b3c4d5e",
    status: "executed",
  },
  {
    id: "3",
    type: "income",
    category: "Zakat Fitrah",
    description: "Zakat dari jamaah",
    amount: 3000000,
    timestamp: "2025-01-02 09:00",
    hash: "0x3c4d5e6f",
    status: "verified",
  },
  {
    id: "4",
    type: "expense",
    category: "Renovasi",
    description: "Perbaikan atap masjid",
    amount: 15000000,
    timestamp: "2025-01-01 16:45",
    hash: "0x4d5e6f7g",
    status: "executed",
  },
  {
    id: "5",
    type: "income",
    category: "Wakaf",
    description: "Wakaf dari donatur",
    amount: 10000000,
    timestamp: "2025-01-01 08:20",
    hash: "0x5e6f7g8h",
    status: "verified",
  },
  {
    id: "6",
    type: "income",
    category: "Donasi",
    description: "Donasi umum",
    amount: 1500000,
    timestamp: "2024-12-31 15:30",
    hash: "0x6f7g8h9i",
    status: "verified",
  },
  {
    id: "7",
    type: "expense",
    category: "Santunan",
    description: "Santunan fakir miskin",
    amount: 5000000,
    timestamp: "2024-12-30 11:00",
    hash: "0x7g8h9i0j",
    status: "executed",
  },
]

export function ReportTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all")

  const filteredTransactions = mockTransactions.filter((tx) => {
    const matchesSearch =
      tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || tx.type === filterType
    return matchesSearch && matchesType
  })

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalIncome = mockTransactions.filter((tx) => tx.type === "income").reduce((sum, tx) => sum + tx.amount, 0)

  const totalExpense = mockTransactions.filter((tx) => tx.type === "expense").reduce((sum, tx) => sum + tx.amount, 0)

  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-bold">Riwayat Transaksi</h3>
          <p className="text-sm text-muted-foreground">Semua transaksi tercatat di blockchain</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Download className="w-4 h-4" />
          Export PDF
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari transaksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={(value: "all" | TransactionType) => setFilterType(value)}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="income">Pemasukan</SelectItem>
            <SelectItem value="expense">Pengeluaran</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Pemasukan</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(totalIncome)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Total Pengeluaran</p>
          <p className="text-2xl font-bold text-accent">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipe</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      tx.type === "income" ? "bg-primary/10" : "bg-accent/10"
                    }`}
                  >
                    {tx.type === "income" ? (
                      <ArrowDownLeft className="w-4 h-4 text-primary" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-accent" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{tx.category}</Badge>
                </TableCell>
                <TableCell className="font-medium">{tx.description}</TableCell>
                <TableCell>
                  <span className={`font-bold ${tx.type === "income" ? "text-primary" : "text-foreground"}`}>
                    {tx.type === "income" ? "+" : "-"} {formatCurrency(tx.amount)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{tx.timestamp}</TableCell>
                <TableCell>
                  <Badge variant={tx.status === "verified" ? "default" : "secondary"}>{tx.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Tidak ada transaksi yang sesuai dengan pencarian</p>
        </div>
      )}
    </Card>
  )
}
