export default function TabDigitalTvilling() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/15">
        <h1 className="text-3xl font-bold mb-2">Digital tvilling</h1>
        <p className="text-gray-300">3D-modell av hela VA-systemet med realtidsdata och simuleringsmöjligheter</p>
      </div>

      {/* Main 3D Digital Twin Section */}
      <div className="bg-white/15 backdrop-blur-sm rounded-xl p-12 border border-gray-400 mb-6 min-h-[400px] flex flex-col items-center justify-center">
        <div className="bg-[#834bf1] p-4 rounded-full mb-6">
          <i className="fas fa-cube text-white text-6xl"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">3D Digital Tvilling</h2>
        <p className="text-gray-300 text-center mb-8">
          Interaktiv 3D-modell av VA-infrastrukturen
        </p>
        
        {/* Two Buttons */}
        <div className="flex gap-4 mb-4">
          <button className="bg-[#1e40af] hover:bg-[#4970f1] text-white px-6 py-3 rounded-lg font-medium text-md flex items-center gap-2 transition-colors">
            <i className="fas fa-play"></i>
            Starta 3D-viewer
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium text-md flex items-center gap-2 transition-colors">
            <i className="fas fa-cog"></i>
            Kör simulering
          </button>
        </div>
        
        <p className="text-sm text-gray-400">
          Requires WebGL support. Loading full 3D environment...
        </p>
      </div>

      {/* Bottom Two Cards Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Card: Modellstatus */}
        <div className="bg-white/15  border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#22c55e] py-3 px-4 rounded-lg">
              <i className="fas fa-layer-group text-white text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold">Modellstatus</h3>
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-sm font-medium">Senaste uppdatering:</span>
              <p className="text-teal-400 text-xs ">2024-08-21 14:25</p>
            </div>

            <div>
              <span className=" text-sm font-medium">Modellkomplexitet:</span>
              <p className="text-gray-400  text-xs">15,234 komponenter</p>
            </div>

            <div>
              <span className=" text-sm font-medium">Datasynkronisering:</span>
              <div className="mt-2">
                <span className="bg-green-500/20 border-2 border-green-500 text-green-500 px-3 py-1 rounded-full text-xs font-medium">
                  Realtid
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: VR/AR-funktioner */}
        <div className="bg-white/15  border-gray-400 backdrop-blur-sm rounded-xl p-6 border  shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-500 p-3 rounded-lg">
              <i className="fas fa-vr-cardboard text-white text-xl"></i>
            </div>
            <h3 className="text-2xl font-bold">VR/AR-funktioner</h3>
          </div>
          <div className="mb-6">
            <p className="text-white text-md font-medium mb-3">Immersiv visualisering för:</p>
            <ul className="space-y-2 text-sm font-medium">
              <li className="flex items-center gap-2">
                <i className="fas fa-circle text-blue-400 text-xs"></i>
                <span>Underhållsplanering</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-circle text-blue-400 text-xs"></i>
                <span>Operatörsutbildning</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-circle text-blue-400 text-xs"></i>
                <span>Problemdiagnostik</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-circle text-blue-400 text-xs"></i>
                <span>Scenariosimuleringar</span>
              </li>
            </ul>
          </div>
          <button className="w-full bg-[#1e40af] hover:bg-[#4970f1] text-white py-3 rounded-lg font-medium text-md flex items-center justify-center gap-2 transition-colors">
            <i className="fas fa-vr-cardboard"></i>
            Starta VR-läge
          </button>
        </div>
      </div>
    </div>
  );
}
