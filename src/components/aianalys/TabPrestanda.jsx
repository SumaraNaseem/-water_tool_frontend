export default function TabPrestanda() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex-1">
          <button className="mb-4 text-gray-300 hover:text-white flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>
            Tillbaka till Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">Prestandaanalys</h1>
          <p className="text-gray-300">Real-time prestanda och optimeringsrekommendationer</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-stopwatch"></i>
            Benchmark
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-chart-line"></i>
            Starta övervakning
          </button>
        </div>
      </div>

      {/* Top Row: Three Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Card: Core Web Vitals */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-500/20 p-3 rounded-lg">
              <i className="fas fa-leaf text-green-400 text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Core Web Vitals</h3>
              <p className="text-gray-400 text-xs">Googles prestandamätvärden</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">LCP:</span>
              <span className="text-white font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">FID:</span>
              <span className="text-white font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">CLS:</span>
              <span className="text-white font-semibold">-</span>
            </div>
          </div>
        </div>

        {/* Middle Card: Resource Usage */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <i className="fas fa-server text-purple-400 text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Resursanvändning</h3>
              <p className="text-gray-400 text-xs">Real-time övervakning</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Heap-minne:</span>
              <span className="text-white font-semibold">9.54 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Använt minne:</span>
              <span className="text-white font-semibold">9.54 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">DOM-noder:</span>
              <span className="text-white font-semibold">951</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Event listeners:</span>
              <span className="text-white font-semibold">-</span>
            </div>
          </div>
        </div>

        {/* Right Card: Performance Metrics */}
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <i className="fas fa-chart-bar text-orange-400 text-2xl"></i>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Prestandametriker</h3>
              <p className="text-gray-400 text-xs">Detaljerad analys</p>
            </div>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Laddning klar:</span>
              <span className="text-white font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">DOM interaktiv:</span>
              <span className="text-white font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Första byte:</span>
              <span className="text-white font-semibold">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Minneseffektivitet:</span>
              <span className="text-white font-semibold">-</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Performance History */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-teal-500/20 p-3 rounded-lg">
              <i className="fas fa-chart-line text-teal-400 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold">Prestandahistorik</h2>
          </div>
          <div className="relative">
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm appearance-none cursor-pointer pr-8">
              <option>Senaste timmen</option>
              <option>Senaste 24 timmarna</option>
              <option>Senaste veckan</option>
            </select>
            <i className="fas fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <i className="fas fa-chart-line text-6xl text-purple-400/20 mb-4"></i>
          <p className="text-gray-400 text-sm">
            Starta övervakning för att se prestandahistorik
          </p>
        </div>
      </div>
    </div>
  );
}