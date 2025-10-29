import React, { useState } from "react";

export default function Magasinering() {
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
            <span className="text-sm font-medium">Magasinvolym beräknad!</span>
          </div>
        </div>
      )}
      {/* Main Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Magasinering och Fördröjning
        </h2>
      </div>

      {/* Input Parameters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {/* Flöde */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700 ">
            <i className="fas fa-cube text-gray-600 text-sm mr-2"></i>
            Inflöde (l/s)
          </label>

          <input
            type="number"
            defaltvalue={3645}
            step="5"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* Lutning */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-sign-out-alt text-gray-600 text-sm mr-2"></i>
            Begränsat utflöde (l/s)
          </label>
          <input
            type="number"
            defaltvalue="5"
            step="0.1"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* Rörtyp */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-clock text-gray-600 text-sm mr-2"></i>
            Regnduration (min)
          </label>
          <select className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium">
            <option value="plast">Plast (n=0.009)</option>
            <option value="betong">Betong (n=0.013)</option>
            <option value="stål">Stål (n=0.011)</option>
          </select>
        </div>

        {/* Fyllnadsgrad */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-layer-group text-gray-600 text-sm mr-2"></i>%
            Magasintyp
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
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-shield-alt text-gray-600 text-sm mr-2"></i>
            Säkerhetsfaktor
          </label>
          <input
            type="number"
            defaltvalue="1000"
            className="w-full px-2 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#667eea] text-xs font-medium"
          />
        </div>

        {/* Max hastighet */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-percentage text-gray-600 text-sm mr-2"></i>
            Porositet (%)
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
        Beräkna Magasinvolym
      </button>

      
      {/* Calculation Results Section */}
      <div className="bg-[#cdd5c9] border-l-4 border-green-500  rounded-xl px-6 py-8 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mt-2 mb-6">
          Magasineringsresultat
        </h3>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase">
              NÖDVÄNDIG VOLYM
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">m³</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase">
              REKOMMENDERAD VOLYM
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">m³</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase">
              TÖMMNINGSTID
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">timmar</div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm hover:-translate-y-1 transition-all duration-300 ">
            <h4 className="text-sm font-bold text-gray-500 mb-2 uppercase">
              PEAK REDUKTION
            </h4>
            <div className="text-xl font-bold text-[#667eea]">0</div>
            <div className="text-sm text-gray-500">%</div>
          </div>
        </div>
      </div>

      {/* Time-Series Graph Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Magasinets In- och Utflöde över Tid
        </h3>

        {/* Legend */}
        <div className="flex justify-end gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500"></div>
            <span className="text-sm text-gray-700">Inflöde (l/s)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-500"></div>
            <span className="text-sm text-gray-700">Utflöde (l/s)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-cyan-200 rounded"></div>
            <span className="text-sm text-gray-700">
              Ackumulerad volym (m³)
            </span>
          </div>
        </div>

        {/* Graph Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-80 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 mb-2">Time-Series Graph</p>
            <p className="text-sm text-gray-500">
              X-axis: Tid (min) 0-60 | Y-axis: Flöde (l/s) 0-300 | Volym (m³)
              0-500
            </p>
            <div className="mt-4 text-xs text-gray-400">
              <p>Inflöde: 300 l/s (0-30 min) → 0 l/s</p>
              <p>Utflöde: 50 l/s (0-31 min) → 0 l/s</p>
              <p>Ackumulerad volym: Peak ~450 m³ at 30 min</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-blue-100 rounded-xl border-[2px] border-blue-400 px-4 py-7 shadow-sm">
        <h3 className="font-medium text-sm  text-blue-800 mb-4">
          <i className="fas fa-info-circle text-blue-800 text-sm mr-1"></i>
          Magasineringsberäkning
        </h3>
        <p className="text-sm text-blue-800">
          Magasineringsvolymen beräknas med förbättrad rationell metod där
          skillnaden mellan inflöde och utflöde över regnets varaktighet ger den
          nödvändiga volymen. För underjordiska magasin justeras volymen med
          porositetsfaktorn.
        </p>
      </div>
    </div>
  );
}
