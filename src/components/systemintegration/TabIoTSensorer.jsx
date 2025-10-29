export default function TabIoTSensorer() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">IoT-sensornätverk</h1>
        <p className="text-gray-300">Distribuerade sensorer för omfattande övervakning av VA-infrastrukturen</p>
      </div>

      {/* Sensor Cards Grid - 2 rows, 3 columns */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* Water Temperature Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-gray-400">
          <div className="flex  items-center justify-between mb-4">
            <div className="bg-[#4970f1] py-3 px-5 rounded-lg">
              <i className="fas fa-thermometer-half text-white text-2xl"></i>
            </div>

            <div className="bg-green-500/20 border-2 border-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Online
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">12.3°C</div>
          <div className="text-gray-300 text-xs font-medium">Vattentemperatur</div>
        </div>

        {/* pH Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#22c55e] py-3 px-4 rounded-lg">
              <i className="fas fa-vial text-white text-2xl"></i>
            </div>
            <span className="bg-green-500/20 border-2 border-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Online
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">7.2 pH</div>
          <div className="text-gray-300 text-xs font-medium">Surhetsgrad</div>
        </div>

        {/* Chlorine Content Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#e38508] py-3 px-4 rounded-lg">
              <i className="fas fa-cloud text-white text-2xl"></i>
            </div>
            <span className="bg-orange-500/20 border-2 border-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Kalibrering
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">0.3 mg/L</div>
          <div className="text-gray-300 text-xs font-medium">Klorinnehåll</div>
        </div>

        {/* Flow Meter #1 Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#4970f1] py-3 px-5 rounded-lg">
              <i className="fas fa-tint text-white text-2xl"></i>
            </div>
            <span className="bg-green-500/20 border-2 border-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Online
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">245 l/s</div>
          <div className="text-gray-300 text-xs font-medium">Flödesmätare #1</div>
        </div>

        {/* Battery Status Card */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-[#834bf1] py-3 px-4 rounded-lg">
              <i className="fas fa-battery-three-quarters text-white text-2xl"></i>
            </div>
            <span className="bg-green-500/20 border-2 border-green-500 text-white px-5 py-1 rounded-full text-xs font-semibold">
              God
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">87%</div>
          <div className="text-gray-300 text-xs font-medium">Batteristatus</div>
        </div>

        {/* Pressure Sensor #3 Card - OFFLINE */}
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
          <div className="flex items-start justify-between mb-4">
            <div className="bg-red-500 py-3 px-4 rounded-lg">
              <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
            <span className="bg-red-500/20 border-2 border-red-500 text-white px-6 py-1 rounded-full text-xs font-semibold">
              Fel
            </span>
          </div>
          <div className="text-3xl font-bold mb-2">OFFLINE</div>
          <div className="text-gray-300 text-xs font-medium">Tryckgivare #3</div>
        </div>
      </div>

      {/* Sensor Network Status Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-gray-400">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#22c55e] p-4 rounded-lg">
            <i className="fas fa-project-diagram text-white text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold">Sensornätverksstatus</h2>
        </div>

        {/* Status Table */}
        <div className="backdrop-blur-sm rounded-xl border border-gray-400 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-white/15 border-white/15">
                  <th className="text-left p-6 text-md font-bold text-white">Sensortyp</th>
                  <th className="text-left p-6 text-md font-bold text-white">Aktiva</th>
                  <th className="text-left p-6 text-md font-bold text-white">Totalt</th>
                  <th className="text-left p-6 text-md font-bold text-white">Tillgänglighet</th>
                  <th className="text-left p-6 text-md font-bold text-white">Senaste data</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {/* Flow Meters Row */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Flödesmätare</td>
                  <td className="py-4 px-6 text-sm">23</td>
                  <td className="py-4 px-6 text-sm">25</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      92%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">12 sek sedan</td>
                </tr>

                {/* Pressure Sensors Row */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Tryckgivare</td>
                  <td className="py-4 px-6 text-sm">18</td>
                  <td className="py-4 px-6 text-sm">20</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      90%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">8 sek sedan</td>
                </tr>

                {/* Quality Sensors Row */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Kvalitetssensorer</td>
                  <td className="py-4 px-6 text-sm">15</td>
                  <td className="py-4 px-6 text-sm">16</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      94%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">15 sek sedan</td>
                </tr>

                {/* Level Sensors Row */}
                <tr className="hover:bg-white/15 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium">Nivågivare</td>
                  <td className="py-4 px-6 text-sm">12</td>
                  <td className="py-4 px-6 text-sm">12</td>
                  <td className="py-4 px-6">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      100%
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-300">5 sek sedan</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}