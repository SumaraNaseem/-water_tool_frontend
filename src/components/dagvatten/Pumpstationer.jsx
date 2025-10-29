import React, { useState } from "react";

export default function Pumpstationer() {
  const [showNotification, setShowNotification] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleCalculate = () => {
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
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Pumpsystem beräknat!</span>
          </div>
        </div>
      )}
      {/* Main Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Pumpstationer
        </h2>
      </div>

      {/* Input Parameters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 ">
        {/* 1 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700 ">
            <i className="fas fa-arrows-alt-h text-gray-600 text-sm mr-2"></i>
            Pumpkapacitet (l/s)
          </label>

          <input
            type="number"
            defaltvalue={3645}
            step="5"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* 2 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-arrows-alt-v text-gray-600 text-sm mr-2"></i>
            Lyfthöjd (m)
          </label>
          <input
            type="number"
            defaltvalue="5"
            step="0.1"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* 3 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-ruler text-gray-600 text-sm mr-2"></i>
            Verkningsgrad (%)

          </label>
          <select className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium">
            <option value="plast">Plast (n=0.009)</option>
            <option value="betong">Betong (n=0.013)</option>
            <option value="stål">Stål (n=0.011)</option>
          </select>
        </div>

        {/* 4 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-route text-gray-600 text-sm mr-2"></i>%
            Pumpbrunn volym (m³)
          </label>
          <input
            type="number"
            defaltvalue="70"
            min="0"
            max="100"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>
        {/* 5  */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className=" fas fa-angle-down text-gray-600 text-sm mr-2"></i>
            Antal pumpar
          </label>
          <input
            type="number"
            defaltvalue="1000"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* 6  */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-seedling text-gray-600 text-sm mr-2"></i>
            Elkostnad (kr/kWh)
          </label>
          <input
            type="number"
            defaltvalue={3.0}
            step="0.1"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>
      </div>

      {/* Calculate Button */}

      <button 
        onClick={handleCalculate}
        className="bg-green-600 hover:bg-green-500 text-white px-8 py-2 rounded-3xl font-semibold text-md transition-colors shadow-lg mb-6 mx-auto"
      >
        <i className="fas fa-calculator  mr-2"></i>
        Beräkna Pumpsystem
      </button>

      {/* Calculation Results Section */}
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-sm mb-6"> 
        <h3 className="text-xl font-bold text-gray-800 mb-4">Pumpstationsresultat</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Effektbehov</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">kw</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Årlig elkostnad </h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">kr</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Starttider/timme</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">st</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Redundans</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">%</div>
          </div>

        </div>
      </div>

     

      


     {/* Information Section */}
     <div className="bg-blue-100 rounded-xl border-[2px] border-blue-400 px-4 py-7 shadow-sm">
        <h3 className="font-medium text-sm  text-blue-800 mb-4">
          <i className="fas fa-info-circle text-blue-800 text-sm mr-1"></i>
          Pumpberäkning
        </h3>
        <p className="text-sm text-blue-800">
        Hydraulisk effekt: P = Q × H × ρ × g, där Q är flöde, H är lyfthöjd, ρ är vattnets densitet och g är tyngdacceleration. Eleffekten beräknas genom att dela med verkningsgraden.
        </p>
      </div>

    </div>
  );
}
