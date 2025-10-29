export default function TabDashboard() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2">AI-Dashboard</h1>
        <p className="text-gray-300">Översikt av all projektanalys och systemhälsa</p>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Card: Project Overview */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-[#4970f1] py-3 px-4 rounded-lg">
                <i className="fas fa-project-diagram text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Projektöversikt</h3>
                <p className="text-gray-400 text-xs">Senast uppdaterad: 10:43:31</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <i className="fas fa-sync"></i>
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Totalt filer:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Kvalitetsbetyg:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Kodkvalitet:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Säkerhetspoäng:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
          </div>
        </div>

        {/* Middle Card: Critical Problems */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-red-500 py-3 px-4 rounded-lg">
              <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold">Kritiska Problem</h3>
              <p className="text-gray-400 text-xs">Kräver omedelbar uppmärksamhet</p>
            </div>
          </div>
          <div className="space-y-3 text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Säkerhetsrisker:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Prestanda:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Kodkvalitet:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
          </div>
          <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium text-md flex items-center justify-center gap-2">
            <i className="fas fa-list"></i>
            Visa alla
          </button>
        </div>

        {/* Right Card: AI Recommendations */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-[#834bf1] py-3 px-4 rounded-lg">
              <i className="fas fa-brain text-white text-2xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold">AI-Rekommendationer</h3>
              <p className="text-gray-400 text-xs">Smart analys & förslag</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center min-h-[200px] text-center">
            <i className="fas fa-brain text-6xl text-purple-400/20 mb-4"></i>
            <p className="text-gray-400 text-sm">
              Kör analys för att få AI-rekommendationer
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Card: Project Statistics */}
      <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#22c55e] py-3 px-4 rounded-lg">
            <i className="fas fa-chart-pie text-white text- Воxl"></i>
          </div>
          <h2 className="text-2xl font-bold">Projektstatistik</h2>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div>
            <span className="text-sm font-medium">Genomsnittlig filstorlek:</span>
            <p className="text-gray-400 text-xs mt-1">-</p>
          </div>
          <div>
            <span className="text-sm font-medium">Kodtäckning:</span>
            <p className="text-gray-400 text-xs mt-1">-</p>
          </div>
          <div>
            <span className="text-sm font-medium">Kommentarsgrad:</span>
            <p className="text-gray-400 text-xs mt-1">-</p>
          </div>
          <div>
            <span className="text-sm font-medium">Teknisk skuld:</span>
            <p className="text-gray-400 text-xs mt-1">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}