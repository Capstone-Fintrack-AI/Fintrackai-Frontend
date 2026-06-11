import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const user = JSON.parse(localStorage.getItem("user"));
const userId = user?.id;


const Pengaturan = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    nama: "",
    email: "",
    password: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("Pengaturan");
  const [expandedItem, setExpandedItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputNama, setInputNama] = useState(userData.nama);
  const [inputEmail, setInputEmail] = useState(userData.email);
  const [inputPasswordBaru, setInputPasswordBaru] = useState("");
  const [saving, setSaving] = useState(false);

  const [appLanguage, setAppLanguage] = useState("Bahasa Indonesia");
  const [appTheme, setAppTheme] = useState("FinTrack Purple");
  const [appFontSize, setAppFontSize] = useState("Sedang");
  const [showPassword, setShowPassword] = useState(false);

  const toggleAccordion = (itemKey) => {
    setExpandedItem(expandedItem === itemKey ? null : itemKey);
  };
  const handleSaveAllProfile = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const formData = new FormData();

      formData.append("fullname", inputNama);
      formData.append("email", inputEmail);

      if (inputPasswordBaru.trim() !== "") {
        formData.append("password", inputPasswordBaru);
      }

      const response = await axios.put(
        `https://fintrackai-backend-1yz0.onrender.com/auth/user/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // alert("Profil berhasil diperbarui");
      toast.success("Profil berhasil diperbarui");

      const updatedUser = {
        ...user,
        fullname: inputNama,
        email: inputEmail,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setInputPasswordBaru("");

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Gagal memperbarui profil"
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchUser = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const response = await axios.get(
        `https://fintrackai-backend-1yz0.onrender.com/auth/user/${user.id}`
      );

      const data = response.data.data;

      setInputNama(data.fullname);
      setInputEmail(data.email);
      setInputPasswordBaru("");

      setUserData({
        nama: data.fullname,
        email: data.email,
      });


    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setInputPasswordBaru("");
    fetchUser();
  }, []);



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

        /* ===== RESPONSIVE FIXES - TIDAK MENGUBAH APAPUN, HANYA MENAMBAHKAN ===== */

        /* Header responsif di HP */
        @media (max-width: 767px) {
          .pengaturan-header {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
            padding-top: 1.25rem !important;
            padding-bottom: 0.75rem !important;
          }
          .pengaturan-header h1 {
            font-size: 1.3rem !important;
          }
          .pengaturan-header p {
            font-size: 0.7rem !important;
          }

          /* Main content padding di HP */
          .pengaturan-main {
            padding-left: 0.85rem !important;
            padding-right: 0.85rem !important;
            padding-bottom: 6rem !important;
          }

          /* Banner hero di HP */
          .pengaturan-banner {
            padding: 1.25rem 1rem !important;
            padding-right: 1rem !important;
            border-radius: 1.5rem !important;
            min-height: 120px !important;
            margin-bottom: 1rem !important;
          }
          .pengaturan-banner-text {
            max-width: 60% !important;
          }
          .pengaturan-banner h2 {
            font-size: 0.9rem !important;
          }
          .pengaturan-banner p {
            font-size: 0.65rem !important;
          }
          .pengaturan-banner-robot {
            width: 190px !important;
            right: -8px !important;
          }

          /* Kartu form profil di HP */
          .pengaturan-form-card {
            padding: 1.25rem !important;
            border-radius: 1.25rem !important;
          }

          /* Input fields di HP */
          .pengaturan-form-card input[type="text"],
          .pengaturan-form-card input[type="email"],
          .pengaturan-form-card input[type="password"] {
            font-size: 0.75rem !important;
            padding: 0.5rem 0.75rem !important;
          }

          /* Tombol simpan di HP */
          .pengaturan-form-card button[type="submit"] {
            font-size: 0.7rem !important;
            padding: 0.6rem !important;
          }

          /* Banner keamanan di HP */
          .pengaturan-security-banner {
            padding: 1rem !important;
            border-radius: 1.5rem !important;
            min-height: unset !important;
          }
          .pengaturan-security-banner h4 {
            font-size: 0.72rem !important;
          }
          .pengaturan-security-banner p {
            font-size: 0.65rem !important;
          }
          .pengaturan-security-robot {
            display: none !important;
          }
        }

        /* Tablet (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .pengaturan-header {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          .pengaturan-main {
            padding-left: 1.5rem !important;
            padding-right: 1.5rem !important;
          }
          .pengaturan-banner-robot {
            width: 260px !important;
          }
          .pengaturan-banner-text {
            max-width: 58% !important;
          }
        }
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

      <div className="flex-1 flex flex-col h-full overflow-hidden z-10 relative">
        <header className="pengaturan-header flex justify-between items-center px-10 pt-8 pb-4 bg-transparent">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Pengaturan</h1>
            <p className="text-sm text-gray-500">
              Kelola akun dan preferensi aplikasi sesuai kebutuhanmu
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Profil User yang bisa diklik */}
            <Link to="/pengaturan" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#8477e4] rounded-full flex items-center justify-center text-white shadow-sm cursor-pointer border border-gray-100 transition-transform duration-200 group-hover:scale-105">
                <i className="fas fa-user"></i>
              </div>
              <i className="fas fa-chevron-down text-gray-400 text-xs cursor-pointer"></i>
            </Link>
          </div>
        </header>

        <main className="pengaturan-main flex-grow px-10 pb-8 overflow-y-auto space-y-6 select-none">
          <div className="pengaturan-banner bg-gradient-to-r from-[#e3dafc] to-[#f3e7fa] rounded-[2.5rem] p-8 pr-12 shadow-[0_8px_30px_rgba(132,119,228,0.03)] border border-white/60 flex justify-between items-center relative overflow-hidden shrink-0 min-h-[160px] mb-6">
            <div className="pengaturan-banner-text space-y-2 z-10 max-w-[55%]">
              <h2 className="text-xl font-bold text-gray-800 tracking-tight flex items-center gap-2">
                Halo, {inputNama}
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
              className="pengaturan-banner-robot absolute right-4 bottom-0 w-[350px] h-auto object-contain z-30 opacity-90"
            />
          </div>

          <div className="grid grid-cols-12 gap-6 pb-10 w-full">
            {/* col-span-12 membuat penuh, mx-auto + max-w-3xl membuat posisi di tengah & rapi */}
            <div className="pengaturan-form-card col-span-12 w-full bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/70 h-fit flex flex-col space-y-6">
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

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Kosongkan jika tidak ingin mengubah password"
                      value={inputPasswordBaru}
                      onChange={(e) => setInputPasswordBaru(e.target.value)}
                      className="w-full bg-white border border-gray-200 px-3 py-2.5 pr-12 rounded-xl font-semibold outline-none focus:border-[#8477e4]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#8477e4] transition-colors"
                    >
                      <i
                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"
                          }`}
                      ></i>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#8477e4] text-white py-3 rounded-xl font-bold shadow-md hover:bg-[#7466d3] transition-all text-center text-xs mt-2 disabled:opacity-50"
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Perubahan Akun"}
                </button>
              </form>
            </div>
          </div>

          <div className="pengaturan-security-banner bg-gradient-to-r from-[#f5f1ff] to-[#fbf8fe] border border-[#e1daf9] p-6 rounded-[2.5rem] shadow-[0_8px_30px_rgba(132,119,228,0.02)] flex flex-col lg:flex-row justify-between items-center gap-6 relative overflow-hidden min-h-[100px]">
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
              <div className="pengaturan-security-robot relative h-24 w-36 hidden sm:block">
                <img
                  src="/gambar/robotkeamanan.png"
                  alt="Robot Security"
                  className="absolute bottom-[-6px] right-0 h-[110px] max-w-none object-contain object-bottom z-20"
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Pengaturan;
