import React, { useState } from "react";

const ScanStrukModal = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 font-poppins">
      <div className="bg-white rounded-[2rem] w-full max-w-[400px] p-6 shadow-xl">
        <h2 className="text-lg font-extrabold text-gray-900 mb-2">
          Unggah Struk
        </h2>
        <p className="text-xs text-gray-400 mb-6">
          Pilih dokumen struk belanja kamu untuk diproses AI.
        </p>

        {/* Area Upload */}
        <div
          onClick={() => document.getElementById("fileInput").click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl py-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#8477e4] transition-all"
        >
          <i className="fas fa-file-upload text-3xl text-gray-300 mb-3"></i>
          <p className="text-xs font-bold text-gray-500">
            {selectedFile ? selectedFile.name : "Klik untuk pilih file"}
          </p>
        </div>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf"
        />

        {/* Tombol Aksi */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl text-xs font-bold text-gray-500 bg-gray-100"
          >
            Batal
          </button>
          <button
            disabled={!selectedFile}
            onClick={() => {
              onUpload(selectedFile);
              onClose();
            }}
            className={`flex-1 py-3 rounded-xl text-xs font-bold text-white ${selectedFile ? "bg-[#8477e4]" : "bg-gray-300"}`}
          >
            Proses Scan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanStrukModal;
