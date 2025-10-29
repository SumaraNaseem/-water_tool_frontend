export default function TabSäkerhet() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2">Säkerhetsanalys</h1>
        <p className="text-gray-300">Omfattande säkerhetsbedömning och sårbarhetsscanning</p>
      </div>

      {/* Top Row: Three Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Left Card: Security Profile */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#22c55e] py-3 px-4 rounded-lg">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Säkerhetsprofil</h3>
          </div>
          <p className="text-gray-400 text-xs mb-4">Övergripande säkerhetsbetyg</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Säkerhetspoäng:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Riskprofil:</span>
              <span className="text-gray-400 text-xs">-</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Senaste skanning:</span>
              <span className="text-gray-400 text-xs">Aldrig</span>
            </div>
          </div>
        </div>

        {/* Middle Card: Critical Vulnerabilities */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 py-3 px-4 rounded-lg">
              <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Kritiska Sårbarheter</h3>
          </div>
          <p className="text-red-400 text-xs mb-4">0 hittades</p>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-sm font-medium">XSS-risker:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">SQL Injection:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">CSRF-sårbarheter:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Osäkra beroenden:</span>
              <span className="text-gray-400 text-xs">0</span>
            </div>
          </div>
        </div>

        {/* Right Card: Security Configuration */}
        <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-[#4970f1] py-3 px-4 rounded-lg">
              <i className="fas fa-lock text-white text-2xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Säkerhetskonfiguration</h3>
          </div>
          <p className="text-gray-400 text-xs mb-4">Headers & policies</p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">HTTPS:</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-400 text-xs">Aktivt</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">CSP:</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span className="text-orange-400 text-xs">Delvis</span>
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">HSTS:</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                <span className="text-red-400 text-xs">Inaktiv</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Card: Vulnerabilities & Risks */}
      <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 py-3 px-4 rounded-lg">
              <i className="fas fa-bug text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold">Sårbarheter & Risker</h2>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium flex items-center gap-2">
              <i className="fas fa-file-alt"></i>
              Rapport
            </button>
            <button className="px-4 py-2 bg-[#1e40af] hover:bg-[#4970f1] rounded-lg text-sm font-medium flex items-center gap-2">
              <i className="fas fa-ticket-alt"></i>
              Skapa tickets
            </button>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="relative mb-6">
            <i className="fas fa-shield-alt text-6xl text-purple-400/20"></i>
          </div>
          <p className="text-gray-400 text-sm">
            Kör säkerhetsskanning för att identifiera sårbarheter
          </p>
        </div>
      </div>
    </div>
  );
}
