import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WaterToolsLogo from "../assets/logo/WaterToolsLogo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailNotification, setShowEmailNotification] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    console.log("[Register] Submitted credentials:", { name, email, password, confirmPassword });

    try {
      // Client-side validation
      if (!name || !email || !password || !confirmPassword) {
        setError("Fyll i alla fält");
        setIsLoading(false);
        return;
      }
      
      if (password !== confirmPassword) {
        setError("Lösenorden matchar inte");
        setIsLoading(false);
        return;
      }

      // Call the register function from AuthContext
      const result = await register({ name, email, password });
      
      if (result.success) {
        setShowEmailNotification(true);
        setTimeout(() => setShowEmailNotification(false), 1500);
        navigate("/", { replace: true });
      } else {
        setError(result.message || "Registrering misslyckades");
      }
    } catch (error) {
      setError("Ett fel uppstod vid registrering. Försök igen.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="bg-gradient-to-b h-screen from-blue-300 to-blue-100 px-4 pt-6">
      {/* Alert Container */}
      {/* <div id="alertContainer" className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"></div> */}

      <div className="flex items-center justify-center ">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl h-full pb-7 shadow-2xl overflow-hidden relative">
            {/* Security Badge */}
            <div className="absolute top-6   right-4 md:right-6 bg-gradient-to-r from-blue-400/15 to-blue-500/10 border border-blue-400/30 rounded-full px-2 md:px-4 py-1 md:py-2 flex items-center gap-1 md:gap-2 text-blue-600 text-[10px] md:text-[12px] lg:text-[14px] font-semibold shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              SSL Säkert
            </div>
            {/* Logo Section */}
            <div className="flex flex-col items-center ">
              <div className=" ">
                <WaterToolsLogo />
              </div>
              {/* <p className="text-sm text-center text-blue-800 mb-6">
                Skapa nytt konto för vatten & avlopp hantering
              </p> */}

              {/* System Status Bar */}
              {/* <div className="w-full max-w-lg mx-auto mb-8">
                <div className="bg-blue-50 text-blue-400 rounded-lg px-4 py-3 flex items-center">
                  <i className="fas fa-server mr-3"></i>
                  <span className="text-sm">
                    Systemstatus: Online - 58 aktiva användare - Live
                    säkerhetsövervakning
                  </span>
                </div>
              </div> */}

              {/* Registration Form */}
              <div className="w-full max-w-md mx-auto px-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-label="Registration form"
                >
                  {error && (
                    <div className="bg-red-100 border border-red-300 text-red-700 text-sm rounded px-3 py-2">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <label className="flex items-center text-blue-400 font-medium text-sm">
                      <i className="fas fa-user mr-2"></i>
                      Fullständigt namn
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-user text-blue-700"></i>
                      </div>
                      <input
                        type="text"
                        placeholder="Ange ditt fullständiga namn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg bg-blue-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-blue-400 font-medium text-sm">
                      <i className="fas fa-envelope mr-2"></i>
                      E-postadress
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-envelope text-blue-700"></i>
                      </div>
                      <input
                        type="email"
                        placeholder="Ange din e-postadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg bg-blue-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-blue-400 font-medium text-sm">
                      <i className="fas fa-lock mr-2"></i>
                      Lösenord
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-lock text-blue-700"></i>
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Ange ditt lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg bg-blue-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={togglePassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                        aria-label="Visa/dölj lösenord"
                      >
                        <i
                          className={`fas ${
                            showPassword ? "fa-eye-slash" : "fa-eye"
                          } text-lg`}
                          id="toggleIcon"
                        ></i>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-blue-400 font-medium text-sm">
                      <i className="fas fa-lock mr-2"></i>
                      Bekräfta lösenord
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-lock text-blue-700"></i>
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Bekräfta ditt lösenord"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-12 py-3 border border-blue-200 rounded-lg bg-blue-50 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPassword}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-600 transition-colors"
                        aria-label="Visa/dölj lösenord"
                      >
                        <i
                          className={`fas ${
                            showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                          } text-lg`}
                          id="toggleConfirmIcon"
                        ></i>
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#2387fa] disabled:from-blue-300 disabled:to-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 relative"
                  >
                    {isLoading ? (
                      <>
                        <i className="fas fa-spinner animate-spin"></i>
                        <span>Skapar konto...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-user-plus"></i>
                        <span>Skapa konto</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Login Links */}
              <div className="w-full max-w-md mx-auto mt-6 px-8">
                <div className="flex items-center justify-center gap-12 text-sm">
                  <Link
                    to="/"
                    className="text-[#1f8fff] hover:underline font-medium"
                  >
                    Har du redan ett konto?
                  </Link>
                  <span className="text-[#4169e0]">|</span>
                  <Link
                    to="/forgot-password"
                    className="text-[#1f8fff] hover:underline font-medium"
                  >
                    Glömt lösenord?
                  </Link>
                </div>
              </div>

              {/* Security Features Section */}
              {/* <div className="w-full max-w-2xl mx-auto mt-8 px-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="flex items-center text-blue-800 font-semibold text-lg mb-4">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Säkerhetsfunktioner (58 Användare)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-800 text-sm">
                          256-bit SSL kryptering
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-800 text-sm">
                          Auto e-postnotifieringar
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-800 text-sm">
                          Avancerat intrångsskydd
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-800 text-sm">
                          Real-time IP & GPS spårning
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-800 text-sm">
                          Live säkerhetsdashboard
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="w-4 h-4 text-blue-600 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-blue-800 text-sm">
                          Omfattande audit logging
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

             {/* Footer Disclaimer */}
             {/* <div className="w-full max-w-2xl mx-auto mt-6 px-8 pb-8">
                <p className="text-[18px] font-[600] text-[#4169e0] text-center leading-relaxed">
                  Alla inloggningar övervakas och loggas för säkerhetsändamål.
                  <p className="text-[14px] font-[500] text-[#4169e0] text-center leading-relaxed">
                    {" "}
                    E-postnotifieringar skickas automatiskt till poen@lmoro.se.
                  </p>
                  <p className="text-[12px] font-[400] text-[#4169e0] text-center leading-relaxed">
                    {" "}
                    IP-adress, GPS-plats och användardata loggas enligt GDPR +
                    58 användare.
                  </p>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Email Notification Popup */}
      {showEmailNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <div className="font-semibold">Registrering lyckades!</div>
              <div className="text-sm opacity-90">
                Logga in med dina uppgifter för att komma åt systemet
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}