import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";


const Budget = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const activeMenu = "Budget";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [dataTrenBulanan, setDataTrenBulanan] = useState([]);

  const handleLogout = () => {
    navigate("/login");
  };


  const [alokasi, setAlokasi] = useState({
    kebutuhan: 0,
    keinginan: 0,
    tabungan: 0,
  });

  const [realisasi, setRealisasi] = useState({
    kebutuhan: 0,
    keinginan: 0,
    tabungan: 0,
  });

  const dataBudgetVsAktual = [
    {
      name: "Kebutuhan",
      percentage: "(50%)",
      Target: alokasi.kebutuhan,
      Aktual: realisasi.kebutuhan,
    },
    {
      name: "Keinginan",
      percentage: "(30%)",
      Target: alokasi.keinginan,
      Aktual: realisasi.keinginan,
    },
    {
      name: "Tabungan",
      percentage: "(20%)",
      Target: alokasi.tabungan,
      Aktual: realisasi.tabungan,
    },
  ];

  const totalBudget =
    alokasi.kebutuhan +
    alokasi.keinginan +
    alokasi.tabungan;

  const totalAktual =
    realisasi.kebutuhan +
    realisasi.keinginan +
    realisasi.tabungan;

  const selisihOver = Math.max(0, totalAktual - totalBudget);

  const overPercentage =
    totalBudget > 0
      ? (selisihOver / totalBudget) * 100
      : 0;

  const healthScore = Math.max(
    0,
    Math.min(100, Math.round(100 - overPercentage))
  );

  const dataGauge = [
    { value: healthScore },
    { value: 100 - healthScore },
  ];

  const maxDataValue = Math.max(
    ...dataBudgetVsAktual.flatMap((item) => [item.Target, item.Aktual]),
  );

  const yAxisMax =
    maxDataValue > 1500000
      ? Math.ceil(maxDataValue / 500000) * 500000
      : 1500000;

  const dynamicTicks = [];
  for (let i = 0; i <= yAxisMax; i += 500000) {
    dynamicTicks.push(i);
  }
  const [activeDate, setActiveDate] = useState(new Date());

  const getPeriodeAktif = (date) => {
    const tahun = date.getFullYear();
    const bulan = date.getMonth(); // Index 0-11

    const hariTerakhir = new Date(tahun, bulan + 1, 0).getDate();

    const namaBulan = date.toLocaleDateString("id-ID", { month: "long" });

    return `1 - ${hariTerakhir} ${namaBulan} ${tahun}`;
  };



  const dataAlokasiPie = [
    { name: "Kebutuhan", value: alokasi.kebutuhan, color: "#8477e4" },
    { name: "Keinginan", value: alokasi.keinginan, color: "#ffb224" },
    { name: "Tabungan", value: alokasi.tabungan, color: "#4caf50" },
  ];

  useEffect(() => {
    const fetchBudgetData = async () => {
      if (!userId) return;

      try {
        const resIncome = await axios.get(
          `https://fintrackai-backend-1yz0.onrender.com/pemasukan/total/${userId}`
        );

        const income = Number(resIncome.data?.total_pemasukan) || 0;
        setTotalPemasukan(income);

        // ✅ HITUNG ALOKASI 50-30-20
        setAlokasi({
          kebutuhan: income * 0.5,
          keinginan: income * 0.3,
          tabungan: income * 0.2,
        });

      } catch (error) {
        console.log("Error fetch pemasukan:", error);
      }
    };

    fetchBudgetData();
  }, [userId]);

  const formatRupiah = (num) =>
    "Rp " + num.toLocaleString("id-ID");

  const terpakaiKebutuhan = dataTransaksi
    .filter((item) => item.kat?.trim() === "kebutuhan")
    .reduce((sum, item) => sum + item.nominal, 0);

  const terpakaiKeinginan = dataTransaksi
    .filter((item) => item.kat?.trim() === "keinginan")
    .reduce((sum, item) => sum + item.nominal, 0);

  const terpakaiTabungan = dataTransaksi
    .filter((item) => item.kat?.trim() === "tabungan")
    .reduce((sum, item) => sum + item.nominal, 0);

  useEffect(() => {
    const fetchTransaksi = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`
        );

        const transaksi = res.data?.data || [];

        const totalKategori = {
          kebutuhan: 0,
          keinginan: 0,
          tabungan: 0,
        };

        transaksi.forEach((item) => {
          const kategori = item.kategori?.toLowerCase().trim();
          const jumlah = Number(item.jumlah) || 0;

          if (kategori === "kebutuhan") {
            totalKategori.kebutuhan += jumlah;
          }

          if (kategori === "keinginan") {
            totalKategori.keinginan += jumlah;
          }

          if (kategori === "tabungan") {
            totalKategori.tabungan += jumlah;
          }
        });

        setRealisasi(totalKategori);

        console.log("TOTAL KATEGORI:", totalKategori);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransaksi();
  }, [userId]);



  const dataRealisasiPie = [
    {
      name: "Kebutuhan",
      value: realisasi.kebutuhan,
      color: "#8477e4",
    },
    {
      name: "Keinginan",
      value: realisasi.keinginan,
      color: "#ffb224",
    },
    {
      name: "Tabungan",
      value: realisasi.tabungan,
      color: "#4caf50",
    },
  ];



  useEffect(() => {
    const fetchPemasukan = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const userId = user.id;

        const res = await axios.get(
          `https://fintrackai-backend-1yz0.onrender.com/pemasukan/user/${userId}`
        );

        const total = res.data.data.reduce(
          (sum, item) => sum + Number(item.jumlah),
          0
        );

        setTotalPemasukan(total);

      } catch (err) {
        console.error("Error fetch pemasukan:", err);
      }
    };

    fetchPemasukan();
  }, []);

  useEffect(() => {
    const fetchTrenBulanan = async () => {
      if (!userId) return;

      try {
        const res = await axios.get(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`
        );

        const transaksi = res.data?.data || [];

        const grouped = {};

        transaksi.forEach((item) => {
          const date = new Date(item.tanggal);

          const key =
            date.getFullYear() +
            "-" +
            String(date.getMonth() + 1).padStart(2, "0");

          if (!grouped[key]) {
            grouped[key] = {
              total: 0,
              label: date.toLocaleDateString("id-ID", {
                month: "short",
              }),
            };
          }

          grouped[key].total += Number(item.jumlah);
        });

        const trendData = Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .slice(-5)
          .map(([_, data]) => ({
            name: data.label,
            Target: totalPemasukan,
            Realisasi: data.total,
          }));

        setDataTrenBulanan(trendData);

        console.log("TREND:", trendData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrenBulanan();
  }, [userId, totalPemasukan]);

  // HEALTH SCORE
  let healthLabel = "";
  let healthColor = "";
  let healthMessage = "";

  if (healthScore >= 80) {
    healthLabel = "Sangat Baik 😊";
    healthColor = "#4caf50";
    healthMessage = "Budget kamu dikelola dengan baik!";
  } else if (healthScore >= 60) {
    healthLabel = "Cukup Baik 🙂";
    healthColor = "#ffb224";
    healthMessage = "Masih sesuai budget, tapi perlu dijaga.";
  } else if (healthScore >= 40) {
    healthLabel = "Perlu Perhatian 😐";
    healthColor = "#ff9800";
    healthMessage = "Beberapa pengeluaran mulai melebihi rencana.";
  } else {
    healthLabel = "Kurang Sehat 😟";
    healthColor = "#ef4444";
    healthMessage = "Pengeluaran melebihi budget yang ditetapkan.";
  }

  return (
    <div className="h-screen bg-[#f8f6ff] font-poppins flex overflow-hidden relative">
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
        {isMobileMenuOpen && (
          <div className="bg-white/90 backdrop-blur-md border border-purple-100 p-3 rounded-2xl shadow-xl flex flex-col gap-4 items-center animate-bounce-short">
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

      {/* DASHBOARD CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 z-10 relative pb-24 md:pb-8">
        {/* WRAPPER HEADER UTAMA */}
        <div className="flex justify-between items-center">
          {/* KIRI: HEADER TITLE */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Budget
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Atur alokasi dana dan pantau kesehatan keuanganmu setiap bulan.
            </p>
          </div>

          {/* KANAN: PROFIL USER */}
          <div className="flex items-center gap-3">
            {/* Profil User yang bisa diklik */}
            <Link to="/pengaturan" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#8477e4] rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer border border-gray-100 transition-transform duration-200 group-hover:scale-105">
                <i className="fas fa-user"></i>
              </div>
              <i className="fas fa-chevron-down text-gray-400 text-xs cursor-pointer"></i>
            </Link>
          </div>
        </div>

        {/* HERO BANNER SMART BUDGETING */}
        <div className="bg-[#EEE8FD] rounded-2xl border border-[#e9dff9] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 w-full min-h-[auto] sm:h-[160px] shadow-sm relative overflow-hidden">
          <div className="flex-1 min-w-0 z-10 text-center sm:text-left">
            {/* JUDUL: Menggunakan warna utama #3e3a94 dan ukuran text-lg yang ramping */}
            <h2 className="text-base sm:text-lg font-extrabold text-[#3e3a94] mb-1.5 tracking-tight">
              Smart Budgeting 50-30-20
            </h2>

            {/* DESKRIPSI: Menggunakan text-xs, warna #685fbe, dan max-w agar teks membungkus rapi */}
            <p className="text-xs font-medium text-[#685fbe] leading-relaxed max-w-sm mx-auto sm:mx-0">
              FinTrack AI otomatis mengalokasikan pemasukanmu ke{" "}
              <span className="font-extrabold text-[#3e3a94]">
                Kebutuhan, Keinginan, dan Tabungan
              </span>{" "}
              agar keuanganmu lebih sehat dan seimbang.
            </p>
          </div>
          <div className="hidden sm:flex absolute inset-y-0 left-1/2 -translate-x-1/2 h-full items-center justify-center">
            <img
              src="/gambar/robotbudget.png"
              alt="Robot"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="bg-white p-3 rounded-xl border border-[#e9dff9] space-y-2 w-full sm:w-[280px] shrink-0 z-10">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6b61b7] font-semibold">
                Periode Aktif
              </span>
              <span className="text-[#453c8a] font-bold">
                {getPeriodeAktif(activeDate)}
              </span>
            </div>
            <div className="border-t border-[#f0edff]"></div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6b61b7] font-semibold">
                Total Pemasukan
              </span>
              <span className="text-[#4caf50] font-bold">{formatRupiah(totalPemasukan)}</span>
            </div>
            <div className="border-t border-[#f0edff]"></div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#6b61b7] font-semibold">Metode</span>
              <span className="text-[#453c8a] font-bold">
                50-30-20 (Otomatis)
              </span>
            </div>
          </div>
        </div>

        {/* 4 METRIC CARDS ROW */}

        {/* TOP ROW: PIE CHARTS & BAR CHART */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
          {[
            { title: "Alokasi Budget (50-30-20)", data: dataAlokasiPie },
            { title: "Realisasi Saat Ini", data: dataRealisasiPie },
          ].map((chart, i) => (
            <div
              key={i}
              className="bg-white p-3 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              <h3 className="text-[11px] md:text-base font-black text-[#2e2a60] mb-3 md:mb-6">
                {chart.title}
              </h3>

              <div className="relative flex items-center justify-center h-28 md:h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chart.data}
                      innerRadius={35}
                      outerRadius={48}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {chart.data.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center">
                  <span className="text-[8px] font-bold text-gray-400">
                    TOTAL
                  </span>
                  <span className="text-[10px] font-black text-gray-900">
                    100%
                  </span>
                </div>
              </div>
              <div className="space-y-1 mt-2 md:mt-4">
                {chart.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-[9px] md:text-[10px] font-bold"
                  >
                    <div className="flex items-center gap-1">
                      <div
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-500 truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-900 ml-1">
                      Rp {item.value.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white p-3 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col col-span-2 xl:col-span-2">
            <div className="flex justify-between items-center mb-3 md:mb-6">
              <h3 className="text-[11px] md:text-base font-black text-[#2e2a60]">
                Budget VS Aktual
              </h3>
              <div className="flex items-center gap-2 md:gap-4 text-[9px] md:text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2.5 bg-[#f3f0ff] border border-dashed border-[#8477e4] rounded-sm" />
                  <span>Target</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2.5 bg-[#8477e4] rounded-sm" />
                  <span>Aktual</span>
                </div>
              </div>
            </div>
            <div className="h-44 md:h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataBudgetVsAktual}
                  margin={{ top: 20, right: 5, left: 0, bottom: 15 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1efff" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={({ x, y, payload }) => {
                      const item = dataBudgetVsAktual[payload.index];
                      return (
                        <g transform={`translate(${x},${y})`}>
                          <text
                            x={0}
                            y={12}
                            textAnchor="middle"
                            className="text-[11px] font-extrabold fill-gray-700"
                            style={{
                              fontSize: 9,
                              fontWeight: 700,
                              fill: "#374151",
                            }}
                          >
                            {item.name}
                          </text>
                          <text
                            x={0}
                            y={24}
                            textAnchor="middle"
                            style={{
                              fontSize: 8,
                              fontWeight: 700,
                              fill: "#9ca3af",
                            }}
                          >
                            {item.percentage}
                          </text>
                        </g>
                      );
                    }}
                  />
                  <YAxis
                    domain={[0, yAxisMax]}
                    ticks={dynamicTicks}
                    tick={{ fontSize: 8, fontWeight: 700, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={55}
                    tickFormatter={(value) =>
                      value === 0 ? "Rp 0" : `${(value / 1000000).toFixed(1)}jt`
                    }
                  />
                  <Tooltip
                    formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                  />
                  <Bar
                    dataKey="Target"
                    fill="#f3f0ff"
                    stroke="#8477e4"
                    strokeDasharray="4 4"
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                  />
                  <Bar
                    dataKey="Aktual"
                    fill="#8477e4"
                    radius={[4, 4, 0, 0]}
                    barSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: 3 SEJAJAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-3 md:gap-6">
          {/* 1. TREN BUDGET BULANAN */}
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[220px] md:min-h-[260px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[11px] md:text-sm font-black text-[#2e2a60]">
                Tren Budget Bulanan
              </h3>
              <div className="flex items-center gap-2 text-[8px] md:text-[9px] font-bold text-slate-500">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 border-t border-dashed border-[#a294f9]" />
                  <span>Target</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-0.5 bg-[#8477e4]" />
                  <span>Realisasi</span>
                </div>
              </div>
            </div>
            <div className="h-36 md:h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dataTrenBulanan}
                  margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1efff" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 7, fontWeight: 700, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 4000000]}
                    ticks={[0, 1000000, 2000000, 3000000, 4000000]}
                    width={40}
                    tickFormatter={(val) =>
                      val === 0 ? "0" : `${(val / 1000000).toFixed(0)}jt`
                    }
                    tick={{ fontSize: 7, fontWeight: 700, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value) => `Rp ${value.toLocaleString("id-ID")}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="Target"
                    stroke="#a294f9"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    dot={{ r: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Realisasi"
                    stroke="#8477e4"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. BUDGET HEALTH SCORE */}
          <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center min-h-[220px] md:min-h-[260px]">
            <h3 className="text-[11px] md:text-sm font-black text-[#2e2a60] self-start">
              Budget Health Score
            </h3>
            <div className="relative w-full flex items-center justify-center h-28 md:h-32 mt-1">
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <defs>
                    <linearGradient
                      id="healthGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#8477e4" />
                      <stop offset="100%" stopColor="#5cd39c" />
                    </linearGradient>
                  </defs>
                  <Pie
                    data={dataGauge}
                    startAngle={180}
                    endAngle={0}
                    innerRadius={60}
                    outerRadius={74}
                    cy={105}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="url(#healthGradient)" />
                    <Cell fill="#eef2f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute bottom-1 flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-black text-[#2e2a60] leading-none">
                  {healthScore}
                </span>
                <span className="text-[9px] md:text-[10px] font-bold text-gray-400 mt-1">
                  /100
                </span>
              </div>
            </div>
            <div className="mt-1">
              <h4
                className="text-xs font-black"
                style={{ color: healthColor }}
              >
                {healthLabel}
              </h4>

              <p className="text-[9px] md:text-[10px] text-gray-400 font-bold mt-0.5 leading-relaxed">
                {healthMessage}
              </p>
            </div>
          </div>

          {/* 3. PROGRESS ALOKASI */}
        </div>

        {/* BOTTOM ROW: FOOTER INSIGHT AI & TENTANG METODE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-6">
          {/* KARTU 1: INSIGHT AI */}
          <div className="sm:col-span-1 xl:col-span-2 bg-[#f4f0ff] p-4 md:p-5 rounded-3xl border border-[#e1d7ff] shadow-sm flex items-center gap-3 md:gap-4 relative overflow-hidden">
            <img
              src="/gambar/robotdada.png"
              alt="Robot AI"
              className="w-14 h-14 md:w-20 md:h-20 object-contain shrink-0"
            />
            <div className="space-y-0.5">
              <h3 className="text-[11px] md:text-sm font-black text-[#2e2a60]">
                Insight AI
              </h3>
              <p className="text-[10px] md:text-[11px] text-[#5c5494] font-medium leading-relaxed">
                Pengeluaran pada alokasi{" "}
                <span className="font-bold">Keinginan</span> telah mencapai{" "}
                <span className="font-bold">87%</span> dari batas bulanan.
                Disarankan mengurangi pengeluaran non-prioritas agar alokasi
                tetap seimbang dan target tabunganmu tercapai lebih optimal.
              </p>
            </div>
            <span className="absolute top-2 right-3 text-lg opacity-70">
              💡
            </span>
          </div>

          {/* KARTU 2: TENTANG METODE 50-30-20 */}
          <div className="sm:col-span-1 xl:col-span-3 bg-white p-4 md:p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-[11px] md:text-sm font-black text-[#2e2a60] mb-3">
              Tentang Metode 50-30-20
            </h3>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {/* Box Kebutuhan */}
              <div className="bg-[#f6f3ff] p-2 md:p-3 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-white text-[#8477e4] rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <div className="text-[9px] md:text-[10px] font-black text-[#8477e4]">
                    50% Kebutuhan
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold leading-tight">
                  Untuk kebutuhan pokok and penting
                </p>
              </div>

              {/* Box Keinginan */}
              <div className="bg-[#fffcf0] p-2 md:p-3 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-white text-[#ffb224] rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-[9px] md:text-[10px] font-black text-[#ffb224]">
                    30% Keinginan
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold leading-tight">
                  Untuk keinginan dan kenyamanan hidup
                </p>
              </div>

              {/* Box Tabungan */}
              <div className="bg-[#f0fdf4] p-2 md:p-3 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-white text-[#4caf50] rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.854-1.106-2.24 0-3.093 1.147-.881 2.929-.881 4.076 0l.334.256M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-[9px] md:text-[10px] font-black text-[#4caf50]">
                    20% Tabungan
                  </div>
                </div>
                <p className="text-[9px] md:text-[10px] text-gray-400 font-bold leading-tight">
                  Untuk tabungan dan mencapai goals
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
