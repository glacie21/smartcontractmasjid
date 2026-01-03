// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MasjidFinance
 * @dev Smart Contract untuk sistem keuangan masjid berbasis blockchain
 * @notice Contract ini mengelola pemasukan, proposal pengeluaran, dan voting
 */
contract MasjidFinance {
    // ============ State Variables ============
    
    address public bendahara;
    address[] public pengawas;
    uint256 public minimumVotes;
    
    // ============ Structs ============
    
    struct Pemasukan {
        uint256 id;
        address donatur;
        string jenisDana; // infaq, zakat, wakaf, dll
        uint256 jumlah;
        uint256 timestamp;
        bool verified;
    }
    
    struct Pengeluaran {
        uint256 id;
        string judul;
        string tujuan;
        uint256 jumlah;
        address penerima;
        string detail;
        StatusPengeluaran status;
        uint256 timestampPengajuan;
        uint256 voteSetuju;
        uint256 voteTolak;
        mapping(address => bool) hasVoted;
        mapping(address => bool) voteChoice; // true = setuju, false = tolak
        string buktiEksekusi;
    }
    
    enum StatusPengeluaran {
        MenungguVoting,
        Disetujui,
        Ditolak,
        Dieksekusi
    }
    
    // ============ Storage ============
    
    Pemasukan[] public daftarPemasukan;
    mapping(uint256 => Pengeluaran) public daftarPengeluaran;
    uint256 public jumlahPengeluaran;
    
    mapping(address => bool) public isPengawas;
    
    // ============ Events ============
    
    event PemasukanDicatat(
        uint256 indexed id,
        address indexed donatur,
        string jenisDana,
        uint256 jumlah,
        uint256 timestamp
    );
    
    event ProposalDiajukan(
        uint256 indexed id,
        string judul,
        uint256 jumlah,
        address penerima,
        uint256 timestamp
    );
    
    event VoteDiberikan(
        uint256 indexed proposalId,
        address indexed pengawas,
        bool setuju,
        uint256 timestamp
    );
    
    event ProposalDisetujui(
        uint256 indexed proposalId,
        uint256 voteSetuju,
        uint256 voteTolak
    );
    
    event ProposalDitolak(
        uint256 indexed proposalId,
        uint256 voteSetuju,
        uint256 voteTolak
    );
    
    event PengeluaranDieksekusi(
        uint256 indexed proposalId,
        string buktiHash,
        uint256 timestamp
    );
    
    // ============ Modifiers ============
    
    modifier onlyBendahara() {
        require(msg.sender == bendahara, "Hanya bendahara yang dapat melakukan aksi ini");
        _;
    }
    
    modifier onlyPengawas() {
        require(isPengawas[msg.sender], "Hanya pengawas yang dapat melakukan aksi ini");
        _;
    }
    
    modifier validProposal(uint256 proposalId) {
        require(proposalId < jumlahPengeluaran, "Proposal tidak ditemukan");
        _;
    }
    
    modifier notVotedYet(uint256 proposalId) {
        require(!daftarPengeluaran[proposalId].hasVoted[msg.sender], "Anda sudah memberikan suara");
        _;
    }
    
    modifier onlyApproved(uint256 proposalId) {
        require(
            daftarPengeluaran[proposalId].status == StatusPengeluaran.Disetujui,
            "Proposal belum disetujui"
        );
        _;
    }
    
    // ============ Constructor ============
    
    constructor(address[] memory _pengawas, uint256 _minimumVotes) {
        require(_pengawas.length >= _minimumVotes, "Jumlah pengawas harus >= minimum votes");
        
        bendahara = msg.sender;
        minimumVotes = _minimumVotes;
        
        for (uint256 i = 0; i < _pengawas.length; i++) {
            pengawas.push(_pengawas[i]);
            isPengawas[_pengawas[i]] = true;
        }
    }
    
    // ============ Fungsi Pemasukan ============
    
    /**
     * @dev Mencatat pemasukan dana dari donatur
     * @param donatur Alamat wallet donatur
     * @param jenisDana Jenis dana (infaq, zakat, wakaf, dll)
     * @param jumlah Jumlah dana dalam Wei
     */
    function catatPemasukan(
        address donatur,
        string memory jenisDana,
        uint256 jumlah
    ) external onlyBendahara {
        require(donatur != address(0), "Alamat donatur tidak valid");
        require(jumlah > 0, "Jumlah harus lebih dari 0");
        
        uint256 id = daftarPemasukan.length;
        
        Pemasukan memory pemasukan = Pemasukan({
            id: id,
            donatur: donatur,
            jenisDana: jenisDana,
            jumlah: jumlah,
            timestamp: block.timestamp,
            verified: true
        });
        
        daftarPemasukan.push(pemasukan);
        
        emit PemasukanDicatat(id, donatur, jenisDana, jumlah, block.timestamp);
    }
    
    /**
     * @dev Mendapatkan semua pemasukan
     * @return Array of Pemasukan structs
     */
    function getDaftarPemasukan() external view returns (Pemasukan[] memory) {
        return daftarPemasukan;
    }
    
    /**
     * @dev Mendapatkan total pemasukan
     * @return Total pemasukan dalam Wei
     */
    function getTotalPemasukan() external view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < daftarPemasukan.length; i++) {
            total += daftarPemasukan[i].jumlah;
        }
        return total;
    }
    
    // ============ Fungsi Pengeluaran ============
    
    /**
     * @dev Mengajukan proposal pengeluaran
     * @param judul Judul proposal
     * @param tujuan Tujuan pengeluaran
     * @param jumlah Jumlah dana yang diajukan
     * @param penerima Alamat wallet penerima
     * @param detail Rincian detail pengeluaran
     */
    function ajukanPengeluaran(
        string memory judul,
        string memory tujuan,
        uint256 jumlah,
        address penerima,
        string memory detail
    ) external onlyBendahara {
        require(jumlah > 0, "Jumlah harus lebih dari 0");
        require(penerima != address(0), "Alamat penerima tidak valid");
        
        uint256 proposalId = jumlahPengeluaran;
        
        Pengeluaran storage pengeluaran = daftarPengeluaran[proposalId];
        pengeluaran.id = proposalId;
        pengeluaran.judul = judul;
        pengeluaran.tujuan = tujuan;
        pengeluaran.jumlah = jumlah;
        pengeluaran.penerima = penerima;
        pengeluaran.detail = detail;
        pengeluaran.status = StatusPengeluaran.MenungguVoting;
        pengeluaran.timestampPengajuan = block.timestamp;
        pengeluaran.voteSetuju = 0;
        pengeluaran.voteTolak = 0;
        
        jumlahPengeluaran++;
        
        emit ProposalDiajukan(proposalId, judul, jumlah, penerima, block.timestamp);
    }
    
    // ============ Fungsi Voting ============
    
    /**
     * @dev Memberikan suara untuk proposal
     * @param proposalId ID proposal yang akan divoting
     * @param setuju True = setuju, False = tolak
     */
    function vote(uint256 proposalId, bool setuju) 
        external 
        onlyPengawas 
        validProposal(proposalId) 
        notVotedYet(proposalId) 
    {
        Pengeluaran storage pengeluaran = daftarPengeluaran[proposalId];
        
        require(
            pengeluaran.status == StatusPengeluaran.MenungguVoting,
            "Voting tidak aktif untuk proposal ini"
        );
        
        pengeluaran.hasVoted[msg.sender] = true;
        pengeluaran.voteChoice[msg.sender] = setuju;
        
        if (setuju) {
            pengeluaran.voteSetuju++;
        } else {
            pengeluaran.voteTolak++;
        }
        
        emit VoteDiberikan(proposalId, msg.sender, setuju, block.timestamp);
        
        // Auto-evaluate jika semua pengawas sudah voting
        uint256 totalVotes = pengeluaran.voteSetuju + pengeluaran.voteTolak;
        if (totalVotes >= minimumVotes) {
            evaluasiHasilVoting(proposalId);
        }
    }
    
    /**
     * @dev Evaluasi hasil voting dan tentukan status proposal
     * @param proposalId ID proposal yang akan dievaluasi
     */
    function evaluasiHasilVoting(uint256 proposalId) 
        internal 
        validProposal(proposalId) 
    {
        Pengeluaran storage pengeluaran = daftarPengeluaran[proposalId];
        
        require(
            pengeluaran.status == StatusPengeluaran.MenungguVoting,
            "Proposal sudah dievaluasi"
        );
        
        uint256 totalVotes = pengeluaran.voteSetuju + pengeluaran.voteTolak;
        require(totalVotes >= minimumVotes, "Kuorum belum tercapai");
        
        // Proposal disetujui jika mayoritas (>50%) setuju
        if (pengeluaran.voteSetuju > pengeluaran.voteTolak) {
            pengeluaran.status = StatusPengeluaran.Disetujui;
            emit ProposalDisetujui(proposalId, pengeluaran.voteSetuju, pengeluaran.voteTolak);
        } else {
            pengeluaran.status = StatusPengeluaran.Ditolak;
            emit ProposalDitolak(proposalId, pengeluaran.voteSetuju, pengeluaran.voteTolak);
        }
    }
    
    /**
     * @dev Manual trigger evaluasi voting jika kuorum tercapai
     * @param proposalId ID proposal yang akan dievaluasi
     */
    function triggerEvaluasi(uint256 proposalId) 
        external 
        onlyBendahara 
        validProposal(proposalId) 
    {
        evaluasiHasilVoting(proposalId);
    }
    
    // ============ Fungsi Eksekusi ============
    
    /**
     * @dev Eksekusi pengeluaran yang telah disetujui
     * @param proposalId ID proposal yang akan dieksekusi
     * @param buktiHash Hash dari bukti transaksi/dokumen
     */
    function eksekusiPengeluaran(uint256 proposalId, string memory buktiHash) 
        external 
        onlyBendahara 
        validProposal(proposalId) 
        onlyApproved(proposalId) 
    {
        Pengeluaran storage pengeluaran = daftarPengeluaran[proposalId];
        
        require(
            pengeluaran.status == StatusPengeluaran.Disetujui,
            "Proposal belum disetujui"
        );
        
        pengeluaran.status = StatusPengeluaran.Dieksekusi;
        pengeluaran.buktiEksekusi = buktiHash;
        
        emit PengeluaranDieksekusi(proposalId, buktiHash, block.timestamp);
    }
    
    // ============ View Functions ============
    
    /**
     * @dev Mendapatkan detail proposal
     * @param proposalId ID proposal
     * @return Tuple dengan detail proposal
     */
    function getProposalDetail(uint256 proposalId) 
        external 
        view 
        validProposal(proposalId) 
        returns (
            uint256 id,
            string memory judul,
            string memory tujuan,
            uint256 jumlah,
            address penerima,
            string memory detail,
            StatusPengeluaran status,
            uint256 voteSetuju,
            uint256 voteTolak,
            string memory buktiEksekusi
        ) 
    {
        Pengeluaran storage pengeluaran = daftarPengeluaran[proposalId];
        return (
            pengeluaran.id,
            pengeluaran.judul,
            pengeluaran.tujuan,
            pengeluaran.jumlah,
            pengeluaran.penerima,
            pengeluaran.detail,
            pengeluaran.status,
            pengeluaran.voteSetuju,
            pengeluaran.voteTolak,
            pengeluaran.buktiEksekusi
        );
    }
    
    /**
     * @dev Cek apakah pengawas sudah voting untuk proposal tertentu
     * @param proposalId ID proposal
     * @param pengawasAddress Alamat pengawas
     * @return True jika sudah voting
     */
    function hasVoted(uint256 proposalId, address pengawasAddress) 
        external 
        view 
        validProposal(proposalId) 
        returns (bool) 
    {
        return daftarPengeluaran[proposalId].hasVoted[pengawasAddress];
    }
    
    /**
     * @dev Mendapatkan pilihan vote dari pengawas
     * @param proposalId ID proposal
     * @param pengawasAddress Alamat pengawas
     * @return True = setuju, False = tolak
     */
    function getVoteChoice(uint256 proposalId, address pengawasAddress) 
        external 
        view 
        validProposal(proposalId) 
        returns (bool) 
    {
        require(
            daftarPengeluaran[proposalId].hasVoted[pengawasAddress],
            "Pengawas belum voting"
        );
        return daftarPengeluaran[proposalId].voteChoice[pengawasAddress];
    }
    
    /**
     * @dev Mendapatkan total pengeluaran yang telah dieksekusi
     * @return Total pengeluaran dalam Wei
     */
    function getTotalPengeluaran() external view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < jumlahPengeluaran; i++) {
            if (daftarPengeluaran[i].status == StatusPengeluaran.Dieksekusi) {
                total += daftarPengeluaran[i].jumlah;
            }
        }
        return total;
    }
    
    /**
     * @dev Mendapatkan saldo tersedia (pemasukan - pengeluaran)
     * @return Saldo dalam Wei
     */
    function getSaldoTersedia() external view returns (uint256) {
        uint256 totalPemasukan = 0;
        for (uint256 i = 0; i < daftarPemasukan.length; i++) {
            totalPemasukan += daftarPemasukan[i].jumlah;
        }
        
        uint256 totalPengeluaran = 0;
        for (uint256 i = 0; i < jumlahPengeluaran; i++) {
            if (daftarPengeluaran[i].status == StatusPengeluaran.Dieksekusi) {
                totalPengeluaran += daftarPengeluaran[i].jumlah;
            }
        }
        
        return totalPemasukan - totalPengeluaran;
    }
    
    /**
     * @dev Mendapatkan daftar semua pengawas
     * @return Array alamat pengawas
     */
    function getDaftarPengawas() external view returns (address[] memory) {
        return pengawas;
    }
}
