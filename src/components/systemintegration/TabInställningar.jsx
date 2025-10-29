export default function TabInställningar() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Systeminställningar</h1>
        <p className="text-gray-300">Konfigurera globala inställningar för integrationsmodulen</p>
      </div>

      {/* Synchronization Settings Card */}
      <div className="bg-white/15 border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg max-w-4xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-[#4970f1] p-4 rounded-lg">
            <i className="fas fa-clock text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">Synkroniseringsinställningar</h2>
        </div>

        <div className="space-y-4">
          {/* SCADA Update Interval Dropdown */}
          <div>
            <label className="block text-sm font-semibold mb-3">SCADA-uppdateringsintervall:</label>
            <div className="relative">
              <select className="w-full bg-white/5 border border-white/20 rounded-lg py-3 px-4 text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-300">
                <option value="realtime" className="bg-blue-500 text-white">Realtid (1s)</option>
                <option value="5s" className="bg-gray-400 text-white">5 sekunder</option>
                <option value="10s" className="bg-gray-400 text-white">10 sekunder</option>
                <option value="30s" className="bg-gray-400 text-white">30 sekunder</option>
                <option value="1min" className="bg-gray-400 text-white">1 minut</option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
            </div>
          </div>

          {/* Save Settings Button */}
          <div className="pt-4">
            <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md flex items-center justify-center gap-2 transition-colors">
              <i className="fas fa-lock"></i>
              Spara inställningar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
