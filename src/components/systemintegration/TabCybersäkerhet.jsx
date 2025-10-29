export default function TabCybersäkerhet() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Cybersäkerhet</h1>
        <p className="text-gray-300">Avancerad säkerhet för kritisk VA-infrastruktur</p>
      </div>

      {/* Two Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Card: Security Status */}
        <div className="bg-white/15 border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500 py-3 px-4 rounded-lg">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold">Säkerhetsstatus</h2>
          </div>

          <div className="mb-6">
            <span className="inline-flex items-center gap-2 bg-green-500/20 border-2 border-green-500 text-green-500 px-4 py-2 rounded-full font-medium mb-4">
              <i className="fas fa-lock"></i>
              Säker
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-sm font-medium">Säkerhetsnivå:</span>
              <p className="text-green-400 text-xs">Hög</p>
            </div>
            <div>
              <span className="text-sm font-medium">Senaste hot-scan:</span>
              <p className="text-gray-400 text-xs">2 minuter sedan</p>
            </div>
            <div>
              <span className="text-sm font-medium">Blockerade intrång:</span>
              <p className="text-orange-400 text-xs">23 idag</p>
            </div>
          </div>
        </div>

        {/* Right Card: Vulnerability Analysis */}
        <div className="bg-white/15 border-gray-400 backdrop-blur-sm rounded-xl p-3 border shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-orange-500 py-3 px-4 rounded-lg">
              <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold">Sårbarhetsanalys</h2>
          </div>

          {/* Vulnerability Table */}
          <div className="backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-white/15 border-white/15">
                    <th className="text-left p-4 text-sm font-bold text-white">Komponent</th>
                    <th className="text-left p-4 text-sm font-bold text-white">Risk</th>
                    <th className="text-left p-4 text-sm font-bold text-white">Status</th>
                    <th className="text-left p-4 text-sm font-bold text-white">Åtgärd</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {/* Row 1: OPC UA Server */}
                  <tr className="hover:bg-white/15 transition-colors">
                    <td className="py-2 px-2 text-sm font-medium">OPC UA Server</td>
                    <td className="py-2 px-2">
                      <span className="bg-green-500/20 text-green-400 border border-green-400 px-4 py-1 rounded-full text-xs font-semibold">
                        Låg
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Uppdaterad
                      </span>
                    </td>
                    <td className="py-2 px-2 text-sm font-medium text-center ">-</td>
                  </tr>

                  {/* Row 2: Web Interface */}
                  <tr className="hover:bg-white/15 transition-colors">
                    <td className="py-2 px-2 text-sm font-medium">Web Interface</td>
                    <td className="py-2 px-2">
                      <span className="bg-orange-500/20 text-orange-400 border border-orange-400 px-2 py-1 rounded-full text-xs font-semibold">
                        Medel
                      </span>
                    </td>
                    <td className="py-2 px-1 ">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Patch väntar!
                      </span>
                    </td>
                    <td className="py-2 px-2 text-xs font-medium text-center text-blue-400">Installera uppdatering</td>
                  </tr>

                  {/* Row 3: Database Access */}
                  <tr className="hover:bg-white/15 transition-colors">
                    <td className="py-2 px-2 text-sm font-medium">Database Access</td>
                    <td className="py-2 px-2">
                      <span className="bg-green-500/20 text-green-400 border border-green-400 px-4 py-1 rounded-full text-xs font-semibold">
                        Låg
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                        Säker
                      </span>
                    </td>
                    <td className="py-2 px-2 text-sm font-medium text-center ">-</td>
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
