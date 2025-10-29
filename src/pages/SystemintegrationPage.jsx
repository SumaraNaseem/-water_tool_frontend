import { useState } from "react";
import { Link } from "react-router-dom";
import TabÖversikt from "../components/systemintegration/TabÖversikt";
import TabKrisläge from "../components/systemintegration/TabKrisläge";
import TabRealtidsdata from "../components/systemintegration/TabRealtidsdata";
import TabIoTSensorer from "../components/systemintegration/TabIoTSensorer";
import TabAIPrognoser from "../components/systemintegration/TabAIPrognoser";
import TabDigitalTvilling from "../components/systemintegration/TabDigitalTvilling";
import TabSCADASystem from "../components/systemintegration/TabSCADASystem";
import TabSCALGO from "../components/systemintegration/TabSCALGO";
import TabLantmäteriet from "../components/systemintegration/TabLantmäteriet";
import TabKAKTOS from "../components/systemintegration/TabKAKTOS";
import TabAPIHantering from "../components/systemintegration/TabAPIHantering";
import TabCybersäkerhet from "../components/systemintegration/TabCybersäkerhet";
import TabRegelefterlevnad from "../components/systemintegration/TabRegelefterlevnad";
import TabInställningar from "../components/systemintegration/TabInställningar";

export default function SystemintegrationPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState("Översikt");

  const navItems = [
    { id: "Översikt", icon: "fas fa-clock", hasBadge: true, badgeCount: 0 },
    { id: "Krisläge", icon: "fas fa-exclamation-triangle", hasBadge: true, badgeCount: 2 },
    { id: "Realtidsdata", icon: "fas fa-chart-line", hasBadge: true, badgeCount: 0 },
    { id: "IoT-sensorer", icon: "fas fa-cog", hasBadge: true, badgeCount: 0 },
    { id: "AI-prognoser", icon: "fas fa-brain", hasBadge: true, badgeCount: 0 },
    { id: "Digital tvilling", icon: "fas fa-cube", hasBadge: true, badgeCount: 0 },
    { id: "SCADA System", icon: "fas fa-cog", hasBadge: true, badgeCount: 0 },
    { id: "SCALGO", icon: "fas fa-file-alt", hasBadge: true, badgeCount: 0 },
    { id: "Lantmäteriet", icon: "fas fa-globe", hasBadge: true, badgeCount: 0 },
    { id: "KAKTOS", icon: "fas fa-database", hasBadge: true, badgeCount: 1 },
    { id: "API-hantering", icon: "fas fa-exchange-alt", hasBadge: true, badgeCount: 0 },
    { id: "Cybersäkerhet", icon: "fas fa-shield-alt", hasBadge: true, badgeCount: 0 },
    { id: "Regelefterlevnad", icon: "fas fa-check-circle", hasBadge: true, badgeCount: 0 },
    { id: "Inställningar", icon: "fas fa-cog", hasBadge: true, badgeCount: 0 },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-[300px] bg-gradient-to-b from-[#6084fc] via-[#3a4b9b] to-[#3d4a9e] text-white flex 
      flex-col  border-r border-gray-500">
        {/* Header Section */}
        <div className="py-6 px-4 border-b border-gray-400 text-center">
         
            
          <div className="mb-4">
              <div className="text-2xl font-bold mb-2"> <i class="fas fa-plug"></i> VA-Integration</div>
              <div className="text-md font-medium text-white">SCADA, GIS & Systemintegration</div>
          </div>
        
          <button className=" bg-[#1aaf51]  text-white px-4 py-2 rounded-3xl font-medium text-sm transition-colors">
            v2.0 Enterprise
          </button>

        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors relative ${
                    activeNav === item.id
                      ? "bg-[#7589d8] text-white"
                      : " hover:bg-[#7589d8]"
                  }`}
                >
                  <i className={`${item.icon} text-md`}></i>
                  <span className="text-md font-medium">{item.id}</span>
                  {item.hasBadge && item.badgeCount > 0 && (
                    <span className="absolute right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {item.badgeCount}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-[#363ed1]  overflow-y-auto">
        {/* Render content based on active nav */}
        {activeNav === "Översikt" && <TabÖversikt />}
        {activeNav === "Krisläge" && <TabKrisläge />}
        {activeNav === "Realtidsdata" && <TabRealtidsdata />}
        {activeNav === "IoT-sensorer" && <TabIoTSensorer />}
        {activeNav === "AI-prognoser" && <TabAIPrognoser />}
        {activeNav === "Digital tvilling" && <TabDigitalTvilling />}
        {activeNav === "SCADA System" && <TabSCADASystem />}
        {activeNav === "SCALGO" && <TabSCALGO />}
        {activeNav === "Lantmäteriet" && <TabLantmäteriet />}
        {activeNav === "KAKTOS" && <TabKAKTOS />}
        {activeNav === "API-hantering" && <TabAPIHantering />}
        {activeNav === "Cybersäkerhet" && <TabCybersäkerhet />}
        {activeNav === "Regelefterlevnad" && <TabRegelefterlevnad />}
        {activeNav === "Inställningar" && <TabInställningar />}
      </main>
    </div>
  );
}
