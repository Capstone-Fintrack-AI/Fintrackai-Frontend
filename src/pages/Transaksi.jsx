import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Transaksi = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Transaksi");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [activePage, setActivePage] = useState(1);

  // Data Transaksi Dummy (Sesuai Figma)
  const dataTransaksi = [
    { tgl: "24 Mei 2024", kat: "Kebutuhan", desc: "Bayar Kos Mei 2024", nominal: -1200000, icon: "fa-home", color: "#8477e4", bg: "#f0eaff" },
    { tgl: "24 Mei 2024", kat: "Pemasukan", desc: "Gaji Bulanan", nominal: 5000000, icon: "fa-arrow-down", color: "#4caf50", bg: "#e8f5e9" },
    { tgl: "23 Mei 2024", kat: "Keinginan", desc: "Beli Boba Chatime", nominal: -45000, icon: "fa-glass-martini-alt", color: "#FCD166", bg: "#fff9e6" },
    { tgl: "22 Mei 2024", kat: "Kebutuhan", desc: "Belanja di Alfamart", nominal: -78500, icon: "fa-shopping-cart", color: "#8477e4", bg: "#f0eaff" },
    { tgl: "21 Mei 2024", kat: "Tabungan", desc: "Transfer ke Tabungan", nominal: -500000, icon: "fa-piggy-bank", color: "#F44336", bg: "#fff5f5" },
    { tgl: "20 Mei 2024", kat: "Keinginan", desc: "Nonton Bioskop", nominal: -60000, icon: "fa-film", color: "#FCD166", bg: "#fff9e6" },
    { tgl: "19 Mei 2024", kat: "Pemasukan", desc: "Isi Pulsa", nominal: -25000, icon: "fa-arrow-down", color: "#4caf50", bg: "#e8f5e9" },
    { tgl: "18 Mei 2024", kat: "Pemasukan", desc: "Freelance Project", nominal: 750000, icon: "fa-arrow-down", color: "#4caf50", bg: "#e8f5e9" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6ff] font-poppins relative overflow-hidden flex selection:bg-[#8477e4]/20">
      
      {/* =========================================
          BACKGROUND (SAMA DENGAN BERANDA)
      ========================================= */}
      <style>{`
        .bg-grid-pattern { background-image: radial-gradient(#d1d5db 1px, transparent 1px); background-size: 30px 30px; }
        .color-bubble { position: absolute; border-radius: 50%; pointer-events: none; filter: blur(120px); opacity: 0.5; z-index: 0; }
        .bubble-1 { width: 500px; height: 500px; background: #e0d4fc; bottom: -10%; left: -5%; }
        .bubble-2 { width: 400px; height: 400px; background: #fce4ec; top: 20%; right: -5%; }
        .bubble-3 { width: 300px; height: 300px; background: #e0f2fe; bottom: 30%; left: 40%; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="bg-grid-pattern absolute inset-0 opacity-40"></div>
        <div className="color-bubble bubble-1"></div>
        <div className="color-bubble bubble-2"></div>
        <div className="color-bubble bubble-3"></div>
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
          {/* Slider Ungu */}
          <div 
            className="absolute left-0 w-full h-[52px] bg-[#f0eaff] rounded-2xl shadow-sm transition-transform duration-500"
            style={{ transform: `translateY(${["Beranda", "Transaksi", "Budget", "Goals", "AI", "Laporan"].indexOf(activeMenu) * 68}px)` }}
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
              className={`relative z-10 flex items-center gap-4 cursor-pointer px-3.5 h-[52px] rounded-2xl transition-all ${activeMenu === item.n ? 'text-[#8477e4] font-bold' : 'text-gray-400 hover:text-gray-900'}`}
            >
              <img src={item.img} className={`w-6 h-6 object-contain transition-all ${activeMenu !== item.n ? 'grayscale opacity-70' : ''}`} alt={item.n} />
              <span className="text-sm">{item.n}</span>
            </div>
          ))}
        </nav>

        <div className="border-t border-gray-100 pt-6 space-y-4 font-medium relative z-10 bg-white">
          <div className="flex items-center gap-4 cursor-pointer p-3.5 rounded-2xl text-gray-400 hover:text-gray-900 transition-all">
            <img src="/gambar/pengaturan.png" className="w-6 h-6 object-contain grayscale opacity-70" alt="Setting" />
            <span className="text-sm">Pengaturan</span>
          </div>
          <div onClick={() => navigate('/login')} className="flex items-center gap-4 cursor-pointer p-3.5 rounded-2xl text-gray-400 hover:text-red-500 transition-all">
            <img src="/gambar/logout.png" className="w-6 h-6 object-contain grayscale opacity-70" alt="Logout" />
            <span className="text-sm">Logout</span>
          </div>
        </div>
      </div>

      {/* =========================================
          2. MAIN CONTENT (KANAN)
      ========================================= */}
      <div className="flex-1 p-8 md:p-10 z-10 relative overflow-y-auto h-screen">
        
        {/* HEADER TRANSAKSI */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Transaksi</h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">Kelola semua pemasukan dan pengeluaranmu</p>
          </div>
          <div className="flex items-center gap-4">
             <button className="flex items-center gap-2 bg-white border-2 border-gray-100 px-5 py-2.5 rounded-2xl text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-sm transition-all">
               <i className="fas fa-camera text-[#8477e4]"></i> Scan Struk
             </button>
             <button className="flex items-center gap-2 bg-[#8477e4] px-6 py-2.5 rounded-2xl text-xs font-bold text-white hover:bg-[#7466d3] shadow-md transition-all">
               Catat Transaksi <i className="fas fa-plus"></i>
             </button>
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm ml-2 cursor-pointer">
               <i className="fas fa-user text-[#8477e4]"></i>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
          
          {/* KOLOM TABEL (KIRI - 8/12) */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            
            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-64">
                <input type="text" placeholder="Cari Transaksi..." className="w-full bg-[#f8f9fb] px-4 py-2 rounded-xl text-xs outline-none border border-transparent focus:border-[#8477e4]/20" />
                <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              </div>
              <div className="flex items-center gap-2">
                {["Semua", "Pemasukan", "Pengeluaran"].map((f) => (
                  <button 
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeFilter === f ? 'bg-[#8477e4] text-white shadow-md' : 'bg-[#f8f9fb] text-gray-500 hover:bg-gray-100'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                 <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-[#8477e4]"></div> Kebutuhan
                 </span>
                 <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-[#FCD166]"></div> Keinginan
                 </span>
                 <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-[#F44336]"></div> Tabungan
                 </span>
              </div>
            </div>

            {/* TABEL RIWAYAT TRANSAKSI */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#fcfcff] border-b border-gray-50">
                  <tr>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Tanggal</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Kategori</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">Keterangan</th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest text-right">Nominal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dataTransaksi.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#fafbff] transition-all group cursor-pointer">
                      <td className="px-6 py-5 text-xs font-bold text-gray-600">{item.tgl}</td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs shadow-sm border border-white" style={{ backgroundColor: item.bg }}>
                             <i className={`fas ${item.icon}`} style={{ color: item.color }}></i>
                          </div>
                          <span className="text-xs font-bold text-gray-800">{item.kat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xs font-medium text-gray-500">{item.desc}</td>
                      <td className={`px-6 py-5 text-sm font-black text-right ${item.nominal > 0 ? 'text-[#4caf50]' : 'text-[#F44336]'}`}>
                        {item.nominal > 0 ? '+' : ''} Rp {Math.abs(item.nominal).toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="p-6 flex justify-center items-center gap-3 bg-[#fcfcff] border-t border-gray-50">
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white"><i className="fas fa-chevron-left text-[10px]"></i></button>
                {[1, 2, 3, "...", 10].map((p, i) => (
                  <button 
                    key={i}
                    onClick={() => typeof p === 'number' && setActivePage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${activePage === p ? 'bg-[#8477e4] text-white' : 'text-gray-400 hover:bg-white'}`}
                  >
                    {p}
                  </button>
                ))}
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white"><i className="fas fa-chevron-right text-[10px]"></i></button>
              </div>
            </div>
          </div>
          {/* =========================================
              3. KOLOM KANAN (PERSIS FIGMA!!)
          ========================================= */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
            
            {/* KARTU SCAN STRUK / NOTA (IDENTIK FIGMA) */}
            <div className="bg-white p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(132,119,228,0.05)] border border-gray-100 flex flex-col space-y-6 relative overflow-hidden">
              
              {/* Judul & Badge AI */}
              <div className="flex justify-between items-start mb-1 shrink-0 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">Scan Struk / Nota</h3>
                    <span className="bg-[#ede7fdf2] text-[#8477e4] text-[10px] font-black px-3 py-1 rounded-full border border-[#8477e4]/20 shadow-sm">AI</span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-[240px]">
                    Foto struk belanja untuk catat otomatis dengan AI
                  </p>
                </div>
              </div>

              {/* Box Upload Bergaris Putus-Putus */}
              <div className="border-2 border-dashed border-[#d1c8f3] bg-[#f9f6ff] rounded-[2rem] p-8 flex flex-col items-center text-center space-y-6 flex-1 justify-center relative z-10 hover:border-[#8477e4]/50 transition-all duration-300">
                <img src="/gambar/robothp.png" alt="Robot Upload" className="w-[100px] object-contain animate-float" />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-700 tracking-tight">Upload atau ambil foto struk</p>
                  <p className="text-[10px] font-medium text-gray-400">PNG, JPG maks. 5MB</p>
                </div>
                <button className="bg-gradient-to-r from-[#8477e4] to-[#7466d3] text-white px-8 py-3.5 rounded-2xl flex items-center gap-3.5 text-xs font-black shadow-lg hover:translate-y-[-2px] transition-all duration-300">
                  <i className="fas fa-camera text-base"></i>
                  Ambil Foto
                </button>
              </div>

              {/* Keterangan Bawah Ikon Bintang */}
              <div className="flex items-center gap-3 bg-[#f4f1fe] p-4.5 px-5 rounded-2xl border-2 border-[#d1c8f3]/20 shadow-sm relative z-10">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                   <i className="fas fa-star text-[9px] text-[#8477e4]"></i>
                </div>
                <p className="text-[10px] font-bold text-[#7a72bc] tracking-tight">AI akan membaca detail dan mengisi form untukmu!</p>
              </div>
            </div>

            {/* KARTU TIPS AI (IDENTIK FIGMA) */}
            <div className="bg-white p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(132,119,228,0.05)] border border-gray-100 flex flex-col relative overflow-hidden">
               {/* Ikon Bohlam */}
               <div className="flex items-center gap-4.5 mb-7 shrink-0 relative z-10">
                  <div className="w-11 h-11 bg-[#fffbe6] rounded-xl flex items-center justify-center border-2 border-[#ffec99] shadow-md">
                     <i className="fas fa-lightbulb text-2xl text-[#fab005]"></i>
                  </div>
                  <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Tips AI</h3>
               </div>

               {/* Bubble Pesan & Robot Nongol */}
               <div className="bg-[#f8f9fb] p-6 pr-12 rounded-2xl flex items-center relative z-0 border border-gray-50">
                  <p className="text-[11px] font-medium text-gray-700 leading-relaxed max-w-[230px]">
                    Gunakan scan struk untuk menghemat waktu dan menghindari salah ketik. AI akan bantu kamu mencatat dengan akurat!
                  </p>
                  {/* === AREA PERUBAHAN ROBOT === */}
                  <img 
                    src="/gambar/robothewo.png" 
                    alt="Robot Tips" 
                    className="absolute -right-6 -bottom-6 w-[150px] object-contain animate-float z-10" 
                  />
                </div>

               {/* Paginasi Empat Titik */}
               <div className="mt-8 flex justify-center items-center gap-2.5 relative z-10">
                  <div className="w-2.5 h-2.5 bg-[#8477e4] rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaksi;