import React, { useState } from "react";
import { Link } from "react-router-dom";

// Import all tab components
import RationellaMetoden from "../components/dagvatten/RationellaMetoden";
import Yttyper from "../components/dagvatten/Yttyper";
import RorDimensionering from "../components/dagvatten/RorDimensionering";
import Magasinering from "../components/dagvatten/Magasinering";
import Infiltration from "../components/dagvatten/Infiltration";
import Diken from "../components/dagvatten/Diken";
import Pumpstationer from "../components/dagvatten/Pumpstationer";
import Oversvamning from "../components/dagvatten/Oversvamning";
import Ekonomi from "../components/dagvatten/Ekonomi";
import IDFTabeller from "../components/dagvatten/IDFTabeller";
import Kurvor from "../components/dagvatten/Kurvor";

export default function DagvattenPage({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState("Rationella metoden");

  // Tab content components
  const renderTabContent = () => {
    switch (activeTab) {
      case "Rationella metoden":
        return <RationellaMetoden />;
      
      case "Yttyper":
        return <Yttyper />;                           
      
      case "Rördimensionering":
        return <RorDimensionering />;
      
      case "Magasinering":
        return <Magasinering />;
      
      case "Infiltration":
        return <Infiltration />;
      
      case "Diken":
        return <Diken />;
      
      case "Pumpstationer":
        return <Pumpstationer />;
      
      case "Översvämning":
        return <Oversvamning />;
      
      case "Ekonomi":
        return <Ekonomi />;
      
      case "IDF Tabeller":
        return <IDFTabeller />;
      
      case "Kurvor":
        return <Kurvor />;
      
      default:
        return (
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-600 mb-4">Välj en tab</h3>
            <p className="text-gray-700">Klicka på en tab för att se innehållet.</p>
          </div>
        );
    }
  };

  const tabs = [
    {
      id: "Rationella metoden",
      name: "Rationella metoden",
      icon: "fas fa-calculator",
      active: true,
    },
    { id: "Yttyper", name: "Yttyper", icon: "fas fa-layer-group" },
    {
      id: "Rördimensionering",
      name: "Rördimensionering",
      icon: "fas fa-stream",
    },
    { id: "Magasinering", name: "Magasinering", icon: "fas fa-archive" },
    { id: "Infiltration", name: "Infiltration", icon: "fas fa-tint-slash" },
    { id: "Diken", name: "Diken", icon: "fas fa-mountain" },
    { id: "Pumpstationer", name: "Pumpstationer", icon: "fas fa-cog" },
    {
      id: "Översvämning",
      name: "Översvämning",
      icon: "fas fa-exclamation-triangle",
    },
    { id: "Ekonomi", name: "Ekonomi", icon: "fas fa-euro-sign" },
    { id: "IDF Tabeller", name: "IDF Tabeller", icon: "fas fa-table" },
    { id: "Kurvor", name: "Kurvor", icon: "fas fa-chart-line" },
  ];

  return (
    <div className="min-h-screen p-6 mx-auto ">
      {/* Header Section */}
      <div className="max-w-7xl  mx-auto rounded-xl border border-gray-100 bg-white shadow-lg">
        <div className="py-6 bg-gradient-to-r from-blue-400 to-purple-500 text-white  rounded-t-xl  ">
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="flex items-center justify-center mb-2 gap-4">
              <h1 className="text-2xl font-samibold ">
                <i className="fas fa-tint text-white text-2xl mr-[6px]"></i>
                P110 Dagvattendimensionering v
                <span className="text-[26px]">2.0</span>
              </h1>

              <div className="bg-green-500 text-white px-[4px] py-[2px] rounded-3xl mt-3 font-semibold text-xs">
                VALIDERAD
              </div>
            </div>
            <p className="text-white/90 text-xs">
              Professionellt system för dagvattenhantering enligt svenska
              standarder - VALIDERAD för säker användning
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-5 justify-center">
            <button className="bg-green-400 hover:bg-green-600 text-white px-4 py-[5px] rounded-3xl font-semibold flex items-center gap-2 transition-colors text-sm">
              <i className="fas fa-print"></i>
              Skriv ut rapport
            </button>

            <button className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-[5px] rounded-3xl font-semibold flex items-center gap-2 transition-colors text-sm">
              <i className="fas fa-file-pdf"></i>
              Exportera PDF
            </button>

            <button className="bg-orange-400 hover:bg-orange-600 text-white px-4 py-[5px] rounded-3xl font-semibold flex items-center gap-2 transition-colors text-sm">
              <i className="fas fa-download"></i>
              Ladda ner data
            </button>

            <button className="bg-green-400 hover:bg-green-600 text-white px-4 py-[5px] rounded-3xl font-semibold flex items-center gap-2 transition-colors text-sm">
              <i className="fas fa-upload"></i>
              Ladda upp data
            </button>
          </div>
        </div>

        <div className=" p-6 relative ">
          {/* Main Content */}

          {/* Project Summary Section */}
          <div className="bg-gradient-to-r from-[#fff3e0] to-[#fff3e0] border-2 border-[#ff9800] rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold text-orange-500 text-center mb-4">
              Projektsammanfattning
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Row 1 */}
              <div className="bg-white border-l-4 border-[#ff9800] rounded-lg p-3">
                <h3 className="font-bold text-gray-800 mb-1 text-xs">
                  Projektområde
                </h3>
                <p className="text-gray-600 text-xs">15 ha avrinningsområde</p>
                <p className="text-gray-600 text-xs">Station: Lidköping</p>
                <p className="text-gray-600 text-xs">Återkomsttid: 10 år</p>
              </div>

              <div className="bg-white border-l-4 border-[#ff9800] rounded-lg p-3">
                <h3 className="font-bold text-gray-800 mb-1 text-xs">
                  Dimensionerande flöde
                </h3>
                <p className="text-gray-600 text-xs">3645.0 l/s</p>
                <p className="text-gray-600 text-xs">Avrinningskoeff: 0.90</p>
              </div>

              <div className="bg-white border-l-4 border-[#ff9800] rounded-lg p-3">
                <h3 className="font-bold text-gray-800 mb-1 text-xs">
                  Rekommenderad rördimension
                </h3>
                <p className="text-gray-600 text-xs">0 mm</p>
                <p className="text-gray-600 text-xs">(vid aktuell lutning)</p>
              </div>

              {/* Row 2 */}

              <div className="bg-white border-l-4 border-[#ff9800] rounded-lg p-3">
                <h3 className="font-bold text-gray-800 mb-1 text-xs">
                  Magasinvolym
                </h3>
                <p className="text-gray-600 text-xs">0 m³</p>
                <p className="text-gray-600 text-xs">(rekommenderad)</p>
              </div>

              <div className="bg-white border-l-4 border-[#ff9800] rounded-lg p-3">
                <h3 className="font-bold text-gray-800 mb-1 text-xs">
                  Beräknad totalkostnad
                </h3>
                <p className="text-gray-600 text-xs">0 Mkr</p>
                <p className="text-gray-600 text-xs">(30-årsperiod)</p>
              </div>

              <div className="bg-white border-l-4 border-[#ff9800] rounded-lg p-3">
                <h3 className="font-bold text-gray-800 mb-1 text-xs">
                  Kvalitetsstatus
                </h3>
                <p className="text-green-600 font-semibold text-xs">
                  VALIDERAD
                </p>
                <p className="text-gray-600 text-xs">P110 v2.0 Säker</p>
              </div>
            </div>
          </div>

          {/* Quality Control Section */}
          <div className="bg-green-50 border-l-4 border-green-300 rounded-lg p-4 mb-14">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <i className="fas fa-shield-alt text-gray-600 text-lg"></i>
                <h2 className="text-lg font-bold text-gray-700">
                  P110 Kvalitetskontroll
                </h2>
              </div>
              <p className="text-gray-500 text-xs">
                Validering: 2025-10-24 01:38:58
              </p>
            </div>

            <div className="space-y-2">
              <div className="border-[1.5px] border-green-500 text-green-500 px-3 py-2 rounded-md">
                <p className="font-semibold text-sm">
                  Risknivå: LOW (0 fel, 0 varningar)
                </p>
              </div>

              <div className="bg-green-100  rounded-lg p-3">
                <div>
                  <p className="font-semibold text-gray-700 text-sm">
                    <i className="fas fa-check-circle text-green-600 text-lg mr-1"></i>
                    Kvalitetskontroll godkänd
                  </p>
                  <p className="text-xs text-gray-600">
                    Beräkningarna följer P110 riktlinjer och svenska standarder.
                    Säkert för professionell användning.
                  </p>
                </div>
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

        <div className="p-6">
          {renderTabContent()}
        </div>
       

      </div>
    </div>
  );
}
