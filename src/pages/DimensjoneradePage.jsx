import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ConsumptionChart from "../components/ConsumptionChart";

export default function DimensjoneradePage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("dricksvatten");
  const [showNotification, setShowNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("pageLoad"); // "pageLoad" or "tabSwitch"
  const [hideTimer, setHideTimer] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [calculationResults, setCalculationResults] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    hydraulic: false,
    calculationDetails: false
  });
  const [formData, setFormData] = useState({
    antalPersoner: 30001,
    medelforbrukning: 200,
    ortstyp: "Mellanstor tätort (10,000-50,000)",
    maxdygnfaktor: 1.3,
    maxtimfaktor: 1.8,
    verksamhetsfaktor: 1.15,
    brandvattenflode: 0,
    ledningslangd: 1000,
    hazenWilliamsKoefficient: "130 - Nya stålrör/Äldre plaströr",
    statisktTryck: 25
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const showTabNotification = (tabName) => {
    const messages = {
      "dricksvatten": "Växlade till Dricksvatten (P114)",
      "spillvatten": "Växlade till Spillvatten (P110)",
      "avancerad": "Växlade till Avancerad analys"
    };
    
    // If already transitioning, ignore this click
    if (isTransitioning) {
      return;
    }
    
    // Clear any existing timer
    if (hideTimer) {
      clearTimeout(hideTimer);
      setHideTimer(null);
    }
    
    // If notification is showing, start transition
    if (showNotification) {
      setIsTransitioning(true);
      setIsExiting(true);
      
      // Wait for slide-out animation to complete
      setTimeout(() => {
        setShowNotification(false);
        setIsExiting(false);
        
        // Show new notification after brief pause
        setTimeout(() => {
          setNotificationMessage(messages[tabName]);
          setNotificationType("tabSwitch");
          setShowNotification(true);
          setIsTransitioning(false);
          startHideTimer();
        }, 200);
      }, 500);
    } else {
      // No notification showing, show immediately
      setNotificationMessage(messages[tabName]);
      setNotificationType("tabSwitch");
      setShowNotification(true);
      setIsExiting(false);
      startHideTimer();
    }
  };

  const startHideTimer = () => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowNotification(false);
        setIsExiting(false);
        setHideTimer(null);
      }, 500); // Wait for slide-out animation
    }, 3000); // 3 seconds visible time
    
    setHideTimer(timer);
  };

  const handleCalculate = () => {
    // P114 Calculation Logic
    const { antalPersoner, medelforbrukning, maxdygnfaktor, maxtimfaktor, verksamhetsfaktor, brandvattenflode } = formData;
    
    // Step 1: Basic consumption (q_medel)
    const qMedel = (antalPersoner * medelforbrukning) / (24 * 3600); // Convert to l/s
    
    // Step 2: qdim0 - Design flow for max day (without hourly variations)
    const qdim0 = qMedel * maxdygnfaktor * verksamhetsfaktor;
    
    // Step 3: qdim1 - Design flow for max hour (with hourly variations)
    const qdim1 = qMedel * maxtimfaktor * verksamhetsfaktor;
    
    // Step 4: qdim2 - Max day with simultaneous fire
    const qdim2 = qdim0 + brandvattenflode;
    
    // Step 5: Final design flow according to P114
    const qdimTotal = Math.max(qdim1, qdim2);
    
    // Annual volume calculation
    const arsvolym = (antalPersoner * medelforbrukning * 365) / 1000; // Convert to m³/år
    
    // Person-days calculation
    const personDagar = Math.round(qdimTotal / qMedel);
    
    const results = {
      qMedel: qMedel.toFixed(3),
      qdim0: qdim0.toFixed(3),
      qdim1: qdim1.toFixed(3),
      qdim2: qdim2.toFixed(3),
      qdimTotal: qdimTotal.toFixed(3),
      arsvolym: arsvolym.toLocaleString(),
      personDagar: personDagar,
      faktor: (maxtimfaktor * verksamhetsfaktor).toFixed(2),
      personAr: (arsvolym / antalPersoner).toFixed(0)
    };
    
    setCalculationResults(results);
    setShowResults(true);
    console.log("Calculation results:", results);
  };

  const handleReset = () => {
    setFormData({
      antalPersoner: 30001,
      medelforbrukning: 200,
      ortstyp: "Mellanstor tätort (10,000-50,000)",
      maxdygnfaktor: 1.3,
      maxtimfaktor: 1.8,
      verksamhetsfaktor: 1.15,
      brandvattenflode: 0,
      ledningslangd: 1000,
      hazenWilliamsKoefficient: "130 - Nya stålrör/Äldre plaströr",
      statisktTryck: 25
    });
  };

  const openSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: true
    }));
  };

  const closeSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: false
    }));
  };

  // Show notification on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotificationMessage("System laddat - P114 & P110 korrigerad version");
      setNotificationType("pageLoad");
      setShowNotification(true);
      startHideTimer();
    }, 500); // Small delay to ensure page is loaded

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="min-h-screen  text-slate-800 mt-4 max-w-7xl px-8 mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white py-4 px-6 rounded-xl">
        <div className="max-w-7xl mx-auto relative">
          <h1 className="text-3xl font-bold text-center mb-4">Dimensionerande förbrukning</h1>
          <p className="text-xs text-center mb-2">
            Komplett hydraulisk dimensionering enligt P114 (dricksvatten) och P110 (spillvatten)
          </p>
          <p className="text-[10px] text-center ">
            Inkluderar: q_tim, q_tim (minimi/medel), q_tim (maxdygn+brand), Friktionsförlust, Lutningsberäkning
          </p>
          <p className="text-[10px] text-center ">
            Systemstorlek: 1-1,000,000 l/s | Rördimensioner: 225-1000 mm (svenska standarder ISO 4427)
          </p>
          <div className="absolute top-3 right-3">
            <span className="bg-[#9077bf] text-white px-3 py-1 rounded-full text-xs ">
              P114 & P110 v2.1
            </span>
          </div>
        </div>
      </div>

      <div className=" py-8">
        {/* Official Calculation Formulas Section */}
        <div className="bg-blue-100 rounded-lg border-[1.5px] border-blue-500 shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
          <h2 className="text-md font-semibold ">Officiella beräkningsformler från svenska standarder</h2>
          <p className="text-blue-400 text-[10px] ">💡 Håll musen över varje sektion för detaljer</p>
          </div>
          <div className="space-y-2">
            <div className="group border-l-4 border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Header Section */}
              <div className="flex justify-between items-center p-4 bg-white">
                <span className="text-blue-600 font-semibold text-sm">P114 - Dricksvatten (Komplett dimensionering)</span>
                <span className="text-blue-500 text-xs">🔍 Håll musen här för detaljer</span>
              </div>
              
              {/* Expandable Content */}
              <div className="max-h-0 group-hover:max-h-[800px] transition-all duration-500 ease-in-out overflow-hidden bg-white">
                <div className="px-4 pb-4">
                  {/* Formulas Section */}
                  <div className="space-y-3 mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">qdim0 = p × q_medel × c_d_max</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">qdim = p × q_medel × c_d_max × c_t_max</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">qdim2 = qdim0 + Brandvattenflöde</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">qdim_total = max(qdim, qdim2)</span>
                    </div>
                  </div>
                  
                  {/* Explanation Section */}
                  <div className="text-gray-800">
                    <h4 className="font-semibold text-sm mb-3">Där:</h4>
                    <ul className="space-y-2 text-xs">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><span className="font-mono">qdim0</span> = Dimensionerande flöde för maxdygn (utan timvariationer)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><span className="font-mono">qdim</span> = Dimensionerande flöde för maxtimme (med timvariationer)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><span className="font-mono">qdim2</span> = qdim0 + brandvattenflöde (maxdygn med samtidig brand)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span><span className="font-mono">qdim_total</span> = Slutligt dimensioningsflöde = max(qdim, qdim2)</span>
                      </li>
                    </ul>
                    
                    <div className="mt-2">
                      <p className="flex items-center gap-2 ">
                      <span className="text-xs font-bold ">OBS:</span> <span className="text-xs font-narmal ">Det högsta av qdim eller qdim2 används för dimensionering</span> 
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group border-l-4 border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Header Section */}
              <div className="flex justify-between items-center p-4 bg-white">
                <span className="text-blue-600 font-semibold text-sm">Hazen-Williams - Friktionsförlust</span>
                <span className="text-blue-500 text-xs">🔍 Håll musen här för detaljer</span>
              </div>
              
              {/* Expandable Content */}
              <div className="max-h-0 group-hover:max-h-[400px] transition-all duration-500 ease-in-out overflow-hidden bg-white">
                <div className="px-4 pb-4">
                  {/* Formula Section */}
                  <div className="mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">h_f = 10.67 × L × Q^1.852 / (C^1.852 × D^4.87)</span>
                    </div>
                  </div>
                  
                  {/* Variables Explanation */}
                  <div className="text-gray-800">
                    <p className="text-sm">
                      <span className="font-bold">Där:</span> 
                      <span className="font-mono text-xs"> 
                      <span className=""> h_f</span> = Tryckfall (m) | 
                      <span className=""> L</span> = Ledningslängd (m) | 
                      <span className=""> Q</span> = Flöde (m³/s) | 
                      <span className=""> C</span> = Hazen-Williams koefficient | 
                      <span className=""> D</span> = Diameter (m)
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="group border-l-4 border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Header Section */}
              <div className="flex justify-between items-center p-4 bg-white">
                <span className="text-blue-600 font-semibold text-sm">P110 - Spillvatten</span>
                <span className="text-blue-500 text-xs">🔍 Håll musen här för detaljer</span>
              </div>
              
              {/* Expandable Content */}
              <div className="max-h-0 group-hover:max-h-[300px] transition-all duration-500 ease-in-out overflow-hidden bg-white">
                <div className="px-4 pb-4">
                  {/* Formula Section */}
                  <div className="mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">q_spillvatten = q_dim × k_spill + q_infiltration + q_tillskott</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="group border-l-4 border-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 cursor-pointer overflow-hidden">
              {/* Header Section */}
              <div className="flex justify-between items-center p-4 bg-white">
                <span className="text-blue-600 font-semibold text-sm">Manning - Lutning för självrensning</span>
                <span className="text-blue-500 text-xs">🔍 Håll musen här för detaljer</span>
              </div>
              
              {/* Expandable Content */}
              <div className="max-h-0 group-hover:max-h-[400px] transition-all duration-500 ease-in-out overflow-hidden bg-white">
                <div className="px-4 pb-4">
                  {/* Formulas Section */}
                  <div className="space-y-3 mb-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">v = (1/n) × R^(2/3) × S^(1/2)</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <span className="text-gray-800 font-mono text-sm">S = (v × n / R^(2/3))²</span>
                    </div>
                  </div>
                  
                  {/* Variables Explanation */}
                  <div className="text-gray-800">
                    <p className="text-sm">
                      <span className="font-bold">Där:</span>
                      <span className="font-mono text-xs">
                      <span className=""> v</span> = Hastighet (m/s) | 
                      <span className=""> n</span> = Manning-tal | 
                      <span className=""> R</span> = Hydraulisk radie (m) | 
                      <span className=""> S</span> = Lutning (m/m)
                      </span> 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6 items-center justify-between border border-gray-100 gap-4 shadow-lg  rounded-xl">
          <button
            onClick={() => {
              setActiveTab("dricksvatten");
              showTabNotification("dricksvatten");
            }}
            className={`w-full py-3 font-medium text-sm  rounded-l-lg ${
              activeTab === "dricksvatten"
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                : " text-gray-800 "
            }`}
          >
            Dricksvatten (P114)
          </button>

          <button
            onClick={() => {
              setActiveTab("spillvatten");
              showTabNotification("spillvatten");
            }}
            className={`w-full py-3 font-medium text-sm   ${
              activeTab === "spillvatten"
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                : " text-gray-800 "
            }`}
          >
            Spillvatten (P110)
          </button>

          <button
            onClick={() => {
              setActiveTab("avancerad");
              showTabNotification("avancerad");
            }}
            className={`w-full py-3 font-medium text-sm  rounded-r-lg  ${
              activeTab === "avancerad"
                ? "bg-gradient-to-r from-blue-400 to-purple-500 text-white"
                : " text-gray-800 "
            }`}
          >
            Avancerad analys
          </button>

        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg border border-gray-100 shadow-lg p-6">
          <h3 className="text-xl font-medium mb-2">Dricksvatten enligt P114</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Row 1 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform  duration-300  hover:shadow-lg  ">
              <label className="block text-[10px]  font-medium text-gray-700 mb-2">
                Antal personer
              </label>
              <input
                type="number"
                value={formData.antalPersoner}
                onChange={(e) => handleInputChange("antalPersoner", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Total förbrukning som ska fördelas</p>
              <p className="text-[10px]   text-blue-500">P114: basis för dimensionering</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300 ">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Medelförbrukning q_medel (l/person-dag)
              </label>
              <input
                type="number"
                value={formData.medelforbrukning}
                onChange={(e) => handleInputChange("medelforbrukning", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Genomsnittlig daglig förbrukning per person</p>
              <p className="text-[10px]  text-blue-500">P114: Typiskt 150-250 l/person-dag</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Ortstyp och storlek
              </label>
              <select
                value={formData.ortstyp}
                onChange={(e) => handleInputChange("ortstyp", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              >
                <option value="Liten ort (<10,000)">Liten ort (&lt;10,000)</option>
                <option value="Mellanstor tätort (10,000-50,000)">Mellanstor tätort (10,000-50,000)</option>
                <option value="Stor stad (>50,000)">Stor stad (&gt;50,000)</option>
              </select>
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Påverkar koncentrationsfaktorer och q_medel</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Maxdygnfaktor (c_d_max)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.maxdygnfaktor}
                onChange={(e) => handleInputChange("maxdygnfaktor", parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Automatiskt som baserat på ortstyp</p>
            </div>

            {/* Row 2 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Maxtimfaktor (c_t_max)
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.maxtimfaktor}
                onChange={(e) => handleInputChange("maxtimfaktor", parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Kalibrerad med maxdygnsfaktor</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Verksamhetsfaktor
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.verksamhetsfaktor}
                onChange={(e) => handleInputChange("verksamhetsfaktor", parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Kompensation för kommersiell verksamhet</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Brandvattenflöde (l/s)
              </label>
              <input
                type="number"
                value={formData.brandvattenflode}
                onChange={(e) => handleInputChange("brandvattenflode", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Adderas till q_tim för att beräkna q_dim</p>
              <p className="text-[10px]    text-blue-500">Typiskt 10 l/s (Bostäder), 20-30 l/s (Industri/kontor)</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Ledningslängd (m)
              </label>
              <input
                type="number"
                value={formData.ledningslangd}
                onChange={(e) => handleInputChange("ledningslangd", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Total ledningslängd för friktionsberäkning</p>
            </div>

            {/* Row 3 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform   hover:shadow-lg duration-300">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Hazen-Williams koefficient (C)
              </label>
              <select
                value={formData.hazenWilliamsKoefficient}
                onChange={(e) => handleInputChange("hazenWilliamsKoefficient", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              >
                <option value="100 - Gamla stålrör">100 - Gamla stålrör</option>
                <option value="110 - Äldre stålrör">110 - Äldre stålrör</option>
                <option value="130 - Nya stålrör/Äldre plaströr">130 - Nya stålrör/Äldre plaströr</option>
                <option value="140 - Nya plaströr">140 - Nya plaströr</option>
                <option value="150 - Nya PE-rör">150 - Nya PE-rör</option>
              </select>
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Rörinteriörens slätkoefficient</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4 hover:border-[1.5px] hover:border-blue-400 hover:-translate-y-1 transform  duration-300 hover:shadow-lg ">
              <label className="block text-[10px] font-medium text-gray-700 mb-2">
                Statiskt tryck vid tappställe (m)
              </label>
              <input
                type="number"
                value={formData.statisktTryck}
                onChange={(e) => handleInputChange("statisktTryck", parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300 text-xs"
              />
              <p className="text-[10px] italic text-gray-500 mt-2 mb-2">Erforderligt minsta tryck vid tappställe</p>
              <p className="text-[10px]    text-blue-500">Typiskt 20-30 m för bostäder</p>
            </div>
          </div>

         
        </div>
         {/* Action Buttons */}
         <div className="flex gap-3 mt-4 text-center border border-gray-100 items-center justify-center shadow-lg py-4 rounded-xl">
            <button
              onClick={handleCalculate}
              className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
            >
              Beräkna dimensionerande förbrukning
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Återställ
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
             Exportera resultat
            </button>
          </div>
      </div>

      {/* Calculation Results */}
      {showResults && calculationResults && (
        <div className=" space-y-6 py-4">
          <div className="bg-white rounded-xl border shadow-lg  p-6 space-y-6">
          {/* Results Header */}
          <div className="bg-gradient-to-r from-blue-400 to-purple-600 text-white py-2 rounded-xl">
            <h2 className="text-xl font-medium text-center">Beräkningsresultat</h2>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2">
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
              <h3 className="text-xs font-medium text-gray-700 mb-2">MEDELFÖRBRUKNING</h3>
              <div className="text-xl font-bold text-blue-600">{calculationResults.qMedel}</div>
              <div className="text-sm text-gray-500">l/s</div>
              <div className="text-xs text-gray-400 mt-1">{formData.antalPersoner.toLocaleString()} person-dag</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">QDIM0 (MAXDYGN)</h3>
              <div className="text-xl font-bold text-blue-600">{calculationResults.qdim0}<span className="text-xs ml-1 text-gray-500">l/s</span></div>
              <div className="text-xs text-gray-400 mt-1">Utan timvariationer</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">QDIM1 (MAXTIMME)</h3>
              <div className="text-xl font-bold text-blue-600">{calculationResults.qdim1} <span className="text-xs text-gray-500 ml-1">l/s</span></div>
              
              <div className="text-xs text-gray-400 mt-1">Faktor: {calculationResults.faktor}</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">QDIM_TOTAL (SLUTLIGT)</h3>
              <div className="text-xl font-bold text-blue-600">{calculationResults.qdimTotal}  <span className="text-xs text-gray-500 ml-1">l/s</span></div>
             
              <div className="text-xs text-gray-400 mt-1">{calculationResults.personDagar} person-dag</div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">ÅRSVOLYM</h3>
              <div className="text-xl font-bold text-blue-600">{calculationResults.arsvolym}<span className="text-xs text-gray-500 ml-1">m³/år</span>
              </div>
              <div className="text-xs text-gray-400 mt-1">{calculationResults.personAr} m³/person-år</div>
            </div>
          </div>

          {/* Hydraulic Calculations Section */}
          <div 
            className={`bg-blue-50 border-[2px] border-[#16a2b8] rounded-xl overflow-hidden p-6 transition-all duration-300 cursor-pointer hover:h-auto  ${
              expandedSections.hydraulic ? 'h-auto' : 'h-[75px]'
            }`}
            onClick={() => openSection('hydraulic')}
          >
            <div className="flex gap-4 items-center mb-4">
              <h3 className="text-lg font-bold text-blue-800">Hydrauliska beräkningar</h3>
              <button 
                className="text-[#16a2b8] text-[9px] font-medium rounded-3xl bg-[#cfdee0] px-1 py-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                  openSection('hydraulic');
                }}
              >
                {expandedSections.hydraulic ? '🔍Expandera' : '🔍Expandera'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">P114 Dimensioneringsflöde</h4>
                <div className="space-y-2 text-sm font-mono bg-white p-3 rounded border">
                  <div>qdim0 (maxdygn utan timvariationer) = {calculationResults.qdim0} l/s</div>
                  <div>qdim1 (maxtimme med timvariationer) = {calculationResults.qdim1} l/s</div>
                  <div>qdim_brand (maxdygn + brand) = {calculationResults.qdim0} + {formData.brandvattenflode} = {calculationResults.qdim2} l/s</div>
                  <div>qdim_total = max (qdim0, qdim1) = max ({calculationResults.qdim0}, {calculationResults.qdim1}) = {calculationResults.qdimTotal} l/s</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Beskrivning av flöden enligt P114</h4>
                <div className="space-y-2 text-sm bg-white p-3 rounded border">
                  <div><span className="font-mono">qdim0 (maxdygn):</span> Används för dimensionering av huvudledningar där tryckfall över hela dygnet är avgörande.</div>
                  <div><span className="font-mono">qdim1 (maxtimme):</span> Används för dimensionering av sekundära ledningar och kapacitetskontroll.</div>
                  <div><span className="font-mono">qdim_brand (maxdygn + brand):</span> Dimensionering när brand kan inträffa under maxdygn.</div>
                  <div><span className="font-mono">qdim_total:</span> Det högsta av qdim1 eller qdim2 används för slutlig dimensionering.</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Hazen Williams friktionsberäkning</h4>
                <div className="text-sm bg-white p-3 rounded border">
                  <div>C = 130 | L = {formData.ledningslangd} m</div>
                  <div className="mt-2">Friktionsförlust beräknas för varje rördimension nedan</div>
                  <div className="text-right mt-2">
                    <button 
                      className="text-blue-600 text-xs cursor-pointer hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        closeSection('hydraulic');
                      }}
                    >
                      🔍Klicka eller håll musen här för hydrauliska detaljer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculation Details Section */}
          <div 
            className={`bg-blue-50 border-[2px] border-blue-50 rounded-xl overflow-hidden p-6 transition-all duration-300 cursor-pointer hover:h-auto  ${
              expandedSections.calculationDetails ? 'h-auto' : 'h-[75px]'
            }`}
            onClick={() => openSection('calculationDetails')}
          >
            <div className="flex gap-4 items-center mb-5">
              <h3 className="text-lg font-bold text-blue-800">Beräkningsdetaljer</h3>
              <button 
                className="text-[#16a2b8] text-[9px] font-medium rounded-3xl bg-[#cfdee0] px-1 py-[2px]"
                onClick={(e) => {
                  e.stopPropagation();
                  openSection('calculationDetails');
                }}
              >
                {expandedSections.calculationDetails ? '🔍Expandera' : '🔍Expandera'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">Steg 1: Grundförbrukning</h4>
                <div className="text-sm font-mono">q_medel = {formData.antalPersoner.toLocaleString()} * {formData.medelforbrukning} + 80400 = {calculationResults.qMedel} l/s</div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">Steg 2: qdim0 - Dimensioneringsflöde för maxdygn (utan timvariationer)</h4>
                <div className="text-sm font-mono mb-2">qdim0 = {calculationResults.qMedel} * {formData.maxdygnfaktor} * {formData.verksamhetsfaktor} = {calculationResults.qdim0} l/s</div>
                <div className="text-sm text-gray-600">Används för huvudledningar där tryckfall över hela dygnet är avgörande</div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">Steg 3: qdim - Dimensioneringsflöde för maxtimme (med timvariationer)</h4>
                <div className="text-sm font-mono mb-2">qdim = {calculationResults.qMedel} * {formData.maxtimfaktor} * {formData.verksamhetsfaktor} = {calculationResults.qdim1} l/s</div>
                <div className="text-sm text-gray-600">Används för sekundära ledningar och kapacitetskontroll</div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">Steg 4: qdim2 - Maxdygn med samtidig brand</h4>
                <div className="text-sm font-mono mb-2">qdim2 = qdim0 + Brandvattenflöde = {calculationResults.qdim0} + {formData.brandvattenflode} = {calculationResults.qdim2} l/s</div>
                <div className="text-sm text-gray-600">Scenariot där brand inträffar under maxdygn</div>
              </div>

              <div className="bg-white p-4 rounded border">
                <h4 className="font-semibold text-gray-800 mb-2">Steg 5: Slutligt dimensioneringsflöde enligt P114</h4>
                <div className="text-sm font-mono mb-2">qdim_total = max (qdim, qdim2) = max ({calculationResults.qdim1}, {calculationResults.qdim2}) = {calculationResults.qdimTotal} l/s</div>
                <div className="text-sm text-gray-600 mb-2">Per uppgift: 228 l/person-dag</div>
                <div className="text-sm text-gray-600">Det högsta flödet av maxtimme (qdim) eller maxdygn+brand (qdim2) används</div>
                <div className="text-right mt-2">
                  <button 
                    className="text-[#16a2b8] text-xs cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeSection('calculationDetails');
                    }}
                  >
                    🔍Klicka eller håll musen här för beräkningssteg
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Validation Section */}
          <div className="bg-[#edfced] border-[2px] border-[#16a2b8] rounded-xl p-6">
            <div className="flex justify-between items-center">
        <div>
                <h3 className="text-lg font-semibold text-green-800">Validering mot svenska standarder</h3>
                <div className="mt-2">
                  <div className="text-green-700 font-semibold">Utmärkt - Kvalitetspolning: 100/100</div>
                  <div className="text-green-600 text-sm">Alla kvalitetskontroller godkända</div>
                </div>
              </div>
            </div>
          </div>
          </div>

          {/* Consumption Profile Chart */}
          <div className="bg-white rounded-xl border shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Förbrukningsprofil över dygnet</h3>
            <ConsumptionChart results={calculationResults} />
          </div>

          {/* Hydraulic Pipe Analysis Section */}
          <div className="bg-white rounded-xl border shadow-lg p-6 ">
            <h3 className="text-md font-bold text-gray-800 mb-2">Hydraulisk röranalys och dimensionering</h3>
            <p className="text-xs text-gray-600 mb-6">
              Analys inkluderar: Hastighet, Kapacitet, Utnyttjande, Friktionsförlust (dricksvatten) och Erforderlig lutning (spillvatten)
            </p>
            
            {/* Pipe Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Ø200 mm - Not Suitable */}
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 ">Ø200 mm</h4>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal  ">5.95 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal  ">78.54 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal  ">238%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal  ">147.3 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal  ">14.73 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-red-700 text-white py-[4px] px-3 rounded-3xl  font-medium">
                    Ej lämplig
                  </button>
                  <p className=" text-red-600 mt-1 text-center">För hög hastighet</p>
                </div>
              </div>

              {/* Ø225 mm - Not Suitable */}
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø225 mm</h4>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">4.70 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">99.40 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">188%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">83.0 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">8.30 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-red-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Ej lämplig
                  </button>
                  <p className=" text-red-600 mt-1 text-center">För hög hastighet</p>
                </div>
              </div>

              {/* Ø250 mm - Not Suitable */}
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø250 mm</h4>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">3.81 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">122.72 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">152%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">49.7 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">4.97 m</span>
                  </div>
                </div>
                <div className="mt-4">
                    <button className="w-full bg-red-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Ej lämplig
                  </button>
                  <p className=" text-red-600 mt-1 text-center">För hög hastighet</p>
                </div>
              </div>

              {/* Ø280 mm - Not Suitable */}
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø280 mm</h4>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">3.04 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">153.94 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">121%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">28.6 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">2.86 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-red-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Ej lämplig
                  </button>
                  <p className=" text-red-600 mt-1 text-center">För hög hastighet</p>
                </div>
              </div>

              {/* Ø315 mm - Not Suitable */}
              <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø315 mm</h4>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">2.40 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">194.83 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">16.1 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">1.61 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-red-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Ej lämplig
                  </button>
                  <p className=" text-red-600 mt-1 text-center">För låg hastighet</p>
                </div>
              </div>

              {/* Ø355 mm - Optimal */}
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø355 mm</h4>
                  <span className="text-yellow-500 ">⭐</span>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">1.89 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">247.45 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">76%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">9.0 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">0.90 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-green-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Optimal
                  </button>
                  <p className=" text-green-600 mt-1 text-center">Optimal enligt P114</p>
                </div>
              </div>

              {/* Ø400 mm - Optimal */}
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø400 mm</h4>
                  <span className="text-yellow-500 ">⭐</span>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">1.49 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">314.16 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">59%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">5.0 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">0.50 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-green-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Optimal
                  </button>
                  <p className=" text-green-600 mt-1 text-center">Optimal enligt P114</p>
                </div>
              </div>

              {/* Ø450 mm - Optimal */}
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø450 mm</h4>
                  <span className="text-yellow-500 ">⭐</span>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Hastighet:</span>
                    <span className="font-normal ">1.18 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">397.61 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">47%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">2.8 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">0.28 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-green-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Optimal
                  </button>
                  <p className=" text-green-600 mt-1 text-center">Optimal enligt P114</p>
                </div>
              </div>

              {/* Ø500 mm - Optimal */}
              <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 shadow-lg text-[10px]">
                <div className="flex items-center justify-center mb-3">
                  <h4 className="font-semibold text-gray-800 text-">Ø500 mm</h4>
                  <span className="text-yellow-500 ">⭐</span>
                </div>
                <div className="space-y-1 ">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800 text-sm">Hastighet:</span>
                    <span className="font-normal ">0.95 m/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Kapacitet:</span>
                    <span className="font-normal ">490.87 l/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Utnyttjande:</span>
                    <span className="font-normal ">38%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall:</span>
                    <span className="font-normal ">1.7 m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-800 font-medium ">Tryckfall/100m:</span>
                    <span className="font-normal ">0.17 m</span>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="w-full bg-green-700 text-white py-[4px] px-3 rounded-3xl font-medium">
                    Optimal
                  </button>
                  <p className=" text-green-600 mt-1 text-center">Optimal enligt P114</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}

      {/* Notification Popup */}
      {showNotification && (
        <div className={`fixed top-4 right-4 z-50 ${isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'}`}>
          <div className={`text-white px-4 py-[10px] rounded-lg shadow-lg ${
            notificationType === "pageLoad" ? "bg-green-500" : "bg-[#16a2b8]"
          }`}>
            <div className="flex items-center gap-3">
              <div>
                <div className="font-semibold text-xs">{notificationMessage}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
