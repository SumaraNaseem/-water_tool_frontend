import React from "react";

function DashbordContent() {
  const stats = [
    {
      id: 1,
      label: "Aktiva projekt",
      value: 24,
      trend: "+12%",
      trendUp: true,
      icon: (
        <i class="fas fa-project-diagram"></i>
      ),
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    },
    {
      id: 2,
      label: "Aktiva användare",
      value: 89,
      trend: "+5%",
      trendUp: true,
      icon: (
        <i class="fas fa-users"></i>
      ),
      bgColor: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      id: 3,
      label: "Beräkningar denna månad",
      value: 156,
      trend: "+8%",
      trendUp: true,
      icon: (
        <i class="fas fa-calculator"></i>
      ),
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: 4,
      label: "Systemeffektivitet",
      value: "94%",
      trend: "-2%",
      trendUp: false,
      icon: (
        <i class="fas fa-chart-line"></i>
      ),
      bgColor: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
  ];

  const quickAccess = [
    {
      id: "a",
      title: "Dimensjonerade förbrukning",
      subtitle: "P110 standarder",
      icon: (
        <i class="fas fa-chart-bar"></i>
      ),
      bgColor: "bg-gradient-to-br from-amber-600 to-amber-700",
    },
    {
      id: "b",
      title: "GIS-karta",
      subtitle: "Kartanalys",
      icon: (
        <i class="fas fa-map"></i>
      ),
      bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      id: "c",
      title: "Hydraulisk analys",
      subtitle: "Manning & Colebrook",
      icon: (
        <i class="fas fa-water"></i>
      ),
      bgColor: "bg-gradient-to-br from-purple-500 to-indigo-600",
    },
    {
      id: "d",
      title: "Projektkalkyl",
      subtitle: "P83 standarder",
      icon: (
        <i class="fas fa-fire-extinguisher"></i>
      ),
      bgColor: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ];

  const handleStatClick = (statId) => {
    console.log('Stat clicked:', statId);
    // Add navigation logic here
  };

  const handleQuickAccessClick = (itemId) => {
    console.log('Quick access clicked:', itemId);
    // Add navigation logic here
  };

  return (
    <div>
      {/* Welcome Section with decorative background */}
      <section className="mb-8">
        <div className="rounded-xl p-8 bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -top-1/2 right-1 translate-x-1/2 w-80 h-80 bg-white/10 rounded-full"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-2">Välkommen tillbaka!</h3>
            <p className="text-lg opacity-90">
              Din senaste aktivitet: Hydraulisk analys för Projekt Malmö Centrum
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid - 4 columns */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px]"
            onClick={() => handleStatClick(s.id)}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${s.bgColor} flex items-center justify-center text-white`}
              >
                {s.icon}
                
              </div>
              <div
                className={`flex items-center gap-1 text-sm ${
                  s.trendUp ? "text-green-600" : "text-red-600"
                }`}
              >
                <svg
                  className={`w-4 h-4 ${s.trendUp ? "" : "rotate-180"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">{s.trend}</span>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">
              {s.value}
            </div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Quick Actions Section */}
      <section>
        <h4 className="text-xl font-bold text-gray-800 mb-6">Snabbåtkomst</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccess.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer text-center min-h-[160px] flex flex-col justify-center"
              onClick={() => handleQuickAccessClick(q.id)}
            >
              <div
                className={`w-12 h-12 rounded-lg ${q.bgColor} flex items-center justify-center text-white mb-4 mx-auto`}
              >
                {q.icon}
                
              </div>
              <div className="font-semibold text-gray-800 mb-1">{q.title}</div>
              <div className="text-sm text-gray-600">{q.subtitle}</div>
            </div>
          ))}

          {/* Add More Card */}
          {/* <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-dashed border-gray-200 hover:border-gray-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex items-center justify-center min-h-[160px]">
            <div className="text-center">
              <svg
                className="w-8 h-8 text-gray-400 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <div className="text-sm text-gray-500">Lägg till</div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}

export default DashbordContent;
