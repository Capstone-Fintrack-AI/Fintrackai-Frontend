import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AddGoalPopup from "./AddGoalPopup";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const Goals = () => {
  const [goals, setGoals] = useState([
    { name: "Laptop", allocation: 2000000, color: "#8b5cf6" },
    { name: "HP Baru", allocation: 1500000, color: "#f59e0b" },
  ]);
  const [initialBalance, setInitialBalance] = useState(1000000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Goals");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const pieData = goals.map((goal) => ({
    name: goal.name,
    value: goal.allocation,
    color: goal.color || "#8b5cf6",
  }));

  const lineData = goals.map((goal) => ({
    name: goal.name,
    value: goal.allocation,
  }));

  const navigate = useNavigate();

  // 2. Fungsi untuk menangani simpan data dari popup
  const handleAddGoal = (newGoal) => {
    console.log("Data yang masuk dari popup:", newGoal);
    // Simpan goal baru ke state
    setGoals((prev) => [...prev, newGoal]);

    // Kurangi saldo otomatis
    setInitialBalance((prev) => prev - newGoal.allocation);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-[#fcfaff] font-poppins text-gray-800 overflow-hidden relative">
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
          3. KONTEN UTAMA HALAMAN GOALS (Bisa di-scroll mandiri)
      ========================================================= */}
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 z-10 relative">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Goals</h1>
            <p className="text-sm text-gray-500">
              Atur dana tabunganmu untuk mencapai target keuangan yang kamu
              impikan.
            </p>
          </div>
          <div className="flex items-center gap-4">
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
        </div>

        {/* =========================================================
              BANNER DANA GOALS (ROBOT PRESISI MENYENTUH ATAS BAWAH)
            ========================================================= */}
        <div className="bg-[#EEE8FD] rounded-2xl border border-[#e9dff9] p-4 flex flex-row items-center justify-between gap-6 w-full h-[160px] shadow-sm relative overflow-hidden">
          {/* KIRI: Teks Judul & Deskripsi */}
          <div className="z-10 max-w-md text-center xl:text-left">
            {/* JUDUL: Menggunakan warna deep indigo/purple dan font yang lebih tegas */}
            <h4 className="text-2xl font-black text-[#3e3a94] flex items-center justify-center xl:justify-start mb-2 tracking-tight">
              Dana Goals
            </h4>

            {/* DESKRIPSI: Menggunakan warna ungu medium, dengan penekanan font-bold pada kategori alokasi */}
            <p className="text-sm font-medium text-[#685fbe] leading-relaxed">
              Atur dana tabungan mu untuk mencapai{" "}
              <span className="font-black text-[#3e3a94]">
                {" "}
                target keuangan
              </span>{" "}
              yang kamu impikan.
            </p>
          </div>

          {/* TENGAH: Maskot Robot (Menyentuh Atas & Bawah Container) */}
          <div className="z-10 w-40 xl:w-52 xl:self-stretch xl:-my-6 flex items-end justify-center flex-shrink-0">
            <img
              src="/gambar/robotgoals.png"
              alt="Robot Goals"
              className="w-full xl:h-full xl:w-auto object-contain object-bottom transform xl:scale-105 transition-transform"
            />
          </div>

          {/* KANAN: Blok Kartu Finansial & Tombol */}
          <div className="flex flex-col gap-3 z-10 w-full xl:w-auto">
            {/* Baris 3 Kartu */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              {/* Kartu 1: Total Tabungan */}
              <div className="bg-white py-2.5 px-4 rounded-xl border border-purple-50 shadow-sm flex items-center gap-3 flex-1 min-w-[180px] xl:min-w-[195px]">
                <div className="w-9 h-9 rounded-lg bg-[#f3f0ff] flex items-center justify-center text-[#8b5cf6] text-base flex-shrink-0">
                  <i className="fas fa-wallet"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1 whitespace-nowrap">
                    Total Tabungan{" "}
                    <span className="text-[9px] text-slate-300 font-normal">
                      (20%)
                    </span>
                  </p>
                  <p className="text-base font-extrabold text-[#1e1b4b] mt-0.5 whitespace-nowrap">
                    Rp 1.000.000
                  </p>
                </div>
              </div>

              {/* Kartu 2: Sudah Dialokasikan */}
              <div className="bg-white py-2.5 px-4 rounded-xl border border-orange-50 shadow-sm flex items-center gap-3 flex-1 min-w-[180px] xl:min-w-[195px]">
                <div className="w-9 h-9 rounded-lg bg-[#fff7ed] flex items-center justify-center text-[#f59e0b] text-base flex-shrink-0">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-[#f59e0b] whitespace-nowrap">
                    Sudah Dialokasikan
                  </p>
                  <p className="text-base font-extrabold text-[#f59e0b] mt-0.5 whitespace-nowrap">
                    Rp 800.000
                  </p>
                </div>
              </div>

              {/* Kartu 3: Tersedia */}
              <div className="bg-white py-2.5 px-4 rounded-xl border border-emerald-50 shadow-sm flex items-center gap-3 flex-1 min-w-[180px] xl:min-w-[195px]">
                <div className="w-9 h-9 rounded-lg bg-[#ecfdf5] flex items-center justify-center text-[#10b981] text-base flex-shrink-0">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-[#10b981] whitespace-nowrap">
                    Tersedia
                  </p>
                  <p className="text-base font-extrabold text-[#10b981] mt-0.5 whitespace-nowrap">
                    Rp 200.000
                  </p>
                </div>
              </div>
            </div>

            {/* Baris Tombol */}
            <div className="flex justify-center sm:justify-start">
              <button
                onClick={() => setIsPopupOpen(true)}
                className="bg-[#8477e4] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1.5 hover:bg-[#7365d1] transition-all w-full sm:w-[180px] xl:w-[195px]"
              >
                <i className="fas fa-plus text-[10px]"></i> Tambah Goals
              </button>
            </div>
          </div>
        </div>

        {/* SUMMARY CARDS (4 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {[
            {
              title: "Total Goals",
              value: "3",
              desc: "Semua tujuan keuanganmu",
              icon: "fa-bullseye",
              color: "text-[#8b5cf6]",
              bg: "bg-[#f3f0ff]",
            },
            {
              title: "Goals Aktif",
              value: "3",
              desc: "Sedang berjalan",
              icon: "fa-clipboard-check",
              color: "text-[#10b981]",
              bg: "bg-[#ecfdf5]",
            },
            {
              title: "Goals Selesai",
              value: "0",
              desc: "Telah tercapai",
              icon: "fa-award",
              color: "text-[#f59e0b]",
              bg: "bg-[#fff7ed]",
            },
            {
              title: "Dana Tersedia",
              value: "Rp 200.000",
              desc: "Belum dialokasikan",
              icon: "fa-check-circle",
              color: "text-[#8b5cf6]",
              bg: "bg-[#f3f0ff]",
            },
          ].map((card, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 relative z-10"
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${card.bg} ${card.color}`}
              >
                <i className={`fas ${card.icon}`}></i>
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500">
                  {card.title}
                </p>
                <p className="text-lg font-black text-[#1e1b4b]">
                  {card.value}
                </p>
                <p className="text-[10px] text-gray-400">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN CONTENT: LIST & INSIGHT (Grid 2:1) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Kiri: Daftar Goals Aktif */}
          <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col relative z-10">
            <h3 className="font-black text-[#1e1b4b] mb-6 text-lg">
              Daftar Goals Aktif
            </h3>

            {/* List Container */}
            <div className="space-y-6 flex-1">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  {/* Bagian Kiri: Gambar + Detail Teks */}
                  <div className="flex items-center gap-4 flex-1 min-w-[280px]">
                    {/* Placeholder Gambar Sesuai Figma */}
                    <div className="w-24 h-16 rounded-xl flex-shrink-0 border border-gray-100 overflow-hidden shadow-inner">
                      <img
                        src={goal.image}
                        alt={goal.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Detail Informasi */}
                    <div className="flex flex-col gap-0.5">
                      <h4 className="font-bold text-[#1e1b4b] text-sm">
                        {goal.name}
                      </h4>
                      <p className="text-[11px] text-gray-400 line-clamp-1">
                        {goal.desc}
                      </p>
                      {/* Badge Prioritas Sekarang Berada di Bawah */}
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md mt-1 w-max ${goal.bgBadge} ${goal.textBadge}`}
                      >
                        {goal.priority}
                      </span>
                    </div>
                  </div>

                  {/* Bagian Tengah: Informasi Progres Tabungan (Sejajar ke Samping) */}
                  <div className="flex flex-col gap-1 w-full sm:w-56 flex-shrink-0">
                    <div className="text-[11px] text-gray-400 font-medium">
                      <span className="font-bold text-[#1e1b4b]">
                        {/* Ubah 'goal.current' menjadi 'goal.allocation' */}
                        Rp {(goal.allocation || 0).toLocaleString("id-ID")}
                      </span>{" "}
                      /{/* Ubah 'goal.target' menjadi 'goal.targetPrice' */}
                      Rp {(goal.targetPrice || 0).toLocaleString("id-ID")}
                    </div>

                    {/* Progress Bar & Persentase Sejajar */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${goal.progress}%`,
                            backgroundColor: goal.color,
                          }}
                        ></div>
                      </div>
                      <span
                        className="text-[11px] font-bold w-8 text-right"
                        style={{ color: goal.color }}
                      >
                        {goal.progress}%
                      </span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-400">
                      {/* Hitung sisa secara otomatis di sini */}
                      Sisa Rp{" "}
                      {(goal.targetPrice - goal.allocation || 0).toLocaleString(
                        "id-ID",
                      )}
                    </p>
                  </div>

                  {/* Bagian Kanan: Aksi Edit & Hapus */}
                  <div className="flex gap-2 sm:ml-2 justify-end">
                    <button className="w-8 h-8 rounded-lg border border-purple-100 text-[#8b5cf6] flex items-center justify-center hover:bg-purple-50 transition shadow-sm">
                      <i className="fas fa-edit text-xs"></i>
                    </button>
                    <button className="w-8 h-8 rounded-lg border border-red-100 text-red-400 flex items-center justify-center hover:bg-red-50 transition shadow-sm">
                      <i className="fas fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Tombol Berubah Menjadi Solid Border Sesuai Figma */}
            <button className="w-full mt-6 py-2.5 border border-purple-200 text-[#8b5cf6] bg-white rounded-xl text-xs font-bold hover:bg-[#fcfbff] transition flex items-center justify-center gap-2 shadow-sm">
              <i className="fas fa-plus text-[10px]"></i> Tambah Goals
            </button>
          </div>

          {/* Kanan: Insight AI */}
          <div className="bg-[#EEE8FD] p-6 rounded-3xl border border-[#e0d6f9] shadow-sm flex flex-col relative z-10 overflow-visible">
            {/* Header dengan Maskot Robot AI */}
            <div className="flex justify-between items-center mb-6 relative">
              <h3 className="font-black text-[#1e1b4b] text-lg flex items-center gap-1.5">
                Insight AI <span className="text-[#8b5cf6] text-sm">✨</span>
              </h3>

              {/* Maskot Robot (Posisi mengapung di kanan atas) */}
              <div className="absolute -top-15 -right-4 z-20">
                <img
                  src="/gambar/robotide.png"
                  alt="Robot AI"
                  className="w-20 h-20 drop-shadow-lg object-contain"
                />
              </div>
            </div>

            {/* List Insight - Kartu Putih Bersih */}
            <div className="space-y-3 flex-1">
              {/* Kartu 1 */}
              <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center border border-white">
                <div className="w-10 h-10 rounded-full bg-[#f3f0ff] text-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-bullseye text-sm"></i>
                </div>
                <p className="text-[11px] leading-relaxed text-[#1e1b4b] font-medium">
                  Goal <span className="font-bold">"Laptop Asus Vivobook"</span>{" "}
                  telah mencapai <span className="font-bold">8%</span> dari
                  target. Dengan rata-rata penambahan dana saat ini, target
                  diperkirakan tercapai dalam{" "}
                  <span className="font-bold text-[#8b5cf6]">14 bulan</span>.
                </p>
              </div>

              {/* Kartu 2 */}
              <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center border border-white">
                <div className="w-10 h-10 rounded-full bg-[#fff7ed] text-[#f59e0b] flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-wallet text-sm"></i>
                </div>
                <p className="text-[11px] leading-relaxed text-[#1e1b4b] font-medium">
                  Dana tabungan yang belum dialokasikan masih sebesar{" "}
                  <span className="font-bold text-[#f59e0b]">Rp200.000</span>.
                  Kamu dapat mengalokasikannya ke Goal yang sedang
                  diprioritaskan.
                </p>
              </div>

              {/* Kartu 3 */}
              <div className="bg-white p-4 rounded-2xl shadow-sm flex gap-4 items-center border border-white">
                <div className="w-10 h-10 rounded-full bg-[#ecfdf5] text-[#10b981] flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line text-sm"></i>
                </div>
                <p className="text-[11px] leading-relaxed text-[#1e1b4b] font-medium">
                  Goal <span className="font-bold">"Buku Kuliah"</span> memiliki
                  progres paling cepat dibanding Goal lainnya. Pertahankan
                  konsistensimu!
                </p>
              </div>
            </div>

            {/* Tombol Lihat Rekomendasi */}
            <button className="w-full mt-6 py-3 border border-[#d1c4f5] text-[#8b5cf6] bg-white rounded-xl text-xs font-bold hover:bg-[#fcfbff] transition flex items-center justify-center gap-2 shadow-sm">
              Lihat Rekomendasi AI{" "}
              <span className="text-sm font-medium">→</span>
            </button>
          </div>
        </div>

        {/* CHARTS SECTION (Grid 1:2) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Distribusi Dana Goals */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
            <h3 className="font-black text-[#1e1b4b] mb-4">
              Distribusi Dana Goals
            </h3>
            <div className="h-40 w-full min-h-[160px] flex items-center justify-center relative overflow-hidden">
              {/* AREA CHART & TOTAL (Wadah utama harus relative agar absolute berfungsi) */}
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.length > 0 ? pieData : [{ value: 1 }]} // Fallback data agar tidak kosong
                    innerRadius={50}
                    outerRadius={70}
                    dataKey="value"
                  >
                    {pieData.length > 0 ? (
                      pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))
                    ) : (
                      <Cell fill="#e2e8f0" /> // Warna abu-abu saat data kosong
                    )}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* TEKS TOTAL (Absolute membuatnya melayang di tengah chart) */}
              <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-gray-400">
                  Total
                </span>
                <span className="text-xs font-black text-[#1e1b4b]">
                  Rp{" "}
                  {pieData
                    .reduce((acc, curr) => acc + curr.value, 0)
                    .toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* AREA LEGENDA */}
            <div className="flex flex-col gap-2 mt-4">
              {pieData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between text-xs font-medium"
                >
                  <span className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </span>
                  <span>Rp {(item.value || 0).toLocaleString("id-ID")}</span>
                </div>
              ))}
            </div>

            {/* STATUS EFISIENSI */}
            <div className="mt-6 pt-4 border-t border-gray-100 text-center">
              <p className="text-[10px] text-gray-400 uppercase">
                Status Efisiensi
              </p>
              <p className="text-emerald-500 font-bold">Optimal 🚀</p>
            </div>
          </div>

          {/* Progress Goals Line Chart */}
          <div className="xl:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col relative z-10 w-full min-w-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-black text-[#1e1b4b]">Progress Goals</h3>
              <div className="border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-[11px] font-bold text-gray-600 cursor-pointer">
                6 Bulan Terakhir{" "}
                <i className="fas fa-chevron-down text-[10px]"></i>
              </div>
            </div>

            {/* Bungkus ResponsiveContainer dengan div yang memiliki tinggi tetap */}
            <div className="w-full h-72 min-h-[288px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#f1f5f9"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />

                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
      {/* Pastikan sudah ada onSave={handleAddGoal} seperti ini */}
      <AddGoalPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        initialBalance={initialBalance}
        onSave={handleAddGoal}
      />
    </div>
  );
};

export default Goals;
