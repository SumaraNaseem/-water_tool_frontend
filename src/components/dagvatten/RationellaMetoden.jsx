import React, { useState } from "react";

export default function RationellaMetoden() {
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
            <span className="text-sm font-medium">Beräkning slutförd!</span>
          </div>
        </div>
      )}
      {/* Formula and Input Section */}
      <div className="bg-white  rounded-lg p- mb-6">
        <h2 className="text-xl font-bold  text-gray-700 mb-6">
          Rationella metoden: Q = C × i × A
        </h2>
        
        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-6 ">
          <div className="border-[1.5px] border-blue-50  rounded-lg p-3 bg-gray-50 hover:border-[#667eea] hover:-translate-y-1 translation-all duration-300"> 
            <label className="block text-xs font-[500] text-gray-700 mb-2">Avrinningsområde (ha)</label>
            <input 
              type="number" 
              defaultValue={15}
              className="w-full px-1 py-1 border border-gray-300 text-xs  rounded-md focus:outline-none focus:ring-[1px] focus:ring-gray-300"
            />
          </div>

          <div className="border-[1.5px] border-blue-50  rounded-lg p-3 bg-gray-50 hover:border-[#667eea] hover:-translate-y-1 translation-all duration-300">
            <label className="block text-xs font-[500] text-gray-700 mb-2">Återkomsttid (år)</label>
            <select className="w-full px-1 py-1 border border-gray-300 text-xs whitespace-nowrap rounded-md focus:outline-none focus:ring-[1px] focus:ring-[#667eea]">
              <option value="10">10 år (Stamledningar)</option>
              <option value="5">5 år</option>
              <option value="20">20 år</option>
            </select>
          </div>

          <div className="border-[1.5px] border-blue-50  rounded-lg p-3 bg-gray-50 hover:border-[#667eea] hover:-translate-y-1 translation-all duration-300">
            <label className="block text-xs font-[500] text-gray-700 mb-2">Koncentrationstid (min)</label>
            <input 
              type="number" 
              defaultValue={15} 
              className="w-full px-1 py-1 border border-gray-300 text-xs whitespace-nowrap  rounded-md focus:outline-none focus:ring-[1px] focus:ring-gray-300"
             
            />
          </div>

          <div className="border-[1.5px] border-blue-50  rounded-lg p-3 bg-gray-50 hover:border-[#667eea] hover:-translate-y-1 translation-all duration-300">
            <label className="block text-xs font-[500] text-gray-700 mb-2">Klimatfaktor</label>
            <select className="w-full px-1 py-1 border border-gray-300 text-xs whitespace-nowrap  rounded-md focus:outline-none focus:ring-[1px] focus:ring-[#667eea]">
              <option value="1.2">1.2 (Rekommenderad 2050)</option>
              <option value="1.0">1.0 (Nuvarande)</option>
              <option value="1.4">1.4 (Konservativ)</option>
            </select>
          </div>

          <div className="border-[1.5px] border-blue-50  rounded-lg p-3 bg-gray-50 hover:border-[#667eea] hover:-translate-y-1 translation-all duration-300">
            <label className="block text-xs font-[500] text-gray-700 mb-2">Säkerhetsfaktor (för systemdesign)</label>
            <input 
              type="number" 
              defaultValue={1.0} 
              step="0.1"
              className="w-full px-1 py-1 border border-gray-300 text-xs whitespace-nowrap  rounded-md focus:outline-none focus:ring-[1px] focus:ring-gray-300"
             
            />
            <p className="text-xs text-gray-500 mt-1">
              Enligt P110: Säkerhet hanteras genom systemdesign, inte formelberäkning
            </p>
          </div>

          <div className="border-[1.5px] border-blue-50  rounded-lg p-3 bg-gray-50 hover:border-[#667eea] hover:-translate-y-1 translation-all duration-300">
            <label className="block text-xs font-[500] text-gray-700 mb-2">SMHI Station</label>
            <select className="w-full px-1 py-1 border border-gray-300 text-xs whitespace-nowrap  rounded-md focus:outline-none focus:ring-[1px] focus:ring-[#667eea]">
              <option value="lidkoping">Lidköping</option>
              <option value="stockholm">Stockholm</option>
              <option value="goteborg">Göteborg</option>
            </select>
          </div>

        </div>

        {/* Calculate Button */}
        <div className="text-center mb-6">
          <button 
            onClick={handleCalculate}
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-3xl font-medium text-sm transition-colors"
          >
            Beräkna Dimensionerande Flöde
          </button>
        </div>

        {/* Calculated Formula Display */}
        <div className="bg-gray-50 border-[1.5px] border-gray-200 rounded-xl p-3 shadow-sm">
          <p className="text-sm font-mono text-gray-600 text-center">
            Q = C × i_klimat × A = 0.90 × 270.0 × 15 = 3645.0 l/s
          </p>
        </div>
      </div>

      {/* Calculation Results Section */}
      <div className="bg-green-50 border-l-4 border-green-500  rounded-xl p-6 mb-6">

        <h3 className="text-xl font-bold text-gray-700 mb-4">Beräkningsresultat</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3">

          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 translation-all duration-300">
            <h4 className="text-sm font-semibold text-gray-600 mb-1 uppercase">DIMENSIONERANDE FLÖDE</h4>
            <div className="text-xl font-bold text-[#667eea]">3645.0</div>
            <div className="text-sm text-gray-500">l/s</div>
          </div>
          
          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 translation-all duration-300">
            <h4 className="text-sm font-semibold text-gray-606 mb-1 uppercase">REGNINTENSITET</h4>
            <div className="text-xl font-bold text-[#667eea]">270.0</div>
            <div className="text-sm text-gray-500">l/s-ha</div>
          </div>
          
          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 translation-all duration-300">
            <h4 className="text-sm font-semibold text-gray-606 mb-1 uppercase">AVRINNINGSKOEFFICIENT</h4>
            <div className="text-xl font-bold text-[#667eea]">0.90</div>
            <div className="text-sm text-gray-500">-</div>
          </div>
          
          <div className="bg-white  shadow-sm rounded-xl border border-white p-3 text-center hover:-translate-y-1 translation-all duration-300">
            <h4 className="text-sm font-semibold text-gray-606 mb-1  uppercase">KLIMATFAKTOR</h4>
            <div className="text-xl font-bold text-[#667eea]">1.2</div>
            <div className="text-sm text-gray-500">-</div>
          </div>
        </div>
      </div>

      {/* Calculation Information Section */}
      <div className="bg-[#c7e5fc] border-[2px] border-[#59b0f6] rounded-lg p-4">
        <div className="flex items-center text-blue-800 gap-1 py-4">
          <i className="fas fa-info-circle  text-xl"></i>
          <h3 className="text-xl font-bold ">Beräkningsinformation</h3>
        </div>
        
        <div className="space-y-1">
          {/* Step 1 */}
          <div className="bg-[#e8f5e8] border-l-4 border-[#667eea] rounded-r-lg p-2">
            <h4 className="font-semibold text-blue-800 ">Steg 1 - Basregnintensitet:
            <span className="text-sm font-mono text-blue-700 ml-1">225.0 l/s-ha från IDF-kurvor</span>
            </h4>
            <p className="text-sm text-blue-700">Baserat på återkomsttid 10 år och koncentrationstid 15 min</p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-[#e3f2fd] border-l-4 border-[#667eea] rounded-r-lg p-2">
          <h4 className="font-semibold text-blue-800 ">Steg 2 - Klimatjustering:
            <span className="text-sm font-mono text-blue-700 ml-1">225.0 × 1.2 = 270.0 l/s-ha</span>
            </h4>
            <p className="text-sm text-blue-700">Klimatfaktor 1.2 för framtida klimatförändringar</p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-[#f3e4f5] border-l-4 border-[#667eea] rounded-r-lg p-2">
            <h4 className="font-semibold text-blue-800 ">Steg 3 - Rationella metoden <span className="text-sm font-mono text-blue-700 ml-1">Q = C × i × A = 0.90 × 270.0 × 15 = 3645.0 l/s</span></h4>
            
            <p className="text-sm text-blue-700">C = avrinningskoefficient, i = klimatjusterad regnintensitet, A = avrinningsområde</p>
          </div>
          {/* P110 Note */}
        <div className="bg-[#fff3cc] border-l-4 border-yellow-300 rounded-r-lg p-2 ">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-blue-800 "> 
                <i className="fas fa-exclamation-triangle text-blue-800 text-lg mr-1"></i>
                P110 KORREKT METOD:<span className="text-sm font-mono text-blue-700 ml-1">Säkerhetsmarginaler hanteras genom systemdesign, inte formelberäkning</span> 
              </h4>
              <p className="text-sm text-blue-700">Använd konservativa parametrar och dimensionera systemkomponenter med reservkapacitet</p>
            </div>
          </div>
        </div>
        </div>
        
        
      </div>
    </div>
  );
}
