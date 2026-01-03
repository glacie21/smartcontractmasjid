# Smart Contract MasjidFinance

Smart contract untuk sistem transparansi keuangan masjid berbasis blockchain.

## Overview

Contract ini menyediakan sistem lengkap untuk mengelola keuangan masjid dengan transparansi penuh menggunakan blockchain technology. Semua transaksi tercatat secara permanen dan tidak dapat dimanipulasi.

## Features

### 1. Manajemen Pemasukan
- Bendahara dapat mencatat pemasukan dana dari jamaah
- Setiap pemasukan memiliki informasi: donatur, jenis dana, jumlah, timestamp
- Data pemasukan bersifat immutable setelah tercatat

### 2. Sistem Proposal Pengeluaran
- Bendahara dapat mengajukan proposal pengeluaran
- Setiap proposal berisi: judul, tujuan, jumlah, penerima, detail
- Proposal harus melalui proses voting sebelum disetujui

### 3. Voting Transparan
- Dewan pengawas memberikan suara (setuju/tolak)
- Setiap pengawas hanya dapat voting sekali per proposal
- Hasil voting transparan dan tercatat di blockchain
- Auto-evaluasi ketika kuorum tercapai

### 4. Eksekusi Pengeluaran
- Proposal yang disetujui dapat dieksekusi oleh bendahara
- Bukti eksekusi (hash dokumen) disimpan di blockchain
- Status proposal otomatis berubah menjadi "Dieksekusi"

## Architecture

### Roles
- **Bendahara**: Mengelola pemasukan, mengajukan proposal, eksekusi pengeluaran
- **Pengawas**: Melakukan voting terhadap proposal pengeluaran
- **Jamaah**: Dapat melihat semua transaksi (read-only via frontend)

### Status Proposal
1. **MenungguVoting**: Proposal baru menunggu voting
2. **Disetujui**: Mayoritas pengawas menyetujui
3. **Ditolak**: Mayoritas pengawas menolak
4. **Dieksekusi**: Pengeluaran telah dilaksanakan

## Main Functions

### Pemasukan
```solidity
catatPemasukan(address donatur, string jenisDana, uint256 jumlah)
