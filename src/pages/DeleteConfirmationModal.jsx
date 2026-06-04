import React from "react";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, goal, isDeleting }) => {
  if (!isOpen) return null;

  console.log("Data goal yang diterima modal:", goal);

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
        {/* Ikon Sampah */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <i className="fas fa-trash-alt text-red-500 text-3xl"></i>
          </div>
        </div>

        {/* Teks */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
          Hapus Goals?
        </h2>
        <p className="text-gray-500 text-sm text-center mb-6">
          Apakah kamu yakin ingin menghapus goals ini?
        </p>

        {/* Info Goal */}
        <div className="bg-white border border-gray-100 p-4 rounded-2xl mb-6 shadow-sm flex gap-4">
          {/* <img
            src={goal.image || "/gambar/placeholder.png"}
            alt="goal"
            className="w-16 h-16 rounded-xl object-cover"
          /> */}
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-gray-800">{goal.name}</h3>
            <p className="text-xs text-gray-400">
              Rp {goal.allocation?.toLocaleString("id-ID")} / Rp{" "}
              {goal.targetPrice?.toLocaleString("id-ID")}
            </p>
            <div className="w-32 h-2 bg-gray-100 rounded-full mt-1">
              <div
                className="h-full bg-indigo-400 rounded-full"
                style={{ width: `${goal.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Info Pengembalian */}
        <div className="bg-red-50 p-4 rounded-2xl text-center mb-8">
          <p className="text-xs text-gray-600">
            Dana sebesar{" "}
            <span className="font-bold text-red-500">
              Rp {goal.allocation?.toLocaleString("id-ID")}
            </span>{" "}
            akan dikembalikan...
          </p>
        </div>

        {/* Tombol */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl bg-red-500 text-white font-bold"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus Goals"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
