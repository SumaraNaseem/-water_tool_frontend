export default function TabKodanalys() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2">Avancerad Kodanalys</h1>
      </div>

      {/* Three Cards Row */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Card: Code Quality */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#4970f1] py-3 px-4 rounded-lg">
              <i className="fas fa-star text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Kodkvalitet</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Läsbarhet:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Underhållbarhet:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Komplexitet:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Duplicering:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
          </div>
        </div>

        {/* Middle Card: Identified Problems */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 py-3 px-4 rounded-lg">
              <i className="fas fa-exclamation-circle text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Identifierade Problem</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Totalt:</span>
              <span className="text-gray-400 text-xs">0 totalt</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Kritiska:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Varningar:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Info:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
          </div>
        </div>

        {/* Right Card: Code Metrics */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#834bf1] py-3 px-4 rounded-lg">
                <i className="fas fa-chart-bar text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Kodmätvärden</h3>
                <p className="text-gray-400 text-xs">Detaljerad statistik</p>
              </div>
            </div>
            <i className="fas fa-chevron-down text-gray-400"></i>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Totalt rader:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Funktioner:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Kommentarer:</span>
              <span className="text-gray-400 text-xs">0%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Avg komplexitet:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Left: Problems & Suggestions */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Problem & Förslag</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium flex items-center gap-2">
                <i className="fas fa-download"></i>
                Exportera
              </button>
              <button className="px-3 py-1 bg-[#1e40af] hover:bg-[#4970f1] rounded-lg text-sm font-medium">
                Auto-fix
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
            <i className="fas fa-search text-5xl text-purple-400/20 mb-4"></i>
            <p className="text-gray-400 text-sm">
              Kör kodanalys för att se problem och förslag
            </p>
          </div>
        </div>

        {/* Right: Empty space or other content can go here */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg"></div>
      </div>

      {/* File Analysis Table */}
      <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Filanalys</h3>
          <input
            type="text"
            placeholder="Sök filter..."
            className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b  border-white/15">
                <th className="text-left p-6 text-md font-bold text-white">Fil</th>
                <th className="text-left p-6 text-md font-bold text-white">Typ</th>
                <th className="text-left p-6 text-md font-bold text-white">Storlek</th>
                <th className="text-left p-6 text-md font-bold text-white">Rader</th>
                <th className="text-left p-6 text-md font-bold text-white">Komplexitet</th>
                <th className="text-left p-6 text-md font-bold text-white">Problem</th>
                <th className="text-left p-6 text-md font-bold text-white">Status</th>
                <th className="text-left p-6 text-md font-bold text-white">Åtgärder</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="text-center py-12 text-gray-400">
                  <i className="fas fa-file text-3xl mb-3"></i>
                  <p>Ingen filanalys tillgänglig</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
