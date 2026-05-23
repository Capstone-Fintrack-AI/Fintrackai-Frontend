import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login berhasil! Selamat datang kembali di FinTrack AI.");
    // LANGSUNG KE BERANDA
    navigate('/beranda'); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 font-poppins selection:bg-[#8477e4] selection:text-white overflow-hidden relative">
      
      {/* --- INJECT CUSTOM CSS (BUBBLE & INPUT) --- */}
      <style>{`
        @keyframes float-bubble {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        .color-bubble {
          will-change: transform;
          transform: translateZ(0); 
          position: fixed;
          border-radius: 50%;
          z-index: -1;
          pointer-events: none;
          animation: float-bubble 15s infinite ease-in-out;
        }

        .bubble-1 { width: 600px; height: 600px; background: radial-gradient(circle, rgba(132, 119, 228, 0.4) 0%, rgba(132, 119, 228, 0) 70%); top: -10%; left: -10%; filter: blur(40px); }
        .bubble-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(229, 132, 238, 0.45) 0%, rgba(229, 132, 238, 0) 70%); top: 25%; right: -10%; animation-delay: -5s; filter: blur(50px); }
        .bubble-3 { width: 700px; height: 700px; background: radial-gradient(circle, rgba(161, 140, 209, 0.35) 0%, rgba(161, 140, 209, 0) 70%); bottom: 10%; left: -15%; animation-delay: -10s; filter: blur(60px); }
        .bubble-4 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(206, 102, 219, 0.3) 0%, rgba(206, 102, 219, 0) 70%); bottom: 25%; right: 5%; animation-delay: -7s; filter: blur(45px); }

        .input-underline {
          width: 100%;
          border: none;
          border-bottom: 2px solid #E5E7EB;
          background-color: transparent;
          padding: 10px 0;
          font-size: 0.95rem;
          color: #374151;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .input-underline:focus { border-bottom-color: #c4a4f9; }
        .input-underline::placeholder { color: #9CA3AF; }

        .animate-bubble-img { animation: float-bubble 15s infinite ease-in-out; }
        .delay-2000 { animation-delay: 2s; }
        .delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* --- BACKGROUND BUBBLES --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="color-bubble bubble-1"></div>
        <div className="color-bubble bubble-2"></div>
        <div className="color-bubble bubble-3"></div>
        <div className="color-bubble bubble-4"></div>
      </div>

      {/* --- FLOATING IMAGES BUBBLES --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
        <img src="/gambar/bubble.png" className="absolute top-[-10%] left-[-5%] w-[400px] opacity-50 animate-bubble-img" alt="" />
        <img src="/gambar/bubble.png" className="absolute top-[40%] right-[-10%] w-[300px] opacity-40 animate-bubble-img delay-2000" alt="" />
        <img src="/gambar/bubble.png" className="absolute bottom-[-10%] left-[10%] w-[350px] opacity-30 animate-bubble-img delay-4000" alt="" />
        <img src="/gambar/bubble.png" className="absolute w-[600px] opacity-70 animate-bubble-img" alt="" />
      </div>

      {/* --- BACK BUTTON --- */}
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-3 text-gray-500 hover:text-[#8477e4] transition-all z-50 group"
      >
        <div className="w-10 h-10 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/60 shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
          <i className="fas fa-arrow-left"></i>
        </div>
        {/* <span className="font-medium text-sm hidden sm:block">Back to Home</span> */}
      </button>

      {/* --- MAIN CARD --- */}
      <div className="flex flex-col md:flex-row w-full max-w-[1000px] bg-white/30 backdrop-blur-xl border border-white/50 rounded-[30px] overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] relative z-10">
        
        {/* LEFT SIDE (ILLUSTRATION) */}
        <div className="hidden md:flex flex-col w-[45%] bg-gradient-to-br from-[#b59cfc]/80 via-[#dcb0f9]/80 to-[#f4c4f3]/80 p-10 relative">
          <div className="mb-10 flex justify-center">
            <img src="/gambar/logo.png" alt="FinTrack AI Logo" className="h-20 w-auto object-contain" />
          </div>
          <div className="z-10 text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">Welcome Back!</h1>
            <p className="text-white/90 text-sm lg:text-base leading-relaxed max-w-[90%]">
              Lanjutkan perjalanan finansialmu. Pantau, analisis, dan raih target keuanganmu bersama AI.
            </p>
          </div>
          <div className="mt-auto flex justify-center pt-8">
            <img src="/gambar/gambarregis.png" alt="3D Illustration" className="w-[90%] object-contain" />
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <div className="w-full md:w-[55%] p-10 lg:p-14 flex flex-col justify-center bg-white/40">
          <h2 className="text-2xl font-bold text-gray-900 mb-10">Sign In to FinTrack</h2>

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="input-underline" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  className="input-underline pr-10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  <i className={`far ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                </button>
              </div>
              <div className="flex justify-end mt-3">
                <a href="#" className="text-xs text-[#8477e4] hover:underline font-bold">Forgot Password?</a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="remember" className="accent-[#3b82f6] w-4 h-4 cursor-pointer" />
              <label htmlFor="remember" className="text-xs text-gray-500 font-medium cursor-pointer">
                Remember me for 30 days
              </label>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-gradient-to-r from-[#b59cfc] to-[#e584ee] hover:opacity-90 text-white text-lg font-bold rounded-full transition-all shadow-lg mt-4"
            >
              Sign In
            </button>
          </form>

          <div className="flex items-center my-8">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Or Sign In With</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex justify-center mb-8">
            <button className="w-12 h-12 rounded-full border border-gray-200 shadow-sm flex items-center justify-center hover:shadow-md hover:bg-gray-50 transition-all bg-white/60">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 font-medium">
            Don't have an account? 
            <Link to="/register" className="text-[#8477e4] font-bold hover:underline ml-1">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;