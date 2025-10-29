export default function TabRealtidsdata() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className=" mb-6 py-8 px-6 border  border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Realtidsdata & Övervakning</h1>
        <p className="text-gray-300">
        Live-övervakning av alla VA-system med uppdatering varje sekund
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-4 gap-2 mb-8">
        {/* Card 1: Total Flow */}
        <div className="p-6 backdrop-blur-sm border  border-gray-400 rounded-xl bg-white/15">
          <div className="text-4xl font-bold mb-2">1434</div>
          <div className="text-white text-sm font-medium mb-2">m³/h totalt flöde</div>
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <i className="fas fa-arrow-up"></i>
            <span>+3.2% senaste timmen</span>
          </div>
        </div>

        {/* Card 2: Average Pressure */}
        <div className="p-6 backdrop-blur-sm border  border-gray-400 rounded-xl bg-white/15">
          <div className="text-4xl font-bold mb-2">2.8</div>
          <div className="text-white text-sm font-medium mb-2">bar medeltryck</div>
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <i className="fas fa-arrow-down"></i>
            <span>-1.8% senaste timmen</span>
          </div>
        </div>

        {/* Card 3: Water Quality */}
        <div className="p-6 backdrop-blur-sm border  border-gray-400 rounded-xl bg-white/15">
          <div className="text-4xl font-bold mb-2">99.4</div>
          <div className="text-white text-sm font-medium mb-2">% vattenkvalitet</div>
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <i className="fas fa-arrow-up"></i>
            <span>+0.3% senaste timmen</span>
          </div>
        </div>

        {/* Card 4: System Availability */}
        <div className="p-6 backdrop-blur-sm border  border-gray-400 rounded-xl bg-white/15">
          <div className="text-4xl font-bold mb-2">99.8</div>
          <div className="text-white text-sm font-medium mb-2">% systemtillgänglighet</div>
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <i className="fas fa-check-circle"></i>
            <span>Stabilt</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {/* Interactive Graphs Section - Takes 2 columns */}
        <div className="md:col-span-2 bg-white/15 backdrop-blur-sm rounded-xl p-8 border border-gray-400 min-h-[400px] flex flex-col items-center justify-center">
          <i className="fas fa-chart-line text-6xl text-white/30 mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Realtidsgrafer</h3>
          <p className="text-gray-300 text-sm text-center max-w-md mb-6">
            Interaktiva grafer för flöde, tryck och kvalitetsparametrar
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors">
            <i className="fas fa-plug"></i>
            Testa anslutning
          </button>
        </div>

        {/* Real-time Data Table - Takes 1 column */}
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-gray-400">
          <div className="flex items-center gap-3 mb-4">
            <div className="py-2 px-3 bg-[#29dbff] rounded-lg">
            <i className="fas fa-chart-line text-white text-3xl"></i>
            </div>
            
            <h3 className="text-xl font-bold">Realtidsdata</h3>
          </div>

          <div className=" backdrop-blur-sm rounded-xl border border-gray-400 shadow-lg overflow-hidden">
            <div className="overflow-x-auto ">
              <table className="w-full">
                <thead>
                  <tr className="border-b  border-white/20 bg-white/20  ">
                    <th className="text-left px-2 py-6  text-xs font-bold text-white">Pumpstation</th>
                    <th className="text-left px-2 py-6 text-xs font-bold text-white">Flöde (l/s)</th>
                    <th className="text-left px-2 py-6 text-xs font-bold text-white">Tryck (bar)</th>
                    <th className="text-left px-2 py-6 text-xs font-bold text-white">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {/* Row 1: PS01 - Centrum */}
                  <tr className="hover:bg-white/15 transition-colors ">
                    <td className="px-2 py-4 text-xs font-semibold">PS01 - Centrum</td>
                    <td className="px-2 py-4 text-xs">45.3</td>
                    <td className="px-2 py-4 text-xs">3.2</td>
                    <td className="px-1">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Online
                      </span>
                    </td>
                  </tr>

                  {/* Row 2: PS02 - Norr */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-2 py-4 text-xs font-semibold">PS02 - Norr</td>
                    <td className="px-2 py-4 text-xs">32.1</td>
                    <td className="px-2 py-4 text-xs">2.8</td>
                    <td className="px-1 ">
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Online
                      </span>
                    </td>
                  </tr>

                  {/* Row 3: PS03 - Söder */}
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="px-2 py-4 text-xs font-semibold">PS03 - Söder</td>
                    <td className="px-2 py-4 text-xs">0.0</td>
                    <td className="px-2 py-4 text-xs">0.0</td>
                    <td className="px-1 ">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Alarm
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
