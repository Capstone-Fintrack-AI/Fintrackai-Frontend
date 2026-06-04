import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDashboard, setActiveDashboard] = useState(1);
  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div className="text-gray-800 antialiased font-poppins selection:bg-[#8477e4] selection:text-white overflow-x-hidden relative">
      {/* --- CSS CUSTOM (ANIMASI & STYLING LENGKAP) --- */}
      <style>{`
        html { scroll-behavior: smooth; }
        
        .bg-grid-pattern {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background-image: radial-gradient(#d1d5db 1px, transparent 1px);
          background-size: 40px 40px; opacity: 0.5; z-index: -2; pointer-events: none;
        }

        @keyframes float-bubble {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .color-bubble { 
          will-change: transform; position: fixed; border-radius: 50%; 
          z-index: -1; pointer-events: none; animation: float-bubble 15s infinite ease-in-out; 
        }

        /* Bubble Warna Warni (Gradient) */
        .bubble-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(132, 119, 228, 0.4) 0%, rgba(132, 119, 228, 0) 70%); top: -10%; left: -10%; filter: blur(40px); }
        .bubble-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(229, 132, 238, 0.45) 0%, rgba(229, 132, 238, 0) 70%); top: 25%; right: -10%; animation-delay: -5s; filter: blur(50px); }
        .bubble-3 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(161, 140, 209, 0.35) 0%, rgba(161, 140, 209, 0) 70%); bottom: 10%; left: -15%; animation-delay: -10s; filter: blur(60px); }
        .bubble-4 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(206, 102, 219, 0.3) 0%, rgba(206, 102, 219, 0) 70%); bottom: 25%; right: 5%; animation-delay: -7s; filter: blur(45px); }

        .animate-bubble-img { animation: float-bubble 15s infinite ease-in-out; }

        /* Fitur Card Styling */
        .card-fitur-presisi { 
          background: white; border: 2px solid #f3f4f6; border-radius: 24px; 
          padding: 40px 24px; display: flex; flex-direction: column; 
          align-items: center; text-align: center; min-height: 400px; 
          transition: all 0.4s ease; margin: 20px 0;
        }
        @media (min-width: 768px) {
          .card-fitur-presisi { padding: 50px 30px; min-height: 420px; }
        }
        .swiper-slide-active .card-fitur-presisi { 
          background: #8477e4 !important; color: white !important; 
          transform: scale(1.05); border-color: transparent; 
          box-shadow: 0 25px 50px -12px rgba(132, 119, 228, 0.5);
        }
        @media (min-width: 768px) {
          .swiper-slide-active .card-fitur-presisi { transform: scale(1.1); }
        }
        .swiper-slide-active .card-fitur-presisi p { color: rgba(255, 255, 255, 0.9) !important; }

        /* Team Styling */
        .team-item { 
          position: relative; border-radius: 30px; overflow: hidden; 
          aspect-ratio: 3/4; transition: all 0.5s ease;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }
        .team-item:hover { transform: translateY(-10px); }
        .team-text-overlay { 
          position: absolute; inset: 0; 
          background: linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%); 
          display: flex; flex-direction: column; justify-content: flex-end; padding: 30px; 
        }

        /* Dashboard Flex */
        .dashboard-item { transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1); cursor: pointer; }
        @media (min-width: 768px) {
          .dashboard-item.active { flex: 5; border: 5px solid #8477e4; filter: grayscale(0%); transform: scale(1.02); }
          .dashboard-item:not(.active) { flex: 1; filter: grayscale(100%) opacity(40%); }
        }
        @media (max-width: 767px) {
          .dashboard-item.active { border: 4px solid #8477e4; filter: grayscale(0%); }
          .dashboard-item:not(.active) { filter: grayscale(50%) opacity(70%); }
        }
        
        .faq-content { max-height: 0; overflow: hidden; transition: all 0.4s ease-in-out; }
        .faq-active .faq-content { max-height: 200px; padding-bottom: 20px; }
      `}</style>

      {/* --- LAYER BACKGROUND (HIDDEN DARI KLIK AGAR TOMBOL AMAN) --- */}
      <div className="bg-grid-pattern"></div>

      {/* Bubble Gradasi Bulat */}
      <div className="color-bubble bubble-1"></div>
      <div className="color-bubble bubble-2"></div>
      <div className="color-bubble bubble-3"></div>

      {/* Gambar Bubble.png Melayang */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <img
          src="/gambar/bubble.png"
          className="absolute top-[-10%] left-[-5%] w-[250px] md:w-[400px] opacity-50 animate-bubble-img"
          alt=""
        />
        <img
          src="/gambar/bubble.png"
          className="absolute top-[40%] right-[-10%] w-[200px] md:w-[300px] opacity-40 animate-bubble-img"
          style={{ animationDelay: "2s" }}
          alt=""
        />
        <img
          src="/gambar/bubble.png"
          className="absolute bottom-[-10%] left-[10%] w-[220px] md:w-[350px] opacity-30 animate-bubble-img"
          style={{ animationDelay: "4s" }}
          alt=""
        />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full top-4 md:top-6 z-50 flex justify-center px-4 sm:px-6">
        <div
          className={`w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-xl px-5 md:px-8 py-3 md:py-4 flex flex-col md:flex-row justify-between items-center border border-white/50 transition-all duration-300 ${
            isMenuOpen ? "rounded-3xl" : "rounded-full"
          }`}
        >
          {/* Header Mobile & Logo Desktop */}
          <div className="flex w-full md:w-auto justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src="/gambar/logo.png"
                className="w-8 h-8 md:w-10 md:h-10"
                alt="Logo"
              />
              <span className="font-bold text-lg md:text-2xl tracking-tight text-[#1e1b4b]">
                FinTrack AI
              </span>
            </div>

            {/* Tombol Hamburger (Khusus HP) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#1e1b4b] hover:text-[#8477e4] focus:outline-none p-1"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Deretan Menu & Tombol Daftar (Merespons isMenuOpen di HP) */}
          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row items-center w-full md:w-auto gap-4 md:gap-5 lg:gap-8 mt-4 md:mt-0 pb-2 md:pb-0 font-semibold text-gray-600 text-sm lg:text-base`}
          >
            <ul className="flex flex-col md:flex-row gap-4 lg:gap-8 w-full md:w-auto text-center">
              <li>
                <a
                  href="#beranda"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-1 md:py-0 hover:text-[#8477e4] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-1 md:py-0 hover:text-[#8477e4] transition-colors"
                >
                  Tentang
                </a>
              </li>
              <li>
                <a
                  href="#fitur"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-1 md:py-0 hover:text-[#8477e4] transition-colors"
                >
                  Fitur
                </a>
              </li>
              <li>
                {/* Cari link navigasimu dan tambahkan class ini */}
                <a
                  href="#dashboard"
                  className="hidden md:block text-gray-600 hover:text-blue-600"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#tim"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-1 md:py-0 hover:text-[#8477e4] transition-colors"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full py-1 md:py-0 hover:text-[#8477e4] transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                navigate("/Register");
              }}
              className="bg-[#8477e4] text-white text-sm font-bold px-6 py-2.5 md:px-8 md:py-2.5 rounded-full shadow-lg hover:scale-105 transition-all w-full md:w-auto mt-2 md:mt-0"
            >
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO (ZOOMED) --- */}
      <section
        id="beranda"
        className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 relative overflow-visible"
      >
        {/* Container Utama untuk Text & Layouting */}
        <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          {/* KOLOM KIRI: Teks & Tombol */}
          <div className="space-y-5 md:space-y-6 z-10 text-center md:text-left">
            {/* Heading Utama */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e1b4b] leading-[1.2] md:leading-[1.15]">
              Kelola Keuangan <br className="hidden sm:inline" />
              Lebih Cerdas <br />
              Bersama <span className="text-[#8477e4]">FinTrack AI</span>
            </h1>

            {/* Paragraf Deskripsi */}
            <p className="text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0">
              Pantau pengeluaran, atur budget, capai goals, dan dapatkan insight
              AI untuk keputusan finansial yang lebih baik setiap hari.
            </p>

            {/* Grup Tombol */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => navigate("/register")}
                className="bg-[#8477e4] text-white text-xs sm:text-sm md:text-base font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full shadow-lg shadow-purple-500/30 hover:-translate-y-1 transition-transform flex items-center gap-2"
              >
                Mulai kelola keuangan <span>→</span>
              </button>
              <button className="bg-white/60 backdrop-blur-sm text-[#1e1b4b] text-xs sm:text-sm md:text-base font-bold px-5 py-3.5 sm:px-6 sm:py-4 rounded-full shadow-sm border border-white hover:bg-white transition-colors flex items-center gap-2 sm:gap-3">
                <div className="bg-purple-100 rounded-full p-1 sm:p-1.5 flex items-center justify-center shrink-0">
                  <span className="text-[#8477e4] text-[10px] sm:text-xs">
                    ▶
                  </span>
                </div>
                Lihat Demo <span>❯</span>
              </button>
            </div>

            {/* Deretan Fitur Mini */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4 md:pt-6 text-left">
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm p-2 rounded-2xl border border-white/40 md:bg-transparent md:p-0 md:border-none">
                <div className="w-8 h-8 rounded-full bg-[#f3edff] flex items-center justify-center text-base sm:text-xl shrink-0">
                  ✨
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1e1b4b] leading-tight">
                  Insight AI
                  <br />
                  Real-time
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm p-2 rounded-2xl border border-white/40 md:bg-transparent md:p-0 md:border-none">
                <div className="w-8 h-8 rounded-full bg-[#ffe4e6] flex items-center justify-center text-base sm:text-xl shrink-0">
                  🥧
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1e1b4b] leading-tight">
                  Pengelolaan
                  <br />
                  Budget
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm p-2 rounded-2xl border border-white/40 md:bg-transparent md:p-0 md:border-none">
                <div className="w-8 h-8 rounded-full bg-[#fce7f3] flex items-center justify-center text-base sm:text-xl shrink-0">
                  🎯
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1e1b4b] leading-tight">
                  Target
                  <br />
                  Tabungan
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm p-2 rounded-2xl border border-white/40 md:bg-transparent md:p-0 md:border-none">
                <div className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center text-base sm:text-xl shrink-0">
                  📊
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-[#1e1b4b] leading-tight">
                  Laporan
                  <br />
                  Lengkap
                </span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (Tampil normal di bawah teks khusus Mobile/Tablet) */}
          <div className="relative z-10 mt-6 md:mt-0 flex justify-center md:hidden w-full">
            <img
              src="/gambar/Home.png"
              alt="Home FinTrack AI"
              className="w-full max-w-sm sm:max-w-md object-contain drop-shadow-2xl"
            />
          </div>

          {/* Spacer kosong di Desktop agar grid kiri tidak melebar memenuhi layar */}
          <div className="hidden md:block w-full h-full pointer-events-none"></div>
        </div>

        {/* 🚀 GAMBAR MENTOK KANAN (Khusus Desktop: Keluar dari Container & Menempel ke Ujung Layar) */}
        <div className="hidden md:block absolute right-0 top-[45%] -translate-y-1/2 w-[44vw] max-w-[700px] lg:max-w-[800px] xl:max-w-[950px] z-10 overflow-visible">
          <img
            src="/gambar/Home.png"
            alt="Home FinTrack AI"
            className="w-full object-contain drop-shadow-2xl scale-105 lg:scale-115 xl:scale-125 origin-right"
          />
        </div>

        {/* BANNER STATISTIK (Bawah) */}
        <div className="container mx-auto mt-16 md:mt-24 z-10 px-2 sm:px-4">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-[28px] lg:rounded-full px-6 py-6 lg:px-12 lg:py-6 shadow-[0_10px_40px_-15px_rgba(132,119,228,0.2)] grid grid-cols-2 lg:flex lg:flex-row justify-between items-center gap-6 md:gap-8">
            {/* Item 1: Pengguna Aktif */}
            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto justify-start sm:justify-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)] shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#8477e4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-xl sm:text-2xl text-[#1e1b4b] leading-tight">
                  10K+
                </h4>
                <p className="text-xs sm:text-sm text-[#8477e4]/80 font-medium mt-0.5">
                  Pengguna Aktif
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-purple-100/50 hidden lg:block"></div>

            {/* Item 2: Transaksi Aman */}
            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto justify-start sm:justify-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)] shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#8477e4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-xl sm:text-2xl text-[#1e1b4b] leading-tight">
                  99%
                </h4>
                <p className="text-xs sm:text-sm text-[#8477e4]/80 font-medium mt-0.5">
                  Transaksi Aman
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-purple-100/50 hidden lg:block"></div>

            {/* Item 3: AI Analisis Cerdas */}
            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto justify-start sm:justify-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)] shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#8477e4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-xl sm:text-2xl text-[#1e1b4b] leading-tight">
                  AI
                </h4>
                <p className="text-xs sm:text-sm text-[#8477e4]/80 font-medium mt-0.5">
                  Analisis Cerdas
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-purple-100/50 hidden lg:block"></div>

            {/* Item 4: Bantuan 24/7 */}
            <div className="flex items-center gap-3 sm:gap-4 w-full lg:w-auto justify-start sm:justify-center">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)] shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#8477e4]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.168a2 2 0 11-2.658-2.658m7.824 2.168a2 2 0 11-2.658-2.658"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-xl sm:text-2xl text-[#1e1b4b] leading-tight">
                  24/7
                </h4>
                <p className="text-xs sm:text-sm text-[#8477e4]/80 font-medium mt-0.5">
                  Bantuan AI
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TENTANG KAMI (BIGGER) --- */}
      <section
        id="tentang"
        className="py-16 md:py-24 px-4 sm:px-6 md:px-12 lg:px-20"
      >
        <div className="w-full bg-gradient-to-br from-[#8477e4] to-[#e584ee] rounded-[32px] md:rounded-[50px] p-8 sm:p-12 md:p-20 lg:p-24 text-white shadow-3xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="w-full lg:max-w-2xl xl:max-w-3xl space-y-5 md:space-y-8 relative z-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
              Kendalikan Keuanganmu <br />
              <span className="text-white/70 italic text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
                dengan Insight Cerdas AI
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed md:leading-loose font-medium">
              Platform ini dirancang khusus untuk memastikan setiap rupiah yang
              kamu miliki bekerja secara optimal. Kami membawa teknologi masa
              depan ke dompetmu hari ini.
            </p>
          </div>
          <div className="relative lg:absolute lg:right-0 xl:right-10 lg:top-1/2 lg:-translate-y-1/2 scale-100 sm:scale-110 lg:scale-125 xl:scale-140 origin-center lg:origin-right flex justify-center z-10 mt-4 lg:mt-0">
            <img
              src="/gambar/hpfintrackai.png"
              alt="FinTrack AI Mobile App"
              className="w-64 sm:w-80 md:w-96 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* --- FITUR (FIXED STYLE) --- */}
      <section
        id="fitur"
        className="py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-20"
      >
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Kelola Keuangan Lebih Cerdas <br />
            <span className="bg-[#e584ee] text-white px-6 py-2 sm:px-10 sm:py-3 rounded-full inline-block mt-4 md:mt-6 shadow-xl italic text-2xl sm:text-4xl">
              Dengan AI
            </span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 30 },
              1024: { slidesPerView: 3, spaceBetween: 40 },
            }}
            className="pb-16 md:pb-20"
          >
            {[
              {
                t: "Financial Insight",
                i: "AI financial insight.png",
                d: "Dapatkan asisten pribadi cerdas yang menganalisis pola pengeluaranmu secara otomatis.",
              },
              {
                t: "Smart Budgeting",
                i: "smart budgeting.png",
                d: "Atur alokasi dana lebih mudah dengan metode 50/30/20 yang sudah teruji.",
              },
              {
                t: "Real-Time Tracking",
                i: "expense tracking.png",
                d: "Catat transaksi harian secara instan dan biarkan AI mengelompokkannya secara rapi.",
              },
              {
                t: "Health Score",
                i: "financial health score.png",
                d: "Ketahui skor kesehatan keuanganmu dengan parameter yang akurat.",
              },
              {
                t: "Interactive Chart",
                i: "interactive dashboard.png",
                d: "Visualisasi data yang cantik memudahkanmu memahami kondisi asetmu.",
              },
            ].map((item, index) => (
              <SwiperSlide key={index}>
                <div className="card-fitur-presisi">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 shadow-inner shrink-0">
                    <img
                      src={`/gambar/${item.i}`}
                      className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
                      alt={item.t}
                    />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-5">
                    {item.t}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-lg leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- DASHBOARD --- */}
      <section id="dashboard" className="hidden md:block py-24 px-6 md:px-20">
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">
          Experience Our Interface
        </h2>

        <div className="flex gap-4 h-[500px] max-w-7xl mx-auto">
          {[
            "berandatampilan.jpeg",
            "transaksitampilan.jpeg",
            "budgettampilan.jpeg",
            "goalstampilan.jpeg",
            "aitampilan.jpeg",
          ].map((img, idx) => (
            <div
              key={idx}
              onClick={() => setActiveDashboard(idx)}
              className={`transition-all duration-700 ease-in-out cursor-pointer rounded-[40px] shadow-2xl bg-white overflow-hidden flex items-center justify-center ${
                activeDashboard === idx
                  ? "flex-[4] p-6"
                  : "flex-[1] p-0 opacity-80 hover:opacity-100" // p-0 biar gambar mepet
              }`}
            >
              <img
                src={`/gambar/${img}`}
                className={`h-full w-full transition-all duration-700 ${
                  activeDashboard === idx
                    ? "object-contain" // Saat aktif, gambar muncul penuh
                    : "object-cover object-left" // Saat mengecil, gambar zoom & fokus ke kiri
                }`}
                alt={`Dashboard ${idx}`}
              />
            </div>
          ))}
        </div>
      </section>

      <div
        id="tim"
        className="py-16 md:py-24 font-poppins selection:bg-[#8477e4] selection:text-white px-4 sm:px-6 md:px-12 lg:px-20"
      >
        <style>{`
          #tim .swiper { padding: 30px 10px 50px 10px !important; overflow: visible !important; }
          @media (min-width: 768px) {
            #tim .swiper { padding: 50px 20px !important; }
          }
          .team-item { 
            position: relative; border-radius: 25px; overflow: hidden; 
            aspect-ratio: 3/4; cursor: grab; transition: all 0.5s ease;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15); border: 1px solid rgba(0,0,0,0.05);
          }
          .team-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
          .team-item:hover img { transform: scale(1.1); }
          .team-text-overlay { 
            position: absolute; inset: 0; 
            background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%); 
            display: flex; flex-direction: column; justify-content: flex-end; padding: 20px; 
          }
          @media (min-width: 768px) {
            .team-text-overlay { padding: 25px; }
          }
          .social-icon { width: 32px; height: 32px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(4px); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.9rem; transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.1); }
        `}</style>

        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold text-gray-900">
            Meet Our Team
          </h2>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".team-next",
              prevEl: ".team-prev",
            }}
            loop={true}
            speed={1000}
            spaceBetween={20}
            slidesPerView={1.3}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 2.5,
                centeredSlides: false,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: false,
              },
            }}
          >
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {[
                  { n: "Anisa", r: "Back-end Developer", i: "Anisa.png" },
                  {
                    n: "Shifa Anjani Desha",
                    r: "Front-end Developer",
                    i: "Shifa.jpeg",
                  },
                  {
                    n: "Mohammad El Abror Sholeh",
                    r: "AI Engineer",
                    i: "Abror.jpeg",
                  },
                  {
                    n: "Hamasah Fazal Aqsha",
                    r: "AI Engineer",
                    i: "Aqso.jpeg",
                  },
                  {
                    n: "Icha Aulia Putri",
                    r: "Data Scientist",
                    i: "Ichaa.png",
                  },
                  { n: "Nanda Hidayah", r: "Data Scientist", i: "Nanda.jpeg" },
                ].map((member, index) => (
                  <SwiperSlide key={`${loopIdx}-${index}`}>
                    <div className="team-item">
                      <img src={`/gambar/${member.i}`} alt={member.n} />
                      <div className="team-text-overlay">
                        <h3 className="text-white font-bold text-base sm:text-lg">
                          {member.n}
                        </h3>
                        <p className="text-white/80 text-xs sm:text-sm mb-3">
                          {member.r}
                        </p>
                        <div className="flex gap-2">
                          <div className="social-icon">
                            <i className="fab fa-instagram"></i>
                          </div>
                          <div className="social-icon">
                            <i className="fab fa-linkedin-in"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </React.Fragment>
            ))}
          </Swiper>

          <div className="flex justify-center gap-4 md:gap-6 mt-8 md:mt-12">
            <div className="team-prev cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#8477e4] hover:text-[#8477e4] transition-all relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </div>
            <div className="team-next cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#8477e4] hover:text-[#8477e4] transition-all relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <section id="faq" className="py-16 md:py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-20 text-gray-900">
          Any Questions?
        </h2>
        <div className="space-y-4 md:space-y-6">
          {[
            {
              q: "Apa itu FinTrack AI?",
              a: "FinTrack AI adalah platform manajemen keuangan digital pintar yang dirancang untuk membantu kamu mengontrol pengeluaran, mengatur budget otomatis, hingga menetapkan target tabungan. Dilengkapi dengan teknologi Insight Cerdas AI, aplikasi ini akan menganalisis kebiasaan finansialmu dan memberikan rekomendasi terbaik agar keuanganmu tetap sehat dan optimal setiap hari.",
            },
            {
              q: "Apakah data transaksi saya aman?",
              a: "Sangat aman. Keamanan privasi dan data transaksimu adalah prioritas utama kami. FinTrack AI menggunakan sistem keamanan berlapis dan enkripsi standar industri untuk memastikan bahwa seluruh riwayat transaksi, catatan saldo, dan data pribadi kamu tersimpan dengan aman serta tidak akan disalahgunakan oleh pihak mana pun.",
            },
            {
              q: "Berapa biaya langganannya?",
              a: "FinTrack AI bisa kamu gunakan secara Gratis untuk fitur-fitur dasar seperti pencatatan transaksi harian dan pembuatan budget sederhana. Namun, untuk menikmati fitur premium tanpa batas seperti analisis mendalam dari Insight AI, laporan keuangan kustom, dan pelacakan target tabungan tingkat lanjut kami menyediakan paket langganan premium dengan harga yang sangat ramah di kantong.",
            },
            {
              q: "Apakah bisa digunakan di Mobile?",
              a: "Tentu saja bisa! FinTrack AI mengusung desain yang sepenuhnya responsive. Kamu bisa mengakses dan menggunakannya dengan sangat nyaman melalui browser di smartphone (HP) kamu tanpa kehilangan keindahan tampilan maupun kelengkapan fiturnya, sama lancarnya seperti saat diakses lewat laptop atau desktop.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl p-5 md:p-6 shadow-sm border border-gray-100 transition-all duration-300 ${
                activeFaq === i ? "border-[#8477e4]" : "border-gray-100"
              }`}
            >
              <button
                className="w-full flex justify-between items-center text-left py-2"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <span className="text-lg md:text-xl font-bold text-gray-800 pr-4">
                  {item.q}
                </span>
                <i
                  className={`fas fa-chevron-down transition-transform duration-300 ${
                    activeFaq === i
                      ? "rotate-180 text-[#8477e4]"
                      : "text-gray-400"
                  }`}
                ></i>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeFaq === i
                    ? "max-h-96 opacity-100 mt-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 md:py-16 bg-white/80 border-t border-gray-100 px-6 md:px-20 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 justify-items-center">
          <div className="flex flex-col items-center space-y-4 md:space-y-6 max-w-xs md:max-w-sm">
            <div className="flex items-center gap-3 justify-center">
              <img
                src="/gambar/logo.png"
                className="w-10 md:w-12"
                alt="FinTrack AI Logo"
              />
              <span className="font-bold text-2xl md:text-3xl">
                FinTrack AI
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed text-base md:text-lg">
              Solusi manajemen keuangan modern untuk generasi masa kini. Cerdas,
              efisien, dan transparan.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bold text-lg md:text-xl mb-6 md:mb-8">
              Navigation
            </h4>
            <ul className="space-y-3 md:space-y-4 text-gray-500 text-base md:text-lg">
              <li>
                <a
                  href="#beranda"
                  className="hover:text-[#8477e4] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#tentang"
                  className="hover:text-[#8477e4] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#fitur"
                  className="hover:text-[#8477e4] transition-colors"
                >
                  Our Features
                </a>
              </li>
              <li>
                <a
                  href="#tim"
                  className="hover:text-[#8477e4] transition-colors"
                >
                  Meet the Team
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="hover:text-[#8477e4] transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center">
            <h4 className="font-bold text-lg md:text-xl mb-6 md:mb-8">
              Follow Us
            </h4>
            <div className="flex gap-6 text-2xl md:text-3xl text-gray-400 justify-center">
              <i className="fab fa-instagram hover:text-[#e584ee] cursor-pointer transition-colors"></i>
              <i className="fab fa-twitter hover:text-[#8477e4] cursor-pointer transition-colors"></i>
              <i className="fab fa-linkedin hover:text-blue-600 cursor-pointer transition-colors"></i>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 md:mt-20 pt-6 md:pt-8 border-t border-gray-100 text-gray-400 font-medium text-sm md:text-base">
          &copy; 2026 FinTrack AI. Coding Camp Team.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
