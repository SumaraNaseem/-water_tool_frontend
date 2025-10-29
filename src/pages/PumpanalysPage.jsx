import React, { useState } from "react";
import { Link } from "react-router-dom";
import StationSchematic from "../assets/StationSchematic";

// Import all tab components
import Pumpkurvor from "../components/pumpanalys/Pumpkurvor";
import Stationsdesign from "../components/pumpanalys/Stationsdesign";
import Grunddimensionering from "../components/pumpanalys/Grunddimensionering";
import Automation from "../components/pumpanalys/Automation";
import Kavitation from "../components/pumpanalys/Kavitation";

export default function PumpanalysPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("Grunddimensionering");
  const [selectedStationType, setSelectedStationType] = useState("dry"); // Add this state

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case "Grunddimensionering":
        return <Grunddimensionering />;

      case "Pumpkurvor":
        return <Pumpkurvor />;

      case "Kavitation":
        return <Kavitation />;

      case "Stationsdesign":
        return <Stationsdesign />;

      case "Automation":
        return <Automation />;

      default:
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-600 mb-4">
              Välj en tab
            </h3>
            <p className="text-gray-700">
              Klicka på en tab för att se innehållet.
            </p>
          </div>
        );
    }
  };

  // Add function to handle station type selection
  const handleStationTypeSelect = (stationType) => {
    setSelectedStationType(stationType);
  };

  // Add function to get station title
  const getStationTitle = (stationType) => {
    switch (stationType) {
      case "dry":
        return "Torr Pumpstation - Konfiguration";
      case "submersible":
        return "Dränkbar Pumpstation - Konfiguration";
      case "hybrid":
        return "Hybridstation - Konfiguration";
      default:
        return "Torr Pumpstation - Konfiguration";
    }
  };

  const tabs = [
    {
      id: "Grunddimensionering",
      name: "Grunddimensionering",
      icon: "fas fa-calculator",
      active: true,
    },

    { id: "Pumpkurvor", name: "Pumpkurvor & System", icon: "fas fa-layer-group" },

    {
      id: "Kavitation",
      name: "NPSH & Kavitation",
      icon: "fas fa-stream",
    },

    { id: "Stationsdesign", name: "Stationsdesign", icon: "fas fa-archive" },

    { id: "Automation", name: "Automation", icon: "fas fa-tint-slash" },
  ];

  return (
    <div className="min-h-screen p-6 mx-auto ">
      {/* Header Section */}
      <div className="max-w-7xl  mx-auto rounded-xl border border-gray-100 bg-white shadow-lg">
       

        {/* Header - */}
        <div className="text-white p-6 lg:pl-40 lg:flex items-center rounded-t-xl lg:gap-4 relative bg-gradient-to-br from-[#677ce7] to-[#764da5]">
          <Link
            to="/"
            className="absolute lg:block hidden top-1/2 left-6 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all bg-white/20 backdrop-blur-sm text-sm no-underline"
          >
            <i className="fas fa-arrow-left"></i>
            Tillbaka till Dashboard
          </Link>
          <Link
            to="/"
            className="absolute  lg:hidden top-8 left-6 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all bg-white/20 backdrop-blur-sm text-sm no-underline"
          >
            <i className="fas fa-arrow-left"></i>
          </Link>

          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-white/20 backdrop-blur-sm">
            <i class="fas fa-industry"></i>
          </div>
          <div>
            <div className="text-2xl font-semibold">
              Avancerad Pumpstationsanalys
            </div>
            <div className="text-blue-100 text-sm mt-1 opacity-90">
              Torr pumpstation, Dränkbar station med kurvor, diagram och
              hydraulisk dimensionering
            </div>
          </div>
        </div>

        <div className=" p-6 relative ">
          {/* Main Content */}

          {/* Project Summary Section */}

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
            {/* Row 1 */}

            <div className="bg-gradient-to-r rounded-lg from-[#677ce7] to-[#764da5] hover:border border-[#677ce7]">
              <button 
                className={`w-full border-2 text-start hover:border-[#677ce7] border-gray-300 hover:translate-y-1 bg-[#c9e5fc] rounded-lg px-5 py-6 hover:cursor-pointer transition-all ${
                  selectedStationType === "dry" ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => handleStationTypeSelect("dry")}
              >
                <div className="mb-2">
                <h1 className="font-medium text-gray-800  text-xs">
                  Torr Pumpstation
                </h1>
                </div>
                <div className=" space-y-1">
               
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Enkel åtkomst
                  för service
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Flexibel
                  pumpkonfiguration
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Optimal för
                  stora flöden
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-wrench text-green-400 mr-1"></i>
                  Lägre driftkostnader
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-thermometer text-green-400  mr-1"></i>
                  Frostskydd krävs
                </p>
                
                </div>
                
              </button>
            </div>

            <div className="bg-gradient-to-r rounded-lg from-[#677ce7] to-[#764da5]  hover:border border-[#677ce7]">
              <button 
                className={`w-full border-2 text-start hover:border-[#677ce7] border-gray-300  hover:translate-y-1 bg-[#bfe4e1] rounded-lg px-5 py-6 hover:cursor-pointer transition-all ${
                  selectedStationType === "submersible" ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => handleStationTypeSelect("submersible")}
              >
                <h3 className="font-bold text-gray-800 mb-2 text-xs">
                  Dränkbar Pumpstation
                </h3>
                <div className="space-y-1">
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Kompakt design
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Inget
                  frostproblem
                </p>

                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Lägre
                  investeringskostnad
                </p>

                <p className="text-gray-600 text-xs">
                  <i class="fas fa-eye text-green-400 mr-1"></i>
                  Begränsad åtkomst
                </p>

                <p className="text-gray-600 text-xs">
                  <i class="fas fa-cog text-green-400 mr-1"></i>
                  Specialutrustning för lyft
                </p>
                </div>
              </button>
            </div>

            <div className="bg-gradient-to-r rounded-lg from-[#677ce7] to-[#764da5]  hover:border border-[#677ce7]">
              <button 
                className={`w-full border-2 text-start hover:border-[#677ce7] border-gray-300  hover:translate-y-1 bg-[#edf4ff] rounded-lg px-5 py-6 hover:cursor-pointer transition-all ${
                  selectedStationType === "hybrid" ? "ring-2 ring-blue-500 shadow-lg" : ""
                }`}
                onClick={() => handleStationTypeSelect("hybrid")}
              >
                <h3 className="font-bold text-gray-800 mb-2 text-xs">
                  Hybridstation
                </h3>
                <div className="space-y-1">
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Kombinerar
                  fördelar
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Redundans &
                  flexibilitet
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-check text-green-400 mr-1"></i>Optimal för
                  kritiska system
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-chart-line text-green-400 mr-1"></i>Högre
                  komplexitet
                </p>
                <p className="text-gray-600 text-xs">
                  <i class="fas fa-euro-sign text-green-400 mr-1"></i>Högre
                  investeringskostnad
                </p>
                </div>
              </button>
            </div>
          </div>

          {/* Quality Control Section */}
          <div className=" border border-gray-300 rounded-lg p-4 mb-14">
            <h2 className="text-md font-medium text-center text-blue-400 mb-2">
              {getStationTitle(selectedStationType)}
            </h2>

            <div className=" md:grid grid-cols-12">

              <div className="md:col-span-3">
                <div className="bg-[#e8ecf4] w-full h-full"></div>
              </div>

              <div className="md:col-span-6">
                <div className="w-full overflow-hidden">
                  <StationSchematic stationType={selectedStationType} />
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="bg-[#cad5e5] w-full h-full"></div>
              </div>
            </div>
          </div>

          {/*  Navigation */}
          <div className=" border-b-2 border-gray-200 absolute bottom-0 left-0 right-0 ">
            <div className=" py-1">
              <div className="flex  overflow-x-auto gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1 px-4 py-2 rounded-t-lg font-semibold whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "text-[#667eea] border-b-4 border-[#667eea]"
                        : "text-gray-600 bg-gray-100"
                    }`}
                  >
                    <i className={`${tab.icon} text-sm`}></i>
                    <span className="text-sm">{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">{renderTabContent()}</div>
      </div>
    </div>
  );
}