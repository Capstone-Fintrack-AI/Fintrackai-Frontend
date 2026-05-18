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
  const [activeMenu, setActiveMenu] = useState("Beranda");

  return (
    <div className="min-h-screen bg-[#f8f6ff] font-poppins relative overflow-hidden flex selection:bg-[#8477e4]/20">
      
      {/* =========================================
          BACKGROUND TEMA LANDING PAGE
      ========================================= */}
      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(#d1d5db 1px, transparent 1px);
          background-size: 30px 30px;
        }
        .color-bubble { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(120px); opacity: 0.5; z-index: 0; }
        .bubble-1 { width: 500px; height: 500px; background: #e0d4fc; bottom: -10%; left: -5%; }
        .bubble-2 { width: 400px; height: 400px; background: #fce4ec; top: 20%; right: -5%; }
        .bubble-3 { width: 300px; height: 300px; background: #e0f2fe; bottom: 30%; left: 40%; }
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        .animate-bubble-img { animation: float 6s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bg-grid-pattern absolute inset-0 opacity-40"></div>
        <div className="color-bubble bubble-1"></div>
        <div className="color-bubble bubble-2"></div>
        <div className="color-bubble bubble-3"></div>
        <div className="absolute inset-0 overflow-hidden">
          <img src="/gambar/bubble.png" className="absolute top-[-5%] left-[-2%] w-[350px] opacity-60 animate-bubble-img" alt="bubble" />
          <img src="/gambar/bubble.png" className="absolute top-[35%] right-[-5%] w-[250px] opacity-40 animate-bubble-img" style={{animationDelay: '2s'}} alt="bubble" />
          <img src="/gambar/bubble.png" className="absolute bottom-[-5%] left-[15%] w-[300px] opacity-50 animate-bubble-img" style={{animationDelay: '4s'}} alt="bubble" />
        </div>
      </div>

      {/* =========================================
          1. SIDEBAR (KIRI)
      ========================================= */}
      <div className="w-64 bg-white border-r border-[#f0f0f0] px-6 py-8 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative">
        <div className="flex flex-col items-center mb-10">
          <img src="/gambar/logo.png" className="w-16 mb-2" alt="Logo" />
          <span className="font-bold text-lg tracking-tight text-gray-900 text-center">FinTrack AI</span>
        </div>

        <nav className="relative flex-grow font-medium flex flex-col gap-4">
          <div 
            className="absolute left-0 w-full h-[52px] bg-[#f0eaff] rounded-2xl shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ 
              transform: `translateY(${
                ["Beranda", "Transaksi", "Budget", "Goals", "AI", "Laporan"].indexOf(activeMenu) * 68
              }px)` 
            }}
          ></div>

          {[
            { n: "Beranda", img: "/gambar/beranda.png", path: "/beranda" },
            { n: "Transaksi", img: "/gambar/transaksi.png", path: "/transaksi" },
            { n: "Budget", img: "/gambar/budget.png", path: "/budget" },
            { n: "Goals", img: "/gambar/goals.png", path: "/goals" },
            { n: "AI", img: "/gambar/ai.png", path: "/ai" },
            { n: "Laporan", img: "/gambar/laporan.png", path: "/laporan" }
          ].map((item) => (
            <div 
              key={item.n} 
              onClick={() => { setActiveMenu(item.n); navigate(item.path); }} 
              className={`relative z-10 flex items-center gap-4 cursor-pointer px-3.5 h-[52px] rounded-2xl transition-colors duration-300 ${
                activeMenu === item.n 
                ? 'text-[#8477e4] font-bold' 
                : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              <img 
                src={item.img} 
                className={`w-6 h-6 object-contain transition-all duration-300 ${activeMenu !== item.n ? 'grayscale opacity-70' : ''}`} 
                alt={item.n} 
              />
              <span className="text-sm">{item.n}</span>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-100 pt-6 space-y-4 font-medium relative z-10 bg-white">
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
      </div>

      {/* =========================================
          2. MAIN CONTENT (KANAN)
      ========================================= */}
      <div className="flex-1 p-8 md:p-10 z-10 relative overflow-y-auto h-screen">
        
        {/* HEADER */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Halo, Shifa Anjani ! 👋</h1>
            <div className="flex items-center gap-1.5 text-[11px] font-bold bg-[#e8f5e9] text-[#4caf50] px-3 py-1.5 rounded-lg border border-[#4caf50]/20">
              <i className="fas fa-check-circle"></i> Status : Hemat
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
        <div className="grid grid-cols-12 gap-6 items-stretch">
          
          {/* KOLOM KIRI (7/12) - INI YANG TADI DIV-NYA HILANG! SEKARANG UDAH AMAN! */}
          <div className="col-span-12 xl:col-span-7 flex flex-col gap-6">
            
            {/* HERO CARD */}
            <div className="relative bg-[#ede7fdf2] rounded-3xl mt-12 pr-6 md:pr-8 flex items-center shadow-sm border border-[#e8dffd] min-h-[130px] py-5 pl-[120px] md:pl-[140px] shrink-0">
              <img src="/gambar/robotsapa.png" className="absolute -left-2 bottom-0 w-36 md:w-[160px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] z-10" alt="Robot Hero" />
              <div className="bg-white px-6 py-4 rounded-2xl flex-1 border border-white shadow-sm relative z-0">
                <p className="text-sm font-bold text-gray-800 leading-relaxed">
                  Ayo kelola keuangan bulan <span className="font-extrabold text-black">Mei</span> mu bersama Fintrack AI!
                </p>
              </div>
            </div>

            {/* RINGKASAN KEUANGAN */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shrink-0">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* TOTAL SALDO */}
                <div className="bg-[#F8F6FF] border-2 border-[#EAE8FD] p-6 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:border-[#8477e4]/20 transition-all">
                  <div className="flex items-center justify-center gap-3 mb-5 w-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(132,119,228,0.4)] border border-[#8477e4]/10">
                      <img src="/gambar/totalsaldo.png" className="w-6 h-6 object-contain" alt="Ikon Saldo" />
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-tight">Total Saldo</span>
                  </div>
                  <p className="text-[20px] font-black text-[#8477e4] tracking-tight leading-none mb-4">Rp 3.250.000</p>
                  <p className="text-[10px] text-gray-500 font-medium max-w-[150px] leading-relaxed">Sisa saldo yang bisa digunakan</p>
                </div>

                {/* PEMASUKAN */}
                <div className="bg-[#F1FAF2] border-2 border-[#E1F3E5] p-6 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:border-[#4caf50]/20 transition-all">
                  <div className="flex items-center justify-center gap-3 mb-5 w-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(76,175,80,0.4)] border border-[#4caf50]/10">
                      <img src="/gambar/pemasukan.png" className="w-6 h-6 object-contain" alt="Ikon Pemasukan" />
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-tight">Pemasukan</span>
                  </div>
                  <p className="text-[20px] font-black text-[#4caf50] tracking-tight leading-none mb-4">Rp 5.000.000</p>
                  <p className="text-[10px] text-gray-500 font-medium max-w-[150px] leading-relaxed">Total uang masuk bulan ini</p>
                </div>

                {/* PENGELUARAN */}
                <div className="bg-[#FFF5F5] border-2 border-[#FDEAEB] p-6 rounded-[2rem] flex flex-col items-center text-center shadow-sm hover:border-[#F44336]/20 transition-all">
                  <div className="flex items-center justify-center gap-3 mb-5 w-full">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(244,67,54,0.4)] border border-[#F44336]/10">
                      <img src="/gambar/pengeluaran.png" className="w-6 h-6 object-contain" alt="Ikon Pengeluaran" />
                    </div>
                    <span className="text-sm font-bold text-gray-800 tracking-tight">Pengeluaran</span>
                  </div>
                  <p className="text-[20px] font-black text-[#F44336] tracking-tight leading-none mb-4">Rp 1.750.000</p>
                  <p className="text-[10px] text-gray-500 font-medium max-w-[150px] leading-relaxed">Total uang keluar bulan ini</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between bg-[#EAE8FD] p-4 px-6 rounded-2xl hover:bg-[#E2DFFC] transition-all cursor-pointer group shadow-sm">
                <p className="text-xs font-bold text-gray-700">Pantau riwayat transaksimu setiap bulan!</p>
                <div className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center shadow-sm group-hover:translate-x-1 transition-all">
                  <i className="fas fa-chevron-right text-white text-xs"></i>
                </div>
              </div>
            </div>

            {/* SMART BUDGETING (Ditambahkan Banner Insight di bawahnya agar tidak berongga) */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-900">Smart Budgeting</h3>
                <button className="text-[10px] font-bold text-gray-400 flex items-center gap-1.5 border border-gray-100 px-3 py-1.5 rounded-lg hover:text-[#8477e4] transition-all">
                  Detail Lengkap <i className="fas fa-plus"></i>
                </button>
              </div>
              
              <div className="flex flex-col justify-start space-y-6">
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
                          <p className="text-xs font-bold text-gray-900">{item.n} <span className="text-gray-400 font-normal">({item.p})</span></p>
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

              {/* BANNER MINI INSIGHT (Otomatis ngisi ruang bawah biar rata) */}
              <div className="mt-auto pt-6">
                <div className="bg-[#f2eefd] rounded-2xl p-4 flex items-start gap-3 border border-[#e8dffd] shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <i className="fas fa-lightbulb text-[#8477e4] text-xs"></i>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-[#453c8a]">Mini Insight Bulan Ini</h4>
                    <p className="text-[9px] text-[#7a72bc] mt-1 leading-relaxed font-medium">
                      Bagus sekali! Alokasi <span className="font-bold text-[#8477e4]">Kebutuhan</span> kamu masih terkendali. Awasi terus pengeluaran <span className="font-bold text-[#8477e4]">Keinginan</span> agar tidak lewat batas ya!
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* KOLOM KANAN (5/12) */}
          <div className="col-span-12 xl:col-span-5 flex flex-col gap-6">
            
            {/* INSIGHT AI - DESAIN BARU (BORDER BIRU) */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col shrink-0">
              <h3 className="text-base font-extrabold text-gray-900 mb-4">Insight AI</h3>
              <div className="relative bg-[#f2eefd] rounded-3xl border-2 border-[#3b82f6] p-5 pr-[110px] md:pr-[130px] min-h-[110px] flex flex-col justify-center shadow-sm">
                <div className="space-y-3 relative z-10">
                  <p className="text-[11px] font-medium text-gray-700 leading-relaxed">
                    Shifa, Pengeluaran kamu di kategori "Keinginan" hampir mencapai batas.
                  </p>
                  <p className="text-[11px] font-bold text-gray-900 leading-relaxed">
                    Coba tahan dulu ya, biar tabungan tetap aman.
                  </p>
                </div>
                <img 
                  src="/gambar/robotlaptop.png" 
                  className="absolute -right-4 -bottom-3 w-28 md:w-[130px] object-contain drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] z-20" 
                  alt="Robot AI" 
                />
              </div>
              <div className="mt-4 flex items-center justify-between bg-[#f8f9fb] p-4 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all border border-gray-50">
                <div>
                  <h4 className="text-[11px] font-extrabold text-gray-900 mb-1">Tips hari ini</h4>
                  <p className="text-[10px] font-medium text-gray-500">Catat setiap pengeluaran kecilmu, bisa bantu kamu lebih hemat!</p>
                </div>
                <i className="fas fa-chevron-right text-gray-300 text-xs ml-2"></i>
              </div>
            </div>

            {/* ALOKASI KEUANGAN */}
            <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col shrink-0">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-base font-bold text-gray-900">Alokasi Keuangan <span className="text-xs font-normal text-gray-400">(50 - 30 - 20)</span></h3>
                <div className="flex items-center gap-1.5 bg-[#EAE5FB] px-4 py-2 rounded-xl text-xs font-bold text-gray-900 cursor-pointer">
                  Bulan Ini <i className="fas fa-chevron-down text-[#8477e4]"></i>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center justify-between w-full gap-6">
                  <div className="w-36 h-36 relative flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#f4f6f8" strokeWidth="5.5"></circle>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#85D69E" strokeWidth="5.5" strokeDasharray="48 100" strokeDashoffset="0" strokeLinecap="round"></circle>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#FCD166" strokeWidth="5.5" strokeDasharray="28 100" strokeDashoffset="-50" strokeLinecap="round"></circle>
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#B88FF5" strokeWidth="5.5" strokeDasharray="18 100" strokeDashoffset="-80" strokeLinecap="round"></circle>
                    </svg>
                  </div>

                  <div className="flex-1 space-y-5">
                    {[
                      { n: "Kebutuhan (50%)", p: "45% Terpakai", v: 1200000, c: "#85D69E" },
                      { n: "Keinginan (30%)", p: "25% Terpakai", v: 750000, c: "#FCD166" },
                      { n: "Tabungan (20%)", p: "10% Terpakai", v: 500000, c: "#B88FF5" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-3.5 h-3.5 rounded-full" style={{backgroundColor: item.c}}></div>
                          <div>
                            <p className="text-xs font-bold text-gray-900">{item.n}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">{item.p}</p>
                          </div>
                        </div>
                        <p className="text-xs font-bold text-gray-900">Rp {item.v.toLocaleString('id-ID')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-bold bg-[#e8f5e9] text-[#4caf50] px-5 py-2.5 rounded-xl shadow-[0_2px_10px_rgba(76,175,80,0.1)]">
                  <div className="w-4 h-4 bg-[#4caf50] rounded-full flex items-center justify-center text-white text-[8px]">
                    <i className="fas fa-check"></i>
                  </div>
                  Masih Aman
                </div>
              </div>
            </div>

            {/* QUICK ACTION */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm shrink-0">
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
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center relative flex-1 flex flex-col justify-center">
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