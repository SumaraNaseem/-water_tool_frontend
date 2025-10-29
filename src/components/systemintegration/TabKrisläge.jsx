export default function TabKrisläge() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className=" mb-6 py-8 px-6 border  border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Krisläge & Nödsituationer</h1>
        <p className="text-gray-300">
          Central hantering av akuta situationer och nödlägen
        </p>
      </div>

      {/* Active Alarms Section */}
      <div className="mb-6 border-2 border-red-500 rounded-xl p-6 bg-gradient-to-r from-red-500/25 to-red-500/15">
        <div className="flex items-center gap-3 mb-6">
          <i className="fas fa-exclamation-triangle text-red-500 text-2xl"></i>
          <h2 className="text-2xl font-bold">AKTIVA LARM</h2>
        </div>

        {/* Alarm Cards Grid */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-6">
          {/* Water Leak Alarm Card */}
          <div className=" backdrop-blur-sm rounded-xl p-6 border-2 border-red-500 hover:-translate-y-1 duration-300 translation-transform">
            <div className="flex items-start gap-3 mb-4">
              <div className="bg-red-500 px-4 py-2 rounded-lg">
                <i className="fas fa-tint text-white text-3xl"></i>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">
                  Vattenläcka - Storgatan 45
                </h3>
                <p className="text-gray-300 text-sm">
                  Trycksfall: 65% under normalt. Automatisk avstängning
                  aktiverad.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>
                <i className="far fa-clock mr-2"></i>
                Upptäckt: 14:23 (för 12 min sedan)
              </p>
              <p>
                <i className="fas fa-home mr-2"></i>
                Påverkar: 340 hushåll
              </p>
            </div>
            <button className="w-full bg-red-500 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
              <i className="fas fa-phone"></i>
              Aktivera krishantering
            </button>
          </div>

          {/* Pump Failure Alarm Card */}
          <div className=" backdrop-blur-sm rounded-xl p-6 border-2 border-yellow-500 hover:-translate-y-1 duration-300 translation-transform ">
            <div className="flex items-start gap-3 mb-4">
              <div className=" px-6 py-2 rounded-lg bg-orange-500">
                <i className="fas fa-exclamation text-white text-3xl "></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold">Pumpfel - PS03 Söder</h3>

                  <span className="bg-orange-500/50 border-yellow-500 border-[2px] text-yellow-500 px-3 py-[6px] rounded-full text-xs font-bold">
                    VARNING
                  </span>
                </div>

                <p className="text-gray-300 text-sm">
                  Huvudpump offline. Reservpump aktiverad automatiskt.
                </p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-300 mb-3">
              <p>
                <i className="far fa-clock mr-2"></i>
                Upptäckt: 13:45 (för 50 min sedan)
              </p>
              <p>
                <i className="fas fa-wrench mr-2"></i>
                Tekniker: På väg (ETA 15 min)
              </p>
            </div>
            <button className="w-full bg-white  text-gray-800 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
              <i className="fas fa-arrow-up "></i>
              Eskalera
            </button>
          </div>
        </div>

      </div>

      {/* Crisis Management Protocol Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border-[1.5px] border-gray-300 ">
        <div className="flex items-center gap-3 mb-6">
          <div className=" py-[15px] px-[15px] rounded-lg bg-orange-500">
            <i className="fas fa-phone text-white text-[25px]"></i>
          </div>
          <h2 className="text-3xl font-bold">Krishanteringsprotokoll</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Incident Type Dropdown */}
          <div>
            <label className="block text-sm font-bold mb-2">Incidenttyp:</label>
            <div className="relative">
              <select className="w-full bg-white/15 border border-gray-200 rounded-lg py-3 px-4 text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-200">
                <option value="water-leak" className="bg-gray-500 text-white">
                  Vattenläcka
                </option>
                <option value="pump-failure" className="bg-gray-500 text-white">
                  Pumpfel
                </option>
                <option
                  value="pressure-loss"
                  className="bg-gray-500 text-white"
                >
                  Tryckfall
                </option>
                <option
                  value="contamination"
                  className="bg-gray-500 text-white"
                >
                  Kontaminering
                </option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 mt-4  text-white pointer-events-none"></i>
            </div>
          </div>

          {/* Severity Level Dropdown */}
          <div>
            <label className="block text-sm font-bold mb-2">
              Allvarlighetsgrad:
            </label>
            <div className="relative">
              <select className="w-full bg-white/15 border border-gray-200 rounded-lg py-3 px-4 text-white appearance-none cursor-pointer hover:bg-white/10 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-200">
                <option value="critical" className="bg-gray-500 text-white">
                  Kritisk - Omedelbar åtgärd
                </option>
                <option value="high" className="bg-gray-500 text-white">
                  Hög - Åtgärder inom 1 tim
                </option>
                <option value="medium" className="bg-gray-500 text-white">
                  Medel - Åtgärder inom 4 tim
                </option>
                <option value="low" className="bg-gray-500 text-white">
                  Låg - Rutinåtgärd
                </option>
              </select>
              <i className="fas fa-chevron-down absolute right-3 mt-4  text-white pointer-events-none"></i>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center items-center">
          <button className=" bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg  font-bold mt-10 ">
            <i className="fas fa-exclamation-circle mr-2"></i>
            Initiera nödprotokoll
          </button>
        </div>
      </div>
    </div>
  );
}
