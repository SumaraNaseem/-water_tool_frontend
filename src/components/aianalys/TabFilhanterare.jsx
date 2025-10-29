import { useState } from "react";

export default function TabFilhanterare() {
  const [activeSubTab, setActiveSubTab] = useState("Uppladdning");

  return (
    <div className="p-8 text-white">
      {/* Header Section */}
      <div className="mb-6 py-8 px-6 border border-gray-400 rounded-xl bg-white/5">
        <h1 className="text-3xl font-bold mb-2">Avancerad Filhanterare</h1>
        <p className="text-gray-300">Intelligent filhantering med AI-driven analys</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-white/20">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveSubTab("Uppladdning")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeSubTab === "Uppladdning"
                ? "border-purple-400 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <i className="fas fa-upload"></i>
            Uppladdning
          </button>
          <button
            onClick={() => setActiveSubTab("Repository")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeSubTab === "Repository"
                ? "border-purple-400 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <i className="fas fa-folder"></i>
            Repository
          </button>
          <button
            onClick={() => setActiveSubTab("Analys")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-colors ${
              activeSubTab === "Analys"
                ? "border-purple-400 text-white"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <i className="fas fa-chart-bar"></i>
            Analys
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeSubTab === "Uppladdning" && (
        <div className="space-y-6">
          {/* Drag and Drop Area */}
          <div className="bg-white/5 border-gray-400 backdrop-blur-sm rounded-xl p-12 border-2 border-dashed shadow-lg text-center">
            <i className="fas fa-cloud-upload-alt text-5xl text-purple-400 mb-4"></i>
            <h3 className="text-xl font-semibold mb-2">Dra och släpp filer här</h3>
            <p className="text-gray-400 mb-6">eller klicka för att välja filer</p>
            <div className="flex gap-3 justify-center">
              <button className="px-6 py-3 bg-[#1e40af] hover:bg-[#4970f1] rounded-lg font-medium text-md flex items-center gap-2">
                <i className="fas fa-folder-open"></i>
                Välj mapp
              </button>
              <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-medium text-md flex items-center gap-2">
                <i className="fas fa-file"></i>
                Välj filer
              </button>
            </div>
          </div>

          {/* Projektfiler Section */}
          <div className="bg-white/5 border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Projektfiler</h3>
            <div className="text-center py-8">
              <i className="fas fa-folder text-4xl text-gray-500 mb-4"></i>
              <p className="text-gray-400">Inga filer uppladdade ännu</p>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === "Repository" && (
        <div className="bg-white/5 border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Repository</h2>
          <p className="text-gray-300">Repository content will be displayed here.</p>
        </div>
      )}

      {activeSubTab === "Analys" && (
        <div className="bg-white/5 border-gray-400 backdrop-blur-sm rounded-xl p-6 border shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Analys</h2>
          <p className="text-gray-300">Analysis content will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
