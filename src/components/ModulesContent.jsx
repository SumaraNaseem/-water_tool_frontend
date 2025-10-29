import React from "react";
import { useNavigate } from "react-router-dom";

function ModulesContent() {
  const navigate = useNavigate();
  const stats = [
    {
      id: 1,
      label: "P110 dimensioneringsflöden",
      value: "Dimensjonerade förbrukning",
      trend: "+12%",
      trendUp: true,
      icon: <i class="fas fa-chart-bar"></i>,
      bgColor: "bg-[#6e4d42]",
    },

    {
      id: 2,
      label: "Interaktiva kartor och analys",
      value: "GIS-karta",
      trend: "+5%",
      trendUp: true,
      icon: <i class="fas fa-map"></i>,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 3,
      label: "Manning & Colebrook ekvationer",
      value: "Hydraulisk analys",
      trend: "+8%",
      trendUp: true,
      icon: <i class="fas fa-water"></i>,
      bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
    {
      id: 4,
      label: "P83 standarder och beräkningar",
      value: "Projektkalkyl",
      trend: "-2%",
      trendUp: false,
      icon: <i class="fas fa-fire-extinguisher"></i>,
      bgColor: "bg-[#de3431]",
    },

    {
      id: 5,
      label: "Regnvattenhantering P90",
      value: "Dagvatten",
      trend: "+3%",
      trendUp: true,
      icon: <i class="fas fa-cloud-rain"></i>,
      bgColor: "bg-gradient-to-br from-amber-600 to-amber-700",
    },
    {
      id: 6,
      label: "NPSH och energioptimering",
      value: "Pumpanalys",
      trend: "+9%",
      trendUp: true,
      icon: <i class="fas fa-cog"></i>,
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 7,
      label: "Smart optimering och prediktiv analys",
      value: "AI-analys",
      trend: "+15%",
      trendUp: true,
      icon: <i class="fas fa-brain"></i>,
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    },
  ];

  const handleStatClick = (value) => {
    console.log("Stat clicked:", value);
    // Navigate to existing pages based on value
    switch (value) {
      case "Dimensjonerade förbrukning":
        navigate("/dimensjonerade");
        break;
      case "GIS-karta":
        navigate("/gis-karta");
        break;
      case "Hydraulisk analys":
        navigate("/hydraulisk");
        break;
      case "Projektkalkyl":
        navigate("/projektkalkyl");
        break;
      case "Dagvatten":
        navigate("/dagvatten");
        break;
      case "Pumpanalys":
        navigate("/pumpanalys");
        break;
      case "AI-analys":
        navigate("/ai-analys");
        break;
      default:
        console.log("Unknown module:", value);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Modular
      </h2>
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
      </section>
    </div>
  );
}

export default ModulesContent;
