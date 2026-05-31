import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Pengaturan = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState({
    nama: "Shifa Anjani Desha",
    email: "sanjani462@gmail.com",
    password: "••••••••",
    profilePic: null,
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Pengaturan");
  const [expandedItem, setExpandedItem] = useState(null);

  const [inputNama, setInputNama] = useState(userData.nama);
  const [inputEmail, setInputEmail] = useState(userData.email);
  const [inputPasswordBaru, setInputPasswordBaru] = useState("");
  const [previewFoto, setPreviewFoto] = useState(null);

  const [appLanguage, setAppLanguage] = useState("Bahasa Indonesia");
  const [appTheme, setAppTheme] = useState("FinTrack Purple");
  const [appFontSize, setAppFontSize] = useState("Sedang");

  const toggleAccordion = (itemKey) => {
    setExpandedItem(expandedItem === itemKey ? null : itemKey);
  };
  const handleSaveAllProfile = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      nama: inputNama,
      email: inputEmail,
      profilePic: previewFoto || userData.profilePic,
      password: inputPasswordBaru !== "" ? "••••••••" : userData.password,
    });
    setInputPasswordBaru("");
    alert("Perubahan profil berhasil disimpan");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="h-screen bg-[#f8f6ff] font-poppins flex overflow-hidden selection:bg-[#8477e4]/20">
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

      <div className="flex-1 flex flex-col h-full overflow-hidden z-10 relative">
        <header className="flex justify-between items-center px-10 pt-8 pb-4 bg-transparent">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
            <p className="text-sm text-gray-500">
              Kelola akun dan preferensi aplikasi sesuai kebutuhanmu
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm overflow-hidden">
              {previewFoto || userData.profilePic ? (
                <img
                  src={previewFoto || userData.profilePic}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[#8477e4] text-sm">
                  <i className="fas fa-user"></i>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-grow px-10 pb-8 overflow-y-auto space-y-6 select-none">
          <div className="bg-gradient-to-r from-[#e3dafc] to-[#f3e7fa] rounded-[2.5rem] p-8 pr-12 shadow-[0_8px_30px_rgba(132,119,228,0.03)] border border-white/60 flex justify-between items-center relative overflow-hidden shrink-0 min-h-[160px] mb-6">
            <div className="space-y-2 z-10 max-w-[55%]">
              <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                Halo, {userData.nama.split(" ")[0]} !{" "}
                <span className="inline-block animate-bounce">👋</span>
              </h2>
              <p className="text-xs font-medium text-gray-500 leading-relaxed">
                Ubah informasi profil dan atur tema serta preferensi tampilan
                antarmuka aplikasimu secara instan di sini.
              </p>
            </div>
            <img
              src="/gambar/robotpengaturan.png"
              alt="Robot Banner"
              className="absolute right-4 bottom-0 w-[350px] h-auto object-contain z-30 opacity-90"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 pb-10">
            {/* col-span-12 membuat penuh, mx-auto + max-w-3xl membuat posisi di tengah & rapi */}
            <div className="col-span-12 mx-auto w-full max-w-3xl bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/70 h-fit flex flex-col space-y-6">
              {/* Header Kartu */}
              <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
                <div className="w-10 h-10 bg-[#f0eaff] text-[#8477e4] rounded-xl flex items-center justify-center text-sm shadow-sm">
                  <i className="fas fa-user-edit"></i>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-800">
                    Profil & Akun
                  </h3>
                  <p className="text-xs text-gray-400 font-normal">
                    Ubah informasi identitas dan keamanan akunmu
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSaveAllProfile}
                className="space-y-4 font-sans text-xs"
              >
                <div className="flex items-center gap-4 bg-[#fbfaff] p-3 rounded-2xl border border-gray-100/50">
                  <div className="w-14 h-14 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center overflow-hidden shrink-0">
                    {previewFoto || userData.profilePic ? (
                      <img
                        src={previewFoto || userData.profilePic}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <i className="fas fa-user text-[#8477e4] text-lg"></i>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[11px] font-bold text-gray-700">
                      Foto Profil Kamu
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current.click()}
                      className="bg-[#8477e4]/10 text-[#8477e4] px-3 py-1 rounded-lg font-bold hover:bg-[#8477e4]/20 transition-all text-[10px] w-fit"
                    >
                      Pilih Gambar
                    </button>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={inputNama}
                    onChange={(e) => setInputNama(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 px-3 py-2.5 rounded-xl font-semibold outline-none focus:border-[#8477e4]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    value={inputEmail}
                    onChange={(e) => setInputEmail(e.target.value)}
                    required
                    className="w-full bg-white border border-gray-200 px-3 py-2.5 rounded-xl font-semibold outline-none focus:border-[#8477e4]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
                    Ganti Password (Kosongkan jika tidak diubah)
                  </label>
                  <input
                    type="password"
                    placeholder="Masukkan password baru"
                    value={inputPasswordBaru}
                    onChange={(e) => setInputPasswordBaru(e.target.value)}
                    className="w-full bg-white border border-gray-200 px-3 py-2.5 rounded-xl font-semibold outline-none focus:border-[#8477e4]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#8477e4] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#7466d3] transition-all text-center text-xs mt-2"
                >
                  Simpan Perubahan Akun
                </button>
              </form>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#f5f1ff] to-[#fbf8fe] border border-[#e1daf9] p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgba(132,119,228,0.02)] flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden min-h-[100px]">
            <div className="flex items-center gap-5 z-10 flex-1">
              <div className="w-12 h-12 bg-white text-[#8477e4] rounded-2xl flex items-center justify-center text-lg shadow-[0_4px_20px_rgba(132,119,228,0.15)] shrink-0">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800 tracking-tight">
                  Keamanan dan kenyamananmu adalah prioritas kami
                </h4>
                <p className="text-xs text-gray-400 font-normal leading-relaxed max-w-xl">
                  FinTrack AI membantu mengelola keuanganmu dengan aman, mudah,
                  dan lebih cerdas setiap hari.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 z-10 shrink-0 w-full lg:w-auto justify-between lg:justify-end">
              <div className="relative h-24 w-36 hidden sm:block">
                <img
                  src="/gambar/robotkeamanan.png"
                  alt="Robot Security"
                  className="absolute bottom-[-6px] right-0 h-[110px] max-w-none object-contain object-bottom z-20"
                />
              </div>
              <button className="bg-gradient-to-r from-[#a294f9] to-[#8477e4] text-white px-6 py-3 rounded-xl text-xs font-bold shadow-[0_6px_20px_rgba(132,119,228,0.25)] hover:opacity-95 transition-all flex items-center gap-2 whitespace-nowrap">
                Pelajari Selengkapnya{" "}
                <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Pengaturan;
