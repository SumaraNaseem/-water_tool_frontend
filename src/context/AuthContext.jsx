import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { registerUser, loginUser, logoutUser } from "../helpers/authApi.js";

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  registeredUser: "wt_registered_user", // Keep in localStorage for persistence
  sessionUser: "wt_session_user", // Use sessionStorage for session-only data
  accessToken: "wt_access_token", // Use sessionStorage for session-only data
  refreshToken: "wt_refresh_token", // Use sessionStorage for session-only data
};

// Helper functions for session storage
const getSessionStorage = (key) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from sessionStorage (${key}):`, error);
    return null;
  }
};

const setSessionStorage = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to sessionStorage (${key}):`, error);
  }
};

const removeSessionStorage = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from sessionStorage (${key}):`, error);
  }
};

export function AuthProvider({ children }) {
  const [registeredUser, setRegisteredUser] = useState(null);
  const [sessionUser, setSessionUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Load registered user from localStorage (persistent)
      const reg = localStorage.getItem(STORAGE_KEYS.registeredUser);
      if (reg) setRegisteredUser(JSON.parse(reg));
      
      // Load session data from sessionStorage (session-only)
      const ses = getSessionStorage(STORAGE_KEYS.sessionUser);
      const token = getSessionStorage(STORAGE_KEYS.accessToken);
      const refresh = getSessionStorage(STORAGE_KEYS.refreshToken);
      
      if (ses) setSessionUser(ses);
      if (token) setAccessToken(token);
      if (refresh) setRefreshToken(refresh);
    } catch (error) {
      console.error("Error loading auth data:", error);
      // Clear corrupted data
      localStorage.removeItem(STORAGE_KEYS.registeredUser);
      removeSessionStorage(STORAGE_KEYS.sessionUser);
      removeSessionStorage(STORAGE_KEYS.accessToken);
      removeSessionStorage(STORAGE_KEYS.refreshToken);
    } finally {
      // Set loading to false after initial load with a small delay to prevent rapid state changes
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, []);

  // Debug effect to monitor authentication state changes
  useEffect(() => {
    console.log("[AuthContext] State changed:", {
      sessionUser: !!sessionUser,
      accessToken: !!accessToken,
      refreshToken: !!refreshToken,
      isAuthenticated: Boolean(sessionUser && (accessToken || refreshToken)),
      isLoading
    });
  }, [sessionUser, accessToken, refreshToken, isLoading]);

  // Session persistence - removed beforeunload to allow session to persist on page refresh
  useEffect(() => {
    // Commented out to allow session to persist across page refreshes
    // const handleBeforeUnload = () => {
    //   console.log("[AuthContext] Browser closing/refreshing - clearing session data");
    //   removeSessionStorage(STORAGE_KEYS.sessionUser);
    //   removeSessionStorage(STORAGE_KEYS.accessToken);
    //   removeSessionStorage(STORAGE_KEYS.refreshToken);
    // };

    const handleVisibilityChange = () => {
      // Optional: Clear session data when tab becomes hidden for extended period
      // Currently disabled to maintain session across tab switches
      if (document.hidden) {
        console.log("[AuthContext] Tab hidden - session data preserved");
        
        // Uncomment below to clear session after 30 minutes of inactivity
        // const clearSessionTimeout = setTimeout(() => {
        //   console.log("[AuthContext] Tab hidden for 30 minutes - clearing session data");
        //   removeSessionStorage(STORAGE_KEYS.sessionUser);
        //   removeSessionStorage(STORAGE_KEYS.accessToken);
        //   removeSessionStorage(STORAGE_KEYS.refreshToken);
        //   setSessionUser(null);
        //   setAccessToken(null);
        //   setRefreshToken(null);
        // }, 1800000); // 30 minutes
        // window.clearSessionTimeout = clearSessionTimeout;
      } else {
        if (window.clearSessionTimeout) {
          clearTimeout(window.clearSessionTimeout);
          window.clearSessionTimeout = null;
          console.log("[AuthContext] User returned to tab - session data preserved");
        }
      }
    };

    // Only add visibility change listener (beforeunload removed)
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const register = async (userData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("[AuthContext] Calling real API for registration...");
      
      // Call the real API
      const result = await registerUser(userData);
      
      if (result.success) {
        console.log("[AuthContext] API registration successful, processing user data...");
        console.log("[AuthContext] API Response data:", result.data);
        
        // Store user data locally for immediate access (but don't auto-login)
        const user = { 
          name: userData.name,
          email: userData.email,
          isVerified: result.data.user?.isVerified || false
        };
        setRegisteredUser(user);
        localStorage.setItem(STORAGE_KEYS.registeredUser, JSON.stringify(user));
        
        console.log("[AuthContext] Registration successful - user must login manually");
        
        return {
          success: true,
          message: result.message,
          data: result.data
        };
      } else {
        console.log("[AuthContext] API registration failed:", result);
        setError(result.error);
        return {
          success: false,
          message: result.message || "Registration failed due to server error",
          error: result.error
        };
      }
      
      /* 
      // Mock implementation (commented out)
      console.log("[AuthContext] Mock registration for testing...");
      await new Promise(resolve => setTimeout(resolve, 500));
      // ... rest of mock code
      */
    } catch (error) {
      const errorMessage = error.message || 'Registration failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("[AuthContext] Calling real API for login...");
      
      // Call the real API
      const result = await loginUser({ email, password });
      
      if (result.success) {
        console.log("[AuthContext] API login successful, processing user data...");
        console.log("[AuthContext] API Response data:", result.data);
        
        const user = { 
          email,
          name: result.data.user?.name || result.data.name || email.split('@')[0],
          isVerified: result.data.user?.isVerified || result.data.isVerified || true
        };
        const token = result.data.accessToken || result.data.token || result.data.access_token;
        const refresh = result.data.refreshToken || result.data.refresh_token;
        
        console.log("[AuthContext] Processed user:", user);
        console.log("[AuthContext] Access token:", token ? "Present" : "Missing");
        console.log("[AuthContext] Refresh token:", refresh ? "Present" : "Missing");
        
        setSessionUser(user);
        setAccessToken(token);
        setRefreshToken(refresh);
        
        // Use sessionStorage for session data (will be cleared on browser close)
        setSessionStorage(STORAGE_KEYS.sessionUser, user);
        setSessionStorage(STORAGE_KEYS.accessToken, token);
        setSessionStorage(STORAGE_KEYS.refreshToken, refresh);
        
        console.log("[AuthContext] State updated, waiting for state to propagate...");
        // Force a small delay to ensure state updates are processed
        await new Promise(resolve => setTimeout(resolve, 200));
        
        console.log("[AuthContext] Final state after login:", {
          sessionUser: !!user,
          accessToken: !!token,
          refreshToken: !!refresh,
          isAuthenticated: Boolean(user && (token || refresh))
        });
        
        console.log("[AuthContext] Returning success result");
        return {
          success: true,
          message: result.message,
          data: result.data
        };
      } else {
        setError(result.error);
        return {
          success: false,
          message: result.message,
          error: result.error
        };
      }
      
      /* 
      // Mock implementation (commented out)
      console.log("[AuthContext] Mock login for testing...");
      await new Promise(resolve => setTimeout(resolve, 500));
      // ... rest of mock code
      */
    } catch (error) {
      const errorMessage = error.message || 'Login failed';
      setError(errorMessage);
      return {
        success: false,
        message: errorMessage,
        error: errorMessage
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (accessToken) {
        await logoutUser(accessToken);
      }
    } catch (error) {
      console.error("Logout API error:", error);
      // Continue with local logout even if API fails
    } finally {
      // Clear local state regardless of API result
      setSessionUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      removeSessionStorage(STORAGE_KEYS.sessionUser);
      removeSessionStorage(STORAGE_KEYS.accessToken);
      removeSessionStorage(STORAGE_KEYS.refreshToken);
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => {
      // More lenient authentication check - just check if we have a session user
      const isAuth = Boolean(sessionUser && (sessionUser.email || sessionUser.name));
      
      // Debug authentication state
      console.log("[AuthContext] Authentication state check:", {
        sessionUser: !!sessionUser,
        accessToken: !!accessToken,
        refreshToken: !!refreshToken,
        isAuthenticated: isAuth,
        sessionUserData: sessionUser,
        hasEmail: sessionUser?.email,
        hasName: sessionUser?.name
      });
      
      return {
        registeredUser,
        sessionUser,
        accessToken,
        refreshToken,
        isAuthenticated: isAuth,
        isLoading,
        error,
        register,
        login,
        logout,
        clearError: () => setError(null),
      };
    },
    [registeredUser, sessionUser, accessToken, refreshToken, isLoading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


