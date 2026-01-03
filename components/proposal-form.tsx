"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ProposalForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    purpose: "",
    amount: "",
    recipient: "",
    recipientAddress: "",
    details: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("[v0] Proposal created:", formData)

    toast({
      title: "Proposal Berhasil Dibuat",
      description: "Proposal telah diajukan dan menunggu voting dari dewan pengawas.",
    })

    // Reset form
    setFormData({
      title: "",
      purpose: "",
      amount: "",
      recipient: "",
      recipientAddress: "",
      details: "",
    })

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Proposal pengeluaran memerlukan persetujuan minimal dari dewan pengawas melalui voting.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="title">Judul Proposal</Label>
        <Input
          id="title"
          placeholder="Renovasi Masjid Fase 2"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Tujuan Pengeluaran</Label>
        <Input
          id="purpose"
          placeholder="Perbaikan atap dan pengecatan"
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount">Jumlah Dana (Rp)</Label>
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
        <Label htmlFor="recipient">Nama Penerima</Label>
        <Input
          id="recipient"
          placeholder="PT Renovasi Makmur"
          value={formData.recipient}
          onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recipientAddress">Alamat Wallet Penerima</Label>
        <Input
          id="recipientAddress"
          placeholder="0x..."
          value={formData.recipientAddress}
          onChange={(e) => setFormData({ ...formData, recipientAddress: e.target.value })}
          required
        />
        <p className="text-xs text-muted-foreground">Dana akan ditransfer ke alamat ini setelah disetujui</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Rincian Detail</Label>
        <Textarea
          id="details"
          placeholder="Jelaskan detail pengeluaran, estimasi waktu pengerjaan, dll."
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? "Membuat Proposal..." : "Ajukan Proposal"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Proposal akan tercatat di blockchain dan memerlukan voting untuk disetujui
      </p>
    </form>
  )
}
