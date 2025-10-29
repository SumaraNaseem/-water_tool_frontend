export default function TabKonsol() {
  const logs = [
    { time: "00:34:02", level: "INFO", message: "Återupptar realtidsuppdateringar" },
    { time: "00:34:04", level: "INFO", message: "Navigerade till: testing" },
    { time: "00:34:20", level: "INFO", message: "Pausar realtidsuppdateringar" },
    { time: "00:41:25", level: "INFO", message: "Återupptar realtidsuppdateringar" },
    { time: "00:41:29", level: "INFO", message: "Pausar realtidsuppdateringar" },
    { time: "00:42:14", level: "INFO", message: "Återupptar realtidsuppdateringar" },
    { time: "00:42:21", level: "INFO", message: "Navigerade till: reports" },
    { time: "00:42:35", level: "INFO", message: "Pausar realtidsuppdateringar" },
    { time: "00:42:52", level: "INFO", message: "Återupptar realtidsuppdateringar" },
    { time: "00:42:55", level: "INFO", message: "Navigerade till: console" },
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
          <h1 className="text-3xl font-bold mb-2">Analys konsol</h1>
          <p className="text-gray-300">Real-time loggning och systemdiagnostik</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-download"></i>
            Exportera loggar
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-sm flex items-center gap-2">
            <i className="fas fa-trash"></i>
            Rensa
          </button>
        </div>
      </div>

      {/* System Log Console */}
      <div className="bg-gray-900/80 rounded-xl p-6 border border-gray-700">
        {/* Console Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 px-3 py-1 rounded">
              <i className="fas fa-terminal text-green-400"></i>
              <span className="ml-2 text-green-400 font-semibold">System Log</span>
            </div>
          </div>
          <div className="relative">
            <select className="bg-gray-800 border border-gray-700 rounded px-3 py-1.5 text-white text-sm appearance-none cursor-pointer pr-8">
              <option>Alla nivåer</option>
              <option>Info</option>
              <option>Warning</option>
              <option>Error</option>
            </select>
            <i className="fas fa-chevron-down absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none text-xs"></i>
          </div>
        </div>

        {/* Log Entries */}
        <div className="space-y-1 font-mono text-sm max-h-[500px] overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-green-400 hover:bg-gray-800/50 px-2 py-1 rounded">
              <span className="text-green-500">{log.time}</span>
              {" "}
              <span className="text-blue-400">[{log.level}]</span>
              {" "}
              <span className="text-gray-300">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}