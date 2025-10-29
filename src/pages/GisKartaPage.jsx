import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Polygon,
  Circle,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function GisKartaPage({ user, onLogout }) {
  const [activeSidebarTab, setActiveSidebarTab] = useState("layers");
  const [currentTool, setCurrentTool] = useState("select");
  const [selectedCity, setSelectedCity] = useState("lidkoping");
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentCoordinates, setCurrentCoordinates] = useState({
    lat: 58.5109,
    lng: 13.1622,
  });
  const [zoomLevel, setZoomLevel] = useState(13);
  const [measurementPoints, setMeasurementPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnItems, setDrawnItems] = useState([]);
  const [vaLayers, setVaLayers] = useState({
    "water-pipes": { visible: true, opacity: 80 },
    pumps: { visible: true, opacity: 100 },
    valves: { visible: true, opacity: 100 },
  });
  const [baseLayer, setBaseLayer] = useState("osm");
  const [objectInfo, setObjectInfo] = useState({
    type: "Ingen markering",
    position: "-",
    address: "-",
    properties: "",
  });
  const [notifications, setNotifications] = useState([]);

  // Swedish cities data
  const swedishCities = {
    stockholm: {
      name: "Stockholm",
      coords: [59.3293, 18.0686],
      zoom: 11,
      population: "975 000",
      region: "Stockholms län",
    },
    goteborg: {
      name: "Göteborg",
      coords: [57.7089, 11.9746],
      zoom: 11,
      population: "580 000",
      region: "Västra Götalands län",
    },
    malmo: {
      name: "Malmö",
      coords: [55.6044, 13.0038],
      zoom: 11,
      population: "345 000",
      region: "Skåne län",
    },
    uppsala: {
      name: "Uppsala",
      coords: [59.8586, 17.6389],
      zoom: 12,
      population: "230 000",
      region: "Uppsala län",
    },
    vasteras: {
      name: "Västerås",
      coords: [59.6162, 16.5528],
      zoom: 12,
      population: "155 000",
      region: "Västmanlands län",
    },
    orebro: {
      name: "Örebro",
      coords: [59.2741, 15.2066],
      zoom: 12,
      population: "155 000",
      region: "Örebro län",
    },
    linkoping: {
      name: "Linköping",
      coords: [58.4108, 15.6214],
      zoom: 12,
      population: "165 000",
      region: "Östergötlands län",
    },
    helsingborg: {
      name: "Helsingborg",
      coords: [56.0465, 12.6945],
      zoom: 12,
      population: "150 000",
      region: "Skåne län",
    },
    lidkoping: {
      name: "Lidköping",
      coords: [58.5109, 13.1622],
      zoom: 13,
      population: "25 000",
      region: "Västra Götalands län",
    },
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // Handle city change
  const handleCityChange = (cityKey) => {
    setSelectedCity(cityKey);
    showNotification(`Växlade till ${swedishCities[cityKey].name}`, "success");
  };

  // Handle search
  const handleSearch = async (query) => {
    if (query.length < 3) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    try {
      const searchQuery = encodeURIComponent(query + ", Sverige");
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=se&limit=5&q=${searchQuery}`
      );
      const results = await response.json();
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      showNotification("Fel vid adresssökning", "error");
    }
  };

  // Handle search result click
  const handleSearchResultClick = (result) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setCurrentCoordinates({ lat, lng });
    setObjectInfo({
      type: "Sökresultat",
      position: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
      address: result.display_name,
      properties: "",
    });
    setShowSearchResults(false);
    setSearchQuery(result.display_name.split(",")[0]);
    showNotification(
      `Hittade: ${result.display_name.split(",")[0]}`,
      "success"
    );
  };

  // Handle drawing tool change
  const handleToolChange = (tool) => {
    setCurrentTool(tool);
    setIsDrawing(false);
    setMeasurementPoints([]);
    showNotification(
      `${tool.charAt(0).toUpperCase() + tool.slice(1)} verktyg aktiverat`,
      "info"
    );
  };

  // Handle map click
  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    setCurrentCoordinates({ lat, lng });

    if (currentTool === "measure") {
      setMeasurementPoints((prev) => [...prev, { lat, lng }]);
    } else if (currentTool === "marker") {
      const newItem = {
        id: Date.now(),
        type: "marker",
        position: { lat, lng },
        data: `Markör - Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`,
      };
      setDrawnItems((prev) => [...prev, newItem]);
      showNotification("Markör placerad", "success");
    }
  };

  // Map event handlers component
  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
      mousemove: (e) => {
        setCurrentCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
      },
      zoomend: (e) => {
        setZoomLevel(e.target.getZoom());
      },
    });
    return null;
  };

  // Generate VA infrastructure data
  const generateVAInfrastructure = (cityData) => {
    const center = cityData.coords;
    const infrastructure = {
      waterPipes: [],
      pumps: [],
      valves: [],
    };

    // Generate sample water pipes
    for (let i = 0; i < 3; i++) {
      const startLat = center[0] + (Math.random() - 0.5) * 0.01;
      const startLng = center[1] + (Math.random() - 0.5) * 0.01;
      const endLat = startLat + (Math.random() - 0.5) * 0.015;
      const endLng = startLng + (Math.random() - 0.5) * 0.015;

      infrastructure.waterPipes.push({
        id: i,
        coordinates: [
          [startLat, startLng],
          [endLat, endLng],
        ],
        type: i === 0 ? "main" : "distribution",
        diameter: i === 0 ? "DN300" : "DN150",
        material: "PVC",
      });
    }

    return infrastructure;
  };

  const currentCityData = swedishCities[selectedCity];
  const infrastructure = generateVAInfrastructure(currentCityData);

  return (
    <div className=" bg-gray-50">
      {/* Notifications */}
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-semibold transform transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-500"
              : notification.type === "error"
              ? "bg-red-500"
              : notification.type === "warning"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          {notification.message}
        </div>
      ))}

      <div className="max-w-7xl mx-auto p-5">
        <div className="bg-white rounded-xl shadow-lg   flex flex-col">
          {/* Header */}
          <div className="text-white p-6 lg:pl-40 lg:flex items-center  lg:gap-4 relative bg-gradient-to-br from-indigo-500 to-purple-600">
            <Link
              to="/"
              className="absolute lg:block hidden top-1/2 left-6 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all bg-white/20 backdrop-blur-sm text-sm no-underline"
            >
              <i className="fas fa-arrow-left"></i>
              Tillbaka till Dashboard
            </Link>
            <Link
              to="/"
              className="absolute  lg:hidden top-8 left-6 transform -translate-y-1/2 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all bg-white/20 backdrop-blur-sm text-sm no-underline"
            >
              <i className="fas fa-arrow-left"></i>
            </Link>

            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-white/20 backdrop-blur-sm">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <div>
              <div className="text-2xl font-semibold">GIS-kartmodul</div>
              <div className="text-blue-100 text-sm mt-1 opacity-90">
                Nationell kartapplikation med VA-infrastruktur för svenska
                städer
              </div>
            </div>
          </div>
          {/* Toolbar */}
          <div className="bg-gradient-to-r  from-blue-50 to-indigo-50 border-b border-gray-200 ">
            <div className="py-4 px-6 grid grid-cols-12 items-center justify-between">
              <div className="col-span-4 flex items-center gap-4 text-sm font-medium">
                <select
                  value={selectedCity}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="bg-white border-2 border-gray-300 text-gray-800  px-4 py-2 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 min-w-[220px]"
                >
                  <option value="">Välj stad/region</option>
                  <optgroup label="Storstäder">
                    <option value="stockholm">Stockholm</option>
                    <option value="goteborg">Göteborg</option>
                    <option value="malmo">Malmö</option>
                    <option value="uppsala">Uppsala</option>
                  </optgroup>
                  <optgroup label="Större städer">
                    <option value="vasteras">Västerås</option>
                    <option value="orebro">Örebro</option>
                    <option value="linkoping">Linköping</option>
                    <option value="helsingborg">Helsingborg</option>
                    <option value="lidkoping">Lidköping</option>
                  </optgroup>
                </select>
              </div>

              <div className="col-span-8 flex gap-2 justify-end">
                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <i className="fas fa-plus"></i> Nytt projekt
                </button>

                <button
                  onClick={() => showNotification("Projekt sparat", "success")}
                  className="bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <i className="fas fa-save"></i> Spara
                </button>

                <div className="relative inline-block text-sm font-bold">
                  <i className="fas fa-download absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600 z-10"></i>
                  <select
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value) {
                        // Create download file based on format
                        const timestamp = new Date().toISOString().slice(0, 10);
                        let fileName = "";
                        let fileContent = "";
                        let mimeType = "";

                        if (value === "JSON") {
                          fileName = `export_${timestamp}.json`;
                          mimeType = "application/json";
                          // Create sample JSON data
                          fileContent = JSON.stringify(
                            {
                              type: "GIS Export",
                              date: new Date().toISOString(),
                              data: {
                                // Add your actual data here
                                message: "GIS data export",
                              },
                            },
                            null,
                            2
                          );
                        } else if (value === "KML") {
                          fileName = `export_${timestamp}.kml`;
                          mimeType = "application/vnd.google-earth.kml+xml";
                          // Create sample KML data
                          fileContent = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>GIS Export</name>
    <description>Exported on ${new Date().toISOString()}</description>
    <!-- Add your actual KML features here -->
  </Document>
</kml>`;
                        } else if (value === "PNG") {
                          fileName = `export_${timestamp}.png`;
                          mimeType = "image/png";
                          // For PNG, we'll create a canvas and download it
                          const canvas = document.createElement("canvas");
                          const ctx = canvas.getContext("2d");
                          canvas.width = 800;
                          canvas.height = 600;

                          // Draw sample image
                          ctx.fillStyle = "#f0f0f0";
                          ctx.fillRect(0, 0, 800, 600);
                          ctx.fillStyle = "#333";
                          ctx.font = "48px Arial";
                          ctx.textAlign = "center";
                          ctx.fillText("GIS Export", 400, 300);
                          ctx.font = "24px Arial";
                          ctx.fillText(timestamp, 400, 350);

                          canvas.toBlob((blob) => {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = fileName;
                            link.click();
                            URL.revokeObjectURL(url);
                          }, mimeType);

                          showNotification(`${value} exporterad`, "success");
                          e.target.value = "";
                          return;
                        }

                        // Download file
                        const blob = new Blob([fileContent], {
                          type: mimeType,
                        });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = fileName;
                        link.click();
                        URL.revokeObjectURL(url);

                        showNotification(`${value} exporterad`, "success");
                        e.target.value = ""; // Reset to default
                      }
                    }}
                    className="bg-white border-2 border-gray-300 text-gray-800 pl-10 pr-10 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all appearance-none cursor-pointer focus:outline-none focus:border-blue-500 min-w-[180px]"
                  >
                    <option value="" disabled selected>
                      Exportera
                    </option>
                    <option value="JSON">JSON</option>
                    <option value="KML">KML</option>
                    <option value="PNG">PNG</option>
                  </select>
                  <i className="fas fa-caret-down absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-600"></i>
                </div>

                <button
                  onClick={() => setShowImportModal(true)}
                  className="bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <i className="fas fa-upload"></i> Importera
                </button>

                <button
                  onClick={() => setShowSettingsModal(true)}
                  className="bg-white border-2 border-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:border-blue-500 hover:text-blue-500 transition-all flex items-center gap-2 text-sm font-bold"
                >
                  <i className="fas fa-cog"></i> Inställningar
                </button>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-12 ">
            <div className="col-span-3 bg-white border-r border-gray-200 flex flex-col">
              <div className="flex bg-gray-50 border-b border-gray-200">
                <button
                  onClick={() => setActiveSidebarTab("layers")}
                  className={`flex-1 px-4 py-3 text-sm font-medium text-center  transition-all border-b-2 ${
                    activeSidebarTab === "layers"
                      ? "bg-white text-blue-600 border-blue-600"
                      : "text-gray-600 border-transparent hover:text-blue-600"
                  }`}
                >
                  <i className="fas fa-layer-group mr-2"></i> Lager
                </button>
                <button
                  onClick={() => setActiveSidebarTab("tools")}
                  className={`flex-1 px-4 py-3 text-center text-sm font-medium transition-all border-b-2 ${
                    activeSidebarTab === "tools"
                      ? "bg-white text-blue-600 border-blue-600"
                      : "text-gray-600 border-transparent hover:text-blue-600"
                  }`}
                >
                  <i className="fas fa-tools mr-2"></i> Verktyg
                </button>
                <button
                  onClick={() => setActiveSidebarTab("analysis")}
                  className={`flex-1 px-4 py-3 text-center text-sm font-medium transition-all border-b-2 ${
                    activeSidebarTab === "analysis"
                      ? "bg-white text-blue-600 border-blue-600"
                      : "text-gray-600 border-transparent hover:text-blue-600"
                  }`}
                >
                  <i className="fas fa-chart-bar mr-2"></i> Analys
                </button>
              </div>

              <div className="overflow-y-auto p-5">
                {activeSidebarTab === "layers" && (
                  <div>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-200">
                      <h3 className="font-semibold text-blue-800 text-lg mb-2">
                        {currentCityData.name}
                      </h3>
                      <p className="text-blue-700 text-xs font-medium">
                        {currentCityData.region}
                      </p>
                      <p className="text-blue-600 text-xs">
                        Befolkning: {currentCityData.population}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium text-md text-blue-600 mb-4 flex items-center gap-2">
                        <i className="fas fa-globe"></i> Bakgrundskartor
                      </h4>
                      <div className="space-y-2">
                        {[
                          {
                            key: "osm",
                            name: "OpenStreetMap",
                            icon: "OSM",
                            color: "bg-green-600",
                          },
                          {
                            key: "satellite",
                            name: "Satellit (Esri)",
                            icon: "SAT",
                            color:
                              "bg-gradient-to-r from-green-600 to-green-400",
                          },
                          {
                            key: "topo",
                            name: "Topografisk",
                            icon: "TOP",
                            color:
                              "bg-gradient-to-r from-yellow-600 to-yellow-400",
                          },
                        ].map((layer) => (
                          <div
                            key={layer.key}
                            onClick={() => setBaseLayer(layer.key)}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border ${
                              baseLayer === layer.key
                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                : "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="baselayer"
                              checked={baseLayer === layer.key}
                              onChange={() => setBaseLayer(layer.key)}
                              className="w-4 h-4"
                            />
                            <div
                              className={`w-8 h-6 rounded text-white text-xs font-medium flex items-center justify-center ${layer.color}`}
                            >
                              {layer.icon}
                            </div>
                            <span className="font-medium text-sm">
                              {layer.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-md text-blue-600 mb-4 flex items-center gap-2">
                        <i className="fas fa-water"></i> VA-Infrastruktur
                      </h4>
                      <div className="space-y-3">
                        {[
                          {
                            key: "water-pipes",
                            name: "Vattenledningar",
                            icon: "💧",
                            color: "text-blue-600",
                          },
                          {
                            key: "pumps",
                            name: "Pumpstationer",
                            icon: "⚙️",
                            color: "text-orange-500",
                          },
                          {
                            key: "valves",
                            name: "Ventiler",
                            icon: "🔧",
                            color: "text-red-500",
                          },
                        ].map((layer) => (
                          <div
                            key={layer.key}
                            className="flex items-center justify-between py-3 border-b border-gray-200"
                          >
                            <label className="flex items-center gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={vaLayers[layer.key].visible}
                                onChange={(e) =>
                                  setVaLayers((prev) => ({
                                    ...prev,
                                    [layer.key]: {
                                      ...prev[layer.key],
                                      visible: e.target.checked,
                                    },
                                  }))
                                }
                                className="w-4 h-4"
                              />
                              <span className={`text-sm ${layer.color}`}>
                                {layer.icon}
                              </span>
                              <span className="font-medium text-sm">
                                {layer.name}
                              </span>
                            </label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={vaLayers[layer.key].opacity}
                              onChange={(e) =>
                                setVaLayers((prev) => ({
                                  ...prev,
                                  [layer.key]: {
                                    ...prev[layer.key],
                                    opacity: parseInt(e.target.value),
                                  },
                                }))
                              }
                              className="w-20 h-[6px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeSidebarTab === "tools" && (
                  <div>
                    <h4 className="font-medium text-md text-blue-600 mb-4 flex items-center gap-2">
                      <i className="fas fa-pencil-alt"></i> Ritverktyg
                    </h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {[
                        {
                          key: "select",
                          icon: "fas fa-mouse-pointer",
                          name: "Markera",
                        },
                        {
                          key: "marker",
                          icon: "fas fa-map-pin",
                          name: "Markör",
                        },
                        {
                          key: "line",
                          icon: "fas fa-pencil-alt",
                          name: "Linje",
                        },
                        {
                          key: "polyline",
                          icon: "fas fa-route",
                          name: "Polyline",
                        },
                        {
                          key: "polygon",
                          icon: "fas fa-draw-polygon",
                          name: "Polygon",
                        },
                        {
                          key: "circle",
                          icon: "fas fa-circle",
                          name: "Cirkel",
                        },
                        { key: "measure", icon: "fas fa-ruler", name: "Mäta" },
                      ].map((tool) => (
                        <button
                          key={tool.key}
                          onClick={() => handleToolChange(tool.key)}
                          className={`p-2 text-sm font-medium border-2 rounded-lg text-center transition-all ${
                            currentTool === tool.key
                              ? "border-blue-500 bg-blue-500 text-white"
                              : "border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50"
                          }`}
                        >
                          <i className={`${tool.icon}  mb-2 block`}></i>
                          <div className="">{tool.name}</div>
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setDrawnItems([]);
                          setMeasurementPoints([]);
                          showNotification("Alla ritningar rensade", "warning");
                        }}
                        className="py-4 border-2 text-sm font-medium border-blue-500 rounded-lg hover:bg-blue-500 bg-white  hover:text-white text-blue-500 transition-all flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-eraser"></i> Rensa allt
                      </button>
                      <button
                        onClick={() =>
                          showNotification(
                            "Senaste ritning borttagen",
                            "warning"
                          )
                        }
                        className="py-4 border-2 text-sm font-medium border-blue-500 rounded-lg hover:bg-blue-500 bg-white hover:text-white text-blue-500 transition-all flex items-center justify-center gap-2"
                      >
                        <i className="fas fa-undo"></i> Ångra
                      </button>
                    </div>
                  </div>
                )}

                {activeSidebarTab === "analysis" && (
                  <div>
                    <h4 className="font-medium text-md text-blue-600 mb-4 flex items-center gap-2">
                      <i className="fas fa-calculator"></i> Mätningar
                    </h4>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Koordinater (WGS84)
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs font-medium border">
                          {currentCoordinates.lat.toFixed(6)},{" "}
                          {currentCoordinates.lng.toFixed(6)}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Zoom-nivå
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs font-medium border">
                          {zoomLevel}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Avstånd (senaste mätning)
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs font-medium border">
                          {measurementPoints.length > 1 ? "Beräknas..." : "0 m"}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total area
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs font-medium border">
                          0 m²
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Aktiva lager
                        </label>
                        <div className="bg-gray-50 p-3 rounded-lg font-mono text-xs font-medium border">
                          {
                            Object.values(vaLayers).filter(
                              (layer) => layer.visible
                            ).length
                          }{" "}
                          lager
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="col-span-6 relative bg-green-100">
              <MapContainer
                center={currentCityData.coords}
                zoom={currentCityData.zoom}
                className="w-full h-full"
                zoomControl={true}
              >
                <MapEvents />

                {baseLayer === "osm" && (
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                    maxZoom={19}
                  />
                )}
                {baseLayer === "satellite" && (
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="© Esri, Maxar, GeoEye, Earthstar Geographics"
                    maxZoom={19}
                  />
                )}
                {baseLayer === "topo" && (
                  <TileLayer
                    url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                    attribution="© OpenTopoMap contributors"
                    maxZoom={17}
                  />
                )}

                {vaLayers["water-pipes"].visible &&
                  infrastructure.waterPipes.map((pipe) => (
                    <Polyline
                      key={pipe.id}
                      positions={pipe.coordinates}
                      color={pipe.type === "main" ? "#1976D2" : "#42A5F5"}
                      weight={pipe.type === "main" ? 6 : 4}
                      opacity={vaLayers["water-pipes"].opacity / 100}
                    >
                      <Popup>
                        Vattenledning: {pipe.type} ({pipe.diameter})
                      </Popup>
                    </Polyline>
                  ))}

                {drawnItems.map((item) => {
                  if (item.type === "marker") {
                    return (
                      <Marker
                        key={item.id}
                        position={[item.position.lat, item.position.lng]}
                      >
                        <Popup>{item.data}</Popup>
                      </Marker>
                    );
                  }
                  return null;
                })}

                {measurementPoints.map((point, index) => (
                  <Marker key={index} position={[point.lat, point.lng]}>
                    <Popup>Mätpunkt {index + 1}</Popup>
                  </Marker>
                ))}
              </MapContainer>

              <div className="absolute top-4 right-4 z-10 w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  placeholder="Sök adress eller plats i Sverige..."
                  className="w-full px-5 py-4 border-2 border-white rounded-full text-sm bg-white/95 shadow-lg focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        onClick={() => handleSearchResultClick(result)}
                        className="p-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="font-semibold">
                          {result.display_name.split(",")[0]}
                        </div>
                        <div className="text-sm text-gray-600">
                          {result.display_name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="absolute bottom-4 left-4 bg-white/95 text-gray-800 p-4 rounded-lg font-mono text-sm z-10 min-w-[220px] shadow-lg border border-gray-200">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-blue-600">Lat:</span>
                  <span>{currentCoordinates.lat.toFixed(6)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-blue-600">Lng:</span>
                  <span>{currentCoordinates.lng.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-blue-600">Zoom:</span>
                  <span>{zoomLevel}</span>
                </div>
              </div>

              {currentTool === "measure" && measurementPoints.length > 0 && (
                <div className="absolute top-24 left-4 bg-white/95 text-blue-600 p-4 rounded-lg font-semibold z-10 min-w-[200px] shadow-lg border border-gray-200">
                  <div>
                    <strong>Aktiv mätning:</strong>
                  </div>
                  <div>Punkter: {measurementPoints.length}</div>
                </div>
              )}
            </div>

            <div className="col-span-3 bg-white border-l border-gray-200 flex flex-col">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 border-b border-gray-200">
                <h3 className="font-medium text-md text-blue-600 flex items-center gap-2">
                  <i className="fas fa-info-circle"></i>
                  Objektinformation
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objekttyp
                    </label>
                    <div className="bg-gray-50 p-2 rounded-lg font-mono text-xs font-medium border">
                      {objectInfo.type}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position
                    </label>
                    <div className="bg-gray-50 p-2 rounded-lg font-mono text-sm border">
                      {objectInfo.position}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adress
                    </label>
                    <div className="bg-gray-50 p-2 rounded-lg font-mono text-sm border">
                      {objectInfo.address}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Egenskaper
                    </label>
                    <textarea
                      value={objectInfo.properties}
                      onChange={(e) =>
                        setObjectInfo((prev) => ({
                          ...prev,
                          properties: e.target.value,
                        }))
                      }
                      className="w-full p-3 border-2 border-gray-300 rounded-lg text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      rows={4}
                      placeholder="Objektegenskaper..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() =>
                        showNotification("Objektdata sparad", "success")
                      }
                      className="p-3 border-2 border-blue-500 rounded-lg bg-white text-blue-500 hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-save"></i> Spara
                    </button>
                    <button
                      onClick={() =>
                        showNotification("Objekt borttaget", "warning")
                      }
                      className="py-4 border-2 text-sm font-medium border-blue-500 rounded-lg hover:bg-blue-500 bg-white  hover:text-white text-blue-500 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fas fa-trash"></i> Ta bort
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[9999] ">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 animate-slide-in">
            <div className="px-6 py-4 flex items-center justify-between rounded-t-xl">
              <h3 className="text-xl  font-medium text-gray-700 flex items-center gap-3">
                <i className="fas fa-plus-circle text-xl"></i>
                Skapa nytt projekt
              </h3>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="text-gray-700 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>
            <div className="py-4 px-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <i className="fas fa-file-alt mr-2 text-blue-600"></i>
                  Projektnamn
                </label>
                <input
                  type="text"
                  placeholder="Ange projektnamn..."
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold text-sm"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => {
                    setShowNewProjectModal(false);
                    setShowConfirmationModal(true);
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold text-sm shadow-lg"
                >
                  <i className="fas fa-check mr-2"></i>
                  Skapa projekt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-[99999] pt-32">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-slide-in">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-xl">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <i className="fas fa-check-circle text-2xl"></i>
                Bekräfta
              </h3>
              <button
                onClick={() => setShowConfirmationModal(false)}
                className="text-white hover:text-gray-200 text-3xl transition-all"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-center mb-6">
                Är du säker på att du vill skapa detta projekt?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
                >
                  Avbryt
                </button>
                <button
                  onClick={() => {
                    showNotification("Nytt projekt skapat!", "success");
                    setShowConfirmationModal(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg"
                >
                  <i className="fas fa-check mr-2"></i>
                  Ja, skapa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
