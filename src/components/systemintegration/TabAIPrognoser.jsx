export default function TabAIPrognoser() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">AI-prognoser & Prediktiv analys</h1>
        <p className="text-gray-300">Artificiell intelligens för förutsägelse av underhållsbehov och systemoptimering</p>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#834bf1] p-3 rounded-lg">
            <i className="fas fa-brain text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">AI-REKOMMENDATIONER</h2>
        </div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Left Card: Preventive Maintenance */}
          <div className=" backdrop-blur-sm rounded-xl p-6 border border-gray-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e38508] p-3 rounded-lg">
                <i className="fas fa-wrench text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Förebyggande underhåll</h3>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <p className="text-white">
                Pump PS02: 87% sannolikhet för haveri inom 14 dagar
              </p>
              <p className="text-white">
                Ventil V-23: Byt tätning inom 30 dagar
              </p>
              <p className="text-white">
                Filter F-05: Rengöring krävs inom 5 dagar
              </p>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Konfidensgrad: 87%</span>
                <span className="text-gray-400">87%</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: "87%" }}></div>
              </div>
            </div>
            <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-calendar"></i>
              Schemalägg underhåll
            </button>
          </div>

          {/* Right Card: Consumption Forecast */}
          <div className=" backdrop-blur-sm rounded-xl p-6 border border-gray-400">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#4970f1] p-3 rounded-lg">
                <i className="fas fa-chart-line text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Förbrukningsprognos</h3>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <p className="text-white">
                Nästa 24h: +12% över normal förbrukning
              </p>
              <p className="text-white">
                Orsak: Väderprognos (varmt väder)
              </p>
              <p className="text-white">
                Rekommendation: Öka kapacitet pumpar 1-3
              </p>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-gray-400">Prognosträffsäkerhet: 94%</span>
                <span className="text-gray-400">94%</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "94%" }}></div>
              </div>
            </div>
            <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-cog"></i>
              Justera kapacitet
            </button>
          </div>
        </div>
      </div>

      {/* Machine Learning Models Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#4970f1] p-4 rounded-lg">
            <i className="fas fa-robot text-white text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold">Machine Learning-modeller</h2>
        </div>

        {/* Models Table */}
        <div className="backdrop-blur-sm rounded-xl border border-gray-400 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-white/15 border-white/15">
                  <th className="text-left p-6 text-md font-bold text-white">Modell</th>
                  <th className="text-left p-6 text-md font-bold text-white">Typ</th>
                  <th className="text-left p-6 text-md font-bold text-white">Träffsäkerhet</th>
                  <th className="text-left p-6 text-md font-bold text-white">Senaste träning</th>
                  <th className="text-left p-6 text-md font-bold text-white">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {/* Row 1: Fel-prediktion */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Fel-prediktion</td>
                  <td className="py-4 px-6 text-sm text-gray-300">Random Forest</td>
                  <td className="py-4 px-6 text-sm">91.3%</td>
                  <td className="py-4 px-6 text-sm text-gray-300">2024-08-20</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Aktiv
                    </span>
                  </td>
                </tr>

                {/* Row 2: Förbrukningsprognos */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Förbrukningsprognos</td>
                  <td className="py-4 px-6 text-sm text-gray-300">LSTM Neural Network</td>
                  <td className="py-4 px-6 text-sm">94.7%</td>
                  <td className="py-4 px-6 text-sm text-gray-300">2024-08-21</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Aktiv
                    </span>
                  </td>
                </tr>

                {/* Row 3: Kvalitetsoptimering */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Kvalitetsoptimering</td>
                  <td className="py-4 px-6 text-sm text-gray-300">Gradient Boosting</td>
                  <td className="py-4 px-6 text-sm">88.9%</td>
                  <td className="py-4 px-6 text-sm text-gray-300">2024-08-19</td>
                  <td className="py-4 px-6">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Träning
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
