import React, { useState } from 'react';

export default function Grunddimensionering() {
  const [showNotification, setShowNotification] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [activeResultTab, setActiveResultTab] = useState('stationsanalys');

  

  const handleTabClick = (tabType) => {
    setActiveResultTab(tabType);
    setShowNotification(true);
    setIsAnimatingOut(false);
    setTimeout(() => {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setShowNotification(false);
        setIsAnimatingOut(false);
      }, 3000);
    }, 400);
  };

  const renderResultsContent = () => {
    switch (activeResultTab) {
      case 'stationsanalys':
        return (
          
      <div className="bg-blue-50 border-l-4 border-green-500  rounded-xl px-6 py-8 mb-6">
            <div className="flex items-center gap-2 mb-4">
          <i className="fas fa-chart-bar text-[#667eea]"></i>
          <h3 className="text-lg font-semibold text-gray-800">Pumpstationsanalys - Resultat</h3>
        </div>

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
        );

      case 'specifikation':
        return (
          <div className="">
            
          </div>
        );

      case 'optimera':
        return (
          <div className="">
            
            {/*  */}
          </div>
        );

      case 'kalkyl':
        return (
          <div className="">
           
            {/*  */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg px-6">
      {/* Notification */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 ${isAnimatingOut ? 'animate-slide-out' : 'animate-slide-in'}`}>
          <div className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">Analys genomförd!</span>
          </div>
        </div>
      )}

      

      {/* Input Parameters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {/* 1 */}
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

        {/* 2 */}
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

        {/* 3 */}
        <div className="border-[2px] border-blue-50  hover:border-[#667eea] rounded-xl p-4  hover:-translate-y-1 transition-all duration-300  ">
          <label className="text-sm font-medium text-gray-700">
            <i className="fas fa-clock text-gray-600 text-sm mr-2"></i>
            Mätningar & Sensorer
          </label>
          <div className="flex flex-col gap-2">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="form-checkbox accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">Nivåmätning (redundant)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="form-checkbox accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">Flödesmätning</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="form-checkbox accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">Flödesmätning</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="form-checkbox accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">Tryckmätning (sug/tryck)</span>
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" className="form-checkbox accent-blue-600 w-4 h-4" />
              <span className="text-sm text-gray-700">Effektmätning</span>
            </label>
          </div>
         
        </div>

        {/* 4 */}
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
       
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-80 flex items-center justify-center mb-6">
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

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-6">

        <button
          onClick={() => handleTabClick('stationsanalys')}
          className={` py-2 rounded-lg text-sm font-medium transition-all ${
            activeResultTab === 'stationsanalys'
              ? 'bg-gradient-to-r from-[#6679e3] to-[#7450a9] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-calculator mr-2"></i>
          Komplett stationsanalys
        </button>

        <button
          onClick={() => handleTabClick('specifikation')}
          className={` py-2 rounded-lg text-sm font-medium transition-all ${
            activeResultTab === 'specifikation'
              ? 'bg-gradient-to-r from-[#6679e3] to-[#7450a9] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-file-alt mr-2"></i>
          Teknisk specifikation
        </button>

        <button
          onClick={() => handleTabClick('optimera')}
          className={`py-2 rounded-lg text-sm font-medium transition-all ${
            activeResultTab === 'optimera'
              ? 'bg-gradient-to-r from-[#6679e3] to-[#7450a9] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-cog mr-2"></i>
          Optimera design
        </button>

        <button
          onClick={() => handleTabClick('kalkyl')}
          className={`py-2 rounded-lg text-sm font-medium transition-all ${
            activeResultTab === 'kalkyl'
              ? 'bg-gradient-to-r from-[#6679e3] to-[#7450a9] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <i className="fas fa-euro-sign mr-2"></i>
          Kalkyl & offert
        </button>
      </div>

      {/* Results Section */}
      <div className="">
        
        {renderResultsContent()}
      </div>
    </div>
  );
}
