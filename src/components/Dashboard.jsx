import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashbordContent from "./DashbordContent";
import ModulesContent from "./ModulesContent";
import ProjectsContent from "./ProjectsContent";
import ReportsContent from "./ReportsContent";
import UsersContent from "./UsersContent";
import SettingsContent from "./SettingsContent";
import SupportContent from "./SupportContent";

export default function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Debug: Log when Dashboard component loads
  useEffect(() => {
    console.log("=== DASHBOARD COMPONENT LOADED ===");
    console.log("User data:", user);
    console.log("Dashboard is now active!");
    console.log("=== END DASHBOARD DEBUG ===");
  }, [user]);

  const handleLogout = () => {
    onLogout();
    setShowLogoutModal(false);
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarOpen(false); // Close mobile sidebar when section changes
  };

  // Touch gesture support
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].screenY;
      handleGesture();
    };

    const handleGesture = () => {
      const swipeThreshold = 50;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > swipeThreshold) {
        // Swipe detected - you can add swipe navigation here if needed
        console.log('Swipe detected:', diff > 0 ? 'up' : 'down');
      }
    };

    // Prevent zoom on double tap for better mobile UX
    let lastTouchEnd = 0;
    const handleTouchEndPreventZoom = (e) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // Add touch event listeners
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchend', handleTouchEndPreventZoom, { passive: false });

    // Keyboard navigation support
    const handleKeyDown = (e) => {
      // ESC key to close modals and sidebar
      if (e.key === 'Escape') {
        setShowLogoutModal(false);
        setSidebarOpen(false);
      }
      
      // Enter key for nav items
      if (e.key === 'Enter' && e.target.classList.contains('nav-item')) {
        e.target.click();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Handle window resize
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchend', handleTouchEndPreventZoom);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      <div className="flex">
        {/* Sidebar - desktop */}
        <aside className="hidden lg:flex lg:flex-col w-64 flex-shrink-0
         bg-gradient-to-br from-indigo-600 via-indigo-600 to-purple-700 text-white p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center">
              <i class="fas fa-water"></i>
            </div>
            <div>
              <div className="font-bold text-lg">VA-System Portal</div>
              <div className="text-xs  font-[400]">
                Inloggad som: <span className="underline font-[600]">
                  {user?.name || user?.email || 'Admin'}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-6">
            {/* HUVUDMENY */}
            <div>
              <div className="text-xs uppercase opacity-80 mb-3 font-semibold">HUVUDMENY</div>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => handleSectionChange('dashboard')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'dashboard' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <i class="fas fa-chart-line"></i>
                    Dashboard
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('modules')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'modules' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                   <i class="fas fa-th-large"></i>
                    Alla moduler
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('projects')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'projects' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <i class="fas fa-project-diagram"></i>
                    Projekt
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('reports')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'reports' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <i class="fas fa-file-alt"></i>
                    Rapporter
                  </button>
                </li>
              </ul>
            </div>

            {/* ANALYSVERKTYG */}
            <div>
              <div className="text-xs uppercase opacity-80 mb-3 font-semibold">ANALYSVERKTYG</div>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/dimensjonerade"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                    <i class="fas fa-chart-bar"></i>
                    Dimensjonerade förbrukning
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/gis-karta"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                    <i class="fas fa-map"></i>
                    GIS-karta
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/hydraulisk"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                   <i class="fas fa-water"></i>
                    Hydraulisk analys
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/projektkalkyl"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                    <i class="fas fa-fire-extinguisher"></i>
                    Projektkalkyl
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dagvatten"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                   <i class="fas fa-cloud-rain"></i>
                    Dagvatten
                  </Link>
                </li>
              </ul>
            </div>

            {/* AVANCERAT */}
            <div>
              <div className="text-xs uppercase opacity-80 mb-3 font-semibold">AVANCERAT</div>
              <ul className="space-y-1">
                <li>
                  <Link 
                    to="/pumpanalys"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                    <i class="fas fa-cog"></i>
                    Pumpanalys
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/systemintegration"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                   <i class="fas fa-plug"></i>
                    Systemintegration
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/ai-analys"
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                  >
                   <i class="fas fa-brain"></i>
                    AI-analys
                  </Link>
                </li>
            </ul>
            </div>

            {/* SYSTEM */}
            <div>
              <div className="text-xs uppercase opacity-80 mb-3 font-semibold">SYSTEM</div>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => handleSectionChange('users')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'users' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                   <i class="fas fa-users"></i>
                    Användarhantering
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('settings')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'settings' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <i class="fas fa-cog"></i>
                    Inställningar
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleSectionChange('support')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                      activeSection === 'support' 
                        ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                        : 'hover:bg-white/10 text-white/90'
                    }`}
                  >
                    <i class="fas fa-life-ring"></i>
                    Support
                  </button>
                </li>
            </ul>
            </div>
          </nav>

          

          
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <div 
              className="absolute inset-0 bg-black/50 transition-opacity duration-300" 
              onClick={() => setSidebarOpen(false)} 
            />
            <aside className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-800 text-white p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
             <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-lg">VA-System Portal</div>
                    <div className="text-xs opacity-80">
                      Inloggad som: {user?.name || user?.email || 'Admin'}
                    </div>
                  </div>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded text-white/90 hover:bg-white/10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-6">
                {/* HUVUDMENY */}
                <div>
                  <div className="text-xs uppercase opacity-80 mb-3 font-semibold">HUVUDMENY</div>
                  <ul className="space-y-1">
                    <li>
                      <button 
                        onClick={() => handleSectionChange('dashboard')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'dashboard' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSectionChange('modules')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'modules' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Alla moduler
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSectionChange('projects')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'projects' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                        </svg>
                        Projekt
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSectionChange('reports')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'reports' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        Rapporter
                      </button>
                    </li>
                  </ul>
                </div>

                {/* ANALYSVERKTYG */}
                <div>
                  <div className="text-xs uppercase opacity-80 mb-3 font-semibold">ANALYSVERKTYG</div>
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        to="/dimensjonerade"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Dimensjonerade förbrukning
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/gis-karta"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        GIS-karta
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/hydraulisk"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Hydraulisk analys
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/projektkalkyl"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Projektkalkyl
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/dagvatten"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Dagvatten
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* AVANCERAT */}
                <div>
                  <div className="text-xs uppercase opacity-80 mb-3 font-semibold">AVANCERAT</div>
                  <ul className="space-y-1">
                    <li>
                      <Link 
                        to="/pumpanalys"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Pumpanalys
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/systemintegration"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                        Systemintegration
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/ai-analys"
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-white/10 text-white/90"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        AI-analys
                      </Link>
                    </li>
                </ul>
                </div>

                {/* SYSTEM */}
                <div>
                  <div className="text-xs uppercase opacity-80 mb-3 font-semibold">SYSTEM</div>
                  <ul className="space-y-1">
                    <li>
                      <button 
                        onClick={() => handleSectionChange('users')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'users' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        Användarhantering
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSectionChange('settings')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'settings' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                        </svg>
                        Inställningar
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => handleSectionChange('support')}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left ${
                          activeSection === 'support' 
                            ? 'bg-white/10 border-l-4 border-blue-400 text-white' 
                            : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Support
                      </button>
                    </li>
                </ul>
                </div>

              </nav>

             
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="lg:flex-1 flex flex-col">
          {/* Navbar */}
          <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-1 md:gap-4">
                  <button
                    aria-label="Open menu"
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 block lg:hidden transition-colors duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>

                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    {activeSection === 'dashboard' && 'Dashboard'}
                    {activeSection === 'modules' && 'Alla moduler'}
                    {activeSection === 'projects' && 'Projekt'}
                    {activeSection === 'reports' && 'Rapporter'}
                    {activeSection === 'users' && 'Användarhantering'}
                    {activeSection === 'settings' && 'Inställningar'}
                    {activeSection === 'support' && 'Support'}
                  </h2>
                </div>

                {/* Desktop navbar */}
                <div className="hidden lg:flex items-center gap-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Nytt projekt
                  </button>

                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-blue-400 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Exportera
                  </button>

                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-600 flex items-center justify-center hover:shadow-md transform hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {/* Mobile navbar */}
                <div className="lg:hidden flex items-center gap-2">
                  <button className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-blue-700 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="hidden sm:inline">Nytt</span>
                  </button>

                  <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 hover:bg-gray-50 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="hidden sm:inline">Export</span>
                  </button>

                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center hover:bg-gray-400 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Page content */}
          <div className="flex-1 p-6 md:p-8 bg-gray-50">
            {activeSection === 'dashboard' && <DashbordContent />}
            {activeSection === 'modules' && <ModulesContent />}
            {activeSection === 'projects' && <ProjectsContent />}
            {activeSection === 'reports' && <ReportsContent />}
            {activeSection === 'users' && <UsersContent />}
            {activeSection === 'settings' && <SettingsContent />}
            {activeSection === 'support' && <SupportContent />}
          </div>
        </main>
          </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 "
            onClick={() => setShowLogoutModal(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Logga ut</h3>
              <p className="text-gray-600 mb-8">
                Är du säker på att du vill logga ut från systemet?
              </p>
              
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Avbryt
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Logga ut
                </button>
                </div>
            </div>
          </div>

      </div>
      )}
    </div>
  )
}
