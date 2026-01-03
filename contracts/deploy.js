// Script untuk deployment smart contract MasjidFinance
// Menggunakan Hardhat

const { ethers } = require("hardhat")

async function main() {
  console.log("🕌 Deploying MasjidFinance Smart Contract...\n")

  // Dapatkan signer (deployer)
  const [deployer] = await ethers.getSigners()
  console.log("Deploying with account:", deployer.address)
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString(), "\n")

  // Konfigurasi deployment
  const pengawasAddresses = [
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", // Pengawas 1
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", // Pengawas 2
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906", // Pengawas 3
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", // Pengawas 4
    "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", // Pengawas 5
  ]

  const minimumVotes = 3 // Minimal 3 dari 5 pengawas harus voting

  console.log("Konfigurasi Deployment:")
  console.log("- Jumlah Pengawas:", pengawasAddresses.length)
  console.log("- Minimum Votes:", minimumVotes)
  console.log("\nAlamat Pengawas:")
  pengawasAddresses.forEach((addr, i) => {
    console.log(`  ${i + 1}. ${addr}`)
  })

  // Deploy contract
  console.log("\n🚀 Deploying contract...")
  const MasjidFinance = await ethers.deployContract("MasjidFinance", [pengawasAddresses, minimumVotes])

  await MasjidFinance.waitForDeployment()

  const contractAddress = await MasjidFinance.getAddress()
  console.log("\n✅ MasjidFinance deployed successfully!")
  console.log("📍 Contract Address:", contractAddress)

  // Verifikasi deployment
  console.log("\n🔍 Verifying deployment...")
  const bendahara = await MasjidFinance.bendahara()
  const minVotes = await MasjidFinance.minimumVotes()
  const daftarPengawas = await MasjidFinance.getDaftarPengawas()

  console.log("\nContract Information:")
  console.log("- Bendahara:", bendahara)
  console.log("- Minimum Votes:", minVotes.toString())
  console.log("- Total Pengawas:", daftarPengawas.length)

  // Simpan deployment info
  const deploymentInfo = {
    network: "localhost", // Ubah sesuai network
    contractAddress: contractAddress,
    bendahara: bendahara,
    pengawas: pengawasAddresses,
    minimumVotes: minimumVotes,
    deployedAt: new Date().toISOString(),
    deployer: deployer.address,
  }

  console.log("\n📄 Deployment Info:")
  console.log(JSON.stringify(deploymentInfo, null, 2))

  console.log("\n✨ Deployment completed successfully!")
  console.log("\n📝 Next steps:")
  console.log("1. Copy contract address to your frontend configuration")
  console.log("2. Update environment variables with contract address")
  console.log("3. Verify contract on block explorer (if mainnet/testnet)")
  console.log("4. Test contract functions through frontend")

  return deploymentInfo
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
