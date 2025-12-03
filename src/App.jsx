import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

export default function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (word) {
      setQrCode(
        `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          word
        )}&size=${size}x${size}&bgcolor=${bgColor}`
      );
    }
  }, [word, size, bgColor]);

  function handleClick() {
    if (temp.trim()) {
      setWord(temp);
    }
  }

  function handleDownload() {
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "QRCode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-4">
      
      {/* GLASS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6"
      >
        
        <h1 className="text-4xl font-extrabold text-center mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 text-transparent bg-clip-text">
          QR Code Generator
        </h1>

        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* INPUT BOX */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter text to encode"
                onChange={(e) => setTemp(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleClick}
                className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg text-white font-semibold"
              >
                Generate
              </motion.button>
            </div>

            {/* GLASS CONTROL BOX */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/20 space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-1">Background Color:</p>
                <input
                  type="color"
                  onChange={(e) => setBgColor(e.target.value.substring(1))}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-1">Dimensions: {size}px</p>
                <input
                  type="range"
                  min="200"
                  max="600"
                  value={size}
                  onChange={(e) => setSize(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* QR CODE BOX */}
          <div className="flex flex-col items-center justify-center space-y-4">
            {qrCode && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative group"
              >
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="rounded-xl border-4 border-transparent bg-gradient-to-r from-indigo-400 to-purple-500 p-[4px] shadow-lg"
                />

                {/* SHIMMER EFFECT */}
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[60%] h-full rotate-12 left-[-150%] group-hover:left-[150%] transition-all duration-1000"></div>
              </motion.div>
            )}

            {qrCode && (
              <motion.button
                whileHover={{ scale: 1.07, y: -3 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleDownload}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-xl font-semibold animate-bounce"
              >
                Download QR Code
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}