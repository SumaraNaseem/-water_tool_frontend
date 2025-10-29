



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ReportsContent() {
  const navigate = useNavigate();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReportPopup, setShowReportPopup] = useState(false);
  const stats = [
    {
      id: "Generera hydraulisk analysrapport",
      label: "Generera hydraulisk analysrapport",
      value: "Hydraulisk rapport",
      trend: "+8%",
      trendUp: true,
      icon: <i class="fas fa-water"></i>,
      bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600",
      
    },

    
    {
      id: "Dimensjonerade rapport",
      label: "P110 förbrukningsanalys",
      value: "Dimensjonerade rapport",
      trend: "+12%",
      trendUp: true,
      icon: <i class="fas fa-chart-bar"></i>,
      bgColor: "bg-[#6e4d42]",
      
    },
    {
      id: "Projektkostnadsrapport",
      label: "P83 brandvattenanalys",
      value: "Projektkostnadsrapport",
      trend: "-2%",
      trendUp: false,
      icon: <i class="fas fa-fire-extinguisher"></i>,
      bgColor: "bg-[#de3431]",
    },
    {
      id: "Dagvattenrapport",
      label: "Regnvattenanalys",
      value: "Dagvattenrapport",
      trend: "-2%",
      trendUp: false,
      icon: <i class="fas fa-cloud-rain"></i>,
      bgColor: "bg-blue-400",
    },

   
   
   
  ];

  const handleStatClick = (reportValue) => {
    const report = stats.find(s => s.value === reportValue);
    setSelectedReport(report);
    setShowReportPopup(true);
  };

  const closePopup = () => {
    setShowReportPopup(false);
    setSelectedReport(null);
  };

  return (
    <div>
     <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-800">Skapa ny rapport</h1>
       </div>
      {/* Stats Grid - 4 columns */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px] text-center flex flex-col items-center justify-center"
            onClick={() => handleStatClick(s.value)}
          >
            <div className="flex items-center justify-center mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${s.bgColor} flex items-center justify-center text-white`}
              >
                {s.icon}
              </div>
            </div>

            <div className="text-lg font-bold text-gray-800 mb-2">
              {s.value}
            </div>

            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}

        {/* Report Popup */}
      {showReportPopup && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">This page says</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genererar rapport: {selectedReport.value}
            </label>
            <p className="block text-sm font-medium text-gray-700 mb-1">
              Rapporten kommer att vara tillgänglig om 2–5 minuter.
            </p>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closePopup}
                className="border-2 border-blue-600 p-[2px] rounded-3xl"
              >
                <div className="flex items-center px-5 py-2 bg-blue-700 text-white rounded-3xl hover:bg-blue-700 transition-colors">
                  OK
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      
      </section>
    </div>
  );
}

export default ReportsContent;
