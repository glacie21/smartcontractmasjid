"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

const incomeCategories = [
  { value: "infaq", label: "Infaq Jumat" },
  { value: "zakat", label: "Zakat Fitrah" },
  { value: "zakat_mal", label: "Zakat Mal" },
  { value: "wakaf", label: "Wakaf" },
  { value: "qurban", label: "Qurban" },
  { value: "donasi", label: "Donasi Umum" },
  { value: "other", label: "Lainnya" },
]

export function IncomeForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    donorAddress: "",
    category: "",
    amount: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Income recorded:", formData)

    toast({
      title: "Pemasukan Berhasil Dicatat",
      description: "Transaksi telah tersimpan di blockchain dan tidak dapat diubah.",
    })

    // Reset form
    setFormData({
      donorAddress: "",
      category: "",
      amount: "",
      description: "",
    })

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="donorAddress">Alamat Wallet Donatur</Label>
        <Input
          id="donorAddress"
          placeholder="0x..."
          value={formData.donorAddress}
          onChange={(e) => setFormData({ ...formData, donorAddress: e.target.value })}
          required
        />
        <p className="text-xs text-muted-foreground">Alamat Ethereum wallet donatur</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Jenis Dana</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Pilih jenis dana" />
          </SelectTrigger>
          <SelectContent>
            {incomeCategories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah (Rp)</Label>
        <Input
          id="amount"
          type="number"
          placeholder="0"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          required
          min="0"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Catatan (Opsional)</Label>
        <Textarea
          id="description"
          placeholder="Tambahkan catatan jika diperlukan"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Menyimpan ke Blockchain..." : "Catat Pemasukan"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Data akan tersimpan permanen di blockchain dan tidak dapat dihapus
      </p>
    </form>
  )
}
