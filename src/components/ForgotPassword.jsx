import { useState } from "react";
import { Link } from "react-router-dom";
import WaterToolsLogo from "../assets/logo/WaterToolsLogo";

export default function ForgotPassword({ onReset }) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) onReset?.({ email });
  };
console.log("ForgotPassword");

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 px-4 pt-6">
      <div className="flex items-center justify-center ">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
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
            <div className="flex flex-col items-center py-8">
              <div className="">
                <WaterToolsLogo />
              </div>
              <p className="text-sm text-center text-blue-800 mb-6">
                Återställ ditt lösenord för vatten & avlopp hantering
              </p>
              {/* System Status Bar */}
              <div className="w-full max-w-lg mx-auto mb-8">
                <div className="bg-blue-50 text-blue-400 rounded-lg px-4 py-3 flex items-center">
                  <i className="fas fa-server mr-3"></i>
                  <span className="text-sm">
                    Systemstatus: Online - 58 aktiva användare - Live
                    säkerhetsövervakning
                  </span>
                </div>
              </div>
              {/* Forgot Password Form */}
              <div className="w-full max-w-md mx-auto px-8">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  aria-label="Forgot password form"
                >
                  <div className="space-y-2">
                    <label className="flex items-center text-[#1f8fff] font-medium text-sm">
                      <svg
                        className="w-4 h-4 mr-2 "
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                        />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      E-postadress
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-[#4169e0]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                          />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <input
                        type="email"
                        placeholder="Ange din e-postadress"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-blue-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#4169e0] text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                      />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Skicka återställningslänk
                  </button>
                </form>
              </div>
              {/* Login Links */}
              <div className="w-full max-w-md mx-auto mt-6 px-8">
                <div className="flex items-center justify-center gap-12 text-sm">
                  <Link
                    to="/"
                    className="text-[#4169e0] hover:underline font-medium"
                  >
                    Kom ihåg ditt lösenord?
                  </Link>
                  <span className="text-[#4169e0]">|</span>
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                  >
                    Skapa nytt konto
                  </Link>
                </div>
              </div>

              {/* Security Features Section */}
              <div className="w-full max-w-2xl mx-auto mt-8 px-8">
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
                          Live security dashboard
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
              </div>

             {/* Footer Disclaimer */}
             <div className="w-full max-w-2xl mx-auto mt-6 px-8 pb-8">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
