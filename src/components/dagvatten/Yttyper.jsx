import React, { useState } from "react";

export default function Yttyper() {
  const [showNotification, setShowNotification] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [selectedSurface, setSelectedSurface] = useState("");
  const [runoffCoefficient, setRunoffCoefficient] = useState(0.90);

  // Surface type to coefficient mapping
  const surfaceCoefficients = {
    "Tak/Asfalt": 0.95,
    "Tätbebyggt centrum": 0.85,
    "Blandat urbant": 0.7,
    "Villaområde tätare": 0.6,
    "Villaområde glesare": 0.45,
    "Industriområde": 0.8,
    "Parkmark": 0.3,
    "Skogsmark": 0.15
  };

  const handleSurfaceSelect = (surfaceName) => {
    setSelectedSurface(surfaceName);
    setRunoffCoefficient(surfaceCoefficients[surfaceName]);
    setShowNotification(true);
    setIsAnimatingOut(false);
    // Auto hide notification after 3 seconds
    setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setShowNotification(false);
        setIsAnimatingOut(false);
      }, 300); // Match animation duration
    }, 3000);
  };
  return (
    <div className="bg-white rounded-lg relative">
      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 ${isAnimatingOut ? 'animate-slide-out' : 'animate-slide-in'}`}>
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">{selectedSurface} vald!</span>
          </div>
        </div>
      )}
      {/* Main Title */}
        <h2 className="text-xl font-medium  text-gray-700 mb-6">
          Välj yttyp för avrinningskoefficient
        </h2>
     

      {/* Surface Type Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
        {/* Card 1: Tak/Asfalt */}
        <button 
          onClick={() => handleSurfaceSelect("Tak/Asfalt")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Tak/Asfalt" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-building text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Tak/Asfalt</h3>
            <p className="text-xs text-gray-500 mb-2">Hårdgjorda ytor</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.95</div>
          </div>
        </button>

        {/* Card 2: Tätbebyggt centrum */}
        <button 
          onClick={() => handleSurfaceSelect("Tätbebyggt centrum")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Tätbebyggt centrum" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-city text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Tätbebyggt centrum</h3>
            <p className="text-xs text-gray-500 mb-2">Urban miljö</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.85</div>
          </div>
        </button>

        {/* Card 3: Blandat urbant */}
        <button 
          onClick={() => handleSurfaceSelect("Blandat urbant")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Blandat urbant" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-home text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Blandat urbant</h3>
            <p className="text-xs text-gray-500 mb-2">Blandad bebyggelse</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.7</div>
          </div>
        </button>

        {/* Card 4: Villaområde tätare */}
        <button 
          onClick={() => handleSurfaceSelect("Villaområde tätare")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Villaområde tätare" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95 " 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-house-chimney text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Villaområde tätare</h3>
            <p className="text-xs text-gray-500 mb-2">Tät villabebyggelse</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.6</div>
          </div>
        </button>

        {/* Card 5: Villaområde glesare */}
        <button 
          onClick={() => handleSurfaceSelect("Villaområde glesare")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Villaområde glesare" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-tree text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Villaområde glesare</h3>
            <p className="text-xs text-gray-500 mb-2">Gles villabebyggelse</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.45</div>
          </div>
        </button>

        {/* Card 6: Industriområde */}
        <button 
          onClick={() => handleSurfaceSelect("Industriområde")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Industriområde" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-industry text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Industriområde</h3>
            <p className="text-xs text-gray-500 mb-2">Industriell mark</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.8</div>
          </div>
        </button>

        {/* Card 7: Parkmark */}
        <button 
          onClick={() => handleSurfaceSelect("Parkmark")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Parkmark" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-seedling text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Parkmark</h3>
            <p className="text-xs text-gray-500 mb-2">Parker och grönområden</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.3</div>
          </div>
        </button>

        {/* Card 8: Skogsmark */}
        <button 
          onClick={() => handleSurfaceSelect("Skogsmark")}
          className={`border-[2px] rounded-lg p-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
            selectedSurface === "Skogsmark" 
              ? "bg-blue-50 border-[#667eea] shadow-md hover:scale-95" 
              : "bg-white border-gray-100 "
          }`}
        >
          <div className="text-center">
            
              <i className="fas fa-leaf text-[#667eea] text-xl"></i>
            
            <h3 className="font-medium text-sm text-gray-800 py-2">Skogsmark</h3>
            <p className="text-xs text-gray-500 mb-2">Naturlig vegetation</p>
            <div className="text-sm font-bold text-[#667eea]">C = 0.15</div>
          </div>
        </button>
      </div>

      {/* Adjusted Runoff Coefficient Input */}
      <div className=" border-[2px] bg-gray-50 border-gray-150 hover:border-[#667eea] rounded-lg p-4 mb-6">
        <div className=" ">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Anpassad avrinningskoefficient
          </label>
          <input 
            type="number" 
            value={runoffCoefficient}
            onChange={(e) => setRunoffCoefficient(parseFloat(e.target.value))}
            step="0.01"
            min="0"
            max="1"
            className="w-full px-3 py-1 border-[2px]  border-gray-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-sm "
          />
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border-[2px] border-blue-400 rounded-lg p-4">
        <div className="flex items-start gap-3">
          
          <div>
            <h3 className="font-medium text-blue-800 text-xl  mb-2">
            <i className="fas fa-info-circle text-blue-800 text-lg mr-1"></i>
              Avrinningskoefficienter enligt P110
            </h3>
            <p className="text-[12px] font-medium text-blue-800 leading-relaxed">
              Avrinningskoefficienten (C) varierar beroende på marktyp och representerar andelen av nederbörden som blir till ytavrinning. Högre värden indikerar mer hårdgjorda ytor med mindre infiltration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
