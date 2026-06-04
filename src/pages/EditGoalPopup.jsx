import React, { useState, useEffect, useRef } from "react";

const EditGoalPopup = ({ isOpen, onClose, goal, totalTabungan, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    note: "",
    targetPrice: 0,
    allocation: 0,
  });
  const [tambahDana, setTambahDana] = useState(0);
  const fileInputRef = useRef(null);


  useEffect(() => {
    if (goal) setFormData(goal);
  }, [goal]);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID").format(number);

  const totalTabunganSafe = totalTabungan || 0;
  const tambahDanaSafe = Number(tambahDana) || 0;
  const isOverLimit = tambahDanaSafe > totalTabunganSafe;

  const danaSetelah = (formData.allocation || 0) + tambahDanaSafe;
  const sisaTabungan = totalTabunganSafe - tambahDanaSafe;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const handleSave = async () => {
    try {
      // update target tabungan
      await fetch(
        `https://fintrackai-backend-1yz0.onrender.com/target-tabungan/${goal.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            nama_target: formData.name,
            jumlah_target: Number(formData.targetPrice),
            jumlah_terkumpul: Number(formData.allocation),
            status:
              Number(formData.allocation) >= Number(formData.targetPrice)
                ? "selesai"
                : "proses",
          }),
        }
      );

      // tambah dana jika ada
      if (tambahDanaSafe > 0) {
        await fetch(
          `https://fintrackai-backend-1yz0.onrender.com/api/tabungan/${goal.id}/tambah-dana`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              nominal: tambahDanaSafe,
            }),
          }
        );
      }

      onSave();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;



  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black text-[#1e1b4b]">Edit Goals</h2>
          <button onClick={onClose} className="text-gray-400">
            ✕
          </button>
        </div>

        <div className=" gap-6">
          {/* Foto */}
          {/* <div className="h-40 bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-purple-200">
            {formData.image ? (
              <img
                src={formData.image}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              "Foto"
            )}
          </div> */}
          {/* Nama & Catatan */}
          <div className="w-full">
            <input
              className="w-full border p-3 rounded-xl"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Nama Goals"
            />
            {/* <textarea
              className="w-full border p-3 rounded-xl h-20"
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
              placeholder="Catatan"
            /> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-xs font-bold text-gray-500">
              Target Harga
            </label>
            <input
              type="number"
              className="w-full border p-3 rounded-xl"
              value={formData.targetPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  targetPrice: Number(e.target.value),
                })
              }
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500">
              Dana Saat Ini
            </label>
            <div className="w-full border p-3 rounded-xl bg-gray-50 text-gray-500">
              Rp {formatRupiah(formData.allocation)}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500">
              Tambah Dana dari Tabungan
            </label>
            <input
              type="number"
              className={`w-full border p-3 rounded-xl ${isOverLimit ? "border-red-500" : ""
                }`}
              onChange={(e) => setTambahDana(Number(e.target.value))}
              placeholder="0"
            />
          </div>
          <div className="bg-purple-50 p-4 rounded-xl text-center">
            <p className="text-[10px] font-bold text-purple-400">
              DANA TABUNGAN TERSEDIA
            </p>
            <p className="font-black text-purple-700">
              Rp {formatRupiah(totalTabungan)}
            </p>
          </div>
        </div>

        {/* Kalkulasi Sisa */}
        <div className="bg-purple-50 p-4 rounded-xl mt-4 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-gray-500">
              Dana setelah ditambahkan
            </p>
            <p className="font-bold text-green-600">
              Rp {formatRupiah(danaSetelah)}
            </p>
          </div>
          <p className="text-xl">→</p>
          <div className="text-right">
            <p className="text-[10px] text-gray-500">Sisa Tabungan</p>
            <p className="font-bold text-purple-700">
              Rp {formatRupiah(sisaTabungan)}
            </p>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-3 border rounded-xl font-bold"
          >
            Batal
          </button>
          <button
            disabled={isOverLimit}
            onClick={handleSave}
            className={`flex-1 py-3 rounded-xl font-bold text-white ${isOverLimit
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#8b5cf6]"
              }`}
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGoalPopup;
