import React, { useState, useEffect } from "react";
import axios from "axios";

const TransactionModal = ({ isOpen, onClose, onSave }) => {
  const [type, setType] = useState("pengeluaran");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [kategori, setKategori] = useState("Kebutuhan");
  const [namaTransaksi, setNamaTransaksi] = useState("");
  const [sumberPemasukan, setSumberPemasukan] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const now = new Date();
      setDate(
        now.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      );
      setTime(
        now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      );
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSimpan = async () => {
    try {
      setLoading(true);
      if (!namaTransaksi.trim()) {
        alert(
          type === "pemasukan"
            ? "Nama pemasukan wajib diisi"
            : "Nama pengeluaran wajib diisi",
        );
        return;
      }

      if (!amount) {
        alert("Nominal wajib diisi");
        return;
      }

      if (type === "pemasukan" && !sumberPemasukan) {
        alert("Pilih sumber pemasukan");
        return;
      }

      const numericAmount = parseInt(
        amount.replace(/[^0-9]/g, ""),
      );

      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      const userId = user.id;

      const tanggal = new Date().toISOString().split("T")[0];

      // =========================
      // TAMBAH PEMASUKAN
      // =========================
      if (type === "pemasukan") {
        const payload = {
          user_id: Number(userId),
          nama_pemasukan: namaTransaksi,
          sumber_pemasukan: sumberPemasukan,
          jumlah: numericAmount,
          tanggal,
        };

        const response = await axios.post(
          "https://fintrackai-backend-1yz0.onrender.com/pemasukan",
          payload,
        );

        console.log("Pemasukan berhasil", response.data);
      }

      // =========================
      // TAMBAH PENGELUARAN
      // =========================
      else {
        const payload = {
          user_id: Number(userId),
          nama_pengeluaran: namaTransaksi,
          kategori,
          jumlah: numericAmount,
          tanggal,
        };

        const response = await axios.post(
          "https://fintrackai-backend-1yz0.onrender.com/pengeluaran/create",
          payload,
        );

        console.log("Pengeluaran berhasil", response.data);
      }

      // reset form
      setAmount("");
      setNamaTransaksi("");
      setSumberPemasukan("");
      setKategori("Kebutuhan");

      if (onSave) {
        onSave({
          kat: type === "pemasukan"
            ? sumberPemasukan
            : kategori,

          desc: namaTransaksi,

          nominal:
            type === "pemasukan"
              ? numericAmount
              : -numericAmount,
        });
      }

      onClose();
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan transaksi",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value) {
      setAmount(new Intl.NumberFormat("id-ID").format(value));
    } else {
      setAmount("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 font-poppins">
      <div className="bg-white rounded-[2rem] w-full max-w-[450px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header Sesuai image_2ef024.png */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f0eaff] rounded-xl flex items-center justify-center text-[#8477e4]">
              <i className="fas fa-file-medical text-lg"></i>
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-gray-900">
                Catat Transaksi
              </h2>
              <p className="text-[10px] text-gray-400">
                Catat pemasukan atau pengeluaran kamu
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition-all"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content Area dengan scroll mandiri */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Toggle Type */}
          <div className="flex bg-gray-50 p-1 rounded-2xl">
            <button
              onClick={() => setType("pengeluaran")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${type === "pengeluaran"
                ? "bg-[#F44336] text-white shadow-md"
                : "text-gray-400"
                }`}
            >
              Pengeluaran
            </button>
            <button
              onClick={() => setType("pemasukan")}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${type === "pemasukan"
                ? "bg-[#4caf50] text-white shadow-md"
                : "text-gray-400"
                }`}
            >
              Pemasukan
            </button>
          </div>

          {/* Nama Transaksi */}
          <div>
            <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              {type === "pemasukan"
                ? "Nama Pemasukan"
                : "Nama Pengeluaran"}
            </label>

            <input
              type="text"
              value={namaTransaksi}
              onChange={(e) => setNamaTransaksi(e.target.value)}
              placeholder={
                type === "pemasukan"
                  ? "Contoh: Gaji Bulanan"
                  : "Contoh: Belanja Bulanan"
              }
              className="w-full p-3 bg-gray-50 rounded-2xl text-xs font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#8477e4]/20"
            />
          </div>

          {/* Nominal */}
          <div>
            <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
              Nominal Uang
            </label>

            <div className="flex items-center border-2 border-gray-100 rounded-2xl px-4 py-3 focus-within:border-[#8477e4] transition-all">
              <span
                className={`text-xl font-black mr-2 ${type === "pengeluaran"
                  ? "text-[#F44336]"
                  : "text-[#4caf50]"
                  }`}
              >
                Rp
              </span>

              <input
                type="text"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className={`w-full text-xl font-bold outline-none bg-transparent placeholder:font-bold ${type === "pengeluaran"
                  ? "text-[#F44336] placeholder:text-[#F44336]/40"
                  : "text-[#4CAF50] placeholder:text-[#4CAF50]/40"
                  }`}
              />
            </div>
          </div>

          {/* Kategori Alokasi (Khusus Pengeluaran) */}
          {type === "pengeluaran" && (
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Kategori Alokasi
              </label>

              <div className="grid grid-cols-2 gap-2">
                {["Kebutuhan", "Keinginan"].map((item) => (
                  <button
                    key={item}
                    onClick={() => setKategori(item)}
                    className={`py-2 rounded-xl text-[10px] font-bold border-2 transition-all ${kategori === item
                      ? "border-[#8477e4] bg-[#f0eaff] text-[#8477e4]"
                      : "border-gray-100 text-gray-400"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sumber Pemasukan (Khusus Pemasukan) */}
          {type === "pemasukan" && (
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Sumber Pemasukan
              </label>

              <select
                value={sumberPemasukan}
                onChange={(e) => setSumberPemasukan(e.target.value)}
                className="w-full p-3 bg-gray-50 rounded-2xl text-xs font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#8477e4]/20"
              >
                <option value="">Pilih Sumber Pemasukan</option>
                <option value="Gaji">Gaji</option>
                <option value="Freelance">Freelance</option>
                <option value="Bisnis">Bisnis</option>
                <option value="Investasi">Investasi</option>
                <option value="Bonus">Bonus</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          )}

          {/* Tanggal & Jam */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Tanggal
              </label>

              <input
                disabled
                value={date}
                className="w-full p-3 bg-gray-50 rounded-2xl text-xs font-bold text-gray-500 border border-gray-100"
              />
            </div>

            <div>
              <label className="block text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                Jam
              </label>

              <input
                disabled
                value={time}
                className="w-full p-3 bg-gray-50 rounded-2xl text-xs font-bold text-gray-500 border border-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 shrink-0">
          <button
            onClick={handleSimpan}
            disabled={loading}
            className="w-full py-4 bg-[#8477e4] text-white rounded-2xl font-black text-xs shadow-[0_8px_16px_rgba(132,119,228,0.3)] hover:bg-[#7466d3] transition-all disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Transaksi"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
