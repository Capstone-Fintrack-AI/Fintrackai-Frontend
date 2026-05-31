import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Beranda from "./pages/Beranda";
import Transaksi from "./pages/Transaksi";
import Pengaturan from "./pages/Pengaturan";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/transaksi" element={<Transaksi />} />
        <Route path="/pengaturan" element={<Pengaturan />} />
      </Routes>
    </Router>
  );
};

export default App;
