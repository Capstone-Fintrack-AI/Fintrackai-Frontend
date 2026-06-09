import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import ScanStrukModal from "./ScanStrukModal";
import { Link } from "react-router-dom";
import axios from "axios";

const Transaksi = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Transaksi");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [notif, setNotif] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const kebutuhan = totalPemasukan * 0.5;
  const keinginan = totalPemasukan * 0.3;
  const tabungan = totalPemasukan * 0.2;

  const dataTampil = dataTransaksi.filter((item) => {
    const desc = item?.desc || "";
    const nominal = Number(item?.nominal || 0);
    const kategori = item?.kat || "";

    const matchesSearch = desc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      activeFilter === "Semua"
        ? true
        : activeFilter === "Pemasukan"
          ? nominal > 0
          : nominal < 0;

    const matchesCategory =
      activeCategoryFilter === "Semua"
        ? true
        : kategori === activeCategoryFilter;

    return matchesSearch && matchesType && matchesCategory;
  });

  const handleProcessScan = (file) => {
    alert("Struk berhasil diunggah!");
  };

  const terpakaiKebutuhan = dataTransaksi
    .filter(
      (item) => item.nominal < 0 && item.kat?.toLowerCase() === "kebutuhan",
    )
    .reduce((sum, item) => sum + Math.abs(item.nominal), 0);

  const terpakaiKeinginan = dataTransaksi
    .filter(
      (item) => item.nominal < 0 && item.kat?.toLowerCase() === "keinginan",
    )
    .reduce((sum, item) => sum + Math.abs(item.nominal), 0);

  const terpakaiTabungan = dataTransaksi
    .filter(
      (item) => item.nominal < 0 && item.kat?.toLowerCase() === "tabungan",
    )
    .reduce((sum, item) => sum + Math.abs(item.nominal), 0);

  // SISA UANG
  const sisaKebutuhan = kebutuhan - terpakaiKebutuhan;
  const sisaKeinginan = keinginan - terpakaiKeinginan;
  const sisaTabungan = tabungan - terpakaiTabungan;
  // AND SISA UANG

  useEffect(() => {
    if (location.state?.bukaModal) {
      setIsModalOpen(true);
    }

    const fetchTransaksi = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        const userId = user.id;

        const [pemasukanRes, pengeluaranRes] = await Promise.all([
          axios.get(
            `https://fintrackai-backend-1yz0.onrender.com/pemasukan/user/${userId}`,
          ),
          axios.get(
            `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`,
          ),
        ]);

        // Hitung total pemasukan
        const total = pemasukanRes.data.data.reduce(
          (sum, item) => sum + Number(item.jumlah),
          0,
        );

        setTotalPemasukan(total);

        // Mapping Pemasukan
        const pemasukan = pemasukanRes.data.data.map((item) => ({
          id: `p-${item.id}`,
          tipe: "Pemasukan",
          tgl: new Date(item.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          kat: item.sumber_pemasukan,
          desc: item.nama_pemasukan,
          nominal: Number(item.jumlah),
          createdAt: item.created_at,
        }));

        // Mapping Pengeluaran
        const pengeluaran = pengeluaranRes.data.data.map((item) => ({
          id: `g-${item.id}`,
          tipe: "Pengeluaran",
          tgl: new Date(item.tanggal).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          kat: item.kategori,
          desc: item.nama_pengeluaran,
          nominal: -Number(item.jumlah),
          createdAt: item.created_at,
        }));

        // Gabungkan & urutkan terbaru
        const semuaTransaksi = [...pemasukan, ...pengeluaran].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setDataTransaksi(semuaTransaksi);
      } catch (error) {
        console.error("Gagal mengambil transaksi", error);
      }
    };

    fetchTransaksi();
  }, [location]);

  // State menampung data form edit
  const [editForm, setEditForm] = useState({
    tgl: "",
    kat: "",
    desc: "",
    nominal: "",
  });

  // --- FUNGSI AKSI (PEMICU MODAL) ---
  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditForm({
      tgl: item.tgl,
      kat: item.kat,
      desc: item.desc,
      nominal: item.nominal,
    });
    setIsEditOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteOpen(true);
  };

  const handleConfirmEdit = (e) => {
    e.preventDefault();
    console.log("Data berhasil diubah:", editForm);
    setIsEditOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedItem?.id) return;

    try {
      const response = await fetch(
        `https://fintrackai-backend-1yz0.onrender.com/pemasukan/${selectedItem.id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal menghapus pemasukan");
      }

      // Hapus data dari state agar UI langsung update
      setIncome((prev) =>
        prev.filter((item) => item.id !== selectedItem.id)
      );

      setIsDeleteOpen(false);
      setSelectedItem(null);

      alert("Pemasukan berhasil dihapus");
    } catch (error) {
      console.error("Error delete pemasukan:", error);
      alert(error.message || "Terjadi kesalahan saat menghapus data");
    }
  };

  const totalPengeluaran = dataTransaksi
    .filter((item) => item.nominal < 0)
    .reduce((sum, item) => sum + Math.abs(item.nominal), 0);
  const saldoSaatIni = totalPemasukan - totalPengeluaran;

  return (
    <div className="h-screen bg-[#f8f6ff] font-poppins flex overflow-hidden relative w-full">
      {/* =========================================================
          1. BACKGROUND TEMA & BUBBLE (PERSIS BERANDA)
      ========================================================= */}
      <style>{`
        .bg-grid-pattern { background-image: radial-gradient(#d1d5db 1px, transparent 1px); background-size: 30px 30px; }
        .color-bubble { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(120px); opacity: 0.5; z-index: 0; }
        .bubble-1 { width: 500px; height: 500px; background: #e0d4fc; bottom: -10%; left: -5%; }
        .bubble-2 { width: 400px; height: 400px; background: #fce4ec; top: 20%; right: -5%; }
        .bubble-3 { width: 300px; height: 300px; background: #e0f2fe; bottom: 30%; left: 40%; }
        @keyframes float { 0% { transform: translateY(0px) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } 100% { transform: translateY(0px) scale(1); } }
        .animate-bubble-img { animation: float 6s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bg-grid-pattern absolute inset-0 opacity-40"></div>
        <div className="color-bubble bubble-1"></div>
        <div className="color-bubble bubble-2"></div>
        <div className="color-bubble bubble-3"></div>
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/gambar/bubble.png"
            className="absolute top-[-5%] left-[-2%] w-[350px] opacity-60 animate-bubble-img"
            alt="bubble"
          />
          <img
            src="/gambar/bubble.png"
            className="absolute top-[35%] right-[-5%] w-[250px] opacity-40 animate-bubble-img"
            style={{ animationDelay: "2s" }}
            alt="bubble"
          />
          <img
            src="/gambar/bubble.png"
            className="absolute bottom-[-5%] left-[15%] w-[300px] opacity-50 animate-bubble-img"
            style={{ animationDelay: "4s" }}
            alt="bubble"
          />
        </div>
      </div>

      {/* =========================================================
      2. SIDEBAR KIRI (KHUSUS TAMPILAN DESKTOP - OTOMATIS HILANG DI HP)
            ========================================================= */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} hidden md:flex absolute md:relative z-[60] md:z-10 h-full bg-white border-r border-[#f0f0f0] px-4 md:px-6 py-6 md:py-8 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300`}
      >
        {/* Bagian Atas: Logo & Tombol Toggle Desktop */}
        <div className="flex flex-col items-center mb-10 relative">
          <img src="/gambar/logo.png" className="w-16 mb-2" alt="Logo" />
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-10 top-2 z-[60] w-16 h-16 transition-transform duration-300 hover:scale-105 focus:outline-none"
          >
            <img
              src="/gambar/robotngintip.png"
              alt="Toggle Sidebar"
              className="w-full h-full object-contain"
            />
          </button>
        </div>

        {/* Menu Navigasi Utama Desktop */}
        <nav className="relative flex-grow font-medium flex flex-col gap-4">
          <div
            className="absolute left-0 w-full h-[52px] bg-[#f0eaff] rounded-2xl shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateY(${["Beranda", "Transaksi", "Budget", "Goals", "AI"].indexOf(activeMenu) * 68}px)`,
              display: [
                "Beranda",
                "Transaksi",
                "Budget",
                "Goals",
                "AI",
              ].includes(activeMenu)
                ? "block"
                : "none",
            }}
          ></div>

          {[
            { n: "Beranda", img: "/gambar/beranda.png", path: "/beranda" },
            {
              n: "Transaksi",
              img: "/gambar/transaksi.png",
              path: "/transaksi",
            },
            { n: "Budget", img: "/gambar/budget.png", path: "/budget" },
            { n: "Goals", img: "/gambar/goals.png", path: "/goals" },
            { n: "AI", img: "/gambar/ai.png", path: "/ai" },
          ].map((item) => (
            <div
              key={item.n}
              onClick={() => {
                navigate(item.path);
              }}
              className={`relative z-10 flex items-center ${isSidebarOpen ? "gap-4 px-3.5" : "justify-center px-0"} cursor-pointer h-[52px] rounded-2xl transition-all duration-300 ${activeMenu === item.n
                ? "text-[#8477e4] font-bold"
                : "text-gray-400 hover:text-gray-900"
                }`}
            >
              <img
                src={item.img}
                className={`w-6 h-6 object-contain transition-all ${activeMenu !== item.n ? "grayscale opacity-70" : ""}`}
                alt={item.n}
              />
              {isSidebarOpen && <span className="text-sm">{item.n}</span>}
            </div>
          ))}
        </nav>

        {/* Menu Bawah Desktop: Pengaturan & Logout */}
        <div className="border-t border-gray-100 pt-6 space-y-4 font-medium relative z-10 bg-white">
          <div
            onClick={() => navigate("/pengaturan")}
            className={`flex items-center ${isSidebarOpen ? "gap-4 p-3.5" : "justify-center p-0 h-[52px]"} cursor-pointer rounded-2xl ${activeMenu === "Pengaturan" ? "bg-[#f0eaff] text-[#8477e4] font-bold" : "text-gray-400 hover:text-gray-900"} transition-all`}
          >
            <img
              src="/gambar/pengaturan.png"
              className={`w-6 h-6 object-contain ${activeMenu !== "Pengaturan" ? "grayscale opacity-70" : ""}`}
              alt="Setting"
            />
            {isSidebarOpen && <span className="text-sm">Pengaturan</span>}
          </div>
          <div
            onClick={handleLogout}
            className={`flex items-center ${isSidebarOpen ? "gap-4 p-3.5" : "justify-center p-0 h-[52px]"} cursor-pointer rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all`}
          >
            <img
              src="/gambar/logout.png"
              className="w-6 h-6 object-contain grayscale opacity-70"
              alt="Logout"
            />
            {isSidebarOpen && <span className="text-sm">Logout</span>}
          </div>
        </div>
      </div>

      {/* =========================================================
      3. MOBILE NAVBAR (BERDIRI SENDIRI DI LUAR - KHUSUS LAYAR HP)
          ========================================================= */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-center gap-3">
        {/* Pop-up Menu Logo saat Robot Mobile Ditekan */}
        {isMobileMenuOpen && (
          <div className="bg-white/90 backdrop-blur-md border border-purple-100 p-3 rounded-2xl shadow-xl flex flex-col gap-4 items-center animate-bounce-short">
            {/* List Menu Utama Mobile */}
            {[
              { n: "Beranda", img: "/gambar/beranda.png", path: "/beranda" },
              {
                n: "Transaksi",
                img: "/gambar/transaksi.png",
                path: "/transaksi",
              },
              { n: "Budget", img: "/gambar/budget.png", path: "/budget" },
              { n: "Goals", img: "/gambar/goals.png", path: "/goals" },
              { n: "AI", img: "/gambar/ai.png", path: "/ai" },
            ].map((item) => (
              <div
                key={item.n}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${activeMenu === item.n
                  ? "bg-[#f0eaff] scale-110"
                  : "opacity-60"
                  }`}
              >
                <img
                  src={item.img}
                  className={`w-6 h-6 object-contain ${activeMenu !== item.n ? "grayscale" : ""}`}
                  alt={item.n}
                />
              </div>
            ))}

            {/* Garis Pembatas Tipis */}
            <div className="w-full border-t border-gray-200 my-1"></div>

            {/* Pengaturan Versi Mobile */}
            <div
              onClick={() => {
                navigate("/pengaturan");
                setIsMobileMenuOpen(false);
              }}
              className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${activeMenu === "Pengaturan"
                ? "bg-[#f0eaff] scale-110"
                : "opacity-60"
                }`}
            >
              <img
                src="/gambar/pengaturan.png"
                className={`w-6 h-6 object-contain ${activeMenu !== "Pengaturan" ? "grayscale" : ""}`}
                alt="Pengaturan"
              />
            </div>

            <div
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded-xl transition-all duration-200 cursor-pointer opacity-60 hover:bg-red-50 text-red-500"
            >
              <img
                src="/gambar/logout.png"
                className="w-6 h-6 object-contain grayscale opacity-70"
                alt="Logout"
              />
            </div>
          </div>
        )}

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-16 h-16 bg-transparent flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none"
        >
          <img
            src="/gambar/robotngintip.png"
            className="w-14 h-14 object-contain transform -rotate-90 hover:translate-y-[-4px] transition-transform"
            alt="FinTrack AI Assistant"
          />
        </button>
      </div>

      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(newData) => {
            const transaksiBaru = {
              tgl: new Date().toLocaleDateString("id-ID"),
              kat: newData.kat,
              desc: newData.desc,
              nominal: newData.nominal,
            };

            setDataTransaksi((prev) => [transaksiBaru, ...prev]);

            setNotif({
              type: transaksiBaru.nominal > 0 ? "Pemasukan" : "Pengeluaran",
              nama: transaksiBaru.desc,
            });

            setTimeout(() => {
              setNotif(null);
            }, 3000);

            setIsModalOpen(false);
          }}
        />
      )}

      {isScanModalOpen && (
        <ScanStrukModal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onUpload={handleProcessScan}
        />
      )}

      {/* =========================================================
          3. AREA KONTEN UTAMA (KORIDOR KANAN - ISI TRANSAKSI)
      ========================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto z-10 relative pb-20 w-full">
        {/* HEADER: Flex column di mobile, baris di desktop */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 md:px-10 pt-6 sm:pt-8 pb-4 bg-transparent gap-4 md:gap-0 w-full">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 truncate">
              Transaksi
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 truncate">
              Kelola semua pemasukan dan pengeluaranmu
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full md:w-auto">
            {/* Tombol Scan Struk (Putih tulisan Ungu) */}
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-white text-[#8477e4] border-2 border-[#8477e4] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold hover:bg-[#8477e4] hover:text-white shadow-sm transition-all duration-300 whitespace-nowrap"
            >
              <i className="fas fa-camera"></i> Scan
            </button>

            {/* Tombol Catat Transaksi (Ungu tulisan Putih) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-[#8477e4] text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-[10px] sm:text-xs font-bold hover:bg-[#7466d3] hover:shadow-lg transition-all duration-300 whitespace-nowrap"
            >
              Catat <span className="hidden sm:inline">Transaksi</span>{" "}
              <i className="fas fa-plus"></i>
            </button>

            <div className="flex items-center gap-3 shrink-0">
              {/* Profil User yang bisa diklik */}
              <Link
                to="/pengaturan"
                className="flex items-center gap-2 sm:gap-3 group"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#8477e4] rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer border border-gray-100 transition-transform duration-200 group-hover:scale-105">
                  <i className="fas fa-user text-xs sm:text-base"></i>
                </div>
                <i className="fas fa-chevron-down text-gray-400 text-[10px] sm:text-xs cursor-pointer"></i>
              </Link>
            </div>
          </div>
        </header>

        {/* BUDGETING */}
        <div className="px-4 sm:px-6 md:px-10 pb-6 sm:pb-8 flex-shrink-0 w-full">
          {/* Total Pemasukan */}
          <div className="bg-gradient-to-r from-[#10b981] to-[#34d399] p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg mb-4 sm:mb-6 text-white w-full">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center text-2xl sm:text-3xl shrink-0">
                <i className="fas fa-wallet"></i>
              </div>

              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-medium text-white/80">
                  Saldo Saat Ini
                </p>

                <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold mt-1">
                  Rp {saldoSaatIni.toLocaleString("id-ID")}
                </h2>

                <p className="text-xs text-white/70 mt-1">
                  Pemasukan - Pengeluaran
                </p>
              </div>
            </div>
          </div>

          {/* Grid Kebutuhan, Keinginan, Tabungan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Kebutuhan */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] flex items-center justify-center text-white text-lg sm:text-2xl shrink-0">
                <i className="fas fa-home"></i>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#6b61b7] truncate">
                  Budget Kebutuhan
                </p>

                <h3 className="text-xs sm:text-sm font-extrabold text-[#453c8a] mt-0.5 truncate">
                  Rp {terpakaiKebutuhan.toLocaleString("id-ID")}
                  <span className="text-gray-400 font-medium text-[9px] sm:text-[10px]">
                    {" "}
                    / Rp {kebutuhan.toLocaleString("id-ID")}
                  </span>
                </h3>

                <p
                  className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${sisaKebutuhan < 0 ? "text-red-500" : "text-green-500"
                    }`}
                >
                  Sisa Rp {sisaKebutuhan.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Keinginan */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center text-white text-lg sm:text-2xl shrink-0">
                <i className="fas fa-shopping-bag"></i>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#6b61b7] truncate">
                  Budget Keinginan
                </p>

                <h3 className="text-xs sm:text-sm font-extrabold text-[#453c8a] mt-0.5 truncate">
                  Rp {terpakaiKeinginan.toLocaleString("id-ID")}
                  <span className="text-gray-400 font-medium text-[9px] sm:text-[10px]">
                    {" "}
                    / Rp {keinginan.toLocaleString("id-ID")}
                  </span>
                </h3>

                <p
                  className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${sisaKeinginan < 0 ? "text-red-500" : "text-green-500"
                    }`}
                >
                  Sisa Rp {sisaKeinginan.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Tabungan */}
            {/* <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#6ee7b7] to-[#10b981] flex items-center justify-center text-white text-lg sm:text-2xl shrink-0">
                <i className="fas fa-piggy-bank"></i>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] sm:text-[11px] font-semibold text-[#6b61b7] truncate">
                  Budget Tabungan
                </p>

                <h3 className="text-xs sm:text-sm font-extrabold text-[#453c8a] mt-0.5 truncate">
                  Rp {terpakaiTabungan.toLocaleString("id-ID")}
                  <span className="text-gray-400 font-medium text-[9px] sm:text-[10px]">
                    {" "}
                    / Rp {tabungan.toLocaleString("id-ID")}
                  </span>
                </h3>

                <p
                  className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${sisaTabungan < 0 ? "text-red-500" : "text-green-500"
                    }`}
                >
                  Sisa Rp {sisaTabungan.toLocaleString("id-ID")}
                </p>
              </div>
            </div> */}
          </div>
        </div>

        {/* 4 METRIC CARDS ROW */}
        <div className="px-4 sm:px-6 md:px-10 w-full">
          <main className="flex-grow pb-8 grid grid-cols-12 gap-6 progress-clean w-full items-start">
            {/* KOLOM TABEL (KIRI - 8/12) */}
            <div className="col-span-12 xl:col-span-8 w-full min-w-0">
              {/* FILTER BAR */}
              <div className="bg-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 sm:gap-4 w-full mb-4">
                {/* Search Input */}
                <div className="relative w-full md:w-64 shrink-0">
                  <input
                    type="text"
                    placeholder="Cari Transaksi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#f8f9fb] px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs outline-none border border-transparent focus:border-[#8477e4]/20"
                  />
                  <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
                  {["Semua", "Pemasukan", "Pengeluaran"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`flex-1 md:flex-none px-2 sm:px-5 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-bold transition-all whitespace-nowrap ${activeFilter === f
                        ? "bg-[#8477e4] text-white shadow-md"
                        : "bg-[#f8f9fb] text-gray-500 hover:bg-gray-100"
                        }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* TABEL RIWAYAT TRANSAKSI */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead className="bg-[#fcfcff] border-b border-gray-50">
                    <tr>
                      <th className="px-2 py-3 md:px-4 md:py-5 text-[8px] md:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest w-[20%]">
                        Tanggal
                      </th>
                      <th className="px-2 py-3 md:px-4 md:py-5 text-[8px] md:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest w-[18%]">
                        Kategori
                      </th>
                      <th className="px-2 py-3 md:px-4 md:py-5 text-[8px] md:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest w-[26%]">
                        Keterangan
                      </th>
                      <th className="px-2 py-3 md:px-4 md:py-5 text-[8px] md:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest text-right w-[22%]">
                        Nominal
                      </th>
                      <th className="px-2 py-3 md:px-4 md:py-5 text-[8px] md:text-[11px] font-extrabold text-gray-400 uppercase tracking-widest text-center w-[14%]">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {/* Loop data per halaman (Sekarang diset 10 data) */}
                    {dataTampil && dataTampil.length > 0
                      ? dataTampil
                        .slice((activePage - 1) * 10, activePage * 10)
                        .map((item, idx) => (
                          <tr
                            key={idx}
                            className="hover:bg-gray-50 transition-all"
                          >
                            <td className="px-2 py-3 md:px-6 md:py-5 text-[9px] md:text-[12px] font-bold text-gray-500 truncate max-w-0">
                              {
                                typeof item.tgl === "string" &&
                                  item.tgl.includes("/")
                                  ? (() => {
                                    // Memecah "3/6/2026" menjadi ['3', '6', '2026']
                                    const [hari, bulan, tahun] =
                                      item.tgl.split("/");

                                    // Array nama bulan Indonesia
                                    const namaBulan = [
                                      "Januari",
                                      "Februari",
                                      "Maret",
                                      "April",
                                      "Mei",
                                      "Juni",
                                      "Juli",
                                      "Agustus",
                                      "September",
                                      "Oktober",
                                      "November",
                                      "Desember",
                                    ];

                                    const bulanIndo =
                                      namaBulan[parseInt(bulan, 10) - 1] ||
                                      bulan;

                                    return `${hari} ${bulanIndo} ${tahun}`;
                                  })()
                                  : item.tgl
                              }
                            </td>
                            <td className="px-2 py-3 md:px-6 md:py-5 max-w-0">
                              <span className="text-[8px] md:text-[10px] font-bold px-1.5 md:px-3 py-0.5 md:py-1 rounded-lg bg-gray-100 text-gray-600 truncate block w-full">
                                {item.kat}
                              </span>
                            </td>
                            <td className="px-2 py-3 md:px-6 md:py-5 text-[9px] md:text-[12px] font-bold text-gray-900 truncate max-w-0">
                              {item.desc}
                            </td>
                            <td
                              className={`px-2 py-3 md:px-6 md:py-5 text-[9px] md:text-[12px] font-black text-right truncate max-w-0 ${item.nominal < 0
                                ? "text-[#F44336]"
                                : "text-[#4caf50]"
                                }`}
                            >
                              {item.nominal?.toLocaleString("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              })}
                            </td>
                            <td className="px-2 py-3 md:px-6 md:py-5 text-center">
                              <div className="flex justify-center items-center gap-1 md:gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(item)}
                                  className="w-5 h-5 md:w-7 md:h-7 rounded-md bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center shrink-0"
                                  title="Edit"
                                >
                                  <i className="fas fa-edit text-[8px] md:text-[10px]"></i>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(item)}
                                  className="w-5 h-5 md:w-7 md:h-7 rounded-md bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shrink-0"
                                  title="Hapus"
                                >
                                  <i className="fas fa-trash text-[8px] md:text-[10px]"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      : null}

                    {(!dataTampil ||
                      dataTampil.slice((activePage - 1) * 10, activePage * 10)
                        .length === 0) && (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-12 text-center text-xs font-semibold text-gray-400 bg-gray-50/30"
                          >
                            <div className="text-lg mb-1">📂</div>
                            Tidak ada data transaksi di halaman ini.
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>

                {/* PAGINATION */}
                <div className="p-4 sm:p-6 flex justify-center items-center gap-2 sm:gap-3 bg-[#fcfcff] border-t border-gray-50 flex-wrap">
                  <button
                    type="button"
                    onClick={() =>
                      activePage > 1 && setActivePage(activePage - 1)
                    }
                    disabled={activePage === 1}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${activePage === 1
                      ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                      : "border-gray-200 text-gray-400 hover:bg-white"
                      }`}
                  >
                    <i className="fas fa-chevron-left text-[10px]"></i>
                  </button>

                  {Array.from(
                    { length: Math.ceil((dataTampil?.length || 0) / 10) || 1 },
                    (_, i) => i + 1,
                  ).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setActivePage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${activePage === p
                        ? "bg-[#8477e4] text-white"
                        : "text-gray-400 hover:bg-white"
                        }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const totalPage =
                        Math.ceil((dataTampil?.length || 0) / 10) || 1;
                      if (activePage < totalPage) setActivePage(activePage + 1);
                    }}
                    disabled={
                      activePage >=
                      (Math.ceil((dataTampil?.length || 0) / 10) || 1)
                    }
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${activePage >=
                      (Math.ceil((dataTampil?.length || 0) / 10) || 1)
                      ? "border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50"
                      : "border-gray-200 text-gray-400 hover:bg-white"
                      }`}
                  >
                    <i className="fas fa-chevron-right text-[10px]"></i>
                  </button>
                </div>
              </div>
              {/* ======================================================== */}
              {/* 1. POP-UP / MODAL EDIT */}
              {/* ======================================================== */}
              {isEditOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
                  <div className="bg-white rounded-[2rem] w-full max-w-md p-6 sm:p-8 shadow-2xl border border-gray-100 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-extrabold text-[#1e1b4b]">
                        Edit Transaksi
                      </h3>
                      <button
                        onClick={() => setIsEditOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-lg"
                      >
                        ✕
                      </button>
                    </div>

                    <form onSubmit={handleConfirmEdit} className="space-y-5">
                      {/* Tanggal */}
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Tanggal
                        </label>
                        <input
                          type="text"
                          value={editForm.tgl}
                          onChange={(e) =>
                            setEditForm({ ...editForm, tgl: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#8477e4] transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Kategori
                        </label>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setEditForm({ ...editForm, kat: "Kebutuhan" })
                            }
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${editForm.kat === "Kebutuhan"
                              ? "bg-purple-50 border-[#8477e4] text-[#8477e4] shadow-sm shadow-purple-500/10"
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                              }`}
                          >
                            💼 Kebutuhan
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setEditForm({ ...editForm, kat: "Keinginan" })
                            }
                            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all border ${editForm.kat === "Keinginan"
                              ? "bg-purple-50 border-[#8477e4] text-[#8477e4] shadow-sm shadow-purple-500/10"
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                              }`}
                          >
                            ✨ Keinginan
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Keterangan
                        </label>
                        <input
                          type="text"
                          value={editForm.desc}
                          onChange={(e) =>
                            setEditForm({ ...editForm, desc: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 focus:outline-none focus:border-[#8477e4] transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          Nominal
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-4 text-sm font-bold text-gray-400">
                            Rp
                          </span>
                          <input
                            type="text"
                            value={
                              editForm.nominal
                                ? String(editForm.nominal).replace(
                                  /\B(?=(\d{3})+(?!\d))/g,
                                  ".",
                                )
                                : ""
                            }
                            onChange={(e) => {
                              const hanyaAngka = e.target.value.replace(
                                /\D/g,
                                "",
                              );
                              setEditForm({
                                ...editForm,
                                nominal: hanyaAngka ? Number(hanyaAngka) : "",
                              });
                            }}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 focus:outline-none focus:border-[#8477e4] transition-colors"
                            placeholder="0"
                            required
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsEditOpen(false)}
                          className="flex-1 py-3.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          Batal
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-3.5 rounded-xl bg-[#8477e4] text-white text-sm font-bold shadow-lg shadow-purple-500/20 hover:bg-[#7265d4] transition-colors"
                        >
                          Simpan Perubahan
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* ======================================================== */}
              {/* 2. POP-UP / MODAL KONFIRMASI HAPUS */}
              {/* ======================================================== */}
              {isDeleteOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fadeIn">
                  <div className="bg-white rounded-[2rem] w-full max-w-sm p-6 sm:p-8 shadow-2xl border border-gray-100 text-center transform transition-all scale-100">
                    <div className="w-16 h-16 bg-red-50 text-[#F44336] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                      ⚠️
                    </div>

                    <h3 className="text-xl font-extrabold text-[#1e1b4b] mb-2">
                      Hapus Transaksi?
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                      Apakah kamu yakin ingin menghapus data{" "}
                      <span className="font-bold text-gray-800">
                        "{selectedItem?.desc}"
                      </span>
                      ? Tindakan ini tidak dapat dibatalkan.
                    </p>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setIsDeleteOpen(false)}
                        className="flex-1 py-3.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDelete}
                        className="flex-1 py-3.5 rounded-xl bg-[#F44336] text-white text-sm font-bold shadow-lg shadow-red-500/20 hover:bg-[#e53935] transition-colors"
                      >
                        Ya, Hapus
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* KOLOM KANAN (KONTEN STRUK & TIPS AI) */}
            <div className="col-span-12 xl:col-span-4 flex flex-col gap-6 xl:sticky xl:top-8">
              {/* KARTU SCAN STRUK / NOTA */}
              <div className="bg-white p-5 sm:p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(132,119,228,0.05)] border border-gray-100 flex flex-col space-y-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-1 shrink-0 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">
                        Scan Struk / Nota
                      </h3>
                      <span className="bg-[#ede7fdf2] text-[#8477e4] text-[10px] font-black px-3 py-1 rounded-full border border-[#8477e4]/20 shadow-sm">
                        AI
                      </span>
                    </div>
                    <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-[240px]">
                      Foto struk belanja untuk catat otomatis dengan AI
                    </p>
                  </div>
                </div>

                {/* Box Upload */}
                <div className="border-2 border-dashed border-[#d1c8f3] bg-[#f9f6ff] rounded-[2rem] p-6 sm:p-8 flex flex-col items-center text-center space-y-6 flex-1 justify-center relative z-10 hover:border-[#8477e4]/50 transition-all duration-300">
                  <img
                    src="/gambar/robothp.png"
                    alt="Robot Upload"
                    className="w-[80px] sm:w-[100px] object-contain animate-bubble-img"
                  />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-gray-700 tracking-tight">
                      Upload atau ambil foto struk
                    </p>
                    <p className="text-[10px] font-medium text-gray-400">
                      PNG, JPG maks. 5MB
                    </p>
                  </div>
                  <button
                    onClick={() => setIsScanModalOpen(true)}
                    className="bg-gradient-to-r from-[#8477e4] to-[#7466d3] text-white px-6 sm:px-8 py-3.5 rounded-2xl flex items-center gap-3.5 text-xs font-black shadow-lg hover:translate-y-[-2px] transition-all duration-300"
                  >
                    <i className="fas fa-camera text-base"></i>
                    Scan Struck
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-[#f4f1fe] p-4.5 px-5 rounded-2xl border-2 border-[#d1c8f3]/20 shadow-sm relative z-10">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                    <i className="fas fa-star text-[9px] text-[#8477e4]"></i>
                  </div>
                  <p className="text-[10px] font-bold text-[#7a72bc] tracking-tight">
                    AI akan membaca detail dan mengisi form untukmu!
                  </p>
                </div>
              </div>

              {/* KARTU TIPS AI */}
              <div className="bg-white p-5 sm:p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(132,119,228,0.05)] border border-gray-100 flex flex-col relative overflow-hidden">
                <div className="flex items-center gap-4.5 mb-7 shrink-0 relative z-10">
                  <div className="w-11 h-11 bg-[#fffbe6] rounded-xl flex items-center justify-center border-2 border-[#ffec99] shadow-md">
                    <i className="fas fa-lightbulb text-2xl text-[#fab005]"></i>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                    Tips AI
                  </h3>
                </div>

                <div className="bg-[#f8f9fb] p-6 rounded-2xl flex items-center relative z-0 border border-gray-50 min-h-[120px] overflow-hidden">
                  <p className="text-[11px] font-medium text-gray-700 leading-relaxed relative z-10 pr-[130px]">
                    Gunakan scan struk untuk menghemat waktu dan menghindari
                    salah ketik. AI akan bantu kamu mencatat dengan akurat!
                  </p>
                  <img
                    src="/gambar/robothewo.png"
                    alt="Robot Tips"
                    className="absolute -right-2 -bottom-2 w-[120px] object-contain z-20 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;
