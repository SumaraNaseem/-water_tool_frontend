export default function TabKAKTOS() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">KAKTOS-integration</h1>
        <p className="text-gray-300 text-md">Anslutning till VA-huvudsystemet för kunddata och drift</p>
      </div>

      {/* Connection Error Panel */}
      <div className="border-2 border-red-500 rounded-xl p-6 bg-gradient-to-r from-red-500/25 to-red-500/15">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-red-500 py-3 px-4 rounded-lg">
            <i className="fas fa-exclamation-triangle text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-red-500">ANSLUTNINGSFEL</h2>
        </div>
        
        <div className="mb-6">
          <p className="text-white text-lg">
            KAKTOS-systemet har varit offline i 3 dagar. Kritiskt för fakturering och kundservice.
          </p>
        </div>

        <div className="flex justify-center">
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium text-md flex items-center gap-2 transition-colors">
            <i className="fas fa-sync"></i>
            Försök återanslutning
          </button>
        </div>
      </div>
    </div>
  );
}
