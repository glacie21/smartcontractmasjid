# Blockchain Integration Guide - MasjidChain

Panduan lengkap untuk mengintegrasikan aplikasi MasjidChain dengan smart contract blockchain.

## Prerequisites

Sebelum memulai, pastikan Anda telah menginstal:

- Node.js >= 16
- MetaMask atau wallet lain yang mendukung Ethereum
- Hardhat (sudah terinstall di dependencies)

## Setup Development Environment

### 1. Install Dependencies

Dependencies sudah terinstall di package.json, namun jika perlu:

```bash
npm install hardhat ethers
```

### 2. Configure Hardhat

File `hardhat.config.json` sudah disediakan. Update dengan network yang Anda inginkan:

```javascript
{
  "solidity": "0.8.20",
  "networks": {
    "localhost": {
      "url": "http://127.0.0.1:8545"
    },
    "sepolia": {
      "url": "YOUR_SEPOLIA_RPC_URL",
      "accounts": ["YOUR_PRIVATE_KEY"]
    }
  }
}
```

### 3. Environment Variables

Buat file `.env.local` di root project:

```env
# Contract Address (setelah deployment)
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...

# RPC URL untuk connect ke blockchain
NEXT_PUBLIC_RPC_URL=http://localhost:8545

# Network ID
NEXT_PUBLIC_CHAIN_ID=31337
```

## Smart Contract Deployment

### 1. Compile Contract

```bash
npx hardhat compile
```

### 2. Run Local Blockchain (untuk testing)

```bash
npx hardhat node
```

Ini akan menjalankan local blockchain di http://localhost:8545

### 3. Deploy Contract

Edit `contracts/deploy.js` dan sesuaikan parameter:

```javascript
// Alamat wallet pengawas
const pengawasList = [
  "0x...",  // Pengawas 1
  "0x...",  // Pengawas 2
  "0x...",  // Pengawas 3
  "0x...",  // Pengawas 4
  "0x...",  // Pengawas 5
];

// Minimum votes yang diperlukan (kuorum)
const minimumVotes = 3;
```

Jalankan deployment:

```bash
# Deploy ke localhost
npx hardhat run contracts/deploy.js --network localhost

# Deploy ke Sepolia testnet
npx hardhat run contracts/deploy.js --network sepolia
```

Simpan Contract Address yang muncul dan masukkan ke `.env.local`

### 4. Verify Contract (Optional, untuk testnet/mainnet)

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS "CONSTRUCTOR_ARGS"
```

## Testing Smart Contract

Jalankan test suite:

```bash
npx hardhat test
```

Untuk test dengan gas reporter:

```bash
REPORT_GAS=true npx hardhat test
```

## Integrasi dengan Frontend

### 1. Connect Wallet

```typescript
import { connectWallet } from "@/lib/blockchain"

const handleConnect = async () => {
  try {
    const { address } = await connectWallet()
    console.log("Connected:", address)
  } catch (error) {
    console.error("Connection failed:", error)
  }
}
```

### 2. Catat Pemasukan

```typescript
import { catatPemasukan, rupiahToWei } from "@/lib/blockchain"

const handleCatatPemasukan = async () => {
  try {
    const donatur = "0x..."
    const jenisDana = "Infaq"
    const jumlahWei = rupiahToWei(1000000) // Rp 1,000,000
    
    const txHash = await catatPemasukan(donatur, jenisDana, jumlahWei)
    console.log("Transaction hash:", txHash)
  } catch (error) {
    console.error("Failed:", error)
  }
}
```

### 3. Ajukan Proposal

```typescript
import { ajukanPengeluaran, rupiahToWei } from "@/lib/blockchain"

const handleAjukanProposal = async () => {
  try {
    const judul = "Renovasi Masjid"
    const tujuan = "Perbaikan atap"
    const jumlahWei = rupiahToWei(15000000)
    const penerima = "0x..."
    const detail = "Detail lengkap..."
    
    const txHash = await ajukanPengeluaran(
      judul, 
      tujuan, 
      jumlahWei, 
      penerima, 
      detail
    )
    console.log("Proposal created:", txHash)
  } catch (error) {
    console.error("Failed:", error)
  }
}
```

### 4. Vote untuk Proposal

```typescript
import { vote } from "@/lib/blockchain"

const handleVote = async (proposalId: number, setuju: boolean) => {
  try {
    const txHash = await vote(proposalId, setuju)
    console.log("Vote recorded:", txHash)
  } catch (error) {
    console.error("Failed:", error)
  }
}
```

### 5. Listen to Events

```typescript
import { listenToVoteEvents } from "@/lib/blockchain"

useEffect(() => {
  listenToVoteEvents((event) => {
    console.log("New vote:", event)
    // Update UI
  })
}, [])
```

## Mock Data untuk Development

Jika smart contract belum di-deploy, gunakan mock data dari `lib/mock-blockchain.ts`:

```typescript
import { mockProposals, mockPemasukan } from "@/lib/mock-blockchain"

// Gunakan mock data
const proposals = mockProposals
const pemasukan = mockPemasukan
```

## Troubleshooting

### MetaMask tidak terdeteksi

Pastikan MetaMask terinstall dan Anda sudah login.

### Transaction Failed

- Periksa apakah Anda memiliki ETH untuk gas fee
- Pastikan wallet address Anda memiliki role yang sesuai (bendahara/pengawas)
- Cek apakah contract address benar

### Wrong Network

Pastikan MetaMask terhubung ke network yang sama dengan contract deployment (localhost/Sepolia/etc)

```typescript
// Add network to MetaMask
await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x7A69', // 31337 in hex (hardhat)
    chainName: 'Hardhat Local',
    rpcUrls: ['http://127.0.0.1:8545'],
  }],
})
```

## Security Best Practices

1. **Private Keys**: Jangan pernah commit private keys ke git
2. **Environment Variables**: Gunakan .env.local untuk sensitive data
3. **Validation**: Selalu validasi input di frontend sebelum kirim ke contract
4. **Gas Limit**: Set reasonable gas limit untuk transaksi
5. **Testing**: Test contract secara menyeluruh sebelum production

## Gas Optimization Tips

1. Gunakan `memory` untuk temporary data
2. Batch operations jika memungkinkan
3. Minimize storage operations
4. Use events untuk data yang tidak perlu di-query on-chain

## Support

Untuk pertanyaan lebih lanjut:
- Baca dokumentasi Hardhat: https://hardhat.org/docs
- Baca dokumentasi Ethers.js: https://docs.ethers.org
- Check Solidity docs: https://docs.soliditylang.org
