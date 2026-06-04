import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import { Link } from "react-router-dom";

// Komponen Bar Animasi
const AnimatedProgressBar = ({ value, maxValue, color }) => {
  const [width, setWidth] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(
      () => setWidth(percentage > 100 ? 100 : percentage),
      150,
    );
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full bg-[#f4f6f8] rounded-full h-2.5 relative overflow-hidden mt-2">
      <div
        className="h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

const Beranda = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hasNotification, setHasNotification] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fungsi untuk menangani pencarian
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("Mencari:", e.target.value);
  };

  const handleNotificationClick = () => {
    setHasNotification(false);
  };

  const navigate = useNavigate();
  const [activeGoal, setActiveGoal] = useState({
    title: "Mimpi Kamu",
    current: 60,
    target: 100,
    image: "/gambar/goals.png",
  });

  useEffect(() => {
    const savedGoal = localStorage.getItem("active_goal");
    if (savedGoal) {
      setActiveGoal(JSON.parse(savedGoal));
    }
  }, []);

  const percentage =
    activeGoal.target > 0
      ? Math.round((activeGoal.current / activeGoal.target) * 100)
      : 0;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentMonth = new Date().toLocaleString("id-ID", {
    month: "long",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.fullname || "User";
  const userId = user?.id;
  const handleBukaTransaksi = () => {
    navigate("/transaksi", { state: { bukaModal: true } });
  };

  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [pengeluaran, setPengeluaran] = useState([]);

  const kebutuhan = totalPemasukan * 0.5;
  const keinginan = totalPemasukan * 0.3;
  const tabungan = totalPemasukan * 0.2;

  // Untuk total pengeluaran berdasarkan kategori
  const totalKebutuhan = pengeluaran
    .filter((item) => item.kategori === "Kebutuhan")
    .reduce((sum, item) => sum + Number(item.jumlah), 0);

  const totalKeinginan = pengeluaran
    .filter((item) => item.kategori === "Keinginan")
    .reduce((sum, item) => sum + Number(item.jumlah), 0);

  const totalTabungan = pengeluaran
    .filter((item) => item.kategori === "Tabungan")
    .reduce((sum, item) => sum + Number(item.jumlah), 0);

  useEffect(() => {
    const fetchPemasukan = async () => {
      try {
        const response = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pemasukan/user/${userId}`,
        );

        const result = await response.json();

        console.log(result);

        // hitung total jumlah
        const total = result.data.reduce(
          (sum, item) => sum + Number(item.jumlah),
          0,
        );

        setTotalPemasukan(total);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchPemasukan();
    }

    const fetchTotalPengeluaran = async () => {
      try {
        const response = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/total/${userId}`,
        );

        const data = await response.json();

        console.log(data);

        setTotalPengeluaran(Number(data.total_pengeluaran || 0));
      } catch (error) {
        console.error("Error fetch pengeluaran:", error);
      }
    };

    if (userId) {
      fetchTotalPengeluaran();
    }

    const fetchPengeluaran = async () => {
      try {
        const response = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`,
        );

        const result = await response.json();

        setPengeluaran(result.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    if (userId) {
      fetchPengeluaran();
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const [activeMenu, setActiveMenu] = useState("Beranda");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const persenKebutuhan =
    kebutuhan > 0 ? (totalKebutuhan / kebutuhan) * 100 : 0;

  const persenKeinginan =
    keinginan > 0 ? (totalKeinginan / keinginan) * 100 : 0;

  const persenTabungan = tabungan > 0 ? (totalTabungan / tabungan) * 100 : 0;

  let insightTitle = "Keuanganmu masih aman 🎉";
  let insightMessage = `${userName}, pengeluaranmu masih sesuai dengan alokasi budget yang telah ditentukan.`;
  let insightAdvice =
    "Pertahankan kebiasaan baik ini agar tujuan keuanganmu tercapai.";

  let statusColor = "#4caf50";
  let statusBg = "#e8f5e9";
  let statusText = "Masih Aman";

  // JIKA MELEBIHI BUDGET
  if (persenKebutuhan > 100 || persenKeinginan > 100 || persenTabungan > 100) {
    insightTitle = "Budget Terlampaui 🚨";

    insightMessage = `${userName}, salah satu kategori pengeluaran sudah melebihi batas yang disarankan.`;

    insightAdvice =
      "Evaluasi pengeluaran bulan ini agar kondisi keuangan tetap stabil.";

    statusColor = "#ef4444";
    statusBg = "#fee2e2";
    statusText = "Over Budget";
  }

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

      <>
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
                className={`relative z-10 flex items-center ${isSidebarOpen ? "gap-4 px-3.5" : "justify-center px-0"} cursor-pointer h-[52px] rounded-2xl transition-all duration-300 ${
                  activeMenu === item.n
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
                    setIsMobileMenuOpen(false); // Otomatis tutup pop-up setelah diklik
                  }}
                  className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    activeMenu === item.n
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
                className={`p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  activeMenu === "Pengaturan"
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

              {/* Logout Versi Mobile */}
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

          {/* Tombol Utama Robot Ngintip di HP */}
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
      </>
      {/* =========================================
          2. MAIN CONTENT (KANAN)
      ========================================= */}
      <div className="flex-1 h-full overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 z-10 w-full">
        {/* HEADER */}
        <header className="flex justify-between items-center gap-4 mb-4 md:mb-8 w-full">
          {/* SISI KIRI: NAMA & STATUS BADGE */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 min-w-0">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 truncate">
              Halo, {userName} ! 👋
            </h1>
            <div className="self-start flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold bg-[#e8f5e9] text-[#4caf50] px-2.5 py-1.5 rounded-lg border border-[#4caf50]/20 whitespace-nowrap">
              <i className="fas fa-check-circle"></i> Status : Hemat
            </div>
          </div>

          {/* SISI KANAN: PROFIL USER */}
          <div className="flex items-center shrink-0">
            <Link
              to="/pengaturan"
              className="flex items-center gap-1 sm:gap-2 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#8477e4] rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer border border-gray-100 transition-transform duration-200 group-hover:scale-105">
                <i className="fas fa-user text-sm sm:text-base"></i>
              </div>
              <i className="fas fa-chevron-down text-gray-400 text-[10px] sm:text-xs cursor-pointer"></i>
            </Link>
          </div>
        </header>

        {/* GRID UTAMA LAYOUT */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
            <div className="relative bg-[#ede7fdf2] rounded-2xl sm:rounded-3xl mt-4 sm:mt-8 md:mt-12 pr-3 sm:pr-6 md:pr-8 flex items-center shadow-sm border border-[#e8dffd] min-h-[90px] sm:min-h-[130px] py-3.5 sm:py-5 pl-[80px] sm:pl-[120px] md:pl-[140px] shrink-0">
              <img
                src="/gambar/robotsapa.png"
                className="absolute -left-1 sm:-left-2 bottom-0 w-[80px] sm:w-36 md:w-[160px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] z-10"
                alt="Robot Hero"
              />

              <div className="bg-white px-3 sm:px-6 py-2.5 sm:py-4 rounded-xl sm:rounded-2xl flex-1 border border-white shadow-sm relative z-0">
                <p className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-800 leading-relaxed">
                  Ayo kelola keuangan bulan{" "}
                  <span className="font-extrabold text-black capitalize">
                    {currentMonth}
                  </span>{" "}
                  mu bersama Fintrack AI!
                </p>
              </div>
            </div>

            {/* RINGKASAN KEUANGAN */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm shrink-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                    Ringkasan Keuangan
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                {/* TOTAL SALDO */}
                <div className="bg-[#F8F6FF] border-2 border-[#EAE8FD] p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:border-[#8477e4]/20 transition-all">
                  <div className="flex items-center justify-center mb-3 w-full">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(132,119,228,0.4)] border border-[#8477e4]/10">
                      <img
                        src="/gambar/totalsaldo.png"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                        alt="Ikon Saldo"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight ml-2">
                      Sisa Saldo
                    </span>
                  </div>
                  <p className="text-[16px] sm:text-[20px] font-bold text-[#8477e4] mb-2 sm:mb-4">
                    Rp{" "}
                    {(totalPemasukan - totalPengeluaran).toLocaleString(
                      "id-ID",
                    )}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium max-w-[150px] leading-relaxed">
                    Sisa saldo yang bisa digunakan
                  </p>
                </div>

                {/* PEMASUKAN */}
                <div className="bg-[#F1FAF2] border-2 border-[#E1F3E5] p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:border-[#4caf50]/20 transition-all">
                  <div className="flex items-center justify-center mb-3 w-full">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(76,175,80,0.4)] border border-[#4caf50]/10">
                      <img
                        src="/gambar/pemasukan.png"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                        alt="Ikon Pemasukan"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight ml-2">
                      Total Pemasukan
                    </span>
                  </div>
                  <p className="text-[16px] sm:text-[20px] font-bold text-[#4caf50] mb-2 sm:mb-4">
                    Rp {(totalPemasukan || 0).toLocaleString("id-ID")}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium max-w-[150px] leading-relaxed">
                    Total uang masuk
                  </p>
                </div>

                {/* PENGELUARAN */}
                <div className="bg-[#FFF5F5] border-2 border-[#FDEAEB] p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:border-[#F44336]/20 transition-all">
                  <div className="flex items-center justify-center mb-3 w-full">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(244,67,54,0.4)] border border-[#F44336]/10">
                      <img
                        src="/gambar/pengeluaran.png"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                        alt="Ikon Pengeluaran"
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-tight ml-2">
                      Total Pengeluaran
                    </span>
                  </div>
                  <p className="text-[16px] sm:text-[20px] font-bold text-[#F44336] mb-2 sm:mb-4">
                    Rp {totalPengeluaran.toLocaleString("id-ID")}
                  </p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-medium max-w-[150px] leading-relaxed">
                    Total uang keluar
                  </p>
                </div>
              </div>

              <Link
                to="/transaksi"
                className="mt-4 sm:mt-6 flex flex-row items-center justify-between bg-[#EAE8FD] p-4 sm:px-6 rounded-2xl hover:bg-[#E2DFFC] transition-all cursor-pointer group shadow-sm no-underline gap-3 sm:gap-0 text-left"
              >
                <p className="text-[10px] sm:text-xs font-bold text-gray-700">
                  Pantau riwayat transaksimu setiap bulan!
                </p>
                <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 bg-white/60 rounded-full flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-all">
                  <i className="fas fa-chevron-right text-gray-500 text-[10px] sm:text-xs"></i>
                </div>
              </Link>
            </div>

            {/* SMART BUDGETING */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col">
              <div className="flex flex-row justify-between items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h3 className="text-sm sm:text-base font-bold text-gray-900">
                  Smart Budgeting
                </h3>
                <button
                  type="button"
                  onClick={() => navigate("/budget")}
                  className="text-[9px] sm:text-[10px] font-bold text-gray-400 flex items-center gap-1.5 border border-gray-100 px-2 sm:px-3 py-1.5 rounded-lg hover:text-[#8477e4] transition-all"
                >
                  Detail Lengkap <i className="fas fa-plus"></i>
                </button>
              </div>

              <div className="flex flex-col justify-start space-y-4 sm:space-y-6">
                {[
                  {
                    n: "Kebutuhan",
                    p: "50%",
                    d: "Alokasi kebutuhan utama",
                    v: kebutuhan,
                    usedValue: totalKebutuhan,
                    max: totalPemasukan,
                    c: "#8477e4",
                    i: "fas fa-home",
                  },
                  {
                    n: "Keinginan",
                    p: "30%",
                    d: "Alokasi hiburan & lifestyle",
                    v: keinginan,
                    usedValue: totalKeinginan,
                    max: totalPemasukan,
                    c: "#4caf50",
                    i: "fas fa-shopping-bag",
                  },
                  {
                    n: "Tabungan",
                    p: "20%",
                    d: "Alokasi simpanan masa depan",
                    v: tabungan,
                    usedValue: totalTabungan,
                    max: totalPemasukan,
                    c: "#f44336",
                    i: "fas fa-piggy-bank",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 sm:gap-4 items-center">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl shadow-sm shrink-0"
                      style={{ backgroundColor: item.c }}
                    >
                      <i className={item.i}></i>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-row justify-between items-end mb-1">
                        <div>
                          <p className="text-[10px] sm:text-xs font-bold text-gray-900">
                            {item.n}
                            <span className="text-gray-400 font-normal">
                              {" "}
                              ({item.p})
                            </span>
                          </p>

                          <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5">
                            {item.d}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-[9px] sm:text-[10px] font-bold text-gray-900">
                            Rp {item.usedValue.toLocaleString("id-ID")} / Rp{" "}
                            {item.v.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-1">
                          <AnimatedProgressBar
                            value={item.usedValue}
                            maxValue={item.v}
                            color={item.c}
                          />
                        </div>

                        <p
                          className="text-[8px] sm:text-[9px] font-bold whitespace-nowrap"
                          style={{ color: item.c }}
                        >
                          {item.used} Terpakai
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 sm:pt-8">
                <div className="bg-[#f2eefd] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-row items-start sm:items-center gap-3 sm:gap-4 border border-[#e8dffd] shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <i className="fas fa-lightbulb text-[#8477e4] text-base sm:text-lg"></i>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#453c8a]">
                      Mini Insight Bulan Ini
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#7a72bc] mt-1 sm:mt-2 leading-relaxed font-medium">
                      Bagus sekali! Alokasi{" "}
                      <span className="font-bold text-[#8477e4]">
                        Kebutuhan
                      </span>{" "}
                      kamu masih terkendali. Tetap waspada dan awasi terus
                      pengeluaran{" "}
                      <span className="font-bold text-[#8477e4]">
                        Keinginan
                      </span>{" "}
                      agar keuanganmu tetap stabil sampai akhir bulan ya!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-gray-100 shadow-sm flex flex-col shrink-0">
              <div className="flex flex-row justify-between items-center mb-4 gap-2 sm:gap-0">
                <h3 className="text-sm sm:text-base font-extrabold text-gray-900">
                  Insight AI
                </h3>
                <button
                  type="button"
                  onClick={() => navigate("/ai")} 
                  className="text-[9px] sm:text-[10px] font-bold text-gray-400 flex items-center gap-1.5 border border-gray-100 px-2 sm:px-3 py-1.5 rounded-lg hover:text-[#8477e4] transition-all shrink-0"
                >
                  Detail Lengkap <i className="fas fa-plus"></i>
                </button>
              </div>

              {/* Box Konten AI */}
              <div className="relative bg-[#f2eefd] rounded-2xl sm:rounded-3xl border-2 border-[#3b82f6] p-4 sm:p-5 pr-[80px] sm:pr-[110px] md:pr-[130px] min-h-[100px] sm:min-h-[110px] flex flex-col justify-center shadow-sm">
                <div className="space-y-1 sm:space-y-2 relative z-10">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                    {insightTitle}
                  </h4>

                  <p className="text-[10px] sm:text-[11px] font-medium text-gray-700 leading-relaxed">
                    {insightMessage}
                  </p>

                  <p className="text-[10px] sm:text-[11px] font-bold text-gray-900 leading-relaxed">
                    {insightAdvice}
                  </p>
                </div>
                <img
                  src="/gambar/robotlaptop.png"
                  className="absolute -right-2 sm:-right-4 -bottom-2 sm:-bottom-3 w-[80px] sm:w-28 md:w-[130px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] z-20"
                  alt="Robot AI"
                />
              </div>

              <div className="mt-3 sm:mt-4 bg-[#f8f9fb] p-3 sm:p-4 rounded-xl sm:rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border border-gray-50">
                <div>
                  <h4 className="text-[10px] sm:text-[11px] font-extrabold text-gray-900 mb-1">
                    Tips hari ini
                  </h4>
                  <p className="text-[9px] sm:text-[10px] font-medium text-gray-500">
                    Catat setiap pengeluaran kecilmu, bisa bantu kamu lebih
                    hemat!
                  </p>
                </div>
              </div>
            </div>

            {/* ALOKASI KEUANGAN */}
            <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col shrink-0">
              <div className="flex justify-between items-center gap-2 mb-4 sm:mb-6">
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                    Alokasi Keuangan{" "}
                    <span className="text-[10px] sm:text-xs font-normal text-gray-400 block sm:inline">
                      (50 - 30 - 20)
                    </span>
                  </h3>
                  <p className="text-[10px] sm:text-xs font-normal text-gray-500 mt-0.5 truncate">
                    Otomatis dari total pemasukan
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/transaksi")}
                  className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 border border-gray-100 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:text-[#8477e4] transition-all shrink-0 whitespace-nowrap"
                >
                  Detail Lengkap <i className="fas fa-plus"></i>
                </button>
              </div>

              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row items-center justify-center w-full gap-4 sm:gap-6">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 relative flex-shrink-0 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                    <svg
                      viewBox="0 0 36 36"
                      className="w-full h-full -rotate-90"
                    >
                      {/* Background */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="5"
                      />

                      {/* Kebutuhan 50% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#3093ec"
                        strokeWidth="5"
                        pathLength="100"
                        strokeDasharray="50 50"
                        strokeDashoffset="0"
                        strokeLinecap="butt"
                        className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      >
                        <title>Kebutuhan (50%) - Rp 1.250.000</title>
                      </circle>

                      {/* Keinginan 30% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#f37e61"
                        strokeWidth="5"
                        pathLength="100"
                        strokeDasharray="30 70"
                        strokeDashoffset="-50"
                        strokeLinecap="butt"
                        className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      >
                        <title>Keinginan (30%) - Rp 750.000</title>
                      </circle>

                      {/* Tabungan 20% */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="none"
                        stroke="#20b46b"
                        strokeWidth="5"
                        pathLength="100"
                        strokeDasharray="20 80"
                        strokeDashoffset="-80"
                        strokeLinecap="butt"
                        className="cursor-pointer transition-all duration-300 hover:opacity-80"
                      >
                        <title>Tabungan (20%) - Rp 500.000</title>
                      </circle>
                    </svg>
                  </div>

                  <div className="flex-1 w-full space-y-3 sm:space-y-4">
                    {[
                      {
                        n: "Kebutuhan (50%)",
                        p: "50% dari total pemasukan",
                        v: kebutuhan,
                        c: "#3093ec",
                      },
                      {
                        n: "Keinginan (30%)",
                        p: "30% dari total pemasukan",
                        v: keinginan,
                        c: "#f37e61",
                      },
                      {
                        n: "Tabungan (20%)",
                        p: "20% dari total pemasukan",
                        v: tabungan,
                        c: "#20b46b",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center gap-2"
                      >
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div
                            className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full shrink-0"
                            style={{ backgroundColor: item.c }}
                          ></div>

                          <div className="min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {item.n}
                            </p>

                            <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                              {item.p}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs font-bold text-gray-900 shrink-0 whitespace-nowrap">
                          Rp {item.v.toLocaleString("id-ID")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold px-5 py-2.5 rounded-xl"
                  style={{
                    backgroundColor: statusBg,
                    color: statusColor,
                  }}
                >
                  <div
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] shrink-0"
                    style={{
                      backgroundColor: statusColor,
                    }}
                  >
                    <i
                      className={
                        statusText === "Over Budget"
                          ? "fas fa-exclamation"
                          : "fas fa-check"
                      }
                    ></i>
                  </div>

                  {statusText}
                </div>
              </div>
            </div>

            {/* GOALS SETTING */}
            <div className="bg-white p-4 sm:p-6 rounded-3xl border border-gray-100 shadow-sm text-center relative flex-1 flex flex-col justify-between">
              {/* SEBARIS: Judul Goals Setting dan Tombol Detail Lengkap */}
              <div className="flex justify-between items-center gap-2 mb-3">
                <h3 className="text-sm font-bold text-gray-900 truncate">
                  Goals Setting
                </h3>
                <button
                  type="button"
                  onClick={() => navigate("/goals")}
                  className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 border border-gray-100 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-lg hover:text-[#8477e4] transition-all shrink-0 whitespace-nowrap"
                >
                  Detail Lengkap <i className="fas fa-plus"></i>
                </button>
              </div>

              <div className="my-auto py-2 flex flex-col justify-center">
                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-3">
                  <i className="fas fa-chevron-left text-gray-400 cursor-pointer hover:text-gray-900 p-2"></i>
                  <img
                    src={activeGoal.image || "/gambar/goals.png"}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    alt="Icon Goals"
                  />
                  <i className="fas fa-chevron-right text-gray-400 cursor-pointer hover:text-gray-900 p-2"></i>
                </div>

                <div className="text-center mb-4">
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {activeGoal.title || "Target Kamu"}
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    <span className="font-semibold text-[#8477e4]">
                      Rp{" "}
                      {(activeGoal.currentAmount || 0).toLocaleString("id-ID")}
                    </span>
                    {" / "}
                    <span>
                      Rp{" "}
                      {(activeGoal.targetAmount || 0).toLocaleString("id-ID")}
                    </span>
                  </p>
                </div>
              </div>

              <div className="w-full mt-auto">
                <AnimatedProgressBar
                  value={percentage}
                  maxValue={100}
                  color="#8477e4"
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-[9px] font-bold text-gray-600">
                    {percentage}% Menuju Target!
                  </p>
                  {/* Status kecil pemanis di pojok kanan bawah */}
                  <span className="text-[8px] px-1.5 py-0.5 bg-purple-50 text-[#8477e4] rounded font-medium">
                    {percentage === 100 ? "Selesai" : "On Progress"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Beranda;
