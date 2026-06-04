import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AI = () => {
  // --- STATE & FUNGSI UNTUK SIDEBAR ---
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const activeMenu = "AI"; // Set active menu ke AI
  const [aiPrediction, setAiPrediction] = useState(null);
  const [goalsData, setGoalsData] = useState([]);
  const [budgetHealthScore, setBudgetHealthScore] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [totalTabungan, setTotalTabungan] = useState(0);
  const [trendData, setTrendData] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleLogout = () => {
    navigate("/login");
  };

  const saldoPercent =
    aiPrediction?.saldo_saat_ini > 0
      ? (aiPrediction.estimasi_saldo_besok /
        aiPrediction.saldo_saat_ini) *
      100
      : 0;


  const budgetData = [
    { name: "Kebutuhan", value: 54, color: "#8b5cf6", amount: "Rp 1.620.000" },
    { name: "Keinginan", value: 28, color: "#f43f5e", amount: "Rp 830.000" },
    { name: "Tabungan", value: 18, color: "#10b981", amount: "Rp 550.000" },
  ];

  // const goalsData = [
  //   {
  //     name: "Laptop ASUS",
  //     current: "Rp 700.000",
  //     target: "Rp 8.000.000",
  //     progress: 42,
  //     img: "💻",
  //     color: "#8b5cf6",
  //   },
  //   {
  //     name: "HP Baru",
  //     current: "Rp 300.000",
  //     target: "Rp 4.000.000",
  //     progress: 30,
  //     img: "📱",
  //     color: "#f59e0b",
  //   },
  //   {
  //     name: "Buku Kuliah",
  //     current: "Rp 200.000",
  //     target: "Rp 1.000.000",
  //     progress: 76,
  //     img: "📚",
  //     color: "#10b981",
  //   },
  // ];

  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "Dashboard", "Budget", "Goals",];
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID").format(angka || 0);
  };

  const getHealthStatus = (score) => {
    if (score >= 85)
      return {
        text: "Sangat Baik",
        color: "text-green-700 bg-green-100",
      };

    if (score >= 70)
      return {
        text: "Baik",
        color: "text-green-600 bg-green-50",
      };

    if (score >= 50)
      return {
        text: "Cukup",
        color: "text-yellow-600 bg-yellow-50",
      };

    return {
      text: "Perlu Perbaikan",
      color: "text-red-600 bg-red-50",
    };
  };

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/api/ai/predict-spend/${user.id}`
        );

        const result = await response.json();

        if (result.success) {
          setAiPrediction(result);
        }
      } catch (error) {
        console.error("Gagal mengambil prediksi AI:", error);
      }
    };

    fetchPrediction();
  }, []);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      const res = await fetch(
        `https://fintrackai-backend-1yz0.onrender.com/target-tabungan/user/${userId}`
      );

      const data = await res.json();

      if (data.success) {
        const goalsWithPrediction = await Promise.all(
          data.data.map(async (item) => {
            try {
              const predictRes = await fetch(
                `https://fintrackai-backend-1yz0.onrender.com/api/tabungan/${item.id}/predict`
              );

              const predictData = await predictRes.json();

              const current = Number(item.jumlah_terkumpul);
              const target = Number(item.jumlah_target);

              const progress =
                target > 0
                  ? Math.min(
                    Math.round((current / target) * 100),
                    100
                  )
                  : 0;

              const remainingDays =
                predictData?.prediction?.predict_remaining_days ?? 0;

              return {
                id: item.id,
                name: item.nama_target,
                current,
                target,
                progress,
                remainingDays,
                status: item.status,
              };
            } catch (err) {
              return {
                id: item.id,
                name: item.nama_target,
                current: Number(item.jumlah_terkumpul),
                target: Number(item.jumlah_target),
                progress: 0,
                remainingDays: 0,
                status: item.status,
              };
            }
          })
        );
        const totalSaving = goalsWithPrediction.reduce(
          (sum, goal) => sum + goal.current,
          0
        );

        setTotalTabungan(totalSaving);

        setGoalsData(goalsWithPrediction);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getInsight = (goal) => {
    const sisa = goal.target - goal.current;

    if (goal.remainingDays === 0) {
      return "🎉 Target sudah berhasil tercapai.";
    }

    const perHari = Math.ceil(sisa / goal.remainingDays);

    return `Jika menabung Rp${perHari.toLocaleString(
      "id-ID"
    )}/hari, target akan tercapai tepat waktu.`;
  };

  const fetchFinancialData = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      const [resPemasukan, resPengeluaran] = await Promise.all([
        fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pemasukan/user/${userId}`
        ),
        fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`
        ),
      ]);

      const pemasukanData = await resPemasukan.json();
      const pengeluaranData = await resPengeluaran.json();

      const totalMasuk =
        pemasukanData.data?.reduce(
          (sum, item) => sum + Number(item.nominal || item.jumlah || 0),
          0
        ) || 0;

      const totalKeluar =
        pengeluaranData.data?.reduce(
          (sum, item) => sum + Number(item.nominal || item.jumlah || 0),
          0
        ) || 0;

      setTotalPemasukan(totalMasuk);
      setTotalPengeluaran(totalKeluar);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateBudgetHealthScore = () => {
    if (totalPemasukan === 0) return 0;

    const savingRate =
      (totalTabungan / totalPemasukan) * 100;

    const spendingRate =
      (totalPengeluaran / totalPemasukan) * 100;

    const goalsCompletion =
      goalsData.length > 0
        ? goalsData.reduce(
          (sum, goal) => sum + goal.progress,
          0
        ) / goalsData.length
        : 0;

    const score =
      savingRate * 0.4 +
      (100 - spendingRate) * 0.3 +
      goalsCompletion * 0.3;

    return Math.min(Math.round(score), 100);
  };

  useEffect(() => {
    const score = calculateBudgetHealthScore();
    setBudgetHealthScore(score);
  }, [
    totalPemasukan,
    totalPengeluaran,
    totalTabungan,
    goalsData,
  ]);


  const fetchTrendPengeluaran = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?.id;

      const res = await fetch(
        `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`
      );

      const result = await res.json();

      if (!result.success) return;

      const transactions = result.data;

      // 7 hari terakhir
      const last7Days = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const dateString = date.toISOString().split("T")[0];

        const totalPerDay = transactions
          .filter((item) => {
            const trxDate = new Date(item.tanggal)
              .toISOString()
              .split("T")[0];

            return trxDate === dateString;
          })
          .reduce(
            (sum, item) =>
              sum + Number(item.jumlah || item.nominal || 0),
            0
          );

        last7Days.push({
          name: date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
          }),
          val: totalPerDay,
        });
      }

      setTrendData(last7Days);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFinancialData();
    fetchTrendPengeluaran();
  }, []);

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
              // Ditambahkan '-rotate-90' supaya robotnya berputar menghadap ke atas
              // Ukuran dinaikkan ke 'w-14 h-14' agar tetap proporsional dan tegas
              className="w-14 h-14 object-contain transform -rotate-90 hover:translate-y-[-4px] transition-transform"
              alt="FinTrack AI Assistant"
            />
          </button>
        </div>

      {/* =========================================================
          3. KONTEN UTAMA DASHBOARD AI (DI SEBELAH KANAN SIDEBAR)
      ========================================================= */}
      <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 z-10 relative">
          {/* WRAPPER HEADER UTAMA */}
          <div className="flex justify-between items-center">
            {/* KIRI: HEADER TITLE */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">AI Assistant</h1>
              <p className="text-sm text-gray-500">
                Pusat analisis pintar untuk membantumu membuat keputusan
                terbaik.
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

          {/* ROW 1: BANNER & 4 CARDS */}
          <div className="bg-[#f2ebff] rounded-[24px] p-4 flex flex-col xl:flex-row items-stretch gap-4 w-full shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative overflow-visible border-4 border-white mb-8 z-20">
            {/* KIRI - Teks & Robot AI */}
            <div className="xl:w-[35%] relative flex flex-col justify-center pl-4 py-2 min-h-[140px]">
              <div className="relative z-10 w-[60%]">
                <h2 className="text-[#1e1b4b] text-[18px] font-extrabold mb-1.5 tracking-tight">
                  AI siap membantumu
                </h2>
                <p className="text-[#1e1b4b]/70 text-[11px] font-medium leading-relaxed">
                  Analisis cerdas untuk keputusan keuangan yang lebih baik.
                </p>
              </div>
              <img
                src="/gambar/robotpintar.png"
                alt="Robot AI"
                className="absolute right-0 bottom-[-28px] h-[125%] object-contain drop-shadow-lg z-0"
              />
            </div>

            {/* KANAN - 4 Kartu Data */}
            <div className="xl:w-[65%] grid grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
              <TopCard
                title="Prediksi Pengeluaran Besok"
                value={`Rp ${formatRupiah(
                  aiPrediction?.prediksi_pengeluaran_besok
                )}`}
                badge="Aman"
                badgeColor="text-green-600 bg-[#e6f8f0]"
                iconBg="bg-[#f0eaff]"
                iconColor="text-purple-600"
                icon="🪪"
              />
              <TopCard
                title="Estimasi Saldo Besok"
                value={`Rp ${formatRupiah(
                  aiPrediction?.estimasi_saldo_besok
                )}`}
                badge="Stabil"
                badgeColor="text-green-600 bg-[#e6f8f0]"
                iconBg="bg-blue-50"
                iconColor="text-blue-500"
                icon="💳"
              />
              {/* <TopCard
                title="Goals Aktif"
                value="3 Goals"
                badge="Sedang berjalan"
                badgeColor="text-[#8477e4] bg-[#f0eaff]"
                iconBg="bg-red-50"
                iconColor="text-red-500"
                icon="🎯"
              /> */}
              <TopCard
                title="Budget Health Score"
                value={`${budgetHealthScore} / 100`}
                badge={getHealthStatus(budgetHealthScore).text}
                badgeColor={getHealthStatus(budgetHealthScore).color}
                iconBg="bg-green-50"
                iconColor="text-green-500"
                icon="🛡️"
              />

            </div>
          </div>

          {/* ROW 2: CHART & ESTIMASI */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6 relative z-20">
            {/* Prediksi Area Chart */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col md:flex-row gap-6">
              {/* Kiri: Info & Insight */}
              <div className="w-full md:w-[40%] flex flex-col justify-between">
                <div>
                  <h3 className="text-[14px] font-bold text-[#1e1b4b]">
                    Prediksi Pengeluaran Besok
                  </h3>
                  <h2 className="text-[28px] font-extrabold text-[#8b5cf6] mt-1 tracking-tight">
                    Rp {formatRupiah(aiPrediction?.prediksi_pengeluaran_besok)}
                  </h2>
                </div>
                <div className="bg-[#faf5ff] p-4 rounded-[16px] mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💡</span>
                    <span className="font-bold text-[13px] text-[#1e1b4b]">
                      Insight
                    </span>
                  </div>
                  <p className="text-[12px] text-[#1e1b4b]/80 leading-relaxed font-medium">
                    {aiPrediction?.insight || "Belum ada insight"}
                  </p>
                </div>
              </div>

              {/* Kanan: Chart */}
              <div className="w-full md:w-[60%] flex flex-col relative pt-1">
                <p className="text-[10px] text-gray-400 font-medium absolute top-0 left-[45px]">
                  Tren Pengeluaran (7 Hari Terakhir)
                </p>
                <div className="h-[180px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorVal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#8b5cf6"
                            stopOpacity={0.15}
                          />
                          <stop
                            offset="95%"
                            stopColor="#8b5cf6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#f3f4f6"
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                      />
                      <YAxis
                        tickFormatter={(val) => `${val / 1000}rb`}
                        tick={{ fontSize: 10, fill: "#9ca3af" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        cursor={{
                          stroke: "#8b5cf6",
                          strokeWidth: 1,
                          strokeDasharray: "4 4",
                        }}
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="val"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVal)"
                        activeDot={{
                          r: 6,
                          fill: "#8b5cf6",
                          stroke: "#fff",
                          strokeWidth: 2,
                        }}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Estimasi Saldo */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col md:flex-row gap-6">
              {/* Kiri: Nominal & Progress Bar */}
              <div className="w-full md:w-[55%] flex flex-col justify-between">
                <div>
                  <h3 className="text-[14px] font-bold text-[#1e1b4b]">
                    Estimasi Saldo Besok
                  </h3>
                  <h2 className="text-[28px] font-extrabold text-[#3b82f6] mt-1 tracking-tight mb-6">
                    Rp {formatRupiah(aiPrediction?.estimasi_saldo_besok)}
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-medium text-[#1e1b4b]/60 block mb-1">
                      Saldo Saat Ini
                    </span>
                    <p className="font-bold text-[14px] text-[#1e1b4b] mb-2">
                      Rp {formatRupiah(aiPrediction?.saldo_saat_ini)}
                    </p>
                    <div className="w-full h-[8px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[100%] h-full bg-[#8b5cf6] rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-[#1e1b4b]/60 block mb-1">
                      Estimasi Saldo Besok
                    </span>
                    <p className="font-bold text-[14px] text-[#1e1b4b] mb-2">
                      Rp {formatRupiah(aiPrediction?.estimasi_saldo_besok)}
                    </p>
                    <div className="w-full h-[8px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-[#3b82f6] rounded-full" style={{
                        width: `${Math.min(saldoPercent, 100)}%`,
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Kanan: Insight */}
              <div className="w-full md:w-[45%] flex items-stretch">
                <div className="bg-[#f8fafc] p-5 rounded-[16px] w-full flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-500 text-lg">💼</span>
                    <span className="font-bold text-[13px] text-[#3b82f6]">
                      Insight
                    </span>
                  </div>
                  <p className="text-[12px] text-[#1e1b4b]/80 leading-relaxed font-medium">
                    Dengan prediksi pengeluaran sebesar{" "}
                    <span className="font-bold">
                      Rp {formatRupiah(aiPrediction?.prediksi_pengeluaran_besok)}
                    </span>
                    , saldo kamu diperkirakan menjadi{" "}
                    <span className="font-bold">
                      Rp {formatRupiah(aiPrediction?.estimasi_saldo_besok)}
                    </span>{" "}
                    besok.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: BUDGET & GOALS (Dibuat Full-Width) */}
          <div className="mb-6 relative z-20">
            <div className="bg-white rounded-[28px] p-8 border border-gray-100 shadow-sm">

              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-bold text-[18px] text-[#1e1b4b]">
                    AI Savings Assistant
                  </h3>
                  <p className="text-[12px] text-gray-400">
                    Ringkasan progress target tabunganmu
                  </p>
                </div>

                <div className="bg-[#f0eaff] px-4 py-2 rounded-xl">
                  <span className="text-[#8b5cf6] text-xs font-bold">
                    {goalsData.length} Goals Aktif
                  </span>
                </div>
              </div>

              <div className="grid lg:grid-cols-1 gap-5">

                {/* Kiri */}
                <div className="lg:col-span-2">

                  <div className="space-y-4">
                    {goalsData.map((goal) => (
                      <div
                        key={goal.id}
                        className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="font-bold text-[#1e1b4b] text-lg">
                              {goal.name}
                            </h3>

                            <p className="text-xs text-gray-400">
                              Rp {goal.current.toLocaleString("id-ID")} /
                              Rp {goal.target.toLocaleString("id-ID")}
                            </p>
                          </div>

                          <div className="bg-[#f0eaff] px-3 py-1 rounded-full">
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-bold ${goal.status === "selesai"
                                ? "bg-green-100 text-green-600"
                                : "bg-purple-100 text-purple-600"
                                }`}
                            >
                              {goal.status === "selesai" ? "Selesai" : "Proses"}
                            </div>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-5">
                          <div
                            className="h-full bg-[#8b5cf6]"
                            style={{
                              width: `${goal.progress}%`,
                            }}
                          />
                        </div>

                        {/* AI Section */}
                        <div className="grid md:grid-cols-2 gap-4">

                          <div className="bg-[#faf5ff] rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span>📅</span>
                              <p className="font-bold text-sm text-[#8b5cf6]">
                                Prediksi AI
                              </p>
                            </div>

                            <p className="text-sm text-gray-700">
                              Target ini diperkirakan selesai dalam
                              <span className="font-bold text-[#8b5cf6]">
                                {" "}
                                {goal.remainingDays} hari
                              </span>
                            </p>
                          </div>

                          <div className="bg-[#fff9eb] rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span>💡</span>
                              <p className="font-bold text-sm text-orange-600">
                                Insight AI
                              </p>
                            </div>

                            <p className="text-sm text-gray-700">
                              {getInsight(goal)}
                            </p>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Kanan */}
                {/* <div className="space-y-4">

                  <div className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white rounded-3xl p-5">
                    <p className="text-white/70 text-xs mb-2">
                      Goal Terdekat Selesai
                    </p>

                    <h3 className="font-bold text-xl">
                      Laptop ASUS
                    </h3>

                    <p className="text-sm mt-3">
                      Diperkirakan selesai dalam
                      <span className="font-bold"> 5 hari </span>
                      lagi 🚀
                    </p>
                  </div>

                  <div className="bg-[#fff9eb] border border-[#fde68a] rounded-3xl p-5">
                    <h4 className="font-bold text-orange-700 mb-2">
                      💡 Insight AI
                    </h4>

                    <p className="text-[12px] text-orange-700 leading-relaxed">
                      2 dari 3 goals berada di jalur yang baik.
                      Pertahankan tabungan harian agar target
                      selesai tepat waktu.
                    </p>
                  </div>

                </div> */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN KECIL (COMPONENTS) ---

const TopCard = ({
  title,
  value,
  badge,
  badgeColor,
  icon,
  iconBg,
  iconColor,
}) => (
  <div className="bg-white rounded-[18px] p-4 border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
    {/* Ikon Bulat */}
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-[16px] mb-3 ${iconBg} ${iconColor}`}
    >
      {icon}
    </div>

    {/* Judul & Nominal */}
    <div className="mb-3">
      <p className="text-[10px] font-bold text-[#1e1b4b]/80 mb-1 leading-tight">
        {title}
      </p>
      <h3 className="text-[18px] font-extrabold text-[#1e1b4b] tracking-tight">
        {value}
      </h3>
    </div>

    {/* Badge */}
    <div>
      <span
        className={`inline-block text-[9px] font-bold px-2.5 py-1 rounded-md ${badgeColor}`}
      >
        {badge}
      </span>
    </div>
  </div>
);

// Komponen InsightMiniCard
const InsightMiniCard = ({ icon, iconBg, iconColor, title, text, date }) => (
  <div className="border border-gray-100 rounded-[16px] p-4 flex flex-col justify-between h-full hover:shadow-sm transition-shadow bg-white">
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-[14px] ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
        <span className="font-bold text-[12px] text-[#1e1b4b]">{title}</span>
      </div>
      <p className="text-[10.5px] text-[#1e1b4b]/70 leading-[1.6] font-medium mb-4">
        {text}
      </p>
    </div>
    <p className="text-[9px] text-gray-400 font-medium">{date}</p>
  </div>
);

// Komponen RecomCard
const RecomCard = ({ num, icon, color, title, text }) => {
  const colorStyles = {
    purple: {
      bg: "bg-[#faf5ff]",
      text: "text-[#8b5cf6]",
      numBg: "bg-[#8b5cf6]",
      border: "border-[#f0eaff]",
    },
    orange: {
      bg: "bg-[#fffcf5]",
      text: "text-orange-500",
      numBg: "bg-orange-500",
      border: "border-[#fff4e6]",
    },
    green: {
      bg: "bg-[#f5fbf7]",
      text: "text-green-600",
      numBg: "bg-green-600",
      border: "border-[#e6f8f0]",
    },
  }[color] || {
    bg: "bg-gray-50",
    text: "text-gray-600",
    numBg: "bg-gray-600",
    border: "border-gray-100",
  };

  return (
    <div
      className={`${colorStyles.bg} border ${colorStyles.border} rounded-[16px] p-4 flex flex-col h-full relative`}
    >
      {/* Number Badge */}
      <div
        className={`absolute top-4 left-4 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${colorStyles.numBg}`}
      >
        {num}
      </div>

      {/* Large Icon Centered */}
      <div className="flex justify-center mt-5 mb-4">
        <div className={`text-[32px] ${colorStyles.text}`}>{icon}</div>
      </div>

      {/* Text Content */}
      <div className="mt-auto">
        <h4 className={`text-[11px] font-bold mb-1.5 ${colorStyles.text}`}>
          {title}
        </h4>
        <p className="text-[10.5px] text-[#1e1b4b]/80 leading-[1.5] font-medium">
          {text}
        </p>
      </div>
    </div>
  );
};

export default AI;
