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
          padding: 50px 30px; display: flex; flex-direction: column; 
          align-items: center; text-align: center; min-height: 420px; 
          transition: all 0.4s ease; margin: 20px 0;
        }
        .swiper-slide-active .card-fitur-presisi { 
          background: #8477e4 !important; color: white !important; 
          transform: scale(1.1); border-color: transparent; 
          box-shadow: 0 25px 50px -12px rgba(132, 119, 228, 0.5);
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
        .dashboard-item.active { flex: 5; border: 5px solid #8477e4; filter: grayscale(0%); transform: scale(1.02); }
        .dashboard-item:not(.active) { flex: 1; filter: grayscale(100%) opacity(40%); }
        
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
          className="absolute top-[-10%] left-[-5%] w-[400px] opacity-50 animate-bubble-img"
          alt=""
        />
        <img
          src="/gambar/bubble.png"
          className="absolute top-[40%] right-[-10%] w-[300px] opacity-40 animate-bubble-img"
          style={{ animationDelay: "2s" }}
          alt=""
        />
        <img
          src="/gambar/bubble.png"
          className="absolute bottom-[-10%] left-[10%] w-[350px] opacity-30 animate-bubble-img"
          style={{ animationDelay: "4s" }}
          alt=""
        />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="fixed w-full top-6 z-50 flex justify-center px-6">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-xl rounded-full px-8 py-4 flex justify-between items-center border border-white/50">
          <div className="flex items-center gap-3">
            <img src="/gambar/logo.png" className="w-10 h-10" alt="Logo" />
            <span className="font-bold text-2xl tracking-tight">
              FinTrack AI
            </span>
          </div>
          <ul className="hidden md:flex gap-8 font-semibold text-gray-600">
            <li>
              <a href="#beranda" className="hover:text-[#8477e4]">
                Home
              </a>
            </li>
            <li>
              <a href="#tentang" className="hover:text-[#8477e4]">
                Tentang
              </a>
            </li>
            <li>
              <a href="#fitur" className="hover:text-[#8477e4]">
                Fitur
              </a>
            </li>
            <li>
              <a href="#dashboard" className="hover:text-[#8477e4]">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#tim" className="hover:text-[#8477e4]">
                Team
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#8477e4]">
                FAQ
              </a>
            </li>
          </ul>
          <button
            onClick={() => navigate("/Register")}
            className="bg-[#8477e4] text-white text-sm font-bold px-8 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all"
          >
            Daftar
          </button>
        </div>
      </nav>

      {/* --- HERO (ZOOMED) --- */}
      <section
        id="beranda"
        className="min-h-screen flex flex-col justify-center pt-32 pb-20 px-6 md:px-20 relative overflow-visible"
      >
        {/* Container Utama untuk Text & Layouting */}
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          {/* KOLOM KIRI: Teks & Tombol (Tetap aman di dalam container) */}
          <div className="space-y-6 z-10">
            {/* Heading Utama */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#1e1b4b] leading-[1.15]">
              Kelola Keuangan <br />
              Lebih Cerdas <br />
              Bersama <span className="text-[#8477e4]">FinTrack AI</span>
            </h1>

            {/* Paragraf Deskripsi */}
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg">
              Pantau pengeluaran, atur budget, capai goals, dan dapatkan insight AI untuk keputusan finansial yang lebih baik setiap hari.
            </p>

            {/* Grup Tombol */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => navigate("/register")}
                className="bg-[#8477e4] text-white text-sm md:text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-purple-500/30 hover:-translate-y-1 transition-transform flex items-center gap-2"
              >
                Mulai kelola keuangan <span>→</span>
              </button>
              <button className="bg-white/60 backdrop-blur-sm text-[#1e1b4b] text-sm md:text-base font-bold px-6 py-4 rounded-full shadow-sm border border-white hover:bg-white transition-colors flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-1.5 flex items-center justify-center">
                  <span className="text-[#8477e4] text-xs">▶</span>
                </div>
                Lihat Fitur <span>❯</span>
              </button>
            </div>

            {/* Deretan Fitur Mini */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#f3edff] flex items-center justify-center text-xl">✨</div>
                <span className="text-xs font-bold text-[#1e1b4b] leading-tight">Insight AI<br />Real-time</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#ffe4e6] flex items-center justify-center text-xl">🥧</div>
                <span className="text-xs font-bold text-[#1e1b4b] leading-tight">Pengelolaan<br />Budget</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#fce7f3] flex items-center justify-center text-xl">🎯</div>
                <span className="text-xs font-bold text-[#1e1b4b] leading-tight">Target<br />Tabungan</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e0f2fe] flex items-center justify-center text-xl">📊</div>
                <span className="text-xs font-bold text-[#1e1b4b] leading-tight">Laporan<br />Lengkap</span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN (Khusus Mobile/Tablet: Tampil normal di bawah teks) */}
          <div className="relative z-10 mt-10 md:mt-0 flex justify-end md:hidden">
            <img
              src="/gambar/Home.png"
              alt="Home FinTrack AI"
              className="w-full max-w-[130%] object-contain drop-shadow-2xl"
            />
          </div>

          {/* Spacer kosong di Desktop agar grid kiri tidak melebar memenuhi layar */}
          <div className="hidden md:block w-full h-full pointer-events-none"></div>
        </div>

        {/* 🚀 GAMBAR MENTOK KANAN (Khusus Desktop: Keluar dari Container & Menempel ke Ujung Layar) */}
        <div className="hidden md:block absolute right-0 top-[45%] -translate-y-1/2 w-[46vw] max-w-[780px] lg:max-w-[880px] xl:max-w-[980px] z-10 overflow-visible">
          <img
            src="/gambar/Home.png"
            alt="Home FinTrack AI"
            className="w-full object-contain drop-shadow-2xl scale-110 lg:scale-120 xl:scale-125 origin-right"
          />
        </div>

        {/* BANNER STATISTIK (Bawah) */}
        <div className="container mx-auto mt-24 z-10 px-6">
          <div className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-full px-8 py-5 md:px-12 md:py-6 shadow-[0_10px_40px_-15px_rgba(132,119,228,0.2)] flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
            
            {/* Item 1: Pengguna Aktif */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-center">
              <div className="w-14 h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)]">
                {/* SVG Icon Users */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#8477e4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-2xl text-[#1e1b4b] leading-tight">10K+</h4>
                <p className="text-sm text-[#8477e4]/80 font-medium mt-0.5">Pengguna Aktif</p>
              </div>
            </div>

            <div className="w-px h-12 bg-purple-100/50 hidden md:block"></div>

            {/* Item 2: Transaksi Aman */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-center">
              <div className="w-14 h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)]">
                {/* SVG Icon Shield */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#8477e4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-2xl text-[#1e1b4b] leading-tight">99%</h4>
                <p className="text-sm text-[#8477e4]/80 font-medium mt-0.5">Transaksi Aman</p>
              </div>
            </div>

            <div className="w-px h-12 bg-purple-100/50 hidden md:block"></div>

            {/* Item 3: AI Analisis Cerdas */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-center">
              <div className="w-14 h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)]">
                {/* SVG Icon Robot/AI */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#8477e4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-2xl text-[#1e1b4b] leading-tight">AI</h4>
                <p className="text-sm text-[#8477e4]/80 font-medium mt-0.5">Analisis Cerdas</p>
              </div>
            </div>

            <div className="w-px h-12 bg-purple-100/50 hidden md:block"></div>

            {/* Item 4: Bantuan 24/7 */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-start md:justify-center">
              <div className="w-14 h-14 rounded-full bg-[#f3edff] flex items-center justify-center shadow-[inset_0_2px_8px_rgba(132,119,228,0.1)]">
                {/* SVG Icon Headset/Support */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-[#8477e4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.168a2 2 0 11-2.658-2.658m7.824 2.168a2 2 0 11-2.658-2.658" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h4 className="font-extrabold text-2xl text-[#1e1b4b] leading-tight">24/7</h4>
                <p className="text-sm text-[#8477e4]/80 font-medium mt-0.5">Bantuan AI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TENTANG KAMI (BIGGER) --- */}
      <section id="tentang" className="py-24 px-6 md:px-20">
        <div className="w-full bg-gradient-to-br from-[#8477e4] to-[#e584ee] rounded-[50px] p-16 md:p-24 text-white shadow-3xl relative overflow-hidden">
          <div className="max-w-4xl space-y-8 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Kendalikan Keuanganmu <br />
              <span className="text-white/70 italic text-4xl md:text-6xl">
                dengan Insight Cerdas AI
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-loose font-medium">
              Platform ini dirancang khusus untuk memastikan setiap rupiah yang
              kamu miliki bekerja secara optimal. Kami membawa teknologi masa
              depan ke dompetmu hari ini.
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 scale-150">
            <img src="/gambar/logo.png" className="w-96" />
          </div>
        </div>
      </section>

      {/* --- FITUR (FIXED STYLE) --- */}
      <section id="fitur" className="py-32 px-6">
        <div className="text-center mb-20 space-y-4">
          <p className="text-[#8477e4] font-black uppercase tracking-[0.3em] text-sm">
            Feature
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Kelola Keuangan Lebih Cerdas <br />
            <span className="bg-[#e584ee] text-white px-10 py-3 rounded-full inline-block mt-6 shadow-xl italic text-4xl">
              Dengan AI
            </span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            spaceBetween={40}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-20"
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
                  <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                    <img
                      src={`/gambar/${item.i}`}
                      className="w-16 h-16"
                      alt={item.t}
                    />
                  </div>
                  <h3 className="text-3xl font-bold mb-5">{item.t}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- DASHBOARD --- */}
      <section id="dashboard" className="py-24 px-6 md:px-20 bg-white/30">
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">
          Experience Our Interface
        </h2>
        <div className="flex flex-col md:flex-row gap-6 h-[600px] max-w-7xl mx-auto">
          {[
            "path-mobile-1.png",
            "path-desktop-main.png",
            "path-mobile-2.png",
            "path-desktop-2.png",
            "path-mobile-3.png",
          ].map((img, idx) => (
            <div
              key={idx}
              className={`dashboard-item rounded-[40px] shadow-2xl flex items-center justify-center p-6 bg-white overflow-hidden ${activeDashboard === idx ? "active" : ""}`}
              onClick={() => setActiveDashboard(idx)}
            >
              <img src={`/gambar/${img}`} className="h-full object-contain" />
            </div>
          ))}
        </div>
      </section>

      <div
        id="tim"
        className="py-24 font-poppins selection:bg-[#8477e4] selection:text-white"
      >
        <style>{`
    #tim .swiper { padding: 50px 20px !important; overflow: visible !important; }
    .team-item { 
      position: relative; border-radius: 25px; overflow: hidden; 
      aspect-ratio: 3/4; cursor: grab; transition: all 0.5s ease;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3); border: 1px solid rgba(0,0,0,0.05);
    }
    .team-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
    .team-item:hover img { transform: scale(1.1); }
    .team-text-overlay { 
      position: absolute; inset: 0; 
      background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.3) 50%, transparent 100%); 
      display: flex; flex-direction: column; justify-content: flex-end; padding: 25px; 
    }
    .social-icon { width: 32px; height: 32px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(4px); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.9rem; transition: all 0.3s ease; border: 1px solid rgba(255, 255, 255, 0.1); }
  `}</style>

        <div className="text-center mb-12">
          <p className="text-[#8477e4] font-bold uppercase tracking-widest text-xs mb-3">
            Our Expert Team
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Meet Our Team
          </h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <Swiper
            modules={[Navigation]}
            // Langsung tembak class tombolnya di sini tanpa onSwiper yang bikin error
            navigation={{
              nextEl: ".team-next",
              prevEl: ".team-prev",
            }}
            loop={true}
            // Kita hilangkan loopedSlides agar tidak merah di React
            speed={1000}
            spaceBetween={30}
            slidesPerView={1.2}
            centeredSlides={true}
            breakpoints={{
              640: { slidesPerView: 2.5, centeredSlides: false },
              // Untuk 4 orang di laptop, kita butuh duplikasi slide
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: false,
              },
            }}
          >
            {/* Kita duplikasi datanya (2x6 = 12 slide) biar Swiper Loop gak protes lagi */}
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
                        <h3 className="text-white font-bold text-lg">
                          {member.n}
                        </h3>
                        <p className="text-white/80 text-sm mb-3">{member.r}</p>
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

          {/* Navigasi Custom Tetap Sama */}
          <div className="flex justify-center gap-6 mt-12">
            <div className="team-prev cursor-pointer w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#8477e4] hover:text-[#8477e4] transition-all relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
            <div className="team-next cursor-pointer w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#8477e4] hover:text-[#8477e4] transition-all relative z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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

      {/* --- FAQ (LENGKAP) --- */}
      <section id="faq" className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">
          Any Questions?
        </h2>
        <div className="space-y-6">
          {[
            {
              q: "Apa itu FinTrack AI?",
              a: "FinTrack AI adalah asisten cerdas yang membantumu mengelola anggaran, memantau pengeluaran, dan memberikan rekomendasi finansial berbasis AI.",
            },
            {
              q: "Apakah data transaksi saya aman?",
              a: "Tentu saja. Kami menggunakan enkripsi militer AES-256 dan protokol keamanan SSL untuk memastikan data pribadimu tidak bocor.",
            },
            {
              q: "Berapa biaya langganannya?",
              a: "FinTrack AI menyediakan paket gratis untuk fitur dasar, dan paket Pro dengan fitur AI penuh yang sangat terjangkau.",
            },
            {
              q: "Apakah bisa digunakan di Mobile?",
              a: "Sangat bisa! Desain kami sepenuhnya responsif dan kami juga memiliki aplikasi mobile khusus Android dan iOS.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 ${activeFaq === i ? "faq-active border-[#8477e4]" : ""}`}
            >
              <button
                className="w-full flex justify-between items-center text-left py-2"
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}
              >
                <span className="text-xl font-bold text-gray-800">
                  {item.q}
                </span>
                <i
                  className={`fas fa-chevron-down transition-transform duration-300 ${activeFaq === i ? "rotate-180 text-[#8477e4]" : ""}`}
                ></i>
              </button>
              <div className="faq-content">
                <p className="text-gray-500 text-lg mt-4">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER (LENGKAP) --- */}
      <footer className="py-24 bg-white/80 border-t border-gray-100 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/gambar/logo.png" className="w-12" />
              <span className="font-bold text-3xl">FinTrack AI</span>
            </div>
            <p className="text-gray-500 leading-relaxed text-lg">
              Solusi manajemen keuangan modern untuk generasi masa kini. Cerdas,
              efisien, dan transparan.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Navigation</h4>
            <ul className="space-y-4 text-gray-500 text-lg">
              <li>
                <a href="#beranda" className="hover:text-[#8477e4]">
                  Home
                </a>
              </li>
              <li>
                <a href="#tentang" className="hover:text-[#8477e4]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-[#8477e4]">
                  Our Features
                </a>
              </li>
              <li>
                <a href="#tim" className="hover:text-[#8477e4]">
                  Meet the Team
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Contact Us</h4>
            <ul className="space-y-4 text-gray-500 text-lg">
              <li>
                <i className="fas fa-envelope mr-3"></i> help@fintrack.ai
              </li>
              <li>
                <i className="fas fa-phone mr-3"></i> +62 812-3456-7890
              </li>
              <li>
                <i className="fas fa-map-marker-alt mr-3"></i> Pekanbaru, Riau,
                Indonesia
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Follow Us</h4>
            <div className="flex gap-6 text-3xl text-gray-400">
              <i className="fab fa-instagram hover:text-[#e584ee] cursor-pointer"></i>
              <i className="fab fa-twitter hover:text-[#8477e4] cursor-pointer"></i>
              <i className="fab fa-linkedin hover:text-blue-600 cursor-pointer"></i>
            </div>
          </div>
        </div>
        <div className="text-center mt-20 pt-10 border-t border-gray-100 text-gray-400 font-medium">
          © 2026 FinTrack AI. Crafted with ❤️ for better financial future.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
