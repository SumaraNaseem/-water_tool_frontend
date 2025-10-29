export default function TabRegelefterlevnad() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Regelefterlevnad</h1>
        <p className="text-gray-300">
          Automatisk övervakning av juridiska krav och branschstandarder
        </p>
      </div>

      {/* Two Compliance Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Card: GDPR Compliance */}
        <div className="bg-white/15 border-gray-400 backdrop-blur-sm rounded-xl p-4 border shadow-lg">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#4970f1] py-3 px-5 rounded-lg">
                <i className="fas fa-clipboard-check text-white text-2xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">GDPR-efterlevnad</div>
              </div>
            </div>

            <div className=" items-center  bg-green-500/20 border-2 border-green-500 text-green-500 px-3 py-1 rounded-full font-medium text-sm ">
              <i className="fas fa-check mr-1"></i>
              Kompatibel
            </div>
          </div>

          <p className="text-white text-sm mb-6">
            Automatisk datahantering enligt GDPR-krav
          </p>

          <div className="space-y-3 text-sm">
            <div>
              <span className="text-sm font-medium">Senaste revision:</span>
              <p className="text-gray-400 text-xs">2024-08-15</p>
            </div>
            <div>
              <span className="text-sm font-medium">Nästa kontroll:</span>
              <p className="text-gray-400 text-xs">2024-11-15</p>
            </div>
          </div>
        </div>

        {/* Right Card: ISO 27001 */}
        <div className="bg-white/15 border-gray-400 backdrop-blur-sm rounded-xl p-4 border shadow-lg">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#4970f1] py-3 px-4 rounded-lg">
                <i className="fas fa-certificate text-white text-2xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold mb-2">ISO 27001</div>
              </div>
            </div>

            <div className=" items-center  bg-green-500/20 border-2 border-green-500 text-green-500 px-3 py-1 rounded-full font-medium text-sm ">
              <i className="fas fa-check mr-1"></i>
              Certifierad
            </div>
          </div>

          <p className="text-white text-sm mb-6">
            Informationssäkerhetshantering enligt ISO 27001
          </p>

          <div className="text-sm">
            <span className="text-sm font-medium">
              Certifikat giltigt till:
            </span>
            <p className="text-gray-400 text-xs">2025-06-30</p>
          </div>
        </div>
      </div>
    </div>
  );
}
