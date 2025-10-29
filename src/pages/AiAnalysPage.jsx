import { useState } from "react";
import { Link } from "react-router-dom";
import TabDashboard from "../components/aianalys/TabDashboard";
import TabFilhanterare from "../components/aianalys/TabFilhanterare";
import TabKodanalys from "../components/aianalys/TabKodanalys";
import TabAIInsikter from "../components/aianalys/TabAIInsikter";
import TabSäkerhet from "../components/aianalys/TabSäkerhet";
import TabPrestanda from "../components/aianalys/TabPrestanda";
import TabBeroenden from "../components/aianalys/TabBeroenden";
import TabTestning from "../components/aianalys/TabTestning";
import TabRapporter from "../components/aianalys/TabRapporter";
import TabKonsol from "../components/aianalys/TabKonsol";

export default function AiAnalysPage({ user, onLogout }) {
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navItems = [
    { id: "Dashboard", icon: "fas fa-clock", hasBadge: true, badgeCount: 1 },
    { id: "Filhanterare", icon: "fas fa-folder", hasBadge: true, badgeCount: 0 },
    { id: "Kodanalys", icon: "fas fa-code", hasBadge: true, badgeCount: 0 },
    { id: "AI-Insikter", icon: "fas fa-brain", hasBadge: true, badgeCount: 0 },
    { id: "Säkerhet", icon: "fas fa-shield-alt", hasBadge: true, badgeCount: 2 },
    { id: "Prestanda", icon: "fas fa-chart-line", hasBadge: true, badgeCount: 0 },
    { id: "Beroenden", icon: "fas fa-users", hasBadge: true, badgeCount: 0 },
    { id: "Testning", icon: "fas fa-pencil-alt", hasBadge: true, badgeCount: 0 },
    { id: "Rapporter", icon: "fas fa-file-alt", hasBadge: true, badgeCount: 0 },
    { id: "Konsol", icon: "fas fa-terminal", hasBadge: true, badgeCount: 0 },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-[300px] bg-gradient-to-b from-[#768aeb] via-[#7783e1] to-[#7a7bd5]  text-white flex flex-col border-r border-gray-300/50">
        {/* Header Section */}
        <div className="px-6 py-4 mt-8 border-b border-gray-300/50 relative">
          <div className="flex  gap-2 mb-3">
            <div className="text-3xl"><i class="fas fa-brain"></i></div>
            <div>
              <div className="text-3xl font-bold mb-3">AI Analys Pro</div>
              <div className="text-sm text-center text-gray-300">Enterprise Edition</div>
            </div>
          </div>
          <button className="absolute top-0 -translate-y-1/2 right-6 w-8 h-8 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
            <i className="fas fa-arrow-left text-sm"></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y- ">
            {navItems.map((item) => (
              <li key={item.id}>

                <button
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left  transition-colors relative ${
                    activeNav === item.id
                      ? "bg-[#8d92e0] "
                      : "text-white hover:bg-[#8d92e0]"
                  }`}
                >
                  <i className={`${item.icon} text-lg`}></i>
                  <span className="text-lg font-medium">{item.id}</span>
                  {item.hasBadge && item.badgeCount > 0 && (
                    <span className="absolute top-1/2 -translate-y-1/2 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {item.badgeCount}
                    </span>
                  )}
                  
                </button>

               <button>
               
               </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-gradient-to-r from-[#6778e2] via-[#6d6ace] to-[#715dbb]  overflow-y-auto">
        {/* Render content based on active nav */}
        {activeNav === "Dashboard" && <TabDashboard />}
        {activeNav === "Filhanterare" && <TabFilhanterare />}
        {activeNav === "Kodanalys" && <TabKodanalys />}
        {activeNav === "AI-Insikter" && <TabAIInsikter />}
        {activeNav === "Säkerhet" && <TabSäkerhet />}
        {activeNav === "Prestanda" && <TabPrestanda />}
        {activeNav === "Beroenden" && <TabBeroenden />}
        {activeNav === "Testning" && <TabTestning />}
        {activeNav === "Rapporter" && <TabRapporter />}
        {activeNav === "Konsol" && <TabKonsol />}
      </main>
    </div>
  );
}
