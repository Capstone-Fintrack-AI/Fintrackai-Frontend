import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Komponen Bar Animasi
const AnimatedProgressBar = ({ value, maxValue, color }) => {
  const [width, setWidth] = useState(0);
  const percentage = (value / maxValue) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage > 100 ? 100 : percentage), 150);
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8f6ff] font-poppins relative overflow-hidden flex selection:bg-[#8477e4]/20">
      
      {/* BACKGROUND BUBBLE HALUS */}
      <style>{`
        .color-bubble { position: fixed; border-radius: 50%; z-index: 1; pointer-events: none; filter: blur(120px); opacity: 0.5; }
        .bubble-1 { width: 500px; height: 500px; background: #e0d4fc; bottom: -10%; left: -5%; }
        .bubble-2 { width: 400px; height: 400px; background: #fce4ec; top: 20%; right: -5%; }
      `}</style>
      <div className="color-bubble bubble-1"></div>
      <div className="color-bubble bubble-2"></div>

      {/* =========================================
          1. SIDEBAR (KIRI)
      ========================================= */}
      <div className="w-64 bg-white border-r border-[#f0f0f0] px-6 py-8 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col items-center mb-10">
          <img src="/gambar/logo.png" className="w-16 mb-2" alt="Logo" />
          <span className="font-bold text-lg tracking-tight text-gray-900 text-center">FinTrack AI</span>
        </div>

        {/* Menu Sidebar pakai Gambar Asli */}
        <nav className="space-y-4 flex-grow font-medium">
          {[
            { n: "Beranda", img: "/gambar/beranda.png", active: true },
            { n: "Transaksi", img: "/gambar/transaksi.png" },
            { n: "Budget", img: "/gambar/budget.png" },
            { n: "Goals", img: "/gambar/goals.png" },
            { n: "AI", img: "/gambar/ai.png" },
            { n: "Laporan", img: "/gambar/laporan.png" }
          ].map(item => (
            <div 
              key={item.n} 
              className={`flex items-center gap-4 cursor-pointer p-3.5 rounded-2xl transition-all ${
                item.active 
                ? 'bg-[#f0eaff] text-[#8477e4] font-bold shadow-sm' 
                : 'text-gray-400 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <img 
                src={item.img} 
                className={`w-6 h-6 object-contain ${!item.active ? 'grayscale opacity-70' : ''}`} 
                alt={item.n} 
              />
              <span className="text-sm">{item.n}</span>
            </div>
          ))}
        </nav>

        {/* Bagian Bawah Sidebar */}
        <div className="border-t border-gray-100 pt-6 space-y-4 font-medium">
          <div className="flex items-center gap-4 cursor-pointer p-3.5 rounded-2xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
            <img src="/gambar/pengaturan.png" className="w-6 h-6 object-contain grayscale opacity-70" alt="Setting" />
            <span className="text-sm">Pengaturan</span>
          </div>
          <div 
            onClick={() => navigate('/login')} 
            className="flex items-center gap-4 cursor-pointer p-3.5 rounded-2xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
          >
            <img src="/gambar/logout.png" className="w-6 h-6 object-contain grayscale opacity-70" alt="Logout" />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div> {/* <-- Ini adalah tag penutup yang kemungkinan hilang tadi! */}

      {/* =========================================
          2. MAIN CONTENT (KANAN)
      ========================================= */}
      <div className="flex-1 p-8 md:p-10 z-10 relative overflow-y-auto h-screen">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Halo, Shifa Anjani ! 👋</h1>
            <div className="flex items-center gap-1.5 text-[11px] font-bold bg-[#e8f5e9] text-[#4caf50] px-3 py-1.5 rounded-lg border border-[#4caf50]/20">
              <i className="fas fa-check-circle"></i>
              Status : Hemat
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative w-72">
              <input type="text" placeholder="" className="w-full bg-white px-5 py-2.5 rounded-xl text-sm outline-none shadow-sm border border-gray-100" />
              <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#8477e4] shadow-sm cursor-pointer relative border border-gray-100">
              <i className="fas fa-bell"></i>
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            </div>
            <div className="w-10 h-10 bg-[#8477e4] rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer border border-gray-100">
              <i className="fas fa-user"></i>
            </div>
            <i className="fas fa-chevron-down text-gray-400 text-xs cursor-pointer"></i>
          </div>
        </header>

        {/* GRID UTAMA LAYOUT */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* KOLOM KIRI (7/12) */}
          <div className="col-span-12 xl:col-span-7 space-y-6">
            
            {/* HERO CARD (Warna Pastel, Robot Kiri) */}
            <div className="bg-[#f0ebfc] rounded-3xl p-6 flex items-center gap-6 shadow-sm border border-[#e8dffd]">
              <img src="/gambar/robotsapa.png" className="w-28 h-28 object-contain drop-shadow-md" alt="Robot Hero" />
              <div className="bg-white/60 backdrop-blur-sm px-6 py-4 rounded-2xl flex-1 border border-white">
                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  Ayo kelola keuangan bulan Mei mu bersama Fintrack AI!
                </p>
              </div>
            </div>

            {/* RINGKASAN KEUANGAN */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              {/* Header Section */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Ringkasan Keuangan</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Kondisi keuangan kamu hari ini terlihat <span className="text-[#4caf50] font-bold">stabil</span>
                  </p>
                </div>
                <button className="text-xs font-bold text-[#8477e4] flex items-center gap-2 hover:bg-[#f4f3ff] transition-all bg-white border-2 border-[#8477e4]/20 px-4 py-2 rounded-xl shadow-sm">
                  Catat Transaksi <i className="fas fa-plus"></i>
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Total Saldo - Purple Focus */}
                <div className="bg-white border-2 border-[#8477e4]/10 p-5 rounded-3xl flex flex-col items-center text-center hover:border-[#8477e4]/30 transition-all shadow-sm">
                  <div className="flex items-center gap-2 mb-4 bg-[#f0eaff] text-[#8477e4] px-4 py-2 rounded-2xl shadow-[0_0_15px_rgba(132,119,228,0.2)]">
                    <i className="fas fa-wallet text-sm"></i>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest">Total Saldo</span>
                  </div>
                  <p className="text-2xl font-black text-[#8477e4]">Rp 3.250.000</p>
                  <p className="text-[10px] text-gray-400 mt-3 font-medium">Sisa saldo yang bisa digunakan</p>
                </div>

                {/* Pemasukan - Green Focus */}
                <div className="bg-white border-2 border-[#4caf50]/10 p-5 rounded-3xl flex flex-col items-center text-center hover:border-[#4caf50]/30 transition-all shadow-sm">
                  <div className="flex items-center gap-2 mb-4 bg-[#e8f5e9] text-[#4caf50] px-4 py-2 rounded-2xl shadow-[0_0_15px_rgba(76,175,80,0.2)]">
                    <i className="fas fa-arrow-down text-sm"></i>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest">Pemasukan</span>
                  </div>
                  <p className="text-2xl font-black text-[#4caf50]">+ Rp 5.000.000</p>
                  <p className="text-[10px] text-gray-400 mt-3 font-medium">Total uang masuk bulan ini</p>
                </div>

                {/* Pengeluaran - Red Focus */}
                <div className="bg-white border-2 border-[#f44336]/10 p-5 rounded-3xl flex flex-col items-center text-center hover:border-[#f44336]/30 transition-all shadow-sm">
                  <div className="flex items-center gap-2 mb-4 bg-[#ffebee] text-[#f44336] px-4 py-2 rounded-2xl shadow-[0_0_15px_rgba(244,67,54,0.2)]">
                    <i className="fas fa-arrow-up text-sm"></i>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest">Pengeluaran</span>
                  </div>
                  <p className="text-2xl font-black text-[#f44336]">- Rp 1.750.000</p>
                  <p className="text-[10px] text-gray-400 mt-3 font-medium">Total uang keluar bulan ini</p>
                </div>

              </div>

              {/* Footer Banner */}
              <div className="mt-6 flex items-center justify-between bg-[#f4f3ff] p-4 rounded-2xl border-2 border-[#8477e4]/5 hover:bg-[#eceaff] transition-all cursor-pointer group shadow-inner">
                <p className="text-xs font-semibold text-gray-600">Pantau riwayat transaksimu setiap bulan!</p>
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-all">
                  <i className="fas fa-chevron-right text-[#8477e4] text-xs"></i>
                </div>
              </div>
            </div>

            {/* SMART BUDGETING */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-900">Smart Budgeting</h3>
                <button className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 border border-gray-100 px-3 py-1.5 rounded-lg hover:text-[#8477e4]">
                  Detail Lengkap <i className="fas fa-plus"></i>
                </button>
              </div>
              
              <div className="space-y-5">
                {[
                  { n: "Kebutuhan", p: "50%", d: "Makanan, Kos Kosan, dll", v: 1200000, max: 1500000, c: "#8477e4", i: "fas fa-home", used: "80%" },
                  { n: "Keinginan", p: "30%", d: "Jajan, Nonton, dll", v: 750000, max: 900000, c: "#4caf50", i: "fas fa-shopping-bag", used: "83%" },
                  { n: "Tabungan", p: "20%", d: "Dana Darurat, Investasi, dll", v: 500000, max: 1000000, c: "#f44336", i: "fas fa-piggy-bank", used: "50%" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-sm" style={{backgroundColor: item.c}}>
                      <i className={item.i}></i>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-end mb-1">
                        <div>
                          <p className="text-xs font-bold text-gray-900">{item.n} <span className="text-gray-500 font-normal">({item.p})</span></p>
                          <p className="text-[9px] text-gray-400 mt-0.5">{item.d}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold text-gray-900">Rp {item.v.toLocaleString('id-ID')} <span className="text-gray-400 font-normal">/ {item.max.toLocaleString('id-ID')}</span></p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <AnimatedProgressBar value={item.v} maxValue={item.max} color={item.c} />
                        </div>
                        <p className="text-[9px] font-bold" style={{color: item.c}}>{item.used} Terpakai</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (5/12) */}
          <div className="col-span-12 xl:col-span-5 space-y-6">
            
            {/* ALOKASI KEUANGAN (DONUT CHART) */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-900">Alokasi Keuangan <span className="text-xs font-normal text-gray-400">(50 - 30 - 20)</span></h3>
                <div className="flex items-center gap-1.5 bg-[#f4f3ff] px-3 py-1.5 rounded-lg text-[10px] font-bold text-gray-600 cursor-pointer">
                  Bulan Ini <i className="fas fa-chevron-down text-[#8477e4]"></i>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 relative">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#f4f6f8" strokeWidth="8"></circle>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#8477e4" strokeWidth="8" strokeDasharray="20 80" strokeDashoffset="0"></circle>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#ffeb3b" strokeWidth="8" strokeDasharray="30 70" strokeDashoffset="-20"></circle>
                    <circle cx="18" cy="18" r="14" fill="none" stroke="#4caf50" strokeWidth="8" strokeDasharray="50 50" strokeDashoffset="-50"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-1 text-[8px] font-bold bg-[#e8f5e9] text-[#4caf50] px-2 py-1 rounded-full">
                      <i className="fas fa-check"></i> Masih Aman
                    </div>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  {[
                    { n: "Kebutuhan (50%)", p: "45% Terpakai", v: 1200000, c: "#4caf50" },
                    { n: "Keinginan (30%)", p: "25% Terpakai", v: 750000, c: "#ffeb3b" },
                    { n: "Tabungan (20%)", p: "10% Terpakai", v: 500000, c: "#8477e4" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: item.c}}></div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-900">{item.n}</p>
                          <p className="text-[9px] text-gray-500">{item.p}</p>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-gray-900">Rp {item.v.toLocaleString('id-ID')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* INSIGHT AI */}
            <div className="bg-[#f2eefd] rounded-3xl p-6 flex gap-4 shadow-sm border border-[#e8dffd]">
              <div className="flex-1 space-y-2.5">
                <h4 className="text-sm font-bold text-gray-900">Insight AI</h4>
                <p className="text-[11px] leading-relaxed text-gray-700">Shifa, Pengeluaran kamu di kategori "Keinginan" hampir mencapai batas.</p>
                <p className="text-[11px] font-bold text-gray-900">Coba tahan dulu ya, biar tabungan tetap aman.</p>
                <div className="border-t border-gray-300/30 pt-2 mt-2">
                  <p className="text-[10px] font-bold text-gray-900">Tips hari ini</p>
                  <p className="text-[9px] text-gray-600 mt-0.5">Catat setiap pengeluaran kecilmu, bisa bantu kamu lebih hemat!</p>
                </div>
              </div>
              <img src="/gambar/robotlaptop.png" className="w-20 h-20 object-contain self-center" alt="Robot AI" />
            </div>

            {/* QUICK ACTION */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Quick Action</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f0eaff] py-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 border border-[#e8dffd]">
                  <i className="fas fa-file-invoice text-xl text-[#8477e4]"></i>
                  <span className="text-[10px] font-bold text-[#8477e4]">Catat Transaksi</span>
                </div>
                <div className="bg-[#fafafa] py-4 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 border border-gray-200">
                  <i className="fas fa-expand text-xl text-gray-800"></i>
                  <span className="text-[10px] font-bold text-gray-800">Scan Struck</span>
                </div>
              </div>
            </div>

            {/* GOALS SETTING */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center relative">
              <h3 className="text-sm font-bold text-gray-900 text-left mb-4">Goals Setting</h3>
              <div className="flex items-center justify-center gap-6 mb-4">
                <i className="fas fa-chevron-left text-gray-400 cursor-pointer hover:text-gray-900"></i>
                <img src="/gambar/goals-laptop.png" className="w-12 h-12 object-contain" alt="Laptop Goals" />
                <i className="fas fa-chevron-right text-gray-400 cursor-pointer hover:text-gray-900"></i>
              </div>
              <AnimatedProgressBar value={60} maxValue={100} color="#8477e4" />
              <p className="text-[9px] font-bold text-gray-600 mt-2 text-left">60% Menuju mimpi kamu!</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Beranda;