import React, { useState } from "react";

export default function Ekonomi() {
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
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Ekonomisk analys slutförd!</span>
          </div>
        </div>
      )}
      {/* Main Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Ekonomisk Analys
        </h2>
      </div>

       {/* Input Parameters Section */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 ">
        {/* 1 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700 ">
            <i className="fas fa-arrows-alt-h text-gray-600 text-sm mr-2"></i>
            Ledningslängd (m)
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
            Rördiameter (mm)
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
            Schaktdjup (m)


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
            Magasinvolym (m³)
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
            Antal pumpstationer
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
            Kalkylperiod (år)
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
        className="bg-blue-400 hover:bg-blue-500 text-white px-8 py-2 rounded-3xl font-semibold text-md transition-colors shadow-lg mb-6 mx-auto"
      >
        <i className="fas fa-calculator  mr-2"></i>
        Beräkna Ekonomisk
      </button>

      {/* Calculation Results Section */}
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-sm mb-6"> 
        <h3 className="text-xl font-bold text-gray-800 mb-4">Ekonomisk Sammanställning</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Totalkostnad</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">Mkr</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Investeringskostnad </h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">Mkr</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Årlig drift</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">kkr</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">kr per m ledning</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">kr/m</div>
          </div>

        </div>
      </div>

       {/* Kostnadsfördelning Chart Section */}
       <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Kostnadsfördelning (kkr)</h3>
        
        {/* Donut Chart Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-pie text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 mb-2">Kostnadsfördelning Donut Chart</p>
            <p className="text-sm text-gray-500">Rörledningar, Schaktning, Magasinering, Projektering</p>
            
            {/* Legend */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Rörledningar</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-gray-700">Schaktning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-700">Magasinering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                <span className="text-gray-700">Projektering</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-blue-100 rounded-xl border-[2px] border-blue-400 px-4 py-7 shadow-sm">
        <h3 className="font-medium text-sm  text-blue-800 mb-4">
          <i className="fas fa-info-circle text-blue-800 text-sm mr-1"></i>
          Ekonomisk beräkning
        </h3>
        <p className="text-sm text-blue-800">
        Kostnaderna baseras på svenska prisexempel från 2024. Investeringskostnader inkluderar material, installation och projektering. Driftskostnader uppskattas till 2% av investeringen årligen.
        </p>
      </div>

     

     
    </div>
  );
}
