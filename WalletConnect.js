import { ethers } from "ethers";

// 1. Alamat Contract & ABI (Dapatkan setelah kamu deploy di Remix/Hardhat)
const CONTRACT_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";
const CONTRACT_ABI = [
  "function donasi() public payable",
  "function getSaldoMasjid() public view returns (uint256)",
  // Tambahkan fungsi lain sesuai smart contract kamu
];

async function connectAndDonasi(amountInEth) {
  // Cek apakah MetaMask terpasang
  if (typeof window.ethereum !== "undefined") {
    try {
      // 2. Minta izin akses akun ke MetaMask
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      
      // 3. Setup Provider dan Signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // 4. Hubungkan ke Contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // 5. Contoh panggil fungsi 'donasi' dengan mengirim ETH
      const tx = await contract.donasi({
        value: ethers.parseEther(amountInEth)
      });

      console.log("Transaksi dikirim:", tx.hash);
      await tx.wait();
      alert("Donasi berhasil!");

    } catch (error) {
      console.error("User menolak koneksi atau terjadi error:", error);
    }
  } else {
    alert("Silakan instal MetaMask!");
  }
}
