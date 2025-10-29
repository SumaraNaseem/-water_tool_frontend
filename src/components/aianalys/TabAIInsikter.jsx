export default function TabAIInsikter() {
  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl ">
        <h1 className="text-3xl font-bold mb-2">AI-Insikter</h1>
        <p className="text-gray-300">AI-driven analys och rekommendationer</p>
      </div>

      {/* AI Model Performance Section */}
      <div className=" border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#22c55e] py-3 px-4 rounded-lg">
              <i className="fas fa-chart-line text-white text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold">AI-Modell Prestanda</h2>
          </div>
          <button className="text-gray-400 hover:text-white">
            <i className="fas fa-file-alt"></i>
          </button>
        </div>

        {/* Empty State with Brain Icon */}
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="relative">
            <i className="fas fa-brain text-8xl text-purple-400/20 mb-6"></i>
            <div className="absolute -bottom-2 -right-2 bg-purple-500 py-3 px-4 rounded-full">
              <i className="fas fa-cog text-white text-xl"></i>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">AI-modell träningsprestanda</h3>
          <p className="text-gray-400 text-sm mb-6">
            Träna modellen för att se resultat
          </p>
          <button className="px-6 py-3 bg-[#1e40af] hover:bg-[#4970f1] rounded-lg font-medium text-md flex items-center gap-2">
            <i className="fas fa-play-circle"></i>
            Träna Modell
          </button>
        </div>
      </div>
    </div>
  );
}
