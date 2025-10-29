import { useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Dashboard from "./components/Dashboard";
import Modules from "./components/Modules";
import Projects from "./components/Projects";
import Reports from "./components/Reports";
import DimensjoneradePage from "./pages/DimensjoneradePage";
import GisKartaPage from "./pages/GisKartaPage";
import HydrauliskPage from "./pages/HydrauliskPage";
import ProjektkalkylPage from "./pages/ProjektkalkylPage";
import DagvattenPage from "./pages/DagvattenPage";
import PumpanalysPage from "./pages/PumpanalysPage";
import SystemintegrationPage from "./pages/SystemintegrationPage";
import AiAnalysPage from "./pages/AiAnalysPage";
import { useAuth } from "./context/AuthContext.jsx";

// Main App Component
export default function App() {
  const { isAuthenticated, sessionUser, logout, isLoading } = useAuth();
  const userProps = useMemo(() => ({ user: sessionUser, onLogout: logout }), [sessionUser, logout]);

  // Debug authentication state
  const authCheck = Boolean(sessionUser && (sessionUser.email || sessionUser.name));
  console.log("[App] Authentication state:", {
    isAuthenticated,
    sessionUser: !!sessionUser,
    authCheck,
    isLoading,
    userData: sessionUser,
    shouldShowDashboard: isAuthenticated && !isLoading
  });

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600 font-medium">Laddar...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/forgot-password"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ForgotPassword onReset={() => {}} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard {...userProps} />
            ) : (
              <Navigate to="/" replace state={{ from: '/dashboard' }} />
            )
          }
        />
        <Route
          path="/modules"
          element={
            isAuthenticated ? (
              <Modules {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/projects"
          element={
            isAuthenticated ? (
              <Projects {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated ? (
              <Reports {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dimensjonerade"
          element={
            isAuthenticated ? (
              <DimensjoneradePage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/gis-karta"
          element={
            isAuthenticated ? (
              <GisKartaPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/hydraulisk"
          element={
            isAuthenticated ? (
              <HydrauliskPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/projektkalkyl"
          element={
            isAuthenticated ? (
              <ProjektkalkylPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/dagvatten"
          element={
            isAuthenticated ? (
              <DagvattenPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/pumpanalys"
          element={
            isAuthenticated ? (
              <PumpanalysPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/systemintegration"
          element={
            isAuthenticated ? (
              <SystemintegrationPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/ai-analys"
          element={
            isAuthenticated ? (
              <AiAnalysPage {...userProps} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}
