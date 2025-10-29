export default function TabTestning() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex-1">
          <button className="mb-4 text-gray-300 hover:text-white flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>
            Tillbaka till Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">Automatiserad Testning</h1>
          <p className="text-gray-300">Testtäckning och kvalitetskontroll</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-cog"></i>
            Konfigurera
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-play"></i>
            Kör alla tester
          </button>
        </div>
      </div>

      {/* Test Coverage Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <i className="fas fa-check-circle text-green-400 text-3xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Testtäckning</h2>
            <p className="text-gray-400 text-sm">0% täckning</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Unit tests:</span>
              <span className="text-white font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Integration tests:</span>
              <span className="text-white font-semibold">0</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">E2E tests:</span>
              <span className="text-white font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Framgångsgrad:</span>
              <span className="text-white font-semibold">-%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}