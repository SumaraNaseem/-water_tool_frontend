import React from "react";

export default function Kurvor() {
  return (
    <div className="bg-white rounded-lg">
      {/* Main Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          IDF Kurvor enligt P110
        </h2>
      </div>

      {/* Graph Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Regnintensitet vs Varaktighet - Lidköping</h3>
        
        {/* Legend */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-red-500"></div>
            <span className="text-sm text-gray-700">T = 2 år</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-blue-500"></div>
            <span className="text-sm text-gray-700">T = 5 år</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-yellow-500"></div>
            <span className="text-sm text-gray-700">T = 10 år</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-teal-500"></div>
            <span className="text-sm text-gray-700">T = 25 år</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-purple-500"></div>
            <span className="text-sm text-gray-700">T = 50 år</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-orange-500"></div>
            <span className="text-sm text-gray-700">T = 100 år</span>
          </div>
        </div>

        {/* Graph Placeholder */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 h-96 flex items-center justify-center">
          <div className="text-center">
            <i className="fas fa-chart-line text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-600 mb-2 font-semibold">IDF Kurvor för Lidköping (Validerade)</p>
            <p className="text-sm text-gray-500 mb-4">Regnintensitet (l/s·ha) vs Varaktighet (min)</p>
            
            {/* Graph Description */}
            <div className="text-xs text-gray-400 space-y-1">
              <p>Y-axis: 0 to 600 l/s·ha (100, 200, 300, 400, 500, 600)</p>
              <p>X-axis: 5, 10, 15, 20, 30, 45, 60, 90, 120, 180 min</p>
              <p>6 decreasing curves representing different return periods</p>
              <p>All curves show decreasing intensity with increasing duration</p>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-blue-100 rounded-xl border-[2px] border-blue-400 px-4 py-7 shadow-sm">
        <h3 className="font-medium text-sm  text-blue-800 mb-4">
          <i className="fas fa-info-circle text-blue-800 text-sm mr-1"></i>
          IDF Kurvor enligt P110
        </h3>
        <p className="text-sm text-blue-800">
        Kurvorna visar hur regnintensiteten minskar med ökad varaktighet för olika återkomsttider. Använd dessa kurvor för att bestämma dimensionerande regnintensitet baserat på systemets koncentrationstid.        </p>
      </div>
    </div>
  );
}
