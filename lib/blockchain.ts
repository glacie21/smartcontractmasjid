// Blockchain integration utilities for MasjidChain
// This file provides functions to interact with the MasjidFinance smart contract

import { ethers } from "ethers"

// Contract ABI (Application Binary Interface)
// This defines how to interact with the smart contract
export const MASJID_FINANCE_ABI = [
  // Events
  "event PemasukanDicatat(uint256 indexed id, address indexed donatur, string jenisDana, uint256 jumlah, uint256 timestamp)",
  "event ProposalDiajukan(uint256 indexed id, string judul, uint256 jumlah, address penerima, uint256 timestamp)",
  "event VoteDiberikan(uint256 indexed proposalId, address indexed pengawas, bool setuju, uint256 timestamp)",
  "event ProposalDisetujui(uint256 indexed proposalId, uint256 voteSetuju, uint256 voteTolak)",
  "event ProposalDitolak(uint256 indexed proposalId, uint256 voteSetuju, uint256 voteTolak)",
  "event PengeluaranDieksekusi(uint256 indexed proposalId, string buktiHash, uint256 timestamp)",

  // View functions
  "function bendahara() view returns (address)",
  "function getDaftarPemasukan() view returns (tuple(uint256 id, address donatur, string jenisDana, uint256 jumlah, uint256 timestamp, bool verified)[])",
  "function getTotalPemasukan() view returns (uint256)",
  "function getTotalPengeluaran() view returns (uint256)",
  "function getSaldoTersedia() view returns (uint256)",
  "function getProposalDetail(uint256 proposalId) view returns (uint256 id, string judul, string tujuan, uint256 jumlah, address penerima, string detail, uint8 status, uint256 voteSetuju, uint256 voteTolak, string buktiEksekusi)",
  "function hasVoted(uint256 proposalId, address pengawasAddress) view returns (bool)",
  "function getVoteChoice(uint256 proposalId, address pengawasAddress) view returns (bool)",
  "function getDaftarPengawas() view returns (address[])",
  "function jumlahPengeluaran() view returns (uint256)",

  // Write functions
  "function catatPemasukan(address donatur, string jenisDana, uint256 jumlah)",
  "function ajukanPengeluaran(string judul, string tujuan, uint256 jumlah, address penerima, string detail)",
  "function vote(uint256 proposalId, bool setuju)",
  "function eksekusiPengeluaran(uint256 proposalId, string buktiHash)",
]

// Contract address (update this after deployment)
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000"

// Initialize provider (connects to blockchain network)
export function getProvider() {
  if (typeof window !== "undefined" && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum)
  }
  // Fallback to a public RPC provider for read-only operations
  return new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8545")
}

// Get contract instance for reading data
export async function getContract() {
  const provider = getProvider()
  return new ethers.Contract(CONTRACT_ADDRESS, MASJID_FINANCE_ABI, provider)
}

// Get contract instance for writing data (requires signer)
export async function getContractWithSigner() {
  const provider = getProvider()
  const signer = await provider.getSigner()
  return new ethers.Contract(CONTRACT_ADDRESS, MASJID_FINANCE_ABI, signer)
}

// Connect wallet
export async function connectWallet() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("Please install MetaMask to use this feature")
  }

  const provider = new ethers.BrowserProvider(window.ethereum)
  await provider.send("eth_requestAccounts", [])
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  return { provider, signer, address }
}

// Format Wei to Rupiah (assuming 1 ETH = certain IDR rate)
export function weiToRupiah(wei: bigint, exchangeRate = 50000000): string {
  const eth = Number(ethers.formatEther(wei))
  const idr = eth * exchangeRate
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(idr)
}

// Format Rupiah to Wei
export function rupiahToWei(rupiah: number, exchangeRate = 50000000): bigint {
  const eth = rupiah / exchangeRate
  return ethers.parseEther(eth.toString())
}

// ============ Contract Interaction Functions ============

// Pemasukan functions
export async function catatPemasukan(donatur: string, jenisDana: string, jumlah: bigint) {
  const contract = await getContractWithSigner()
  const tx = await contract.catatPemasukan(donatur, jenisDana, jumlah)
  await tx.wait()
  return tx.hash
}

export async function getDaftarPemasukan() {
  const contract = await getContract()
  return await contract.getDaftarPemasukan()
}

export async function getTotalPemasukan() {
  const contract = await getContract()
  return await contract.getTotalPemasukan()
}

// Pengeluaran functions
export async function ajukanPengeluaran(
  judul: string,
  tujuan: string,
  jumlah: bigint,
  penerima: string,
  detail: string,
) {
  const contract = await getContractWithSigner()
  const tx = await contract.ajukanPengeluaran(judul, tujuan, jumlah, penerima, detail)
  await tx.wait()
  return tx.hash
}

export async function getProposalDetail(proposalId: number) {
  const contract = await getContract()
  return await contract.getProposalDetail(proposalId)
}

export async function getJumlahPengeluaran() {
  const contract = await getContract()
  return await contract.jumlahPengeluaran()
}

// Voting functions
export async function vote(proposalId: number, setuju: boolean) {
  const contract = await getContractWithSigner()
  const tx = await contract.vote(proposalId, setuju)
  await tx.wait()
  return tx.hash
}

export async function hasVoted(proposalId: number, pengawasAddress: string) {
  const contract = await getContract()
  return await contract.hasVoted(proposalId, pengawasAddress)
}

export async function getVoteChoice(proposalId: number, pengawasAddress: string) {
  const contract = await getContract()
  return await contract.getVoteChoice(proposalId, pengawasAddress)
}

// Eksekusi functions
export async function eksekusiPengeluaran(proposalId: number, buktiHash: string) {
  const contract = await getContractWithSigner()
  const tx = await contract.eksekusiPengeluaran(proposalId, buktiHash)
  await tx.wait()
  return tx.hash
}

// General functions
export async function getTotalPengeluaran() {
  const contract = await getContract()
  return await contract.getTotalPengeluaran()
}

export async function getSaldoTersedia() {
  const contract = await getContract()
  return await contract.getSaldoTersedia()
}

export async function getDaftarPengawas() {
  const contract = await getContract()
  return await contract.getDaftarPengawas()
}

// Listen to events
export function listenToPemasukanEvents(callback: (event: any) => void) {
  getContract().then((contract) => {
    contract.on("PemasukanDicatat", (id, donatur, jenisDana, jumlah, timestamp, event) => {
      callback({ id, donatur, jenisDana, jumlah, timestamp, event })
    })
  })
}

export function listenToProposalEvents(callback: (event: any) => void) {
  getContract().then((contract) => {
    contract.on("ProposalDiajukan", (id, judul, jumlah, penerima, timestamp, event) => {
      callback({ id, judul, jumlah, penerima, timestamp, event })
    })
  })
}

export function listenToVoteEvents(callback: (event: any) => void) {
  getContract().then((contract) => {
    contract.on("VoteDiberikan", (proposalId, pengawas, setuju, timestamp, event) => {
      callback({ proposalId, pengawas, setuju, timestamp, event })
    })
  })
}

// Type definitions for Window with Ethereum
declare global {
  interface Window {
    ethereum?: any
  }
}
