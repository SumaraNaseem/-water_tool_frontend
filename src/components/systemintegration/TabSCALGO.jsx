export default function TabSCALGO() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">SCALGO-integration</h1>
        <p className="text-md text-gray-300">Riskanalys och översvämningsmodeller för VA-planering</p>
      </div>

      {/* SCALGO Live API Card */}
      <div className="backdrop-blur-sm rounded-xl p-6 bg-white/15 border border-gray-400 max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#4970f1] p-3 rounded-lg">
            <i className="fas fa-cloud text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">SCALGO Live API</h2>
        </div>

        <div className="space-y-4">
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Status:</label>
            <span className="inline-flex items-center gap-2 bg-green-500/20 border-2 border-green-500 text-green-500 px-4 py-1 rounded-full font-medium text-sm">
              <i className="fas fa-check-circle"></i>
              Synkroniserad
            </span>
          </div>

          {/* Last Update */}
          <div>
            <p className="text-white text-sm font-semibold">Senaste uppdatering: <span className="font-semibold">2024-08-21 14:30</span></p>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button className="bg-[#1e40af] hover:bg-[#4970f1] text-white px-6 py-3 rounded-lg font-medium text-md flex items-center gap-2 transition-colors">
              <i className="fas fa-sync"></i>
              Synkronisera nu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
