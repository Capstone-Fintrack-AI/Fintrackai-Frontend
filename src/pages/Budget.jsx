import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

const dataAlokasiPie = [
  { name: "Kebutuhan", value: 1500000, color: "#8477e4" },
  { name: "Keinginan", value: 900000, color: "#ffb224" },
  { name: "Tabungan", value: 600000, color: "#4caf50" },
];

const dataRealisasiPie = [
  { name: "Kebutuhan", value: 1275000, color: "#8477e4" },
  { name: "Keinginan", value: 787000, color: "#ffb224" },
  { name: "Tabungan", value: 400000, color: "#4caf50" },
];

const dataBudgetVsAktual = [
  { name: "Kebutuhan", percentage: "(50%)", Target: 1500000, Aktual: 1275000 },
  { name: "Keinginan", percentage: "(30%)", Target: 900000, Aktual: 787000 },
  { name: "Tabungan", percentage: "(20%)", Target: 600000, Aktual: 400000 },
];

const dataTrenBulanan = [
  { name: "Des 2024", Target: 3000000, Realisasi: 2100000 },
  { name: "Jan 2025", Target: 3000000, Realisasi: 2400000 },
  { name: "Feb 2025", Target: 3000000, Realisasi: 2850000 },
  { name: "Mar 2025", Target: 3000000, Realisasi: 2200000 },
  { name: "Apr 2025", Target: 3000000, Realisasi: 2600000 },
  { name: "Mei 2025", Target: 3000000, Realisasi: 2462000 },
];

const dataGauge = [
  { value: 87, color: "#4caf50" },
  { value: 13, color: "#eef2f6" },
];

const Budget = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const activeMenu = "Budget";

  const handleLogout = () => {
    navigate("/login");
  };

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
          2. SIDEBAR KIRI DENGAN TOMBOL ROBOT NGINTIP (PERSIS BERANDA)
      ========================================================= */}
      <div
        className={`${isSidebarOpen ? "w-64" : "w-20"} bg-white border-r border-[#f0f0f0] px-6 py-8 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative transition-all duration-300`}
      >
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

        <nav className="relative flex-grow font-medium flex flex-col gap-4">
          <div
            className="absolute left-0 w-full h-[52px] bg-[#f0eaff] rounded-2xl shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              transform: `translateY(${["Beranda", "Transaksi", "Budget", "Goals", "AI", "Laporan"].indexOf(activeMenu) * 68}px)`,
              display: [
                "Beranda",
                "Transaksi",
                "Budget",
                "Goals",
                "AI",
                "Laporan",
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
            { n: "Laporan", img: "/gambar/laporan.png", path: "/laporan" },
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

      {/* DASHBOARD CONTAINER */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 z-10 relative">
        {/* WRAPPER HEADER UTAMA */}
        <div className="flex justify-between items-center">
          {/* KIRI: HEADER TITLE */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Budget</h1>
            <p className="text-sm text-gray-500">
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
        <div className="bg-[#EEE8FD] rounded-2xl border border-[#e9dff9] p-4 flex flex-row items-center justify-between gap-6 w-full h-[160px] shadow-sm relative overflow-hidden">
          <div className="flex-1 min-w-0 z-10">
            {/* JUDUL: Menggunakan warna utama #3e3a94 dan ukuran text-lg yang ramping */}
            <h2 className="text-lg font-extrabold text-[#3e3a94] mb-1.5 tracking-tight">
              Smart Budgeting 50-30-20
            </h2>

            {/* DESKRIPSI: Menggunakan text-xs, warna #685fbe, dan max-w agar teks membungkus rapi */}
            <p className="text-xs font-medium text-[#685fbe] leading-relaxed max-w-sm">
              FinTrack AI otomatis mengalokasikan pemasukanmu ke{" "}
              <span className="font-extrabold text-[#3e3a94]">
                Kebutuhan, Keinginan, dan Tabungan
              </span>{" "}
              agar keuanganmu lebih sehat dan seimbang.
            </p>
          </div>
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 h-full flex items-center justify-center">
            <img
              src="/gambar/robotbudget.png"
              alt="Robot"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-[#e9dff9] space-y-2 w-[280px] shrink-0 z-10">
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
              <span className="text-[#4caf50] font-bold">Rp 3.000.000</span>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Card 1: Total Pemasukan */}
          <div className="bg-white p-4 rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] flex items-center justify-center text-white text-2xl shrink-0">
              <i className="fas fa-wallet"></i>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6b61b7]">
                Total Pemasukan
              </p>
              <h3 className="text-lg font-extrabold text-[#453c8a] mt-0.5">
                Rp 3.000.000
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">
                100% dari total budget
              </p>
            </div>
          </div>

          {/* Card 2: Kebutuhan */}
          <div className="bg-white p-4 rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] flex items-center justify-center text-white text-2xl shrink-0">
              <i className="fas fa-home"></i>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6b61b7]">
                Budget Kebutuhan (50%)
              </p>
              <h3 className="text-lg font-extrabold text-[#453c8a] mt-0.5">
                Rp 1.500.000
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Alokasi otomatis
              </p>
            </div>
          </div>

          {/* Card 3: Keinginan */}
          <div className="bg-white p-4 rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex items-center justify-center text-white text-2xl shrink-0">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6b61b7]">
                Budget Keinginan (30%)
              </p>
              <h3 className="text-lg font-extrabold text-[#453c8a] mt-0.5">
                Rp 900.000
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Alokasi otomatis
              </p>
            </div>
          </div>

          {/* Card 4: Tabungan */}
          <div className="bg-white p-4 rounded-3xl border border-[#e9dff9] shadow-sm flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6ee7b7] to-[#10b981] flex items-center justify-center text-white text-2xl shrink-0">
              <i className="fas fa-piggy-bank"></i>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-[#6b61b7]">
                Budget Tabungan (20%)
              </p>
              <h3 className="text-lg font-extrabold text-[#453c8a] mt-0.5">
                Rp 600.000
              </h3>
              <p className="text-[10px] text-gray-400 mt-0.5">
                Dialokasikan ke Goals
              </p>
            </div>
          </div>
        </div>

        {/* TOP ROW: PIE CHARTS & BAR CHART */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
          {[
            { title: "Alokasi Budget (50-30-20)", data: dataAlokasiPie },
            { title: "Realisasi Saat Ini", data: dataRealisasiPie },
          ].map((chart, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between"
            >
              {/* UKURAN JUDUL DISAMAKAN DI SINI */}
              <h3 className="text-base font-black text-[#2e2a60] mb-6">
                {chart.title}
              </h3>

              <div className="relative flex items-center justify-center h-36">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chart.data}
                      innerRadius={45}
                      outerRadius={60}
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
                  <span className="text-[9px] font-bold text-gray-400">
                    TOTAL
                  </span>
                  <span className="text-xs font-black text-gray-900">100%</span>
                </div>
              </div>
              <div className="space-y-1.5 mt-4">
                {chart.data.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-[10px] font-bold"
                  >
                    <div className="flex items-center gap-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-500 truncate">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-gray-900">
                      Rp {(item.value / 1000000).toFixed(1)}jt
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col col-span-1 xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-base font-black text-[#2e2a60]">
                Budget VS Aktual
              </h3>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-3 bg-[#f3f0ff] border border-dashed border-[#8477e4] rounded-sm" />
                  <span>Target</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-3 bg-[#8477e4] rounded-sm" />
                  <span>Aktual</span>
                </div>
              </div>
            </div>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dataBudgetVsAktual}
                  margin={{ top: 40, right: 10, left: 15, bottom: 15 }}
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
                            y={15}
                            textAnchor="middle"
                            className="text-[11px] font-extrabold fill-gray-700"
                          >
                            {item.name}
                          </text>
                          <text
                            x={0}
                            y={30}
                            textAnchor="middle"
                            className="text-[11px] font-bold fill-gray-400"
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
                    tick={{ fontSize: 10, fontWeight: 700, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                    width={75}
                    tickFormatter={(value) =>
                      value === 0
                        ? "Rp 0"
                        : `Rp ${value.toLocaleString("id-ID")}`
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
                    barSize={40}
                  />
                  <Bar
                    dataKey="Aktual"
                    fill="#8477e4"
                    radius={[4, 4, 0, 0]}
                    barSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* MIDDLE ROW: 3 SEJAJAR */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* 1. TREN BUDGET BULANAN (DI-TENGAAHKAN ISINYA) */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[260px]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-black text-[#2e2a60]">
                Tren Budget Bulanan
              </h3>
              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-500">
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
            <div className="h-44 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                {/* Di-tengahkan dengan menyeimbangkan margin left negatif dan right positif */}
                <LineChart
                  data={dataTrenBulanan}
                  margin={{ top: 15, right: 35, left: -20, bottom: 5 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1efff" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 9, fontWeight: 700, fill: "#9ca3af" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 4000000]}
                    ticks={[0, 1000000, 2000000, 3000000, 4000000]}
                    width={55}
                    tickFormatter={(val) =>
                      val === 0 ? "Rp 0" : `Rp ${(val / 1000000).toFixed(0)}jt`
                    }
                    tick={{ fontSize: 9, fontWeight: 700, fill: "#9ca3af" }}
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
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center min-h-[260px]">
            <h3 className="text-sm font-black text-[#2e2a60] self-start">
              Budget Health Score
            </h3>
            <div className="relative w-full flex items-center justify-center h-32 mt-1">
              <ResponsiveContainer width="100%" height={140}>
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
                    innerRadius={74}
                    outerRadius={90}
                    cy={115}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="url(#healthGradient)" />
                    <Cell fill="#eef2f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute bottom-1.5 flex flex-col items-center">
                <span className="text-4xl font-black text-[#2e2a60] leading-none">
                  87
                </span>
                <span className="text-[10px] font-bold text-gray-400 mt-1">
                  /100
                </span>
              </div>
            </div>
            <div className="mt-1">
              <h4 className="text-xs font-black text-[#4caf50]">
                Sangat Baik 😊
              </h4>
              <p className="text-[10px] text-gray-400 font-bold mt-0.5 leading-relaxed">
                Budget kamu dikelola dengan baik!
              </p>
            </div>
          </div>

          {/* 3. PROGRESS ALOKASI */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between min-h-[260px]">
            <h3 className="text-sm font-black text-[#2e2a60] mb-2">
              Progress Alokasi
            </h3>
            <div className="flex flex-col flex-1 justify-center divide-y divide-slate-50">
              {/* KEBUTUHAN */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#f4f2ff] text-[#8477e4] rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <div className="text-[11px] font-black text-slate-700">
                    Kebutuhan{" "}
                    <span className="text-slate-400 font-normal">(50%)</span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col">
                  <div className="text-right text-[11px] font-black text-[#8477e4] mb-0.5">
                    85%
                  </div>
                  <div className="w-full bg-[#f3f4f6] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#8477e4] h-full rounded-full"
                      style={{ width: "85%" }}
                    />
                  </div>
                  <div className="text-left text-[8px] font-bold text-slate-400 mt-0.5">
                    Rp 1.275k / Rp 1.500k
                  </div>
                </div>
              </div>

              {/* KEINGINAN */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#fffbeb] text-[#ffb224] rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-[11px] font-black text-slate-700">
                    Keinginan{" "}
                    <span className="text-slate-400 font-normal">(30%)</span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col">
                  <div className="text-right text-[11px] font-black text-[#ffb224] mb-0.5">
                    87%
                  </div>
                  <div className="w-full bg-[#f3f4f6] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#ffb224] h-full rounded-full"
                      style={{ width: "87%" }}
                    />
                  </div>
                  <div className="text-left text-[8px] font-bold text-slate-400 mt-0.5">
                    Rp 787k / Rp 900k
                  </div>
                </div>
              </div>

              {/* TABUNGAN */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#f0fdf4] text-[#4caf50] rounded-xl">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.854-1.106-2.24 0-3.093 1.147-.881 2.929-.881 4.076 0l.334.256M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-[11px] font-black text-slate-700">
                    Tabungan{" "}
                    <span className="text-slate-400 font-normal">(20%)</span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col">
                  <div className="text-right text-[11px] font-black text-[#4caf50] mb-0.5">
                    67%
                  </div>
                  <div className="w-full bg-[#f3f4f6] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#4caf50] h-full rounded-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                  <div className="text-left text-[8px] font-bold text-slate-400 mt-0.5">
                    Rp 400k / Rp 600k
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ROW: FOOTER INSIGHT AI & TENTANG METODE */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* KARTU 1: INSIGHT AI */}
          <div className="xl:col-span-2 bg-[#f4f0ff] p-5 rounded-3xl border border-[#e1d7ff] shadow-sm flex items-center gap-4 relative overflow-hidden">
            <img
              src="/gambar/robotdada.png"
              alt="Robot AI"
              className="w-20 h-20 object-contain shrink-0"
            />
            <div className="space-y-0.5">
              <h3 className="text-sm font-black text-[#2e2a60]">Insight AI</h3>
              <p className="text-[11px] text-[#5c5494] font-medium leading-relaxed">
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
          <div className="xl:col-span-3 bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-sm font-black text-[#2e2a60] mb-3">
              Tentang Metode 50-30-20
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Box Kebutuhan */}
              <div className="bg-[#f6f3ff] p-3 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white text-[#8477e4] rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      />
                    </svg>
                  </div>
                  <div className="text-[10px] font-black text-[#8477e4]">
                    50% Kebutuhan
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-tight">
                  Untuk kebutuhan pokok and penting
                </p>
              </div>

              {/* Box Keinginan */}
              <div className="bg-[#fffcf0] p-3 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white text-[#ffb224] rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-[10px] font-black text-[#ffb224]">
                    30% Keinginan
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-tight">
                  Untuk keinginan dan kenyamanan hidup
                </p>
              </div>

              {/* Box Tabungan */}
              <div className="bg-[#f0fdf4] p-3 rounded-2xl flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-white text-[#4caf50] rounded-lg shadow-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.854-1.106-2.24 0-3.093 1.147-.881 2.929-.881 4.076 0l.334.256M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="text-[10px] font-black text-[#4caf50]">
                    20% Tabungan
                  </div>
                </div>
                <p className="text-[10px] text-gray-400 font-bold leading-tight">
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
