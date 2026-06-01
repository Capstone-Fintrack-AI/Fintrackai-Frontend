import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
  LineChart, Line
} from 'recharts';

// ==========================================
// MOCK DATA UNTUK GRAFIK (SESUAI FIGMA)
// ==========================================
const dataAlokasiPie = [
  { name: 'Kebutuhan', value: 1500000, color: '#8477e4' },
  { name: 'Keinginan', value: 900000, color: '#ffb224' },
  { name: 'Tabungan', value: 600000, color: '#4caf50' },
];

const dataRealisasiPie = [
  { name: 'Kebutuhan', value: 1275000, color: '#8477e4' },
  { name: 'Keinginan', value: 787000, color: '#ffb224' },
  { name: 'Tabungan', value: 400000, color: '#4caf50' },
];

const dataBudgetVsAktual = [
  { name: 'Kebutuhan (50%)', Target: 1500000, Aktual: 1275000 },
  { name: 'Keinginan (30%)', Target: 900000, Aktual: 787000 },
  { name: 'Tabungan (20%)', Target: 600000, Aktual: 400000 },
];

const dataTrenBulanan = [
  { name: 'Des 2024', Target: 3000000, Realisasi: 2100000 },
  { name: 'Jan 2025', Target: 3000000, Realisasi: 2400000 },
  { name: 'Feb 2025', Target: 3000000, Realisasi: 2850000 },
  { name: 'Mar 2025', Target: 3000000, Realisasi: 2200000 },
  { name: 'Apr 2025', Target: 3000000, Realisasi: 2600000 },
  { name: 'Mei 2025', Target: 3000000, Realisasi: 2462000 },
];

const dataGauge = [
  { value: 87, color: '#4caf50' },
  { value: 13, color: '#e5e7eb' },
];

const Budget = () => {
  // Mengaktifkan fitur state dan navigasi di dalam file
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const activeMenu = "Budget"; // Mengunci status aktif di halaman Budget

  const handleLogout = () => {
    navigate('/login');
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

      {/* =========================================================
          3. AREA KONTEN UTAMA (WORKSPACE DASHBOARD BUDGET)
      ========================================================= */}
      <div className="flex-1 p-6 space-y-6 z-10 relative overflow-y-auto max-h-screen">
        
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Budgeting</h1>
          <p className="text-xs font-medium text-gray-500 mt-0.5">
            Kelola akun dan preferensi aplikasi sesuai kebutuhanmu
          </p>
        </div>

        {/* BANNER HERO */}
        <div className="bg-[#f3f0ff] rounded-3xl border border-[#e4dcff] p-6 flex flex-col lg:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="flex-1 space-y-2">
            <h2 className="text-xl font-extrabold text-[#453c8a]">Smart Budgeting 50-30-20</h2>
            <p className="text-xs text-[#7a72bc] leading-relaxed font-medium max-w-xl">
              FinTrack AI secara otomatis mengalokasikan pemasukanmu ke dalam Kebutuhan, Keinginan, 
              dan Tabungan untuk membantu keuanganmu lebih sehat dan seimbang.
            </p>
          </div>
          
          <div className="w-32 h-32 flex items-center justify-center shrink-0">
            <img src="/gambar/robotbudget.png" alt="Robot Calculator" className="w-full h-full object-contain animate-bubble-img" />
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3 w-full lg:w-72 shrink-0">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-400 font-semibold">Periode Aktif</span>
              <span className="text-gray-800 font-bold">1 - 31 Mei 2025</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-400 font-semibold">Total Pemasukan</span>
              <span className="text-[#4caf50] font-extrabold text-xs">Rp 3.000.000</span>
            </div>
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-gray-400 font-semibold">Metode</span>
              <span className="text-gray-800 font-bold">50% - 30% - 20% (Otomatis)</span>
            </div>
          </div>
        </div>

        {/* 3 METRIC CARDS ROW */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8477e4] flex items-center justify-center text-white text-xl shrink-0">
              <i className="fas fa-home"></i>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400">Budget Kebutuhan (50%)</p>
              <h3 className="text-base font-extrabold text-gray-900 mt-0.5">Rp 1.500.000</h3>
              <p className="text-[9px] text-gray-400 mt-0.5">Alokasi otomatis</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#ffb224] flex items-center justify-center text-white text-xl shrink-0">
              <i className="fas fa-shopping-bag"></i>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400">Budget Keinginan (30%)</p>
              <h3 className="text-base font-extrabold text-gray-900 mt-0.5">Rp 900.000</h3>
              <p className="text-[9px] text-gray-400 mt-0.5">Alokasi otomatis</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#4caf50] flex items-center justify-center text-white text-xl shrink-0">
              <i className="fas fa-piggy-bank"></i>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400">Budget Tabungan (20%)</p>
              <h3 className="text-base font-extrabold text-gray-900 mt-0.5">Rp 600.000</h3>
              <p className="text-[9px] text-gray-400 mt-0.5">Dialokasikan ke Goals</p>
            </div>
          </div>
        </div>

        {/* ROW 3 GRAFIK UTAMA */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-extrabold text-gray-900 mb-2">Alokasi Budget (50-30-20)</h3>
            <div className="relative flex items-center justify-center h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataAlokasiPie} innerRadius={45} outerRadius={60} paddingAngle={4} dataKey="value" animationDuration={1200}>
                    {dataAlokasiPie.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Total</span>
                <span className="text-base font-black text-gray-900">100%</span>
              </div>
            </div>
            <div className="space-y-1.5 mt-2">
              {dataAlokasiPie.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <span className="text-gray-900">Rp {item.value.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-extrabold text-gray-900 mb-2">Realisasi Saat Ini</h3>
            <div className="relative flex items-center justify-center h-44">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataRealisasiPie} innerRadius={45} outerRadius={60} paddingAngle={4} dataKey="value" animationDuration={1200}>
                    {dataRealisasiPie.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Total</span>
                <span className="text-base font-black text-gray-900">100%</span>
              </div>
            </div>
            <div className="space-y-1.5 mt-2">
              {dataRealisasiPie.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-500">{item.name}</span>
                  </div>
                  <span className="text-gray-900">Rp {item.value.toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-extrabold text-gray-900 mb-4">Budget vs Aktual</h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataBudgetVsAktual} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 700, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fontWeight: 600, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
                  <Bar dataKey="Target" fill="#e2e0fd" radius={[4, 4, 0, 0]} animationDuration={1200} />
                  <Bar dataKey="Aktual" fill="#8477e4" radius={[4, 4, 0, 0]} animationDuration={1200} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ROW TREN, HEALTH SCORE, DAN PROGRESS BAR */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-xs font-extrabold text-gray-900 mb-4">Tren Budget Bulanan</h3>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataTrenBulanan} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" tick={{ fontSize: 9, fontWeight: 600, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fontWeight: 600, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 700 }} />
                  <Line type="monotone" dataKey="Target" stroke="#9ca3af" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="Realisasi" stroke="#8477e4" strokeWidth={3} dot={{ r: 3 }} activeDot={{ r: 5 }} animationDuration={1500} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-between text-center">
            <h3 className="text-xs font-extrabold text-gray-900 self-start">Budget Health Score</h3>
            <div className="relative flex items-center justify-center h-28 w-full mt-4 overflow-hidden">
              <ResponsiveContainer width="100%" height="200%">
                <PieChart>
                  <Pie data={dataGauge} startAngle={180} endAngle={0} innerRadius={55} outerRadius={70} dataKey="value" stroke="none" animationDuration={1200}>
                    <Cell fill="#4caf50" />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute bottom-2 flex flex-col items-center">
                <span className="text-2xl font-black text-gray-900">87</span>
                <span className="text-[10px] font-bold text-gray-400">/100</span>
              </div>
            </div>
            <div className="pb-2">
              <h4 className="text-xs font-extrabold text-[#4caf50]">Sangat Baik 😊</h4>
              <p className="text-[10px] text-gray-400 font-medium mt-1 max-w-[180px]">Budget kamu dikelola dengan baik! Pertahankan konsistensimu.</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h3 className="text-xs font-extrabold text-gray-900 mb-3">Progress Alokasi</h3>
            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-700">Kebutuhan (50%)</span>
                  <span className="text-[#8477e4]">85%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#8477e4] h-full rounded-full" style={{ width: '85%' }} />
                </div>
                <p className="text-[9px] text-gray-400 font-medium text-right">Rp 1.275.000 / Rp 1.500.000</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-700">Keinginan (30%)</span>
                  <span className="text-[#ffb224]">87%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#ffb224] h-full rounded-full" style={{ width: '87%' }} />
                </div>
                <p className="text-[9px] text-gray-400 font-medium text-right">Rp 787.000 / Rp 900.000</p>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-gray-700">Tabungan (20%)</span>
                  <span className="text-[#4caf50]">67%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4caf50] h-full rounded-full" style={{ width: '67%' }} />
                </div>
                <p className="text-[9px] text-gray-400 font-medium text-right">Rp 400.000 / Rp 600.000</p>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER: INSIGHT AI DAN PENJELASAN METODE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#f2eefd] rounded-3xl border-2 border-[#8477e4] p-5 flex items-center gap-5 shadow-sm">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
              <img src="/gambar/robotdada.png" alt="AI Icon" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#453c8a]">Insight AI</h4>
              <p className="text-[11px] text-[#7a72bc] mt-0.5 leading-relaxed font-semibold">
                Pengeluaran pada alokasi <span className="font-black text-[#8477e4]">Keinginan</span> telah mencapai 87% dari batas bulanan. 
                Disarankan mengurangi pengeluaran non-prioritas agar alokasi tetap seimbang dan target tabunganmu tercapai lebih optimal!
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <h4 className="text-xs font-extrabold text-gray-900 mb-2">Tentang Metode 50-30-20</h4>
            <div className="space-y-2 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="px-1.5 py-0.5 rounded bg-[#f0eaff] text-[#8477e4]">50%</span>
                <span className="text-gray-500">Kebutuhan pokok dan penting</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#ffb224]">30%</span>
                <span className="text-gray-500">Keinginan dan kenyamanan hidup</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <span className="px-1.5 py-0.5 rounded bg-[#ecfdf5] text-[#4caf50]">20%</span>
                <span className="text-gray-500">Tabungan dan investasi</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Budget;