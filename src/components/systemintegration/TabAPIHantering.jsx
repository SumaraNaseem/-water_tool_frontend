export default function TabAPIHantering() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">API-hantering</h1>
        <p className="text-gray-300">Central hantering av alla API-anslutningar och nycklar</p>
      </div>

      {/* API Status Card */}
      <div className="  border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg max-w-4xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#4970f1] py-3 px-4 rounded-lg">
            <i className="fas fa-key text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold">API-status</h2>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-white text-sm font-medium">
              Totalt anrop idag: <span className="font-semibold">1,247</span>
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-medium">
              Genomsnittlig svarstid: <span className="font-semibold">187ms</span>
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-medium">
              Felfrekvens: <span className="font-semibold">0.2%</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
