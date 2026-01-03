const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("MasjidFinance", () => {
  let masjidFinance
  let bendahara
  let pengawas1, pengawas2, pengawas3, pengawas4, pengawas5
  let donatur1, donatur2
  let penerima

  beforeEach(async () => {
    // Get signers
    ;[bendahara, pengawas1, pengawas2, pengawas3, pengawas4, pengawas5, donatur1, donatur2, penerima] =
      await ethers.getSigners()

    // Deploy contract
    const MasjidFinance = await ethers.getContractFactory("MasjidFinance")
    const pengawasList = [pengawas1.address, pengawas2.address, pengawas3.address, pengawas4.address, pengawas5.address]
    const minimumVotes = 3

    masjidFinance = await MasjidFinance.deploy(pengawasList, minimumVotes)
    await masjidFinance.waitForDeployment()
  })

  describe("Deployment", () => {
    it("Should set the right bendahara", async () => {
      expect(await masjidFinance.bendahara()).to.equal(bendahara.address)
    })

    it("Should set the right minimum votes", async () => {
      expect(await masjidFinance.minimumVotes()).to.equal(3)
    })

    it("Should register all pengawas correctly", async () => {
      const pengawasList = await masjidFinance.getDaftarPengawas()
      expect(pengawasList.length).to.equal(5)
      expect(await masjidFinance.isPengawas(pengawas1.address)).to.be.true
    })
  })

  describe("Pemasukan", () => {
    it("Should allow bendahara to record pemasukan", async () => {
      const jumlah = ethers.parseEther("1.0")

      await expect(masjidFinance.catatPemasukan(donatur1.address, "Infaq", jumlah)).to.emit(
        masjidFinance,
        "PemasukanDicatat",
      )

      const total = await masjidFinance.getTotalPemasukan()
      expect(total).to.equal(jumlah)
    })

    it("Should not allow non-bendahara to record pemasukan", async () => {
      const jumlah = ethers.parseEther("1.0")

      await expect(
        masjidFinance.connect(pengawas1).catatPemasukan(donatur1.address, "Infaq", jumlah),
      ).to.be.revertedWith("Hanya bendahara yang dapat melakukan aksi ini")
    })

    it("Should track multiple pemasukan correctly", async () => {
      await masjidFinance.catatPemasukan(donatur1.address, "Infaq", ethers.parseEther("1.0"))
      await masjidFinance.catatPemasukan(donatur2.address, "Zakat", ethers.parseEther("2.0"))

      const total = await masjidFinance.getTotalPemasukan()
      expect(total).to.equal(ethers.parseEther("3.0"))
    })
  })

  describe("Proposal Pengeluaran", () => {
    it("Should allow bendahara to create proposal", async () => {
      const jumlah = ethers.parseEther("1.0")

      await expect(
        masjidFinance.ajukanPengeluaran(
          "Renovasi Masjid",
          "Perbaikan atap",
          jumlah,
          penerima.address,
          "Detail renovasi lengkap",
        ),
      ).to.emit(masjidFinance, "ProposalDiajukan")

      expect(await masjidFinance.jumlahPengeluaran()).to.equal(1)
    })

    it("Should not allow non-bendahara to create proposal", async () => {
      const jumlah = ethers.parseEther("1.0")

      await expect(
        masjidFinance
          .connect(pengawas1)
          .ajukanPengeluaran("Renovasi Masjid", "Perbaikan atap", jumlah, penerima.address, "Detail renovasi lengkap"),
      ).to.be.revertedWith("Hanya bendahara yang dapat melakukan aksi ini")
    })
  })

  describe("Voting", () => {
    beforeEach(async () => {
      // Create a proposal first
      const jumlah = ethers.parseEther("1.0")
      await masjidFinance.ajukanPengeluaran(
        "Renovasi Masjid",
        "Perbaikan atap",
        jumlah,
        penerima.address,
        "Detail renovasi lengkap",
      )
    })

    it("Should allow pengawas to vote", async () => {
      await expect(masjidFinance.connect(pengawas1).vote(0, true)).to.emit(masjidFinance, "VoteDiberikan")

      expect(await masjidFinance.hasVoted(0, pengawas1.address)).to.be.true
    })

    it("Should not allow non-pengawas to vote", async () => {
      await expect(masjidFinance.connect(donatur1).vote(0, true)).to.be.revertedWith(
        "Hanya pengawas yang dapat melakukan aksi ini",
      )
    })

    it("Should not allow voting twice", async () => {
      await masjidFinance.connect(pengawas1).vote(0, true)

      await expect(masjidFinance.connect(pengawas1).vote(0, false)).to.be.revertedWith("Anda sudah memberikan suara")
    })

    it("Should approve proposal with majority votes", async () => {
      // 3 votes for approval (60%)
      await masjidFinance.connect(pengawas1).vote(0, true)
      await masjidFinance.connect(pengawas2).vote(0, true)
      await masjidFinance.connect(pengawas3).vote(0, true)

      const proposal = await masjidFinance.getProposalDetail(0)
      expect(proposal.status).to.equal(1) // 1 = Disetujui
    })

    it("Should reject proposal without majority", async () => {
      // 2 approve, 1 reject
      await masjidFinance.connect(pengawas1).vote(0, true)
      await masjidFinance.connect(pengawas2).vote(0, true)
      await masjidFinance.connect(pengawas3).vote(0, false)

      const proposal = await masjidFinance.getProposalDetail(0)
      expect(proposal.status).to.equal(2) // 2 = Ditolak
    })
  })

  describe("Eksekusi Pengeluaran", () => {
    beforeEach(async () => {
      // Record some income first
      await masjidFinance.catatPemasukan(donatur1.address, "Infaq", ethers.parseEther("5.0"))

      // Create and approve a proposal
      const jumlah = ethers.parseEther("1.0")
      await masjidFinance.ajukanPengeluaran(
        "Renovasi Masjid",
        "Perbaikan atap",
        jumlah,
        penerima.address,
        "Detail renovasi lengkap",
      )

      // Get approval
      await masjidFinance.connect(pengawas1).vote(0, true)
      await masjidFinance.connect(pengawas2).vote(0, true)
      await masjidFinance.connect(pengawas3).vote(0, true)
    })

    it("Should allow bendahara to execute approved proposal", async () => {
      await expect(masjidFinance.eksekusiPengeluaran(0, "0xbukti123")).to.emit(masjidFinance, "PengeluaranDieksekusi")

      const proposal = await masjidFinance.getProposalDetail(0)
      expect(proposal.status).to.equal(3) // 3 = Dieksekusi
    })

    it("Should not allow executing unapproved proposal", async () => {
      // Create new proposal without approval
      await masjidFinance.ajukanPengeluaran(
        "Proposal 2",
        "Tujuan 2",
        ethers.parseEther("1.0"),
        penerima.address,
        "Detail 2",
      )

      await expect(masjidFinance.eksekusiPengeluaran(1, "0xbukti123")).to.be.revertedWith("Proposal belum disetujui")
    })
  })

  describe("Financial Calculations", () => {
    it("Should calculate saldo correctly", async () => {
      // Record income
      await masjidFinance.catatPemasukan(donatur1.address, "Infaq", ethers.parseEther("5.0"))
      await masjidFinance.catatPemasukan(donatur2.address, "Zakat", ethers.parseEther("3.0"))

      // Create, approve, and execute expense
      await masjidFinance.ajukanPengeluaran(
        "Renovasi",
        "Perbaikan",
        ethers.parseEther("2.0"),
        penerima.address,
        "Detail",
      )

      await masjidFinance.connect(pengawas1).vote(0, true)
      await masjidFinance.connect(pengawas2).vote(0, true)
      await masjidFinance.connect(pengawas3).vote(0, true)

      await masjidFinance.eksekusiPengeluaran(0, "0xbukti")

      const saldo = await masjidFinance.getSaldoTersedia()
      expect(saldo).to.equal(ethers.parseEther("6.0")) // 8 - 2
    })
  })
})
