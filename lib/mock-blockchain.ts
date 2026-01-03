// Mock blockchain data for development and testing
// This simulates blockchain data when the actual contract is not deployed

export interface MockPemasukan {
  id: number
  donatur: string
  donaturName: string
  jenisDana: string
  jumlah: number
  timestamp: Date
  txHash: string
  blockNumber: number
}

export interface MockProposal {
  id: number
  judul: string
  tujuan: string
  jumlah: number
  penerima: string
  penerimaAddress: string
  detail: string
  status: "pending" | "approved" | "rejected" | "executed"
  voteSetuju: number
  voteTolak: number
  timestampPengajuan: Date
  buktiEksekusi?: string
  txHash: string
}

export interface MockVote {
  proposalId: number
  pengawas: string
  pengawasName: string
  setuju: boolean
  timestamp: Date
  txHash: string
}

// Mock data for development
export const mockPemasukan: MockPemasukan[] = [
  {
    id: 1,
    donatur: "0x1a2b3c4d5e6f7g8h9i0j",
    donaturName: "Ahmad bin Abdullah",
    jenisDana: "Infaq",
    jumlah: 2500000,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    txHash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    blockNumber: 12345678,
  },
  {
    id: 2,
    donatur: "0x2b3c4d5e6f7g8h9i0j1k",
    donaturName: "Fatimah binti Umar",
    jenisDana: "Zakat",
    jumlah: 5000000,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    txHash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a",
    blockNumber: 12345123,
  },
  {
    id: 3,
    donatur: "0x3c4d5e6f7g8h9i0j1k2l",
    donaturName: "Hamba Allah",
    jenisDana: "Infaq",
    jumlah: 1000000,
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    txHash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b",
    blockNumber: 12344890,
  },
]

export const mockProposals: MockProposal[] = [
  {
    id: 1,
    judul: "Renovasi Mihrab Masjid",
    tujuan: "Renovasi mihrab yang sudah rusak",
    jumlah: 15000000,
    penerima: "PT Renovasi Makmur",
    penerimaAddress: "0x9c1d2e3f4g5h6i7j8k9l",
    detail: "Renovasi meliputi perbaikan mihrab yang rusak dan pengecatan ulang",
    status: "pending",
    voteSetuju: 3,
    voteTolak: 1,
    timestampPengajuan: new Date(Date.now() - 5 * 60 * 60 * 1000),
    txHash: "0x4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c",
  },
  {
    id: 2,
    judul: "Pembelian Karpet Baru",
    tujuan: "Mengganti karpet lama yang sudah rusak",
    jumlah: 8000000,
    penerima: "Toko Karpet Madinah",
    penerimaAddress: "0xa1b2c3d4e5f6g7h8i9j0",
    detail: "Pembelian karpet berkualitas untuk seluruh area masjid",
    status: "approved",
    voteSetuju: 5,
    voteTolak: 0,
    timestampPengajuan: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    txHash: "0x5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d",
  },
  {
    id: 3,
    judul: "Pembangunan Tempat Wudhu",
    tujuan: "Membangun tempat wudhu tambahan",
    jumlah: 25000000,
    penerima: "CV Pembangunan Sejahtera",
    penerimaAddress: "0xb2c3d4e5f6g7h8i9j0k1",
    detail: "Pembangunan 2 tempat wudhu tambahan untuk jamaah",
    status: "pending",
    voteSetuju: 2,
    voteTolak: 0,
    timestampPengajuan: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    txHash: "0x6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e",
  },
]

export const mockVotes: MockVote[] = [
  {
    proposalId: 1,
    pengawas: "0xp1e2n3g4a5w6a7s8",
    pengawasName: "Usman bin Affan",
    setuju: true,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    txHash: "0x7g8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f",
  },
  {
    proposalId: 1,
    pengawas: "0xp2e3n4g5a6w7a8s9",
    pengawasName: "Ali bin Abi Thalib",
    setuju: true,
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    txHash: "0x8h9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g",
  },
  {
    proposalId: 1,
    pengawas: "0xp3e4n5g6a7w8a9s0",
    pengawasName: "Abdullah bin Mas'ud",
    setuju: true,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    txHash: "0x9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h",
  },
]

// Helper functions
export function getMockPemasukanById(id: number): MockPemasukan | undefined {
  return mockPemasukan.find((p) => p.id === id)
}

export function getMockProposalById(id: number): MockProposal | undefined {
  return mockProposals.find((p) => p.id === id)
}

export function getMockVotesByProposalId(proposalId: number): MockVote[] {
  return mockVotes.filter((v) => v.proposalId === proposalId)
}

export function getTotalMockPemasukan(): number {
  return mockPemasukan.reduce((total, p) => total + p.jumlah, 0)
}

export function getTotalMockPengeluaran(): number {
  return mockProposals.filter((p) => p.status === "executed").reduce((total, p) => total + p.jumlah, 0)
}

export function getMockSaldoTersedia(): number {
  return getTotalMockPemasukan() - getTotalMockPengeluaran()
}
