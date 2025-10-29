export default function TabBeroenden() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2">Beroendeanalys</h1>
        <p className="text-gray-300">Analys av projektberoenden och sårbarheter</p>
      </div>

      {/* Dependency Overview Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <i className="fas fa-box text-green-400 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">Beroendeöversikt</h2>
        </div>

        <div className="mb-6">
          <p className="text-3xl font-bold text-white mb-6">0 totalt</p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Direkta beroenden:</span>
              <span className="text-white font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Indirekta beroenden:</span>
              <span className="text-white font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Föråldrade:</span>
              <span className="text-white font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Sårbara:</span>
              <div className="flex items-center gap-2">
                <span className="text-red-400 font-semibold">0</span>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dependency Graph Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <i className="fas fa-project-diagram text-purple-400 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold">Beroendegraff</h2>
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-download"></i>
            Exportera
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="relative mb-6">
            <i className="fas fa-network-wired text-6xl text-purple-400/20"></i>
            <div className="absolute -bottom-2 -right-2">
              <i className="fas fa-users text-purple-400/30 text-2xl"></i>
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Analysera beroenden för att se graff
          </p>
        </div>
      </div>
    </div>
  );
}