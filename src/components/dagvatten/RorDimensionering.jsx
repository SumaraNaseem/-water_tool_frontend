import React, { useState } from "react";

export default function RorDimensionering() {
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
            <span className="text-sm font-medium">Rördimension beräknad!</span>
          </div>
        </div>
      )}
      {/* Main Title */}
      <div className=" mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Rördimensionering enligt Manning
        </h2>
      </div>

      {/* Input Parameters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        {/* Flöde */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 ">
          <label className="text-sm font-medium text-gray-700 ">
            <i className="fas fa-tint text-gray-600 text-lg mr-2"></i>
            Flöde (l/s)
          </label>

          <input
            type="number"
            defaltvalue={3645}
            step="5"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* Lutning */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-angle-down text-gray-600 text-lg mr-2"></i>
            Lutning (%)
          </label>
          <input
            type="number"
            defaltvalue="5"
            step="0.1"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* Rörtyp */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-circle text-gray-600 text-lg mr-2"></i>
            Rörtyp
          </label>
          <select className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium">
            <option value="plast">Plast (n=0.009)</option>
            <option value="betong">Betong (n=0.013)</option>
            <option value="stål">Stål (n=0.011)</option>
          </select>
        </div>

        {/* Fyllnadsgrad */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-percent text-gray-600 text-lg mr-2"></i>%
            Fyllnadsgrad (%)
          </label>
          <input
            type="number"
            defaltvalue="70"
            min="0"
            max="100"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>
        {/* Max diameter */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-arrows-alt-h text-gray-600 text-lg mr-2"></i>
            Max diameter (mm)
          </label>
          <input
            type="number"
            defaltvalue="1000"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* Max hastighet */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4 hover:-translate-y-1 transition-all duration-300 ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-tachometer-alt text-gray-600 text-lg mr-2"></i>
            Max hastighet (m/s)
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
        Beräkna Rördimension
      </button>

      

      {/* Calculation Results Section */}
      <div className="bg-green-50 border-l-4 border-green-500  rounded-xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">
          Rördimensioneringsresultat
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">
          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase">
              Rekommenderad diameter
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-400">mm</div>
          </div>

          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase">
              Flödeshastighet 0
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-400">m/s</div>
          </div>

          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-500 mb-1 uppercase">
              Hydraulisk radie
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-400">m</div>
          </div>

          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-semibold text-gray-500 mb-1  uppercase">
              Kapacitetsutnyttjande
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-400">%</div>
          </div>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-gray-50 border-[1.5px] mb-4 border-gray-200 rounded-xl p-3 shadow-sm">
        <p className="text-sm font-mono text-gray-600 text-center">
          Manning's ekvation: v = (1/n) × R^(2/3) × S^(1/2)
        </p>
      </div>

      {/* Graph Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Rörkapacitet vs Diameter
        </h3>
        <p className="text-gray-600 mb-6">
          Rörkapacitet för plastic rör (lutning 5%)
        </p>

        {/* Legend */}
        <div className="flex items-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-700">Kapacitet (l/s)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 border-t-2 border-dashed border-red-500"></div>
            <span className="text-sm text-gray-700">Aktuellt flöde</span>
          </div>
        </div>

        {/* Graph Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-bar text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600">
              Bar chart visualization will be implemented here
            </p>
            <p className="text-sm text-gray-500 mt-2">
              X-axis: Rördiameter (mm) | Y-axis: Kapacitet (l/s)
            </p>
          </div>
        </div>
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border-[2px] border-blue-400 rounded-lg p-5">
        <div className="flex items-start gap-3">
          <div>
            <h3 className="font-medium text-blue-800 text-ms  mb-4">
              <i className="fas fa-info-circle text-blue-800 text-xs mr-1"></i>
              Manning's ekvation
            </h3>
            <p className="text-[12px] font-medium text-blue-800 leading-relaxed">
              Manning's ekvation används för att beräkna flödeshastighet i rör
              och öppna kanaler. Strävhetsfaktorn (n) varierar beroende på
              rörens material och kondition. Lägre n-värden ger högre kapacitet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
