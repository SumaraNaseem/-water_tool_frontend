import React, { useState } from "react";

export default function SettingsContent() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const settingsCards = [
    {
      id: "system",
      title: "Systeminställningar",
      icon: "fas fa-cog",
      settings: [
        "Databaskonfiguration",
        "API-inställningar",
        "Cachehantering",
        "Loggningsnivå",
      ],
      popupMessage: "Öppnar systeminställningar...",
      popupItems: [
        "Databaskonfiguration",
        "API-inställningar",
        "Cachehantering",
        "Loggningsnivå",
      ],
    },
    {
      id: "security",
      title: "Säkerhet",
      icon: "fas fa-shield-alt",
      settings: [
        "Lösenordspolicy",
        "Tvåfaktorsautentisering",
        "Sessionstimeout",
        "IP-begränsningar",
      ],
      popupMessage: "Öppnar säkerhetsinställningar...",
      popupItems: [
        "Lösenordspolicy",
        "Tvåfaktorsautentisering",
        "Sessionstimeout",
        "IP-begränsningar",
      ],
    },
    {
      id: "email",
      title: "E-post",
      icon: "fas fa-envelope",
      settings: [
        "SMTP-server",
        "E-postmallar",
        "Automatiska rapporter",
        "Systemnotifieringar",
      ],
      popupMessage: "Öppnar e-postinställningar...",
      popupItems: [
        "SMTP-server",
        "E-postmallar",
        "Automatiska rapporter",
        "Systemnotifieringar",
      ],
    },
    {
      id: "backup",
      title: "Säkerhetskopiering",
      icon: "fas fa-cloud",
      settings: [
        "Automatiska säkerhetskopior",
        "Återställningsplaner",
        "Moln-synkronisering",
        "Dataexport",
      ],
      popupMessage: "Öppnar säkerhetskopieringsinställningar...",
      popupItems: [
        "Automatiska säkerhetskopior",
        "Återställningsplaner",
        "Moln-synkronisering",
        "Dataexport",
      ],
    },
    {
      id: "theme",
      title: "Tema",
      icon: "fas fa-paint-brush",
      settings: [
        "Färgtema",
        "Språkinställningar",
        "Layoutpreferenser",
        "Teckenstorlek",
      ],
      popupMessage: "Öppnar tema-inställningar...",
      popupItems: [
        "Färgtema",
        "Språkinställningar",
        "Layoutpreferenser",
        "Teckenstorlek",
      ],
    },
    {
      id: "integrations",
      title: "Integrationer",
      icon: "fas fa-plug",
      settings: [
        "SCADA-anslutning",
        "GIS-integration",
        "ERP-system",
        "Webbtjänster",
      ],
      popupMessage: "Öppnar integrationsinställningar...",
      popupItems: [
        "SCADA-anslutning",
        "GIS-integration",
        "ERP-system",
        "Webbtjänster",
      ],
    },
  ];

  const handleConfigure = (card) => {
    setSelectedCard(card);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedCard(null);
  };

  return (
    <div className=" ">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Inställningar</h1>
      </div>

      {/* Settings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
        {settingsCards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {/* Card Header with Gradient Background */}
            <div className="bg-gradient-to-br to-purple-700  from-blue-400 p-6 text-center">
              <div className="flex justify-center mb-4">
                <i className={`${card.icon} text-white text-4xl`}></i>
              </div>
              <h2 className="text-xl font-bold text-white">{card.title}</h2>
            </div>

            {/* Card Content */}
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {card.settings.map((setting, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 pb-2 last:border-b-0"
                  >
                    <p className="text-sm text-gray-700">{setting}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleConfigure(card)}
                className=" bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                Konfigurera
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Popup */}
      {showPopup && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[60vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Denna sida säger</h2>
              <p className="text-gray-700 mb-4">{selectedCard.popupMessage}</p>
              
              <ul className="space-y-2 mb-6">
                {selectedCard.popupItems.map((item, index) => (
                  <li key={index} className="text-gray-700">• {item}</li>
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
    </div>
  );
}
