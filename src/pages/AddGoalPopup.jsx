import React, { useState, useRef, useEffect } from 'react';

const AddGoalPopup = ({ isOpen, onClose, initialBalance = 1000000, onSave }) => {
  // State untuk data form
  const [name, setName] = useState('');
  const [note, setNote] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [allocation, setAllocation] = useState(0);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const [sudahDialokasikan, setSudahDialokasikan] = useState(0);
  const [totalPemasukan, setTotalPemasukan] = useState(0);
  const [totalPengeluaran, setTotalPengeluaran] = useState(0);
  const [pengeluaran, setPengeluaran] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // ambil pemasukan
        const pemasukanRes = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pemasukan/user/${userId}`
        );
        const pemasukanJson = await pemasukanRes.json();

        const pemasukanData = pemasukanJson.data || [];

        const totalPemasukanCalc = pemasukanData.reduce(
          (sum, item) => sum + Number(item.jumlah),
          0
        );

        setTotalPemasukan(totalPemasukanCalc);

        // ambil total pengeluaran
        const pengeluaranTotalRes = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/total/${userId}`
        );
        const pengeluaranTotalJson = await pengeluaranTotalRes.json();

        setTotalPengeluaran(Number(pengeluaranTotalJson.total_pengeluaran || 0));

        // ambil list pengeluaran
        const pengeluaranRes = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/pengeluaran/user/${userId}`
        );
        const pengeluaranJson = await pengeluaranRes.json();

        setPengeluaran(pengeluaranJson.data || []);
      } catch (error) {
        console.error("Error fetch data Goals Popup:", error);
      }
    };

    fetchData();
    getTotalDialokasikan();
  }, [userId]);

  const targetTabungan = totalPemasukan * 0.2;
  const tersedia = targetTabungan - sudahDialokasikan;

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID").format(number);
  };

  // Auto-resize Textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [note]);

  // Logika Saldo
  const remainingBalance = initialBalance - allocation;
  const isError = allocation > initialBalance || allocation < 0;

  // Handler Upload
  const handleImageClick = () => fileInputRef.current.click();
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleSave = async () => {
    if (!name || !targetPrice || isError) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;

      const payload = {
        user_id: userId,
        nama_target: name,
        jumlah_target: Number(targetPrice),

        // jangan kirim allocation ke sini
        jumlah_terkumpul: 0,
      };

      const res = await fetch(
        "https://fintrackai-backend-1yz0.onrender.com/target-tabungan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      console.log("Response API:", data);

      const targetId = data.data.insertId;

      // jika user mengisi alokasi dana
      if (Number(allocation) > 0) {
        const tambahDanaRes = await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/api/tabungan/${targetId}/tambah-dana`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nominal: Number(allocation),
            }),
          }
        );

        const tambahDanaData = await tambahDanaRes.json();

        console.log("Status:", tambahDanaRes.status);
        console.log("Tambah Dana:", tambahDanaData);
      }

      // tetap update UI lokal juga
      const newGoal = {
        id: Date.now(),
        name,
        note,
        targetPrice: Number(targetPrice),
        allocation: Number(allocation),
        image,
        color: "#8b5cf6",
        progress:
          Number(targetPrice) > 0
            ? Math.round(
              (Number(allocation) / Number(targetPrice)) * 100
            )
            : 0,
      };

      onSave(newGoal);

      // reset form
      setName("");
      setNote("");
      setTargetPrice("");
      setAllocation(0);
      setImage(null);

      onClose();
    } catch (error) {
      console.error("Gagal tambah goal:", error);
    }
  };

  const getTotalDialokasikan = async () => {
    try {
      const response = await fetch(
        `https://fintrackai-backend-1yz0.onrender.com/api/tabungan/${userId}/total`
      );

      const data = await response.json();

      setSudahDialokasikan(
        Number(data?.data?.total || 0)
      );
    } catch (error) {
      console.error(error);
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-[#1e1b4b]">Tambah Goals Baru</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className=" gap-6">
          {/* Upload Gambar */}
          {/* <div className="col-span-1">
            <label className="block text-xs font-bold text-gray-500 mb-2">Upload Gambar Goals</label>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <div 
              onClick={handleImageClick}
              className="w-full h-48 border-2 border-dashed border-purple-200 rounded-2xl flex flex-col items-center justify-center text-purple-600 cursor-pointer hover:bg-purple-50 transition overflow-hidden"
            >
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt text-2xl mb-2"></i>
                  <span className="text-[10px] font-bold text-center">Klik untuk upload<br/>PNG, JPG max. 2MB</span>
                </>
              )}
            </div>
          </div> */}

          {/* Nama & Catatan */}
          <div className="col-span-1 flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Nama Goals *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Contoh: Laptop"
              />
            </div>
            {/* <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">Catatan (Opsional)</label>
              <textarea
                ref={textareaRef}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm resize-none"
                placeholder="Spesifikasi..."
              />
            </div> */}
          </div>
        </div>

        {/* Input Dana */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Target Harga</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-sm text-gray-400">Rp</span>
              <input
                type="number"
                className="w-full border border-gray-200 rounded-xl py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0"
                onChange={(e) => setTargetPrice(Number(e.target.value))}
              />
            </div>
            {targetPrice > 0 && (
              <p className="text-[10px] text-purple-600 mt-1 font-bold">
                Terbaca: Rp {formatRupiah(targetPrice)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Alokasi Dana</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-sm text-gray-400">Rp</span>
              <input
                type="number"
                className={`w-full border rounded-xl py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 ${isError ? 'border-red-500' : 'border-gray-200'}`}
                value={allocation === 0 ? '' : allocation}
                onChange={(e) => setAllocation(Number(e.target.value))}
                placeholder="0"
              />
            </div>
            {allocation > 0 && (
              <p className={`text-[10px] mt-1 font-bold ${isError ? 'text-red-500' : 'text-purple-600'}`}>
                Terbaca: Rp {formatRupiah(allocation)}
              </p>
            )}
          </div>
        </div>

        {/* Info Saldo */}
        <div className="bg-purple-50 p-4 rounded-2xl mt-6 flex items-center justify-between">
          <div className="text-center">
            <p className="text-[10px] text-purple-400 font-bold uppercase">Dana Tersedia</p>
            <p className="text-sm font-black text-[#1e1b4b]">Rp {tersedia.toLocaleString("id-ID")}</p>
          </div>
          <i className="fas fa-arrow-right text-purple-400"></i>
          <div className="text-center">
            <p className="text-[10px] text-purple-400 font-bold uppercase">Setelah dialokasikan</p>
            <p className={`text-sm font-black ${isError ? 'text-red-500' : 'text-[#1e1b4b]'}`}>
              Rp {(tersedia - allocation).toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-4 mt-6">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-sm">Batal</button>
          <button
            onClick={handleSave}
            disabled={isError || !name || !targetPrice}
            className={`flex-1 py-3 rounded-xl font-bold text-sm text-white ${isError || !name || !targetPrice ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8b5cf6] hover:bg-purple-700'}`}
          >
            Simpan Goals
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalPopup;