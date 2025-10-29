import React, { useState } from "react";

export default function SupportContent() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    problemType: "",
    priority: "",
    shortDescription: "",
    detailedDescription: "",
    reproductionSteps: "",
    email: "",
    name: "",
  });
  const [showReportForm, setShowReportForm] = useState(false);
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [showTraining, setShowTraining] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    waterStandards: true,
    fireWater: true,
    stormwater: true,
    technicalManuals: true,
    userGuides: true,
  });

  const statsData = [
    {
      id: "availability",
      label: "Systemtillgänglighet",
      value: "99.2%",
      icon: "fas fa-clock",
      bgColor: "bg-green-500",
    },
    {
      id: "cases",
      label: "Öppna supportärenden",
      value: "3",
      icon: "fas fa-file-alt",
      bgColor: "bg-purple-500",
    },
    {
      id: "response",
      label: "Genomsnittlig svarstid",
      value: "1.2h",
      icon: "fas fa-clock",
      bgColor: "bg-orange-500",
    },
  ];

  const quickAccessCards = [
    {
      id: "report",
      title: "Rapportera problem",
      subtitle: "Skapa supportärende",
      icon: "fas fa-exclamation-triangle",
      bgColor: "bg-red-500",
      popupMessage: "Öppnar problemrapportering...",
      popupItems: [
        "Skapa supportärende",
        "Beskriv problemet",
        "Välj prioritet",
        "Bifoga filer",
      ],
    },
    {
      id: "documentation",
      title: "Dokumentation",
      subtitle: "Användarguider & manualer",
      icon: "fas fa-book",
      bgColor: "bg-blue-500",
      popupMessage: "Öppnar dokumentation...",
      popupItems: [
        "Användarhandböcker",
        "Tekniska manualer",
        "API-dokumentation",
        "Video-tutorials",
      ],
    },
    {
      id: "contact",
      title: "Kontakta support",
      subtitle: "Direkt kontakt med tekniker",
      icon: "fas fa-headset",
      bgColor: "bg-green-500",
      popupMessage: "Öppnar supportkontakt...",
      popupItems: [
        "Direkt kontakt med tekniker",
        "Chat-support",
        "Telefon-support",
        "E-post-support",
      ],
    },
    {
      id: "status",
      title: "Systemstatus",
      subtitle: "Aktuell driftstatus",
      icon: "fas fa-server",
      bgColor: "bg-orange-500",
      popupMessage: "Öppnar systemstatus...",
      popupItems: [
        "Aktuell driftstatus",
        "Underhållsscheman",
        "Prestanda-mätningar",
        "Tillgänglighetsrapporter",
      ],
    },
    {
      id: "faq",
      title: "Vanliga frågor",
      subtitle: "FAQ & snabba svar",
      icon: "fas fa-question-circle",
      bgColor: "bg-purple-500",
      popupMessage: "Öppnar vanliga frågor...",
      popupItems: [
        "Vanliga frågor",
        "Snabb svar",
        "Felsökningsguider",
        "Tips och tricks",
      ],
    },
    {
      id: "training",
      title: "Utbildning",
      subtitle: "Kurser & träning",
      icon: "fas fa-graduation-cap",
      bgColor: "bg-yellow-600",
      popupMessage: "Öppnar utbildning...",
      popupItems: [
        "Kurser och utbildning",
        "Certifieringar",
        "Workshops",
        "Online-tutorials",
      ],
    },
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
    if (card.id === "report") {
      setShowReportForm(true);
    } else if (card.id === "documentation") {
      setShowDocumentation(true);
    } else if (card.id === "contact") {
      setShowContact(true);
    } else if (card.id === "status") {
      setShowStatus(true);
    } else if (card.id === "faq") {
      setShowFAQ(true);
    } else if (card.id === "training") {
      setShowTraining(true);
    } else {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  const closeReportForm = () => {
    setShowReportForm(false);
    setSelectedCard(null);
    setFormData({
      problemType: "",
      priority: "",
      shortDescription: "",
      detailedDescription: "",
      reproductionSteps: "",
      email: "",
      name: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);
    alert("Rapport skickad! Tack för din feedback.");
    closeReportForm();
  };

  const closeDocumentation = () => {
    setShowDocumentation(false);
    setSelectedCard(null);
  };

  const closeContact = () => {
    setShowContact(false);
    setSelectedCard(null);
  };

  const closeStatus = () => {
    setShowStatus(false);
    setSelectedCard(null);
  };

  const closeFAQ = () => {
    setShowFAQ(false);
    setSelectedCard(null);
  };

  const closeTraining = () => {
    setShowTraining(false);
    setSelectedCard(null);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex flex-col   mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Support & Hjälp
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="space-y-6">
              <div
                className={`w-14 h-14 ${stat.bgColor} rounded-lg flex items-center justify-center `}
              >
                <i className={`${stat.icon} text-white text-xl`}></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-3">
                  {stat.value}
                </p>
                <p className="text-md text-gray-600">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Support & Hjälp
        </h1>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
        {quickAccessCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 text-center cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            onClick={() => handleCardClick(card)}
          >
            <div
              className={`w-14 h-14 ${card.bgColor} rounded-lg flex items-center justify-center mx-auto mb-6`}
            >
              <i className={`${card.icon} text-white text-2xl`}></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {card.title}
            </h3>
            <p className="text-md text-gray-600">{card.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Support Popup */}
      {showPopup && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[60vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Denna sida säger
              </h2>
              <p className="text-gray-700 mb-4">{selectedCard.popupMessage}</p>

              <ul className="space-y-2 mb-6">
                {selectedCard.popupItems.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    • {item}
                  </li>
                ))}
              </ul>

              <div className="flex justify-end">
                <button
                  onClick={closePopup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Form Popup */}
      {showReportForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-8">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[88vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Rapportera Problem
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Problem Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Typ av problem <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="problemType"
                    value={formData.problemType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Välj typ av problem</option>
                    <option value="bug">Bug/Programfel</option>
                    <option value="feature">Funktionsförfrågan</option>
                    <option value="performance">Prestandaproblem</option>
                    <option value="ui">Användargränssnitt</option>
                    <option value="other">Annat</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prioritet <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Välj prioritet</option>
                    <option value="low">Låg</option>
                    <option value="medium">Medium</option>
                    <option value="high">Hög</option>
                    <option value="critical">Kritisk</option>
                  </select>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kort beskrivning <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    required
                    placeholder="T.ex. Hydraulisk beräkning ger fel resultat"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Detailed Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Detaljerad beskrivning{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Beskriv problemet i detalj. Inkludera vad du gjorde när problemet uppstod och vad som hände."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Reproduction Steps */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Steg för att återskapa problemet{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reproductionSteps"
                    value={formData.reproductionSteps}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="1. Gå till...&#10;2. Klicka på...&#10;3. Fyll i...&#10;4. Problemet uppstår..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Din e-postadress <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="din.epost@företag.se"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ditt namn
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ditt namn"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={closeReportForm}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Avbryt
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Skicka rapport
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Documentation Popup */}
      {showDocumentation && (
        <div className="fixed inset-0  bg-black bg-opacity-50 z-50 flex justify-center items-start pt-8">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 max-h-[88vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Dokumentation & Standarder
              </h2>
              <div className=" w-full mx-4 max-h-[88vh] overflow-y-auto">
                {/* Svenska Vatten Standarder */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-blue-600 mb-4">
                    Svenska Vatten Standarder
                  </h3>

                  {/* P110 - Dimensionering av allmänna VA-ledningar */}
                  <div className=" shadow-lg rounded-2xl p-4 mb-4 space-y-4">
                    <div>
                      <div
                        className="flex items-center  cursor-pointer"
                        onClick={() => toggleSection("waterStandards")}
                      >
                        <span className="w-3 h-3 bg-gray-800 rounded-full mr-3"></span>
                        <h4 className="font-bold text-gray-800">
                          P110 - Dimensionering av allmänna VA-ledningar:
                        </h4>
                        {/* <i className={`fas fa-chevron-${expandedSections.waterStandards ? 'up' : 'down'} text-gray-600`}></i> */}
                      </div>
                      {expandedSections.waterStandards && (
                        <ul className="mt-3 space-y-2">
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Förbrukningsanalys och dimensioneringsflöden
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Beräkning av spillvattenflöden
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Dimensionering av spillvattenledningar
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Kapacitetsberäkningar
                          </li>
                        </ul>
                      )}
                    </div>

                    <div>
                      <div
                        className="flex items-center  cursor-pointer"
                        onClick={() => toggleSection("fireWater")}
                      >
                        <span className="w-3 h-3 bg-gray-800 rounded-full mr-3"></span>
                        <h4 className="font-bold text-gray-800">
                          P111 - Avloppsledningar utanför byggnader:
                        </h4>
                        {/* <i className={`fas fa-chevron-${expandedSections.fireWater ? 'up' : 'down'} text-gray-600`}></i> */}
                      </div>
                      {expandedSections.fireWater && (
                        <ul className="mt-3 space-y-2">
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Hydraulisk dimensionering
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Materialval och utförande
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Provning och kontroll
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Drift och underhåll
                          </li>
                        </ul>
                      )}
                    </div>

                    <div>
                      <div
                        className="flex items-center  cursor-pointer"
                        onClick={() => toggleSection("stormwater")}
                      >
                        <span className="w-3 h-3 bg-gray-800 rounded-full mr-3"></span>
                        <h4 className="font-bold text-gray-800">
                          P114 - Vattenledningar:
                        </h4>
                        {/* <i className={`fas fa-chevron-${expandedSections.stormwater ? 'up' : 'down'} text-gray-600`}></i> */}
                      </div>
                      {expandedSections.stormwater && (
                        <ul className="mt-3 space-y-2">
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Tryckförlustberäkningar
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Dimensionering av vattenledningar
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Hydrauliska beräkningar
                          </li>
                          <li className="flex items-center text-gray-700">
                            <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                            Kapacitetskrav och utformning
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {/* Brandvattenstandarder */}
                <div className="mb-6 shadow-lg rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">
                    Brandvattenstandarder
                  </h3>
                  <div className="  ">
                    <div className="flex items-center">
                  <div className=" w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
                    <h4 className="font-bold text-gray-800 mb-2">P83 - Brandposter:</h4>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                        Flödeskapacitet och tryckberäkningar
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                        Placering och täckningsområden
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                        Hydrauliska krav
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                        Provning och underhåll
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Dagvatten & Regnvatten */}
                <div className="mb-6 shadow-lg rounded-2xl p-4">
                
                  <h3 className="text-lg font-bold text-blue-600 mb-2">
                    Dagvatten & Regnvatten
                  </h3>
                  <div className="flex items-center">
                  <div className=" w-2 h-2 bg-gray-800 rounded-full mr-3"></div>
                  <h4 className="font-bold text-gray-800 ">P90 - Dagvattenhantering:</h4>
                  </div>

                  <div className=" mb-2">
                   
                    {expandedSections.technicalManuals && (
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                          Beräkning av regnvattenflöden
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                          Dimensionering av dagvattensystem
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                          Översvämningsskydd
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 border border-gray-400 rounded-full mr-3"></span>
                          Hållbar dagvattenhantering
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Tekniska Handböcker */}
                <div className="mb-6 shadow-lg rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">
                    Tekniska Handböcker
                  </h3>
                  <div className="mb-2">
                   
                    {expandedSections.userGuides && (
                      <ul className="mt-3 space-y-2">
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                          Hydrauliska beräkningsmetoder
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                          Manning och Colebrook ekvationer
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                          Pumpsystemanalys och NPSH
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                          Vattenkvalitet och provtagning
                        </li>
                        <li className="flex items-center text-gray-700">
                          <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                          GIS-integration och kartanalys
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                {/* Användarguider */}
                <div className="mb-6 shadow-lg rounded-2xl p-4">
                  <h3 className="text-lg font-bold text-blue-600 mb-2">
                    Användarguider
                  </h3>
                  <div className=" mb-2">
                    <ul className="space-y-2">
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        Snabbstartsguide för nya användare
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        Projekthantering och rapportgenerering
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        Modulspecifika instruktioner
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        Felsökning och vanliga problem
                      </li>
                      <li className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-gray-800 rounded-full mr-3"></span>
                        Säkerhetsrutiner och datahantering
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={closeDocumentation}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors font-[600]"
                >
                  Stäng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact Support Popup */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 ">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto">
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800 mb-3">
                This page says
              </h2>

              <div className="mb-4">
                <h3 className="  text-gray-800 mb-8">
                  Kontakta Support:
                </h3>

                <div className="">
                  {/* Email */}
                  <div className="flex items-center text-sm">
                    <i className="fas fa-envelope text-blue-600  mr-2"></i>
                    <span className="text-gray-700">
                      E-post: post@ilmoro.se
                    </span>
                  </div>

                  {/* Mobile */}
                  <div className="flex items-center text-sm">
                    <i className="fas fa-mobile-alt text-blue-600  mr-2"></i>
                    <span className="text-gray-700">Mobil: 0700-402250</span>
                  </div>

                  {/* Live Chat */}
                  <div className="flex items-center text-sm">
                    <i className="fas fa-comments text-blue-600  mr-2"></i>
                    <span className="text-gray-700">
                      Live Chat: Tillgänglig 08:00-17:00
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 text-sm">
                  Vi svarar vanligtvis inom 1-2 timmar under kontorstid.
                </p>
                <p className="text-gray-600 text-sm">
                  För akuta problem, ring direkt till mobilnumret.
                </p>
              </div>

              <div className="flex justify-end ">
                
                <button
                  onClick={closeContact}
                  className="border-2 border-blue-600 p-[2px] rounded-3xl   transition-colors"
                >
                  <div className="px-5 py-[6px] bg-blue-600 text-white border border-blue-600 p-1 rounded-3xl hover:bg-blue-500 transition-colors">  OK</div>
                
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status Popup */}
      {showStatus && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-8">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Systemstatus
              </h2>

              {/* Aktuell Status */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Aktuell Status
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 text-lg mr-3"></i>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Huvudsystem:
                      </span>
                      <span className="text-gray-600 ml-2">
                        Online och fungerande normalt
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 text-lg mr-3"></i>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Databas:
                      </span>
                      <span className="text-gray-600 ml-2">
                        Online, svarstid: 12ms
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 text-lg mr-3"></i>
                    <div>
                      <span className="font-semibold text-gray-800">
                        API-tjänster:
                      </span>
                      <span className="text-gray-600 ml-2">
                        Alla endpoints aktiva
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-exclamation-triangle text-orange-500 text-lg mr-3"></i>
                    <div>
                      <span className="font-semibold text-gray-800">
                        SCADA-integration:
                      </span>
                      <span className="text-gray-600 ml-2">
                        Intermittenta anslutningsproblem
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-check-circle text-green-500 text-lg mr-3"></i>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Backup-system:
                      </span>
                      <span className="text-gray-600 ml-2">
                        Senaste backup: igår 03:00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Systemstatistik */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Systemstatistik
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Tillgänglighet senaste 30 dagarna:
                        </span>
                        <span className="font-semibold text-gray-800">
                          99.2%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Genomsnittlig svarstid:
                        </span>
                        <span className="font-semibold text-gray-800">
                          1.2 sekunder
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Aktiva användarsessioner:
                        </span>
                        <span className="font-semibold text-gray-800">67</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Pågående beräkningar:
                        </span>
                        <span className="font-semibold text-gray-800">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Systembelastning:</span>
                        <span className="font-semibold text-gray-800">
                          34% av kapacitet
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Senaste Händelser */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Senaste Händelser
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-09 14:30:
                      </span>
                      <span className="text-gray-600">
                        Rutinunderhåll slutfört
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-08 23:15:
                      </span>
                      <span className="text-gray-600">
                        Automatisk databasoptimering
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-08 15:20:
                      </span>
                      <span className="text-gray-600">
                        SCADA-anslutning återställd
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-07 09:00:
                      </span>
                      <span className="text-gray-600">
                        Säkerhetsuppdatering installerad
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Planerade Aktiviteter */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Planerade Aktiviteter
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-15 02:00-04:00:
                      </span>
                      <span className="text-gray-600">
                        Planerat underhåll av databas
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-20:
                      </span>
                      <span className="text-gray-600">
                        Uppdatering av beräkningsmoduler
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-semibold text-gray-800 mr-2">
                        2025-09-25:
                      </span>
                      <span className="text-gray-600">
                        Ny version av användargränssnitt
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={closeStatus}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Stäng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Popup */}
      {showFAQ && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-8">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Vanliga Frågor (FAQ)
              </h2>

              {/* Allmänna Frågor */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Allmänna Frågor
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Hur startar jag en hydraulisk analys?
                    </p>
                    <p className="text-gray-600">
                      A: Gå till Moduler &gt; Hydraulisk analys, välj
                      projekttyp, fyll i grunddata och klicka på "Starta
                      beräkning".
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Vilka standarder följs i systemet?
                    </p>
                    <p className="text-gray-600">
                      A: Vi följer Svenska Vattens standarder P110, P111, P114,
                      P83, P90 samt DVGW och EN-standarder där tillämpligt.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Kan jag exportera mina beräkningar?
                    </p>
                    <p className="text-gray-600">
                      A: Ja, alla beräkningar kan exporteras som PDF-rapporter,
                      Excel-filer eller CSV-data.
                    </p>
                  </div>
                </div>
              </div>

              {/* Beräkningar & Moduler */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Beräkningar & Moduler
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Vilka hydrauliska beräkningsmetoder används?
                    </p>
                    <p className="text-gray-600">
                      A: Vi använder Manning och Colebrook ekvationer för
                      tryckförlustberäkningar samt Darcy-Weisbach för
                      rörströmning.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Hur fungerar förbrukningsanalysen enligt P110?
                    </p>
                    <p className="text-gray-600">
                      A: Systemet beräknar dimensioneringsflöden baserat på
                      anslutningsvärden, samtidighetsfaktorer och flödestyp
                      enligt P110.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Kan systemet hantera komplexa nätverk?
                    </p>
                    <p className="text-gray-600">
                      A: Ja, vårt system kan analysera komplexa VA-nätverk med
                      flera noder, förgreningar och höjdskillnader.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data & Integration */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Data & Integration
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Vilka filformat stöds för import?
                    </p>
                    <p className="text-gray-600">
                      A: Vi stöder Excel (.xlsx), CSV, och kan integrera med de
                      flesta GIS-system och SCADA-system.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Hur säker är min data?
                    </p>
                    <p className="text-gray-600">
                      A: All data krypteras både under transport och lagring. Vi
                      följer GDPR och har regelbundna säkerhetskopieringar.
                    </p>
                  </div>
                </div>
              </div>

              {/* Tekniska Problem */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-blue-600 mb-4">
                  Tekniska Problem
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Vad gör jag om beräkningarna tar för lång tid?
                    </p>
                    <p className="text-gray-600">
                      A: Kontrollera nätverksanslutningen, starta om beräkningen
                      eller kontakta support om problemet kvarstår.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 mb-2">
                      Q: Varför får jag felaktiga resultat?
                    </p>
                    <p className="text-gray-600">
                      A: Kontrollera indata, enheter och att alla erforderliga
                      parametrar är ifyllda. Se dokumentationen för mer hjälp.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-center pt-4">
                <button
                  onClick={closeFAQ}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Stäng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Training Popup */}
      {showTraining && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Denna sida säger
              </h2>

              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <i className="fas fa-graduation-cap text-purple-600 text-lg mr-3"></i>
                  <h3 className="text-xl font-bold text-gray-800">
                    Utbildning & Träning
                  </h3>
                </div>

                <p className="text-gray-600 mb-6">
                  Vi erbjuder kostnadsfri utbildning för alla våra kunder!
                </p>

                {/* Utbildningsformat */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Utbildningsformat:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Via Teams (online)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      På plats hos er
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Kombinerad utbildning
                    </li>
                  </ul>
                </div>

                {/* Tillgängliga kurser */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">
                    Tillgängliga kurser:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Grundkurs VA-beräkningar (4 tim)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Avancerad hydraulisk analys (6 tim)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      P110/P83 standarder (3 tim)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      GIS-integration (2 tim)
                    </li>
                    <li className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mr-3"></span>
                      Systemadministration (4 tim)
                    </li>
                  </ul>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-blue-600 text-lg mr-3"></i>
                    <span className="text-gray-600">
                      Kontakta oss på post@ilmoro.se för att boka utbildning!
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-blue-600 text-lg mr-3"></i>
                    <span className="text-gray-600">
                      Eller ring 0700-402250
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-star text-orange-500 text-lg mr-3"></i>
                    <span className="text-gray-600 font-semibold">
                      Helt kostnadsfritt för alla våra kunder!
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeTraining}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
