export default function TabRapporter() {
  const reportTypes = [
    {
      name: "Executive Summary",
      icon: "fas fa-chart-pie",
      description: "Sammandrag för ledning"
    },
    {
      name: "Teknisk rapport",
      icon: "fas fa-cog",
      description: "Detaljerad tekniska analys"
    },
    {
      name: "Säkerhetsrapport",
      icon: "fas fa-shield-alt",
      description: "Säkerhetsbedömning"
    },
    {
      name: "Prestandarapport",
      icon: "fas fa-tachometer-alt",
      description: "Prestandamätvärden"
    }
  ];

  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex-1">
          <button className="mb-4 text-gray-300 hover:text-white flex items-center gap-2">
            <i className="fas fa-arrow-left"></i>
            Tillbaka till Dashboard
          </button>
          <h1 className="text-3xl font-bold mb-2">Rapporter & Export</h1>
          <p className="text-gray-300">Generera och exportera analysrapporter</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-calendar"></i>
            Schemalägg
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-file-alt"></i>
            Fullständig rapport
          </button>
        </div>
      </div>

      {/* Quick Reports Card */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <i className="fas fa-file-pdf text-blue-400 text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">Snabbrapporter</h2>
        </div>

        {/* Report Items List */}
        <div className="space-y-3">
          {reportTypes.map((report, index) => (
            <button
              key={index}
              className="w-full bg-white/5 hover:bg-white/10 rounded-lg p-4 flex items-center gap-4 transition-colors text-left"
            >
              <div className="bg-purple-500/20 p-3 rounded-lg">
                <i className={`${report.icon} text-purple-400 text-xl`}></i>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white">{report.name}</h3>
                <p className="text-sm text-gray-400">{report.description}</p>
              </div>
              <i className="fas fa-chevron-right text-gray-400"></i>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}