export default function TabÖversikt() {
  return (
    <div className="p-8 text-white">
      {/* Systemöversikt Section [#5f5ae4]*/}
      <div className="mb-8">
        <div className="mb-6 py-8 px-6 border  border-gray-400 rounded-xl bg-white/15">
          <h1 className="text-3xl font-bold mb-4 ">Systemöversikt</h1>
          <p className="text-white text-lg font-medium">
            Central kontrollpanel för alla VA-systemintegrationer
          </p>
        </div>

        {/* System Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* SCADA-system Card */}
          <div className="bg-white/15  rounded-xl p-4 border border-white/30 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#e38508] p-3 rounded-lg">
                  <i class="fas fa-cogs text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold">SCADA-system</h3>
              </div>

              <div className="flex gap-1 mt-3">
                <span className="bg-[#6484bd] text-[#22c55e] px-3 py-2 rounded-full text-xs font-semibold border-[1.5px] border-[#22c55e]">
                  <i class="fas fa-check-circle mr-1"></i>
                  Ansluten
                </span>
                <span className="bg-[#8a71b1] text-white px-3 py-2 rounded-full text-xs font-semibold border-[1.5px] border-[#e38508]">
                  <i class="fas fa-clock mr-1"></i>2 väntande
                </span>
              </div>
            </div>
            <div className="text-white text-md font-medium mb-2">
              Realtidsdata från 12 pumpstationer och 8 reningsverk
            </div>
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>85% dataflöde aktivt</span>
                <span>85%</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
            <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-arrow-right "></i> Hantera
            </button>
          </div>

          {/* SCALGO Live Card */}
          <div className="bg-white/15 rounded-xl p-4 border border-white/30 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="bg-[#4970f1] p-3 rounded-lg">
                  <i className="fas fa-map-marked-alt text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold">SCALGO Live</h3>
              </div>
              <span className="bg-[#6484bd] text-[#22c55e] px-3 py-2 mt-3 rounded-full text-xs font-semibold  border-[1.5px] border-[#22c55e]">
                <i class="fas fa-check-circle mr-1"></i>
                Synkroniserad
              </span>
            </div>
            <div className="text-white text-md font-medium mb-7">
              Riskanalys och översvämningsmodeller från SCALGO
            </div>

            <div className="mb-1">
              <div className="h-2 bg-white/30  rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>

            <div className="text-gray-400 text-xs mb-3">
              Senaste uppdatering: 2 timmar sedan
            </div>

            <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-arrow-right"></i> Visa data
            </button>
          </div>
        </div>

        <div>
          {/* Lantmäteriet Card */}
          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#22c55e] p-4 rounded-lg">
                  <i className="fas fa-globe text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold">Lantmäteriet</h3>
              </div>
              <span className="bg-[#6484bd] text-[#22c55e] px-3 py-2 mt-3 rounded-full text-xs font-semibold  border-[1.5px] border-[#22c55e]">
                <i class="fas fa-check-circle mr-1"></i>
                API Aktiv
              </span>
            </div>
            <p className="text-white text-md font-medium mb-4">
              Geodata, fastighetsinfo och höjdmodeller
            </p>
            <div className="mb-1">
              <div className="h-2 bg-white/30  rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-8">634 API-anrop idag</p>
            <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md transition-colors flex items-center justify-center gap-2">
              <i className="fas fa-arrow-right text-xs"></i> Konfigurera
            </button>
          </div>

          {/* Systemstatistik card */}

          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10 shadow-lg">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#834bf1] p-4 rounded-lg">
                  <i className="fas fa-database text-white text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold">KAKTOS</h3>
              </div>
              <span className="bg-red-500 text-white px-3 py-2 mt-3 rounded-full text-xs font-semibold  border-[1.5px] border-red-500">
                <i class="fas fa-check-circle mr-1"></i>
                Anslutningsfel
              </span>
            </div>
            <p className="text-white text-md font-medium mb-4">
              VA-huvudsystem för kunddata och fakturering
            </p>
            <div className="mb-1">
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>
            <p className="text-gray-400 text-xs mb-8">
              Senaste synk: 3 dagar sedan
            </p>
            <div className="flex items-center justify-center">
              <button className=" bg-red-500  hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium text-md transition-colors flex items-center justify-center gap-2">
                <i className="fas fa-arrow-right text-xs"></i> Återanslut
              </button>
            </div>
          </div>

          <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/10 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#e33f8d] p-4 rounded-lg">
                <i className="fas fa-chart-line text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-bold">Systemstatistik</h3>
            </div>

            <div className=" backdrop-blur-sm rounded-xl border border-white/10 shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-white/15  border-white/15">
                      <th className="text-left p-6 text-md font-bold text-white">
                        System
                      </th>
                      <th className="text-left p-6 text-md font-bold text-white">
                        Status
                      </th>
                      <th className="text-left p-6 text-md font-bold text-white">
                        Dataflöde/h
                      </th>
                      <th className="text-left p-6 text-md font-bold text-white">
                        Senaste sync
                      </th>
                      <th className="text-left p-6 text-md font-bold text-white">
                        Åtgärd
                      </th>
                    </tr>
                  </thead>
                  
                  <tbody className="divide-y divide-white/10">
                    <tr className="hover:bg-white/15  transition-colors">
                      <td className="py-3 px-6 text-xs font-medium">
                        SCADA Huvudstation
                      </td>
                      <td className="py-3 px-6">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-3xl text-xs font-medium">
                          Online
                        </span>
                      </td>
                      <td className="py-3 px-6 text-xs">2,341</td>
                      <td className="py-3 px-6 text-xs text-green-400">Nu</td>
                      <td className="py-3 px-6">
                        <button className="bg-white/15  text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                          Visa
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-white/15 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium">
                        IoT-sensornätverk
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Aktiv
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs">15,678</td>
                      <td className="py-4 px-6 text-xs text-green-400">
                        5 sek sedan
                      </td>
                      <td className="py-4 px-6">
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                          Hantera
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-white/15 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium">
                        AI-prediktionsmotor
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Tränar
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs">892</td>
                      <td className="py-4 px-6 text-xs text-yellow-400">
                        30 sek sedan
                      </td>
                      <td className="py-4 px-6">
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                          Konfigurera
                        </button>
                      </td>
                    </tr>

                    <tr className="hover:bg-white/15 transition-colors">
                      <td className="py-4 px-6 text-sm font-medium">
                        Digital Twin Engine
                      </td>
                      <td className="py-4 px-6">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Synkad
                        </span>
                      </td>
                      <td className="py-4 px-6 text-xs">1,205</td>
                      <td className="py-4 px-6 text-xs text-green-400">
                        12 sek sedan
                      </td>
                      <td className="py-4 px-6">
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                          Öppna 3D
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
