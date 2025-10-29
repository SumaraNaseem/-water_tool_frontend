export default function TabSCADASystem() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">SCADA-systemintegration</h1>
        <p className="text-gray-300 text-md">Realtidsdata från processtyrsystem och automationsutrustning</p>
      </div>

      {/* OPC UA Server Details Card */}
      <div className="backdrop-blur-sm rounded-xl p-6 bg-white/15 border border-gray-400 max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#e38508] py-3 px-4 rounded-lg">
            <i className="fas fa-server text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">OPC UA Server</h2>
        </div>

        <div className="space-y-6">
          {/* Server URL */}
          <div>
            <label className="block text-md font-bold mb-2">Server URL:</label>
            <div className="bg-white/5 border border-white/20 rounded-lg px-4 max-w-lg text-nowrap overflow-hidden text-ellipsis py-4 text-white text-sm">
              opc.tcp://scada.lidkoping.se:4840
              
            </div>
          </div>

          {/* Connection Status */}
          <div>
            <label className="block text-md font-bold mb-4">Anslutningsstatus:</label>
            <span className="items-center gap-2 bg-green-500/20 border-2 border-green-500 text-green-500 px-4 py-2 rounded-full text-sm font-medium">
              <i className="fas fa-check-circle mr-1"></i>
              Ansluten
            </span>
          </div>

          {/* Active Tags */}
          <div>
            <label className="block textmd font-bold mb-2">Aktiva taggar:</label>
            <p className="text-green-400 text-sm font-medium">247 av 312</p>
          </div>
        </div>
      </div>
    </div>
  );
}
