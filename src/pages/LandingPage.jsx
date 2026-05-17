import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
        <img src="/gambar/bubble.png" className="absolute top-[-10%] left-[-5%] w-[400px] opacity-50 animate-bubble-img" alt="" />
        <img src="/gambar/bubble.png" className="absolute top-[40%] right-[-10%] w-[300px] opacity-40 animate-bubble-img" style={{animationDelay: '2s'}} alt="" />
        <img src="/gambar/bubble.png" className="absolute bottom-[-10%] left-[10%] w-[350px] opacity-30 animate-bubble-img" style={{animationDelay: '4s'}} alt="" />
      </div>


      {/* --- NAVBAR --- */}
      <nav className="fixed w-full top-6 z-50 flex justify-center px-6">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-md shadow-xl rounded-full px-8 py-4 flex justify-between items-center border border-white/50">
          <div className="flex items-center gap-3">
            <img src="/gambar/logo.png" className="w-10 h-10" alt="Logo" />
            <span className="font-bold text-2xl tracking-tight">FinTrack AI</span>
          </div>
          <ul className="hidden md:flex gap-8 font-semibold text-gray-600">
            <li><a href="#beranda" className="hover:text-[#8477e4]">Home</a></li>
            <li><a href="#tentang" className="hover:text-[#8477e4]">Tentang</a></li>
            <li><a href="#fitur" className="hover:text-[#8477e4]">Fitur</a></li>
            <li><a href="#dashboard" className="hover:text-[#8477e4]">Dashboard</a></li>
            <li><a href="#tim" className="hover:text-[#8477e4]">Team</a></li>
            <li><a href="#faq" className="hover:text-[#8477e4]">FAQ</a></li>
          </ul>
          <button 
            onClick={() => navigate('/Register')} 
            className="bg-[#8477e4] text-white text-sm font-bold px-8 py-2.5 rounded-full shadow-lg hover:scale-105 transition-all"
            >
            Daftar
          </button>
        </div>
      </nav>

      {/* --- HERO (ZOOMED) --- */}
      <section id="beranda" className="min-h-screen flex items-center pt-32 pb-20 px-6 md:px-20">
        <div className="container mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 scale-110 origin-left"> {/* Zoomed here */}
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Kelola Keuangan <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8477e4] to-[#e584ee]">Lebih Mudah</span>
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed max-w-lg">
              Kelola dan pantau keuanganmu dengan cerdas melalui FinTrack AI. AI kami siap menganalisis kebiasaan belanjamu.
            </p>
            <button 
                onClick={() => navigate('/register')} 
                className="bg-[#8477e4] text-white text-lg font-bold px-12 py-5 rounded-full shadow-2xl hover:-translate-y-2 transition-all"
                >
                Mulai Sekarang
            </button>
          </div>
          <div className="relative scale-110">
            <img src="/gambar/Home.png" alt="Home" className="w-full drop-shadow-2xl" />
          </div>
        </div>
      </section>

      {/* --- TENTANG KAMI (BIGGER) --- */}
      <section id="tentang" className="py-24 px-6 md:px-20">
        <div className="w-full bg-gradient-to-br from-[#8477e4] to-[#e584ee] rounded-[50px] p-16 md:p-24 text-white shadow-3xl relative overflow-hidden">
          <div className="max-w-4xl space-y-8 relative z-10">
            <h2 className="text-5xl md:text-7xl font-black leading-tight">
              Kendalikan Keuanganmu <br/>
              <span className="text-white/70 italic text-4xl md:text-6xl">dengan Insight Cerdas AI</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 leading-loose font-medium">
              Platform ini dirancang khusus untuk memastikan setiap rupiah yang kamu miliki bekerja secara optimal. Kami membawa teknologi masa depan ke dompetmu hari ini.
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
          <p className="text-[#8477e4] font-black uppercase tracking-[0.3em] text-sm">Feature</p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
            Kelola Keuangan Lebih Cerdas <br/>
            <span className="bg-[#e584ee] text-white px-10 py-3 rounded-full inline-block mt-6 shadow-xl italic text-4xl">Dengan AI</span>
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
            breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="pb-20"
          >
            {[
              { t: "Financial Insight", i: "AI financial insight.png", d: "Dapatkan asisten pribadi cerdas yang menganalisis pola pengeluaranmu secara otomatis." },
              { t: "Smart Budgeting", i: "smart budgeting.png", d: "Atur alokasi dana lebih mudah dengan metode 50/30/20 yang sudah teruji." },
              { t: "Real-Time Tracking", i: "expense tracking.png", d: "Catat transaksi harian secara instan dan biarkan AI mengelompokkannya secara rapi." },
              { t: "Health Score", i: "financial health score.png", d: "Ketahui skor kesehatan keuanganmu dengan parameter yang akurat." },
              { t: "Interactive Chart", i: "interactive dashboard.png", d: "Visualisasi data yang cantik memudahkanmu memahami kondisi asetmu." }
            ].map((item, index) => (
              <SwiperSlide key={index}>
                <div className="card-fitur-presisi">
                  <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner">
                    <img src={`/gambar/${item.i}`} className="w-16 h-16" alt={item.t} />
                  </div>
                  <h3 className="text-3xl font-bold mb-5">{item.t}</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">{item.d}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* --- DASHBOARD --- */}
      <section id="dashboard" className="py-24 px-6 md:px-20 bg-white/30">
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">Experience Our Interface</h2>
        <div className="flex flex-col md:flex-row gap-6 h-[600px] max-w-7xl mx-auto">
          {["path-mobile-1.png", "path-desktop-main.png", "path-mobile-2.png", "path-desktop-2.png", "path-mobile-3.png"].map((img, idx) => (
            <div 
              key={idx} 
              className={`dashboard-item rounded-[40px] shadow-2xl flex items-center justify-center p-6 bg-white overflow-hidden ${activeDashboard === idx ? 'active' : ''}`}
              onClick={() => setActiveDashboard(idx)}
            >
              <img src={`/gambar/${img}`} className="h-full object-contain" />
            </div>
          ))}
        </div>
      </section>
      
      <div id="tim" className="py-24 font-poppins selection:bg-[#8477e4] selection:text-white">
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
    <p className="text-[#8477e4] font-bold uppercase tracking-widest text-xs mb-3">Our Expert Team</p>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Meet Our Team</h2>
  </div>

  <div className="max-w-7xl mx-auto px-6 relative">
    <Swiper
      modules={[Navigation]}
      // Langsung tembak class tombolnya di sini tanpa onSwiper yang bikin error
      navigation={{
        nextEl: '.team-next',
        prevEl: '.team-prev',
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
        1024: { slidesPerView: 4, spaceBetween: 30, centeredSlides: false }
      }}
    >
      {/* Kita duplikasi datanya (2x6 = 12 slide) biar Swiper Loop gak protes lagi */}
      {[...Array(2)].map((_, loopIdx) => (
        <React.Fragment key={loopIdx}>
          {[
            { n: "Anisa", r: "Back-end Developer", i: "Anisa.png" },
            { n: "Shifa Anjani Desha", r: "Front-end Developer", i: "Shifa.jpeg" },
            { n: "Mohammad El Abror Sholeh", r: "AI Engineer", i: "Abror.jpeg" },
            { n: "Hamasah Fazal Aqsha", r: "AI Engineer", i: "Aqso.jpeg" },
            { n: "Icha Aulia Putri", r: "Data Scientist", i: "Ichaa.png" },
            { n: "Nanda Hidayah", r: "Data Scientist", i: "Nanda.jpeg" }
          ].map((member, index) => (
            <SwiperSlide key={`${loopIdx}-${index}`}>
              <div className="team-item">
                <img src={`/gambar/${member.i}`} alt={member.n} />
                <div className="team-text-overlay">
                  <h3 className="text-white font-bold text-lg">{member.n}</h3>
                  <p className="text-white/80 text-sm mb-3">{member.r}</p>
                  <div className="flex gap-2">
                    <div className="social-icon"><i className="fab fa-instagram"></i></div>
                    <div className="social-icon"><i className="fab fa-linkedin-in"></i></div>
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      <div className="team-next cursor-pointer w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#8477e4] hover:text-[#8477e4] transition-all relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</div>

      {/* --- FAQ (LENGKAP) --- */}
      <section id="faq" className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">Any Questions?</h2>
        <div className="space-y-6">
          {[
            { q: "Apa itu FinTrack AI?", a: "FinTrack AI adalah asisten cerdas yang membantumu mengelola anggaran, memantau pengeluaran, dan memberikan rekomendasi finansial berbasis AI." },
            { q: "Apakah data transaksi saya aman?", a: "Tentu saja. Kami menggunakan enkripsi militer AES-256 dan protokol keamanan SSL untuk memastikan data pribadimu tidak bocor." },
            { q: "Berapa biaya langganannya?", a: "FinTrack AI menyediakan paket gratis untuk fitur dasar, dan paket Pro dengan fitur AI penuh yang sangat terjangkau." },
            { q: "Apakah bisa digunakan di Mobile?", a: "Sangat bisa! Desain kami sepenuhnya responsif dan kami juga memiliki aplikasi mobile khusus Android dan iOS." }
          ].map((item, i) => (
            <div key={i} className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 ${activeFaq === i ? 'faq-active border-[#8477e4]' : ''}`}>
              <button className="w-full flex justify-between items-center text-left py-2" onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <span className="text-xl font-bold text-gray-800">{item.q}</span>
                <i className={`fas fa-chevron-down transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#8477e4]' : ''}`}></i>
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
              Solusi manajemen keuangan modern untuk generasi masa kini. Cerdas, efisien, dan transparan.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Navigation</h4>
            <ul className="space-y-4 text-gray-500 text-lg">
              <li><a href="#beranda" className="hover:text-[#8477e4]">Home</a></li>
              <li><a href="#tentang" className="hover:text-[#8477e4]">About Us</a></li>
              <li><a href="#fitur" className="hover:text-[#8477e4]">Our Features</a></li>
              <li><a href="#tim" className="hover:text-[#8477e4]">Meet the Team</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-xl mb-8">Contact Us</h4>
            <ul className="space-y-4 text-gray-500 text-lg">
              <li><i className="fas fa-envelope mr-3"></i> help@fintrack.ai</li>
              <li><i className="fas fa-phone mr-3"></i> +62 812-3456-7890</li>
              <li><i className="fas fa-map-marker-alt mr-3"></i> Pekanbaru, Riau, Indonesia</li>
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