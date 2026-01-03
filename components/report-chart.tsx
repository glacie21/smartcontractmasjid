"use client"

import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { useState } from "react"

const monthlyData = [
  { month: "Jan", pemasukan: 12000000, pengeluaran: 8000000 },
  { month: "Feb", pemasukan: 15000000, pengeluaran: 9000000 },
  { month: "Mar", pemasukan: 18000000, pengeluaran: 12000000 },
  { month: "Apr", pemasukan: 14000000, pengeluaran: 10000000 },
  { month: "Mei", pemasukan: 16000000, pengeluaran: 11000000 },
  { month: "Jun", pemasukan: 20000000, pengeluaran: 13000000 },
]

const categoryData = [
  { category: "Infaq", amount: 45000000 },
  { category: "Zakat", amount: 35000000 },
  { category: "Wakaf", amount: 25000000 },
  { category: "Donasi", amount: 20000000 },
]

export function ReportChart() {
  const [chartType, setChartType] = useState<"line" | "bar">("line")

  const formatCurrency = (value: number) => {
    return `Rp ${(value / 1000000).toFixed(0)}jt`
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold">Tren Keuangan</h3>
            <p className="text-sm text-muted-foreground">Perbandingan pemasukan dan pengeluaran</p>
          </div>
          <Select value={chartType} onValueChange={(value: "line" | "bar") => setChartType(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line</SelectItem>
              <SelectItem value="bar">Bar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {chartType === "line" ? (
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis tickFormatter={formatCurrency} className="text-xs" />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              />
              <Legend />
              <Line type="monotone" dataKey="pemasukan" stroke="hsl(var(--primary))" strokeWidth={2} name="Pemasukan" />
              <Line
                type="monotone"
                dataKey="pengeluaran"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                name="Pengeluaran"
              />
            </LineChart>
          ) : (
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis tickFormatter={formatCurrency} className="text-xs" />
              <Tooltip
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
              />
              <Legend />
              <Bar dataKey="pemasukan" fill="hsl(var(--primary))" name="Pemasukan" />
              <Bar dataKey="pengeluaran" fill="hsl(var(--accent))" name="Pengeluaran" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </Card>

      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold">Pemasukan per Kategori</h3>
          <p className="text-sm text-muted-foreground">Distribusi dana dari berbagai sumber</p>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" tickFormatter={formatCurrency} className="text-xs" />
            <YAxis dataKey="category" type="category" className="text-xs" width={80} />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
            />
            <Bar dataKey="amount" fill="hsl(var(--primary))" name="Jumlah" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
