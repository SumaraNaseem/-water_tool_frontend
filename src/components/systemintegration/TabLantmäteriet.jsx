export default function TabLantmäteriet() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Lantmäteriet-integration</h1>
        <p className= " text-md text-gray-300">Geodata, fastighetsregister och höjdmodeller från Lantmäteriet</p>
      </div>

      {/* API Configuration Card */}
      <div className="bg-white/15 border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#22c55e] py-3 px-4 rounded-lg">
            <i className="fas fa-key text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">API-konfiguration</h2>
        </div>

        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Status:</label>
            <span className="inline-flex items-center gap-2 bg-green-500/20 border-2 border-green-500 text-green-500 px-4 py-1 rounded-full font-medium text-sm">
              <i className="fas fa-check-circle"></i>
              API Aktiv
            </span>
          </div>

          {/* API Calls Remaining */}
          <div>
            <p className="text-white text-sm font-medium">
              Anrop kvar idag: <span className="font-semibold">9,366 av 10,000</span>
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button className="bg-[#1e40af] hover:bg-[#4970f1] text-white px-6 py-3 rounded-lg font-medium text-md flex items-center gap-2 transition-colors">
              <i className="fas fa-wrench"></i>
              Testa API
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
