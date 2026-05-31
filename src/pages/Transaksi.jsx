import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionModal from "./TransactionModal";
import ScanStrukModal from "./ScanStrukModal";
import { Link } from "react-router-dom";

const Transaksi = () => {
  const [dataTransaksi, setDataTransaksi] = useState([
    {
      tgl: "24 Mei 2024",
      kat: "Kebutuhan",
      desc: "Bayar Kos Mei 2024",
      nominal: -1200000,
    },
    {
      tgl: "24 Mei 2024",
      kat: "Pemasukan",
      desc: "Gaji Bulanan",
      nominal: 5000000,
    },
  ]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Transaksi");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  // Tambahkan state ini agar tidak error di bagian pagination
  const [activePage, setActivePage] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const dataTampil = dataTransaksi.filter((item) => {
    const matchesSearch = item.desc
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      activeFilter === "Semua"
        ? true
        : activeFilter === "Pemasukan"
          ? item.nominal > 0
          : item.nominal < 0;
    const matchesCategory =
      activeCategoryFilter === "Semua"
        ? true
        : item.kat === activeCategoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleProcessScan = (file) => {
    alert("Struk berhasil diunggah!");
  };

  useEffect(() => {
    if (location.state?.bukaModal) {
      setIsModalOpen(true);
    }
  }, [location]);

  return (
    <div className="h-screen bg-[#f8f6ff] font-poppins flex overflow-hidden">
      {/* MODAL */}
      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={(newData) => {
            setDataTransaksi((prev) => [...prev, newData]);
            setIsModalOpen(false);
          }}
        />
      )}

      {isScanModalOpen && (
        <ScanStrukModal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          onUpload={handleProcessScan}
        />
      )}

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
          3. AREA KONTEN UTAMA (KORIDOR KANAN - ISI TRANSAKSI)
      ========================================================= */}
      <div className="flex-1 flex flex-col h-full overflow-hidden z-10 relative">
        <header className="flex justify-between items-center px-10 pt-8 pb-4 bg-transparent">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Transaksi</h1>
            <p className="text-sm text-gray-500">
              Kelola semua pemasukan dan pengeluaranmu
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Tombol Scan Struk (Putih tulisan Ungu) */}
            <button
              onClick={() => setIsScanModalOpen(true)}
              className="flex items-center gap-2 bg-white text-[#8477e4] border-2 border-[#8477e4] px-4 py-2.5 rounded-2xl text-xs font-bold hover:bg-[#8477e4] hover:text-white shadow-sm transition-all duration-300"
            >
              <i className="fas fa-camera"></i> Scan Struk
            </button>

            {/* Tombol Catat Transaksi (Ungu tulisan Putih) */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-[#8477e4] text-white px-6 py-2.5 rounded-2xl text-xs font-bold hover:bg-[#7466d3] hover:shadow-lg transition-all duration-300"
            >
              Catat Transaksi <i className="fas fa-plus"></i>
            </button>

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
        </header>

        {/* Isi Grid Utama Transaksi (Scrollable) */}
        <main className="flex-grow px-10 pb-8 overflow-y-auto grid grid-cols-12 gap-8 progress-clean">
          {/* KOLOM TABEL (KIRI - 8/12) */}
          <div className="col-span-12 xl:col-span-8 space-y-6">
            {/* FILTER BAR */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-50 flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Cari Transaksi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#f8f9fb] px-4 py-2 rounded-xl text-xs outline-none border border-transparent focus:border-[#8477e4]/20"
                />
                <i className="fas fa-search absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              </div>
              <div className="flex items-center gap-2">
                {["Semua", "Pemasukan", "Pengeluaran"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${activeFilter === f ? "bg-[#8477e4] text-white shadow-md" : "bg-[#f8f9fb] text-gray-500 hover:bg-gray-100"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                {["Kebutuhan", "Keinginan", "Tabungan"].map((kat) => (
                  <button
                    key={kat}
                    onClick={() =>
                      setActiveCategoryFilter(
                        activeCategoryFilter === kat ? "Semua" : kat,
                      )
                    }
                    className={`flex items-center gap-2 text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all ${
                      activeCategoryFilter === kat
                        ? "bg-[#f0eaff] text-[#8477e4] border-[#8477e4]"
                        : "text-gray-400 bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        kat === "Kebutuhan"
                          ? "bg-[#8477e4]"
                          : kat === "Keinginan"
                            ? "bg-[#FCD166]"
                            : "bg-[#F44336]"
                      }`}
                    ></div>
                    {kat}
                  </button>
                ))}
              </div>
            </div>

            {/* TABEL RIWAYAT TRANSAKSI */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#fcfcff] border-b border-gray-50">
                  <tr>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                      Tanggal
                    </th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                      Kategori
                    </th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                      Keterangan
                    </th>
                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest text-right">
                      Nominal
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {dataTampil.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-all">
                      <td className="px-6 py-5 text-[12px] font-bold text-gray-500">
                        {item.tgl}
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-bold px-3 py-1 rounded-lg bg-gray-100 text-gray-600">
                          {item.kat}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[12px] font-bold text-gray-900">
                        {item.desc}
                      </td>
                      <td
                        className={`px-6 py-5 text-[12px] font-black text-right ${item.nominal < 0 ? "text-[#F44336]" : "text-[#4caf50]"}`}
                      >
                        {item.nominal.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* PAGINATION */}
              <div className="p-6 flex justify-center items-center gap-3 bg-[#fcfcff] border-t border-gray-50">
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white">
                  <i className="fas fa-chevron-left text-[10px]"></i>
                </button>
                {[1, 2, 3, "...", 10].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => typeof p === "number" && setActivePage(p)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${activePage === p ? "bg-[#8477e4] text-white" : "text-gray-400 hover:bg-white"}`}
                  >
                    {p}
                  </button>
                ))}
                <button className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-white">
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </button>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (KONTEN STRUK & TIPS AI) */}
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
            {/* KARTU SCAN STRUK / NOTA */}
            <div className="bg-white p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(132,119,228,0.05)] border border-gray-100 flex flex-col space-y-6 relative overflow-hidden">
              <div className="flex justify-between items-start mb-1 shrink-0 relative z-10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">
                      Scan Struk / Nota
                    </h3>
                    <span className="bg-[#ede7fdf2] text-[#8477e4] text-[10px] font-black px-3 py-1 rounded-full border border-[#8477e4]/20 shadow-sm">
                      AI
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-[240px]">
                    Foto struk belanja untuk catat otomatis dengan AI
                  </p>
                </div>
              </div>

              {/* Box Upload */}
              <div className="border-2 border-dashed border-[#d1c8f3] bg-[#f9f6ff] rounded-[2rem] p-8 flex flex-col items-center text-center space-y-6 flex-1 justify-center relative z-10 hover:border-[#8477e4]/50 transition-all duration-300">
                <img
                  src="/gambar/robothp.png"
                  alt="Robot Upload"
                  className="w-[100px] object-contain animate-bubble-img"
                />
                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-700 tracking-tight">
                    Upload atau ambil foto struk
                  </p>
                  <p className="text-[10px] font-medium text-gray-400">
                    PNG, JPG maks. 5MB
                  </p>
                </div>
                <button
                  onClick={() => setIsScanModalOpen(true)}
                  className="bg-gradient-to-r from-[#8477e4] to-[#7466d3] text-white px-8 py-3.5 rounded-2xl flex items-center gap-3.5 text-xs font-black shadow-lg hover:translate-y-[-2px] transition-all duration-300"
                >
                  <i className="fas fa-camera text-base"></i>
                  Scan Struck
                </button>
              </div>

              <div className="flex items-center gap-3 bg-[#f4f1fe] p-4.5 px-5 rounded-2xl border-2 border-[#d1c8f3]/20 shadow-sm relative z-10">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                  <i className="fas fa-star text-[9px] text-[#8477e4]"></i>
                </div>
                <p className="text-[10px] font-bold text-[#7a72bc] tracking-tight">
                  AI akan membaca detail dan mengisi form untukmu!
                </p>
              </div>
            </div>

            {/* KARTU TIPS AI */}
            <div className="bg-white p-7 rounded-[2.5rem] shadow-[0_4px_24px_rgba(132,119,228,0.05)] border border-gray-100 flex flex-col relative overflow-hidden">
              <div className="flex items-center gap-4.5 mb-7 shrink-0 relative z-10">
                <div className="w-11 h-11 bg-[#fffbe6] rounded-xl flex items-center justify-center border-2 border-[#ffec99] shadow-md">
                  <i className="fas fa-lightbulb text-2xl text-[#fab005]"></i>
                </div>
                <h3 className="text-base font-extrabold text-gray-900 tracking-tight">
                  Tips AI
                </h3>
              </div>

              <div className="bg-[#f8f9fb] p-6 rounded-2xl flex items-center relative z-0 border border-gray-50 min-h-[120px]">
                <p className="text-[11px] font-medium text-gray-700 leading-relaxed max-w-[170px] relative z-10">
                  Gunakan scan struk untuk menghemat waktu dan menghindari salah
                  ketik. AI akan bantu kamu mencatat dengan akurat!
                </p>
                <img
                  src="/gambar/robothewo.png"
                  alt="Robot Tips"
                  className="absolute -right-6 -bottom-6 w-[150px] object-contain animate-bubble-img z-20"
                />
              </div>

              {/* Pagination Titik */}
              <div className="mt-8 flex justify-center items-center gap-2.5 relative z-10">
                <div className="w-2.5 h-2.5 bg-[#8477e4] rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transaksi;
