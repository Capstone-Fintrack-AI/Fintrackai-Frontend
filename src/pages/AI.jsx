import React, { useState } from "react";
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

  const handleLogout = () => {
    // Tambahkan logika hapus token/session di sini jika ada
    navigate("/login");
  };

  // --- DATA DUMMY DASHBOARD AI ---
  const trendData = [
    { name: "16 Mei", val: 350000 },
    { name: "17 Mei", val: 370000 },
    { name: "18 Mei", val: 390000 },
    { name: "19 Mei", val: 410000 },
    { name: "20 Mei", val: 390000 },
    { name: "21 Mei", val: 420000 },
    { name: "22 Mei\n(Besok)", val: 364624 },
  ];

  const budgetData = [
    { name: "Kebutuhan", value: 54, color: "#8b5cf6", amount: "Rp 1.620.000" },
    { name: "Keinginan", value: 28, color: "#f43f5e", amount: "Rp 830.000" },
    { name: "Tabungan", value: 18, color: "#10b981", amount: "Rp 550.000" },
  ];

  const goalsData = [
    {
      name: "Laptop ASUS",
      current: "Rp 700.000",
      target: "Rp 8.000.000",
      progress: 42,
      img: "💻",
      color: "#8b5cf6",
    },
    {
      name: "HP Baru",
      current: "Rp 300.000",
      target: "Rp 4.000.000",
      progress: 30,
      img: "📱",
      color: "#f59e0b",
    },
    {
      name: "Buku Kuliah",
      current: "Rp 200.000",
      target: "Rp 1.000.000",
      progress: 76,
      img: "📚",
      color: "#10b981",
    },
  ];

  const [activeTab, setActiveTab] = useState("Semua");
  const tabs = ["Semua", "Dashboard", "Budget", "Goals", "Laporan"];

  return (
    <div className="h-screen bg-[#f8f6ff] font-poppins flex overflow-hidden relative text-[#1e1b4b] antialiased">
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
              onClick={() => navigate(item.path)}
              className={`relative z-10 flex items-center ${isSidebarOpen ? "gap-4 px-3.5" : "justify-center px-0"} cursor-pointer h-[52px] rounded-2xl transition-all duration-300 ${activeMenu === item.n ? "text-[#8477e4] font-bold" : "text-gray-400 hover:text-gray-900"}`}
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

      {/* =========================================================
          3. KONTEN UTAMA DASHBOARD AI (DI SEBELAH KANAN SIDEBAR)
      ========================================================= */}
      <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
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
            <div className="xl:w-[65%] grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
              <TopCard
                title="Prediksi Pengeluaran Besok"
                value="Rp 364.624"
                badge="Aman"
                badgeColor="text-green-600 bg-[#e6f8f0]"
                iconBg="bg-[#f0eaff]"
                iconColor="text-purple-600"
                icon="🪪"
              />
              <TopCard
                title="Estimasi Saldo Besok"
                value="Rp 2.610.376"
                badge="Stabil"
                badgeColor="text-green-600 bg-[#e6f8f0]"
                iconBg="bg-blue-50"
                iconColor="text-blue-500"
                icon="💳"
              />
              <TopCard
                title="Goals Aktif"
                value="3 Goals"
                badge="Sedang berjalan"
                badgeColor="text-[#8477e4] bg-[#f0eaff]"
                iconBg="bg-red-50"
                iconColor="text-red-500"
                icon="🎯"
              />
              <TopCard
                title="Budget Health Score"
                value="87 / 100"
                badge="Baik"
                badgeColor="text-green-600 bg-[#e6f8f0]"
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
                    Rp 364.624
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
                    Pengeluaran besok diperkirakan masih dalam batas aman.
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
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
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
                        cursor={{ stroke: "#8b5cf6", strokeWidth: 1, strokeDasharray: "4 4" }}
                        contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="val"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorVal)"
                        activeDot={{ r: 6, fill: "#8b5cf6", stroke: "#fff", strokeWidth: 2 }}
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
                    Rp 2.610.376
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[11px] font-medium text-[#1e1b4b]/60 block mb-1">
                      Saldo Saat Ini
                    </span>
                    <p className="font-bold text-[14px] text-[#1e1b4b] mb-2">
                      Rp 2.975.000
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
                      Rp 2.610.376
                    </p>
                    <div className="w-full h-[8px] bg-gray-100 rounded-full overflow-hidden">
                      <div className="w-[85%] h-full bg-[#3b82f6] rounded-full"></div>
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
                    Jika pola pengeluaran saat ini tetap terjaga, saldo besok
                    kamu diperkirakan cukup aman.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ROW 3: BUDGET & GOALS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6 relative z-20">
            {/* Analisis Budget */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[24px] border border-gray-100/50 shadow-sm flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-[35%] relative h-[160px] flex flex-col items-center justify-center">
                <h3 className="absolute top-0 left-0 font-semibold text-[13px] text-[#1e1b4b] w-full text-left">
                  Analisis Budget
                </h3>
                <div className="w-full h-full mt-4 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={budgetData}
                        innerRadius={45}
                        outerRadius={65}
                        dataKey="value"
                        stroke="none"
                        paddingAngle={2}
                      >
                        {budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[20px] font-bold leading-none text-[#1e1b4b]">
                      83%
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium mt-1">
                      Keinginan
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[30%] flex flex-col justify-center gap-3 pt-4 pl-2">
                {budgetData.map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-0.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-[11px] font-semibold text-gray-700">
                        {item.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 ml-4.5">
                      {item.amount}{" "}
                      <span className="font-medium">({item.value}%)</span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="w-full md:w-[35%] bg-[#f5f3ff] border border-[#ede9fe] p-5 rounded-[20px] h-full flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-purple-500 text-sm">📈</span>
                  <span className="font-semibold text-[12px] text-purple-800">
                    Insight Budget
                  </span>
                </div>
                <p className="text-[10px] text-purple-900/80 leading-[1.6] font-medium">
                  Alokasi keinginan mencapai 83% dari batas bulanan.
                  <br />
                  <br />
                  Masih aman, namun disarankan mengurangi transaksi
                  non-prioritas agar tabungan lebih optimal.
                </p>
              </div>
            </div>

            {/* Analisis Goals */}
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-[24px] border border-gray-100/50 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-[55%]">
                <h3 className="font-semibold text-[13px] text-[#1e1b4b] mb-4">
                  Analisis Goals
                </h3>
                <div className="space-y-4">
                  {goalsData.map((goal, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center shadow-sm text-[20px]">
                        {goal.img}
                      </div>
                      <div className="flex-1">
                        <p className="text-[12px] font-bold text-[#1e1b4b]">
                          {goal.name}
                        </p>
                        <p className="text-[9px] text-gray-400 mb-1.5 font-medium">
                          {goal.current} / {goal.target}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="w-full h-[5px] bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${goal.progress}%`,
                                backgroundColor: goal.color,
                              }}
                            ></div>
                          </div>
                          <span
                            className="text-[10px] font-bold w-7 text-right"
                            style={{ color: goal.color }}
                          >
                            {goal.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-[45%] flex flex-col gap-4 justify-center">
                <div className="bg-[#e6f8f0] border border-[#a7f3d0] p-4 rounded-[16px]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-green-500 text-sm">📈</span>
                    <span className="font-semibold text-[12px] text-green-800">
                      Insight Goals
                    </span>
                  </div>
                  <p className="text-[10px] text-green-800/80 leading-relaxed font-medium">
                    Goal Laptop ASUS akan tercapai dalam 11 bulan jika pola
                    menabung tetap konsisten.
                  </p>
                </div>

                <div className="bg-[#fff9eb] border border-[#fef0c7] p-4 rounded-[16px] flex gap-3 items-start">
                  <span className="text-orange-500 text-[20px]">🏆</span>
                  <div>
                    <p className="font-bold text-[11px] text-orange-800 leading-tight mb-1">
                      Goal tercepat saat ini
                      <br />
                      Buku Kuliah 💥
                    </p>
                    <p className="text-[9px] text-orange-800/80 font-medium">
                      Target dapat tercapai dalam 2 bulan lagi.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 4: INSIGHTS & REKOMENDASI */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 relative z-20 pb-8">
            
            {/* Kiri: Semua Insight AI */}
            <div className="xl:col-span-7 bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col gap-4">
              <h3 className="font-bold text-[16px] text-[#1e1b4b]">
                Semua Insight AI
              </h3>
              
              {/* Tabs */}
              <div className="flex gap-2 mb-2 overflow-x-auto pb-2 scrollbar-hide">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-1.5 rounded-xl text-[12px] font-semibold transition-all whitespace-nowrap border ${
                      activeTab === tab
                        ? "bg-[#8b5cf6] text-white border-[#8b5cf6]"
                        : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Grid Insight Mini Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
                <InsightMiniCard
                  icon="🧭"
                  iconBg="bg-[#f0eaff]"
                  iconColor="text-purple-600"
                  title="Dashboard"
                  text="Pengeluaran hari ini 12% lebih rendah dibanding rata-rata 7 hari terakhir. Bagus! 👍"
                  date="22 Mei 2025, 08:30"
                />
                <InsightMiniCard
                  icon="💡"
                  iconBg="bg-[#fff4e6]"
                  iconColor="text-orange-500"
                  title="Budget"
                  text="Alokasi kebutuhan kamu terjaga dengan baik selama 5 hari terakhir."
                  date="22 Mei 2025, 08:30"
                />
                <InsightMiniCard
                  icon="🎯"
                  iconBg="bg-[#ffeef2]"
                  iconColor="text-red-500"
                  title="Goals"
                  text="Kamu sudah konsisten menabung selama 12 hari berturut-turut. Pertahankan! 💪"
                  date="22 Mei 2025, 08:30"
                />
                <InsightMiniCard
                  icon="📄"
                  iconBg="bg-[#eef2ff]"
                  iconColor="text-blue-500"
                  title="Laporan"
                  text="Bulan Mei menjadi bulan dengan pengeluaran tertinggi dalam 3 bulan terakhir."
                  date="22 Mei 2025, 08:30"
                />
              </div>
            </div>

            {/* Kanan: Rekomendasi AI */}
            <div className="xl:col-span-5 bg-white rounded-[24px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-[16px] text-[#1e1b4b]">
                  Rekomendasi AI Untukmu
                </h3>
                <button className="text-[#8b5cf6] text-[12px] font-semibold hover:underline cursor-pointer flex items-center gap-1">
                  Lihat Semua <span className="text-[10px]">❯</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                <RecomCard
                  num="1"
                  icon="🎯"
                  color="purple"
                  title="Prioritas 1"
                  text="Tambahkan Rp100.000 ke Goal Laptop ASUS untuk mempercepat pencapaiannya."
                />
                <RecomCard
                  num="2"
                  icon="💳"
                  color="orange"
                  title="Prioritas 2"
                  text="Kurangi alokasi keinginan sekitar 5% agar tabungan lebih optimal."
                />
                <RecomCard
                  num="3"
                  icon="🐷"
                  color="green"
                  title="Prioritas 3"
                  text="Masih ada Rp200.000 tabungan yang belum dialokasikan ke goals. Ayo alokasikan!"
                />
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
        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[14px] ${iconBg} ${iconColor}`}>
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
    purple: { bg: "bg-[#faf5ff]", text: "text-[#8b5cf6]", numBg: "bg-[#8b5cf6]", border: "border-[#f0eaff]" },
    orange: { bg: "bg-[#fffcf5]", text: "text-orange-500", numBg: "bg-orange-500", border: "border-[#fff4e6]" },
    green: { bg: "bg-[#f5fbf7]", text: "text-green-600", numBg: "bg-green-600", border: "border-[#e6f8f0]" },
  }[color] || { bg: "bg-gray-50", text: "text-gray-600", numBg: "bg-gray-600", border: "border-gray-100" };

  return (
    <div className={`${colorStyles.bg} border ${colorStyles.border} rounded-[16px] p-4 flex flex-col h-full relative`}>
      {/* Number Badge */}
      <div className={`absolute top-4 left-4 w-5 h-5 rounded-full flex items-center justify-center text-white text-[11px] font-bold ${colorStyles.numBg}`}>
        {num}
      </div>
      
      {/* Large Icon Centered */}
      <div className="flex justify-center mt-5 mb-4">
        <div className={`text-[32px] ${colorStyles.text}`}>
          {icon}
        </div>
      </div>

      {/* Text Content */}
      <div className="mt-auto">
        <h4 className={`text-[11px] font-bold mb-1.5 ${colorStyles.text}`}>{title}</h4>
        <p className="text-[10.5px] text-[#1e1b4b]/80 leading-[1.5] font-medium">
          {text}
        </p>
      </div>
    </div>
  );
};

export default AI;
