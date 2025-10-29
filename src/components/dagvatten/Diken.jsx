import React, { useState } from "react";

export default function Diken() {
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
            <span className="text-sm font-medium">Dikekapacitet beräknad!</span>
          </div>
        </div>
      )}
      {/* Main Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Diken och Svackdiken
        </h2>
      </div>

      {/* Input Parameters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6 ">
        {/* 1 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700 ">
            <i className="fas fa-arrows-alt-h text-gray-600 text-sm mr-2"></i>
            Bottbredd (m)
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
            Djup (m)
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
            Släntskröning 1:n
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
            Längd (m)
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
            Längslutning (‰)
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
            Vegetation
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
        Beräkna Dikekapacitet
      </button>

      {/* Calculation Results Section */}
      <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6 shadow-sm mb-6"> 
        <h3 className="text-xl font-bold text-gray-800 mb-4">Dikeberäkning</h3>
        
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Maxkapacitet</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">l/s</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Våt area </h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">m²</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Flödeshastighet</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">m/s</div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-600 mb-2 uppercase">Totalvolym</h4>
            <div className="text-3xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">m³</div>
          </div>

        </div>
      </div>

      {/* Dikeprofil och Vattennivå Graph Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm ">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Dikeprofil och Vattennivå</h3>
        <p className="text-sm text-gray-600 mb-4">Dikeprofil: Bottbredd 1m, Djup 0.8m, Släntskröning 1:3</p>
        
        {/* Legend */}
        <div className="flex justify-end gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-amber-800 rounded"></div>
            <span className="text-sm text-gray-700">Dikeprofil</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-blue-300 rounded"></div>
            <span className="text-sm text-gray-700">Vattennivå (80% fyllnad)</span>
          </div>
        </div>

        {/* Graph Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-area text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 mb-2">Dikeprofil och Vattennivå Graph</p>
            <p className="text-sm text-gray-500">Y-axis: Höjd (m) 0 to -0.8 | X-axis: Bredd (m) -3 to 3</p>
            <div className="mt-4 text-xs text-gray-400">
              <p>Dikeprofil: Trapezoidal shape with 1:3 slope</p>
              <p>Vattennivå: 80% fill level at -0.15m depth</p>
            </div>
          </div>
        </div>
      </div>

      


      {/* Information Section */}
      <div className="bg-blue-100 rounded-xl border-[2px] border-blue-400 px-4 py-7 shadow-sm">
        <h3 className="font-medium text-sm  text-blue-800 mb-4">
          <i className="fas fa-info-circle text-blue-800 text-sm mr-1"></i>
          Dikeberäkning
        </h3>
        <p className="text-sm text-blue-800">
        Dikekapaciteten beräknas med enkla hydrauliska formler baserade på mannings formel. Resultatet är en grov uppskattning av dikekapaciteten baserad på ytterligare förenklade antaganden.
        </p>
      </div>
    </div>
  );
}
