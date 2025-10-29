import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HydrauliskPage({ user, onLogout }) {
  const [currentMethod, setCurrentMethod] = useState("Grunddimensionering");
  const [currentPipeType, setCurrentPipeType] = useState("Br1");
  const [notifications, setNotifications] = useState([]);

  // Input values state
  const [inputValues, setInputValues] = useState({
    manning: {
      diameter: 100,
      slope: 5,
      fill_level: 50,
      temperature: 10,
      length: 50,
    },
    colebrook: {
      diameter: 100,
      slope: 5,
      fill_level: 50,
      temperature: 10,
      length: 50,
    },
    bretting: {
      diameter: 100,
      slope: 5,
      fill_level: 50,
      temperature: 10,
      length: 50,
    },
  });
  const [isCalculating, setIsCalculating] = useState(false);
  const [showCalculationResults, setShowCalculationResults] = useState(false);
  const [showValidationResults, setShowValidationResults] = useState(false);
  const [showFireReport, setShowFireReport] = useState(false);

  // Notification functions
  const showNotification = (message, type = 'info') => {
    // Prevent duplicate notifications with same message
    setNotifications(prev => {
      const isDuplicate = prev.some(n => n.message === message && Date.now() - n.id < 1000);
      if (isDuplicate) return prev;
      
      const notification = {
        id: Date.now(),
        message,
        type,
        timestamp: new Date()
      };
      
      // Auto remove after 5 seconds
      setTimeout(() => {
        setNotifications(current => current.filter(n => n.id !== notification.id));
      }, 5000);
      
      return [...prev, notification];
    });
  };

  const removeNotification = (id) => {
    // Add slide-out animation before removing
    const notificationElement = document.querySelector(`[data-notification-id="${id}"]`);
    if (notificationElement) {
      notificationElement.classList.add('notification-slide-out');
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 300); // Wait for animation to complete
    } else {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  // Building type data with corresponding input values
  const BUILDING_TYPES = {
    Br1: {
      name: "Br1 - Låg risk",
      description: "Bostäder ≤2 plan",
      sprinklerDensity: 2.5,
      fireArea: 100,
      fireHydrants: 1,
      hydrantFlow: 250,
      extinguishingTime: 30,
      diameter: 100,
      slope: 5,
      fillLevel: 50,
      temperature: 10,
      length: 50
    },
    Br2: {
      name: "Br2 - Normal risk", 
      description: "Flerbostadshus",
      sprinklerDensity: 5.0,
      fireArea: 200,
      fireHydrants: 2,
      hydrantFlow: 250,
      extinguishingTime: 60,
      diameter: 150,
      slope: 7,
      fillLevel: 70,
      temperature: 12,
      length: 100
    },
    Br3: {
      name: "Br3 - Förhöjd risk",
      description: "Kontor, skolor", 
      sprinklerDensity: 7.5,
      fireArea: 300,
      fireHydrants: 2,
      hydrantFlow: 300,
      extinguishingTime: 90,
      diameter: 200,
      slope: 7,
      fillLevel: 70,
      temperature: 15,
      length: 150
    },
    Ind1: {
      name: "Ind1 - Lätt industri",
      description: "Lager, verkstäder",
      sprinklerDensity: 10.0,
      fireArea: 400,
      fireHydrants: 3,
      hydrantFlow: 300,
      extinguishingTime: 120,
      diameter: 250,
      slope: 7,
      fillLevel: 70,
      temperature: 18,
      length: 200
    },
    Ind2: {
      name: "Ind2 - Tung industri",
      description: "Kemisk industri",
      sprinklerDensity: 15.0,
      fireArea: 500,
      fireHydrants: 4,
      hydrantFlow: 400,
      extinguishingTime: 180,
      diameter: 300,
      slope: 7,
      fillLevel: 70,
      temperature: 20,
      length: 250
    },
    Ind3: {
      name: "Ind3 - Hög risk",
      description: "Särskilt brandfarlig",
      sprinklerDensity: 20.0,
      fireArea: 600,
      fireHydrants: 5,
      hydrantFlow: 500,
      extinguishingTime: 240,
      diameter: 400,
      slope: 7,
      fillLevel: 70,
      temperature: 25,
      length: 300
    }
  };

  // Function to update input values based on building type
  const updateInputsForBuildingType = (buildingType) => {
    const buildingData = BUILDING_TYPES[buildingType];
    if (buildingData) {
      setInputValues(prev => ({
        ...prev,
        manning: {
          ...prev.manning,
          diameter: buildingData.diameter,
          slope: buildingData.slope,
          fill_level: buildingData.fillLevel,
          temperature: buildingData.temperature,
          length: buildingData.length
        }
      }));
    }
  };

  // Material properties -
  const MATERIAL_PROPS = {
    manning: {
      pvc_normal: { n: 0.011, name: "PVC normalt" },
      pvc_new: { n: 0.009, name: "PVC nytt" },
      pvc_old: { n: 0.013, name: "PVC gammalt" },
      concrete_smooth: { n: 0.012, name: "Betong slät" },
      concrete_normal: { n: 0.015, name: "Betong normal" },
      concrete_rough: { n: 0.018, name: "Betong grov" },
      pe_sdr11: { n: 0.01, name: "PE SDR11" },
      pe_sdr17: { n: 0.009, name: "PE SDR17" },
      steel_new: { n: 0.012, name: "Stål nytt" },
      steel_normal: { n: 0.015, name: "Stål normalt" },
      cast_iron_new: { n: 0.013, name: "Gjutjärn nytt" },
      ductile_iron: { n: 0.012, name: "Segjärn" },
    },
    colebrook: {
      pvc_new: { k: 0.007, name: "PVC nytt" },
      pe_sdr17: { k: 0.007, name: "PE SDR17" },
      pe_sdr11: { k: 0.01, name: "PE SDR11" },
      steel_new: { k: 0.05, name: "Stål nytt" },
      steel_normal: { k: 0.15, name: "Stål normalt" },
      cast_iron_new: { k: 0.25, name: "Gjutjärn nytt" },
      ductile_iron: { k: 0.1, name: "Segjärn" },
      concrete_smooth: { k: 0.1, name: "Betong slät" },
      concrete_normal: { k: 0.3, name: "Betong normal" },
    },
  };

  // EXACT standards from HTML
  const STANDARDS = {
    spillvatten: {
      name: "VAV P110",
      min_velocity: 0.6,
      max_velocity: 2.5,
      max_fill_ratio: 0.7,
      min_slope: 7,
    },
    dagvatten: {
      name: "SS-EN 752",
      min_velocity: 0.7,
      max_velocity: 5.0,
      max_fill_ratio: 0.95,
      min_slope: 5,
    },
    dricksvatten: {
      name: "SS-EN 1622",
      min_velocity: 0.5,
      max_velocity: 2.0,
      max_pressure_loss: 10,
    },
  };

  // EXACT water properties from HTML
  const getWaterViscosity = (temperature) => {
    return (
      0.001 *
      Math.pow(
        10,
        (1.3272 * (20 - temperature) -
          0.001053 * Math.pow(20 - temperature, 2)) /
          (temperature + 105)
      )
    );
  };

  const getWaterDensity = (temperature) => {
    const t = temperature;
    return (
      999.83952 +
      16.945176 * t -
      7.9870401e-3 * t * t -
      46.170461e-6 * t * t * t +
      105.56302e-9 * t * t * t * t -
      280.54253e-12 * t * t * t * t * t
    );
  };

  // EXACT geometry calculation from HTML
  const calculatePartiallyFilledCircle = (diameter, fillRatio) => {
    if (fillRatio >= 1.0) {
      const area = Math.PI * (diameter / 2) * (diameter / 2);
      const perimeter = Math.PI * diameter;
      return {
        area: area,
        wettedPerimeter: perimeter,
        hydraulicRadius: diameter / 4,
      };
    }

    if (fillRatio <= 0) {
      return {
        area: 0,
        wettedPerimeter: 0,
        hydraulicRadius: 0,
      };
    }

    const r = diameter / 2;
    const h = fillRatio * diameter;
    const theta = 2 * Math.acos(Math.max(-1, Math.min(1, (r - h) / r)));

    const area = ((r * r) / 2) * (theta - Math.sin(theta));
    const perimeter = r * theta;
    const hydraulicRadius = perimeter > 0 ? area / perimeter : 0;

    return {
      area: area,
      wettedPerimeter: perimeter,
      hydraulicRadius: hydraulicRadius,
    };
  };

  const calculateReynolds = (velocity, diameter, temperature) => {
    const density = getWaterDensity(temperature);
    const viscosity = getWaterViscosity(temperature);
    return (density * velocity * diameter) / viscosity;
  };

  const calculateManningCapacity = (diameter, slope, n) => {
    const area = Math.PI * (diameter / 2) * (diameter / 2);
    const perimeter = Math.PI * diameter;
    const hydraulicRadius = area / perimeter;
    return (
      (1 / n) * area * Math.pow(hydraulicRadius, 2 / 3) * Math.pow(slope, 0.5)
    );
  };

  const checkCompliance = (pipeType, params) => {
    const standard = STANDARDS[pipeType];
    const issues = [];
    const warnings = [];

    if (standard) {
      if (params.velocity < standard.min_velocity) {
        issues.push(
          `Hastighet ${params.velocity.toFixed(2)} m/s är under minimum ${
            standard.min_velocity
          } m/s`
        );
      }
      if (standard.max_velocity && params.velocity > standard.max_velocity) {
        issues.push(
          `Hastighet ${params.velocity.toFixed(2)} m/s överskrider maximum ${
            standard.max_velocity
          } m/s`
        );
      }

      if (params.fill_ratio && standard.max_fill_ratio) {
        if (params.fill_ratio > standard.max_fill_ratio) {
          issues.push(
            `Fyllnadsgrad ${(params.fill_ratio * 100).toFixed(
              0
            )}% överskrider maximum ${(standard.max_fill_ratio * 100).toFixed(
              0
            )}%`
          );
        }
      }

      if (params.slope && standard.min_slope) {
        if (params.slope < standard.min_slope) {
          warnings.push(
            `Lutning ${params.slope.toFixed(
              1
            )}‰ är under rekommenderat minimum ${standard.min_slope}‰`
          );
        }
      }

      if (params.pressure_loss && standard.max_pressure_loss) {
        if (params.pressure_loss > standard.max_pressure_loss) {
          issues.push(
            `Friktionsförlust ${params.pressure_loss.toFixed(
              1
            )} m/km överskrider maximum ${standard.max_pressure_loss} m/km`
          );
        }
      }
    }

    let status = "OK";
    if (issues.length > 0) status = "ERROR";
    else if (warnings.length > 0) status = "WARNING";

    return {
      standard: standard ? standard.name : "Okänd standard",
      status: status,
      issues: issues,
      warnings: warnings,
    };
  };

  // EXACT calculation functions from HTML
  const calculateManning = async () => {
    setIsCalculating(true);
    try {
      const diameter = inputValues.manning.diameter / 1000;
      const slope = inputValues.manning.slope / 1000;
      const fillRatio = inputValues.manning.fill_level / 100;
      const material = "pvc_normal"; // Default material
      const temperature = inputValues.manning.temperature;

      if (diameter <= 0 || slope <= 0 || fillRatio <= 0 || fillRatio > 1) {
        throw new Error("Ogiltiga inmatningsvärden");
      }

      const n = MATERIAL_PROPS.manning[material].n;
      const geom = calculatePartiallyFilledCircle(diameter, fillRatio);

      const flowRate =
        (1 / n) *
        geom.area *
        Math.pow(geom.hydraulicRadius, 2 / 3) *
        Math.pow(slope, 0.5);
      const velocity = geom.area > 0 ? flowRate / geom.area : 0;

      const hydraulicDiameter = 4 * geom.hydraulicRadius;
      const reynolds = calculateReynolds(
        velocity,
        hydraulicDiameter,
        temperature
      );

      const froude =
        geom.hydraulicRadius > 0
          ? velocity / Math.sqrt(9.81 * geom.hydraulicRadius)
          : 0;
      const capacityFactor =
        calculateManningCapacity(diameter, slope, n) > 0
          ? flowRate / calculateManningCapacity(diameter, slope, n)
          : 0;

      const result = {
        method: "Manning",
        flow_rate: flowRate * 1000,
        velocity: velocity,
        area: geom.area,
        hydraulic_radius: geom.hydraulicRadius,
        wetted_perimeter: geom.wettedPerimeter,
        reynolds_number: reynolds,
        froude_number: froude,
        capacity_factor: capacityFactor,
        compliance: checkCompliance(currentPipeType, {
          velocity: velocity,
          fill_ratio: fillRatio,
          slope: slope * 1000,
          method: "manning",
        }),
      };

      setCalculationResults(result);
      setShowResults(true);
      showNotification(
        "Hydraulisk analys genomförd enligt svenska standarder",
        "success"
      );
    } catch (error) {
      showNotification(
        "Manning-beräkning misslyckades: " + error.message,
        "error"
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const switchMethod = (method) => {
    setCurrentMethod(method);
    setShowResults(false);
  };

  const selectPipeType = (type) => {
    setCurrentPipeType(type);

    // Get default values from building type data or use fallback
    let defaultValues;
    
    if (BUILDING_TYPES[type]) {
      const buildingData = BUILDING_TYPES[type];
      defaultValues = {
        diameter: buildingData.diameter,
        slope: buildingData.slope,
        fill_level: buildingData.fillLevel,
        temperature: buildingData.temperature,
        length: buildingData.length,
      };
    } else {
      // Fallback for old pipe types
      defaultValues = {
        diameter: 200,
        slope: 7,
        fill_level: 70,
        temperature: 10,
        length: 100,
      };

      switch (type) {
        case "spillvatten":
          defaultValues = {
            diameter: 200,
            slope: 7,
            fill_level: 70,
            temperature: 15,
            length: 100,
          };
          break;
        case "dagvatten":
          defaultValues = {
            diameter: 300,
            slope: 5,
            fill_level: 80,
            temperature: 10,
            length: 150,
          };
          break;
        case "dricksvatten":
          defaultValues = {
            diameter: 150,
            slope: 10,
            fill_level: 60,
            temperature: 20,
            length: 80,
          };
          break;
        case "Industrivatten":
          defaultValues = {
            diameter: 250,
            slope: 8,
            fill_level: 75,
            temperature: 25,
            length: 120,
          };
          break;
      }
    }

    // Update input values for all methods
    setInputValues((prev) => ({
      ...prev,
      manning: defaultValues,
      colebrook: defaultValues,
      bretting: defaultValues,
    }));
  };

  // Handle input changes
  const handleInputChange = (method, field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: parseFloat(value) || 0,
      },
    }));
  };

  useEffect(() => {
    showNotification(
      "Brandvatten P83 modul laddad - VA-System Portal",
      "info"
    );
  }, []);

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .notification-slide-in {
          animation: slideInRight 0.5s ease-out;
        }
        
        .notification-slide-out {
          animation: slideOutRight 0.3s ease-in;
        }
      `}</style>
      <div className=" bg-slate-50 text-slate-800  py-10 ">
      {/* Notifications - */}
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          data-notification-id={notification.id}
          className={`fixed top-10 right-5 z-50 px-6 py-4 rounded-lg shadow-xl font-semibold max-w-sm flex items-center gap-2.5 notification-slide-in ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "warning"
              ? "bg-yellow-500 text-white"
              : notification.type === "error"
              ? "bg-red-500 text-white"
              : "bg-blue-500 text-white"
          }`}
          style={{
            top: `${40 + (index * 80)}px`,
            transition: 'all 0.3s ease-in-out'
          }}
        >
          <i
            className={`fas fa-${
              notification.type === "success"
                ? "check-circle"
                : notification.type === "warning"
                ? "exclamation-triangle"
                : notification.type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }`}
          ></i>
          <span>{notification.message}</span>
        </div>
      ))}

      <div className=" lg:px-32 px-5">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Header - */}
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
              <i class="fas fa-fire-extinguisher"></i>
            </div>
            <div>
              <div className="text-2xl font-semibold">
                Brandvatten enligt P83
              </div>
              <div className="text-blue-100 text-sm mt-1 opacity-90">
                Komplett dimensionering av brandvattensystem enligt svenska
                standarder
              </div>
            </div>
          </div>

          <div className="p-8 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 bg-white rounded-lg overflow-hidden shadow-sm mb-5 border border-gray-200 ">
              <button
                onClick={() => switchMethod("Grunddimensionering")}
                className={`flex-1 px-5 py-4 border-none font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 ${
                  currentMethod === "Grunddimensionering"
                    ? "text-white bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <i class="fas fa-calculator"></i>
                Grunddimensionering
              </button>
              <button
                onClick={() => switchMethod("Avancerad")}
                className={`flex-1 px-5 py-4 border-none font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 ${
                  currentMethod === "Avancerad"
                    ? "text-white bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <i class="fas fa-chart-line"></i>
                Avancerad analys
              </button>
              <button
                onClick={() => switchMethod("Pumpstation")}
                className={`flex-1 px-5 py-4 border-none font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 ${
                  currentMethod === "Pumpstation"
                    ? "text-white bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <i class="fas fa-cog"></i>
                Pumpstation
              </button>
              <button
                onClick={() => switchMethod("Nätverksanalys")}
                className={`flex-1 px-5 py-4 border-none font-semibold cursor-pointer transition-all text-sm flex items-center justify-center gap-2 ${
                  currentMethod === "Nätverksanalys"
                    ? "text-white bg-gradient-to-br from-indigo-500 to-purple-600"
                    : "bg-gray-50 text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <i class="fas fa-project-diagram"></i>
                Nätverksanalys
              </button>
            </div>

            {currentMethod === "Grunddimensionering" && (
              <div className="bg-white rounded-xl p-6 shadow-lg mb-5 border ">
                <div className="rounded-xl p-5 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600">
                  <h4 className="text-blue-600 mb-3 flex items-center gap-2 text-lg font-semibold">
                    <i className="fas fa-fire text-blue-600"></i>
                    Grundläggande brandvattenberäkning enligt P83
                  </h4>
                  <p className="text-gray-600 text-lg font-bold mb-4">
                    <strong>
                      Totalt brandvattenflöde = Sprinklerflöde + Brandpostflöde
                    </strong>
                  </p>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <div className="space-y-3">
                      <div className="font-mono">
                        <strong className=" text-blue-700">
                          Sprinklerflöde:
                        </strong>{" "}
                        <span className="font-mono">
                          Q_spr = Spolbelastning × Brandarea / 60
                        </span>
                      </div>
                      <div className="font-mono">
                        <strong className=" text-blue-700">
                          Brandpostflöde:
                        </strong>{" "}
                        <span className="font-mono">
                          Q_bp = Antal brandposter × Flöde per post
                        </span>
                      </div>
                      <div className="font-mono">
                        <strong className=" text-blue-700">
                          Magasinsvolym:
                        </strong>{" "}
                        <span className="font-mono">
                          V = Q_total × Släcktid × 60 / 1000
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <p className="bg-green-50 mt-3 mb-2 p-2 rounded-lg border border-green-500 text-green-500">
                    <span>
                      <i className="fas fa-check-circle mr-2"></i>
                    </span>
                    Verifierad enligt P83 (2016) och SS-EN 12845. Tillämplig för brandvattenförsörjning och sprinklersystem.
                  </p> */}
                </div>

                <div className="rounded-xl p-5 mb-6">
                  <h4 className="text-blue-600 mb-4 flex items-center gap-2 text-lg font-semibold">
                    <i className="fas fa-pipe"></i>
                    Byggnadsklassificering enligt BBR
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                    <button
                      onClick={() => selectPipeType("Br1")}
                      className={`border-2 rounded-xl p-4 transition-all text-center ${
                        currentPipeType === "Br1"
                          ? "border-blue-600 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-center gap-2">
                        Br1 - Låg risk
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Bostäder ≤2 plan
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        2.5 l/min·m²
                      </div>
                    </button>

                    <button
                      onClick={() => selectPipeType("Br2")}
                      className={`border-2 rounded-xl p-4 transition-all text-center ${
                        currentPipeType === "Br2"
                          ? "border-blue-600 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-center gap-2">
                        Br2 - Normal risk
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Flerbostadshus
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        5.0 l/min·m²
                      </div>
                    </button>

                    <button
                      onClick={() => selectPipeType("Br3")}
                      className={`border-2 rounded-xl p-4 transition-all text-center ${
                        currentPipeType === "Br3"
                          ? "border-blue-600 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-center gap-2">
                        Br3 - Förhöjd risk
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Kontor, skolor
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        7.5 l/min·m²
                      </div>
                    </button>

                    <button
                      onClick={() => selectPipeType("Ind1")}
                      className={`border-2 rounded-xl p-4 transition-all text-center ${
                        currentPipeType === "Ind1"
                          ? "border-blue-600 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-center gap-2">
                        Ind1 - Lätt industri
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Lager, verkstäder
                      </div>
                      <div className="text-xs opacity-80 mt-1">10 l/min·m²</div>
                    </button>

                    <button
                      onClick={() => selectPipeType("Ind2")}
                      className={`border-2 rounded-xl p-4 transition-all text-center ${
                        currentPipeType === "Ind2"
                          ? "border-blue-600 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-center gap-2">
                        Ind2 - Tung industri
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Kemisk industri
                      </div>
                      <div className="text-xs opacity-80 mt-1">15 l/min·m²</div>
                    </button>

                    <button
                      onClick={() => selectPipeType("Ind3")}
                      className={`border-2 rounded-xl p-4 transition-all text-center ${
                        currentPipeType === "Ind3"
                          ? "border-blue-600 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600"
                          : "bg-gray-50 border-gray-200 hover:border-blue-600 hover:shadow-sm hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="font-semibold text-sm flex items-center justify-center gap-2">
                        Ind3 - Hög risk
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Särskilt brandfarlig
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        20+ l/min·m²
                      </div>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                  {/* 1 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-tools"></i>
                      Rörmaterial
                    </label>
                    <select
                      id="manning-material"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="pvc_sdr41">
                        PVC SDR41 (n=0.011) - 125 SEK/m
                      </option>
                      <option value="pvc_sdr33">
                        PVC SDR33 (n=0.010) - 150 SEK/m
                      </option>
                      <option value="pe_sdr11">
                        PE SDR11 (n=0.010) - 180 SEK/m
                      </option>
                      <option value="pe_sdr17">
                        PE SDR17 (n=0.009) - 200 SEK/m
                      </option>
                      <option value="concrete_smooth">
                        Betong, slät (n=0.012) - 300 SEK/m
                      </option>
                      <option value="concrete_normal">
                        Betong, normal (n=0.015) - 280 SEK/m
                      </option>
                      <option value="steel_new">
                        Stål, nytt (n=0.012) - 400 SEK/m
                      </option>
                      <option value="steel_normal">
                        Stål, normalt (n=0.015) - 350 SEK/m
                      </option>
                      <option value="cast_iron_new">
                        Gjutjärn, nytt (n=0.013) - 500 SEK/m
                      </option>
                      <option value="ductile_iron">
                        Segjärn (n=0.012) - 450 SEK/m
                      </option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Manning-koefficient enligt svenska erfarenheter
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Godkänt intervall: n = 0.009-0.020
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-pipe"></i>
                      Rördiameter
                    </label>
                    <select
                      id="manning-diameter"
                      value={inputValues.manning.diameter}
                      onChange={(e) =>
                        handleInputChange("manning", "diameter", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="100">DN100 (100mm)</option>
                      <option value="125">DN125 (125mm)</option>
                      <option value="150">DN150 (150mm)</option>
                      <option value="200">DN200 (200mm)</option>
                      <option value="250">DN250 (250mm)</option>
                      <option value="300">DN300 (300mm)</option>
                      <option value="400">DN400 (400mm)</option>
                      <option value="500">DN500 (500mm)</option>
                      <option value="600">DN600 (600mm)</option>
                      <option value="800">DN800 (800mm)</option>
                      <option value="1000">DN1000 (1000mm)</option>
                      <option value="1200">DN1200 (1200mm)</option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Inre diameter enligt svenska standarder (DN-system)
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Tillåtet intervall: 100-3000 mm
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-chart-line"></i>
                      Lutning
                    </label>
                    <input
                      type="number"
                      id="manning-slope"
                      value={inputValues.manning.slope}
                      onChange={(e) =>
                        handleInputChange("manning", "slope", e.target.value)
                      }
                      min="2"
                      max="50"
                      step="1"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Rörledelningens fall i promille (‰)
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Enligt P110: Min 7‰ för spillvatten, 5‰ för dagvatten, max
                      50‰
                    </div>
                  </div>
                  {/* 4 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-fill-drip"></i>
                      Fyllnadsgrad
                    </label>
                    <input
                      type="number"
                      id="manning-fill"
                      value={inputValues.manning.fill_level}
                      onChange={(e) =>
                        handleInputChange(
                          "manning",
                          "fill_level",
                          e.target.value
                        )
                      }
                      min="10"
                      max="100"
                      step="5"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Vattennivån vid dimensionerande flöde
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Normalt: 50-85%, max 95% för dagvatten
                    </div>
                  </div>
                  {/* 5 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-thermometer-half"></i>
                      Vattentemperatur
                    </label>
                    <input
                      type="number"
                      id="manning-temp"
                      value={inputValues.manning.temperature}
                      onChange={(e) =>
                        handleInputChange(
                          "manning",
                          "temperature",
                          e.target.value
                        )
                      }
                      min="0"
                      max="35"
                      step="1"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Påverkar viskositet och Reynolds-tal
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Normalt: 4-25°C, max 35°C
                    </div>
                  </div>
                  {/* 6 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-ruler"></i>
                      Ledningslängd
                    </label>
                    <input
                      type="number"
                      id="manning-length"
                      value={inputValues.manning.length}
                      onChange={(e) =>
                        handleInputChange("manning", "length", e.target.value)
                      }
                      min="1"
                      max="5000"
                      step="1"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Total ledningslängd för beräkning
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Praktiskt intervall: 1-5000 m
                    </div>
                  </div>
                  {/* 7 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-thermometer-half"></i>
                      Vattentemperatur
                    </label>
                    <input
                      type="number"
                      id="manning-temp"
                      value={inputValues.manning.temperature}
                      onChange={(e) =>
                        handleInputChange(
                          "manning",
                          "temperature",
                          e.target.value
                        )
                      }
                      min="0"
                      max="35"
                      step="1"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Påverkar viskositet och Reynolds-tal
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Normalt: 4-25°C, max 35°C
                    </div>
                  </div>
                  {/* 8 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-ruler"></i>
                      Ledningslängd
                    </label>
                    <input
                      type="number"
                      id="manning-length"
                      value={inputValues.manning.length}
                      onChange={(e) =>
                        handleInputChange("manning", "length", e.target.value)
                      }
                      min="1"
                      max="5000"
                      step="1"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Total ledningslängd för beräkning
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Praktiskt intervall: 1-5000 m
                    </div>
                  </div>
                </div>

                {/* <div className="rounded-lg p-4 mb-6 font-mono text-sm bg-blue-50 border border-blue-300">
                  <h5 className="text-blue-700 mb-3 font-semibold flex items-center gap-2">
                    <i className="fas fa-info-circle"></i>
                    Bretting-formeln (verifierad)
                  </h5>
                  <p className="mb-3 text-blue-400 text-md">
                    <strong>
                      Q = K × (1/n) × A × R^(2/3) × S^(1/2) × f(T) × f(v)
                    </strong>
                  </p>
                  <p className="text-gray-600 mb-3">
                    Modifierad Manning-formel med svenska korrigeringar.
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="text-gray-800">
                      <strong className="text-blue-700">
                        Temperaturkorrektion:
                      </strong>{" "}
                      f(T) = (μ₁₀/μₜ)^0.14
                    </div>
                    <div className="text-gray-800">
                      <strong className="text-blue-700">
                        Viskositetskorrektion:
                      </strong>{" "}
                      f(v) = (ν₂₀/νₜ)^0.08
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-300 rounded-lg p-3 mt-4">
                    <div className="flex items-center gap-2 text-green-700 font-medium">
                      <i className="fas fa-check-circle"></i>
                      <span>
                        Kalibrerad enligt Svenskt Vatten P110 och svenska
                        klimatdata
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            )}

            {currentMethod === "Avancerad" && (
              <div className="bg-white rounded-xl p-6 shadow-lg mb-5 border ">
                <div className="rounded-xl p-5 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600">
                  <h4 className="text-blue-600 mb-3 flex items-center gap-2 text-lg font-semibold">
                    <i class="fas fa-chart-line"></i>
                    Avancerad brandvattenanalys
                  </h4>
                  <p className="text-gray-600 text-lg  mb-4">
                    Detaljerade beräkningar med hänsyn till ledningsförluster,
                    samtidighetsfaktorer och reservsystem.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
                  {/* 1 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-tools"></i>
                      Rörmaterial
                    </label>
                    <select
                      id="manning-material"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="pvc_sdr41">
                        PVC SDR41 (n=0.011) - 125 SEK/m
                      </option>
                      <option value="pvc_sdr33">
                        PVC SDR33 (n=0.010) - 150 SEK/m
                      </option>
                      <option value="pe_sdr11">
                        PE SDR11 (n=0.010) - 180 SEK/m
                      </option>
                      <option value="pe_sdr17">
                        PE SDR17 (n=0.009) - 200 SEK/m
                      </option>
                      <option value="concrete_smooth">
                        Betong, slät (n=0.012) - 300 SEK/m
                      </option>
                      <option value="concrete_normal">
                        Betong, normal (n=0.015) - 280 SEK/m
                      </option>
                      <option value="steel_new">
                        Stål, nytt (n=0.012) - 400 SEK/m
                      </option>
                      <option value="steel_normal">
                        Stål, normalt (n=0.015) - 350 SEK/m
                      </option>
                      <option value="cast_iron_new">
                        Gjutjärn, nytt (n=0.013) - 500 SEK/m
                      </option>
                      <option value="ductile_iron">
                        Segjärn (n=0.012) - 450 SEK/m
                      </option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Manning-koefficient enligt svenska erfarenheter
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Godkänt intervall: n = 0.009-0.020
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-pipe"></i>
                      Rördiameter
                    </label>
                    <select
                      id="manning-diameter"
                      value={inputValues.manning.diameter}
                      onChange={(e) =>
                        handleInputChange("manning", "diameter", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="100">DN100 (100mm)</option>
                      <option value="125">DN125 (125mm)</option>
                      <option value="150">DN150 (150mm)</option>
                      <option value="200">DN200 (200mm)</option>
                      <option value="250">DN250 (250mm)</option>
                      <option value="300">DN300 (300mm)</option>
                      <option value="400">DN400 (400mm)</option>
                      <option value="500">DN500 (500mm)</option>
                      <option value="600">DN600 (600mm)</option>
                      <option value="800">DN800 (800mm)</option>
                      <option value="1000">DN1000 (1000mm)</option>
                      <option value="1200">DN1200 (1200mm)</option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Inre diameter enligt svenska standarder (DN-system)
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Tillåtet intervall: 100-3000 mm
                    </div>
                  </div>
                  {/* 3 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-chart-line"></i>
                      Lutning
                    </label>
                    <input
                      type="number"
                      id="manning-slope"
                      value={inputValues.manning.slope}
                      onChange={(e) =>
                        handleInputChange("manning", "slope", e.target.value)
                      }
                      min="2"
                      max="50"
                      step="1"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Rörledelningens fall i promille (‰)
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Enligt P110: Min 7‰ för spillvatten, 5‰ för dagvatten, max
                      50‰
                    </div>
                  </div>
                  {/* 4 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-fill-drip"></i>
                      Fyllnadsgrad
                    </label>
                    <input
                      type="number"
                      id="manning-fill"
                      value={inputValues.manning.fill_level}
                      onChange={(e) =>
                        handleInputChange(
                          "manning",
                          "fill_level",
                          e.target.value
                        )
                      }
                      min="10"
                      max="100"
                      step="5"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    />
                    <div className="text-xs text-gray-600 mt-1">
                      Vattennivån vid dimensionerande flöde
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Normalt: 50-85%, max 95% för dagvatten
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentMethod === "Pumpstation" && (
              <div className="bg-white rounded-xl p-6 shadow-lg mb-5 border ">
                <div className="rounded-xl p-5 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600">
                  <h4 className="text-blue-600 mb-3 flex items-center gap-2 text-lg font-semibold">
                    <i class="fas fa-cog"></i>
                    Brandvattenpumpstation enligt P83
                  </h4>
                  <p className="text-gray-600 text-lg  mb-4">
                    Dimensionering av pumpar, reservsystem och tryckstyrning
                    enligt svenska brandskyddsstandard.{" "}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mb-6">
                  {/* 1 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-tools"></i>
                      Pumpkonfiguration
                    </label>
                    <select
                      id="manning-material"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="pvc_sdr41">
                        PVC SDR41 (n=0.011) - 125 SEK/m
                      </option>
                      <option value="pvc_sdr33">
                        PVC SDR33 (n=0.010) - 150 SEK/m
                      </option>
                      <option value="pe_sdr11">
                        PE SDR11 (n=0.010) - 180 SEK/m
                      </option>
                      <option value="pe_sdr17">
                        PE SDR17 (n=0.009) - 200 SEK/m
                      </option>
                      <option value="concrete_smooth">
                        Betong, slät (n=0.012) - 300 SEK/m
                      </option>
                      <option value="concrete_normal">
                        Betong, normal (n=0.015) - 280 SEK/m
                      </option>
                      <option value="steel_new">
                        Stål, nytt (n=0.012) - 400 SEK/m
                      </option>
                      <option value="steel_normal">
                        Stål, normalt (n=0.015) - 350 SEK/m
                      </option>
                      <option value="cast_iron_new">
                        Gjutjärn, nytt (n=0.013) - 500 SEK/m
                      </option>
                      <option value="ductile_iron">
                        Segjärn (n=0.012) - 450 SEK/m
                      </option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Manning-koefficient enligt svenska erfarenheter
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Godkänt intervall: n = 0.009-0.020
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-pipe"></i>
                      Pumpverkningsgrad (%)
                    </label>
                    <select
                      id="manning-diameter"
                      value={inputValues.manning.diameter}
                      onChange={(e) =>
                        handleInputChange("manning", "diameter", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="100">DN100 (100mm)</option>
                      <option value="125">DN125 (125mm)</option>
                      <option value="150">DN150 (150mm)</option>
                      <option value="200">DN200 (200mm)</option>
                      <option value="250">DN250 (250mm)</option>
                      <option value="300">DN300 (300mm)</option>
                      <option value="400">DN400 (400mm)</option>
                      <option value="500">DN500 (500mm)</option>
                      <option value="600">DN600 (600mm)</option>
                      <option value="800">DN800 (800mm)</option>
                      <option value="1000">DN1000 (1000mm)</option>
                      <option value="1200">DN1200 (1200mm)</option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Inre diameter enligt svenska standarder (DN-system)
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Tillåtet intervall: 100-3000 mm
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentMethod === "Nätverksanalys" && (
              <div className="bg-white rounded-xl p-6 shadow-lg mb-5 border ">
                <div className="rounded-xl p-5 mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-blue-600">
                  <h4 className="text-blue-600 mb-3 flex items-center gap-2 text-lg font-semibold">
                    <i class="fas fa-cog"></i>
                    Brandvattenpumpstation enligt P83
                  </h4>
                  <p className="text-gray-600 text-lg  mb-4">
                    Dimensionering av pumpar, reservsystem och tryckstyrning
                    enligt svenska brandskyddsstandard.{" "}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2  gap-5 mb-6">
                  {/* 1 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-tools"></i>
                      Pumpkonfiguration
                    </label>
                    <select
                      id="manning-material"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="pvc_sdr41">
                        PVC SDR41 (n=0.011) - 125 SEK/m
                      </option>
                      <option value="pvc_sdr33">
                        PVC SDR33 (n=0.010) - 150 SEK/m
                      </option>
                      <option value="pe_sdr11">
                        PE SDR11 (n=0.010) - 180 SEK/m
                      </option>
                      <option value="pe_sdr17">
                        PE SDR17 (n=0.009) - 200 SEK/m
                      </option>
                      <option value="concrete_smooth">
                        Betong, slät (n=0.012) - 300 SEK/m
                      </option>
                      <option value="concrete_normal">
                        Betong, normal (n=0.015) - 280 SEK/m
                      </option>
                      <option value="steel_new">
                        Stål, nytt (n=0.012) - 400 SEK/m
                      </option>
                      <option value="steel_normal">
                        Stål, normalt (n=0.015) - 350 SEK/m
                      </option>
                      <option value="cast_iron_new">
                        Gjutjärn, nytt (n=0.013) - 500 SEK/m
                      </option>
                      <option value="ductile_iron">
                        Segjärn (n=0.012) - 450 SEK/m
                      </option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Manning-koefficient enligt svenska erfarenheter
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Godkänt intervall: n = 0.009-0.020
                    </div>
                  </div>
                  {/* 2 */}
                  <div className="bg-white border border-gray-200 rounded-xl p-4 transition-all hover:border-blue-400 hover:shadow-sm">
                    <label className="font-semibold mb-2 text-gray-800 flex items-center gap-2 text-sm">
                      <i className="fas fa-pipe"></i>
                      Pumpverkningsgrad (%)
                    </label>
                    <select
                      id="manning-diameter"
                      value={inputValues.manning.diameter}
                      onChange={(e) =>
                        handleInputChange("manning", "diameter", e.target.value)
                      }
                      className="w-full p-3 border-2 border-gray-200 rounded-lg text-sm transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="100">DN100 (100mm)</option>
                      <option value="125">DN125 (125mm)</option>
                      <option value="150">DN150 (150mm)</option>
                      <option value="200">DN200 (200mm)</option>
                      <option value="250">DN250 (250mm)</option>
                      <option value="300">DN300 (300mm)</option>
                      <option value="400">DN400 (400mm)</option>
                      <option value="500">DN500 (500mm)</option>
                      <option value="600">DN600 (600mm)</option>
                      <option value="800">DN800 (800mm)</option>
                      <option value="1000">DN1000 (1000mm)</option>
                      <option value="1200">DN1200 (1200mm)</option>
                    </select>
                    <div className="text-xs text-gray-600 mt-1">
                      Inre diameter enligt svenska standarder (DN-system)
                    </div>
                    <div className="text-xs text-blue-400 mt-1 font-medium">
                      Tillåtet intervall: 100-3000 mm
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowCalculationResults(true);
                  showNotification("Brandvattenberäkning genomförd enligt\nP83 standarder", "success");
                }}
                disabled={isCalculating}
                className="text-white px-4 py-2 rounded-xl font-semibold cursor-pointer transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md"
              >
                {isCalculating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Beräkna...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator"></i>
                    Beräkna brandvatten
                  </>
                )}
              </button>

              <button
                onClick={() => showNotification(`P83 validering genomförd för ${currentPipeType}. Alla krav uppfyllda!`, 'info')}
                disabled={isCalculating}
                className="px-4 py-2 rounded-xl font-semibold cursor-pointer transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 hover:border-blue-500 hover:border-[2px]  hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none bg-gray-50 text-gray-800 shadow-md border border-gray-300"
              >
                {isCalculating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    validering...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator"></i>
                    P83 validering
                  </>
                )}
              </button>

              <button
                onClick={() => showNotification(`Brandskyddsrapport genererad för ${currentPipeType}. Rapport klar för nedladdning!`, 'info')}
                disabled={isCalculating}
                className="px-4 py-2 rounded-xl font-semibold cursor-pointer transition-all inline-flex items-center gap-2 hover:-translate-y-0.5 hover:border-blue-500 hover:border-[2px]  hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none bg-gray-50 text-gray-800 shadow-md border border-gray-300"
              >
                {isCalculating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Brandskyddsrapport...
                  </>
                ) : (
                  <>
                    <i className="fas fa-calculator"></i>
                    Brandskyddsrapport
                  </>
                )}
              </button>
            </div>

            {/* Calculation Results Div */}
            {showCalculationResults && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 overflow-hidden">
                {/* Header Section */}
                <div className="bg-blue-50 px-6 py-4 border-l-4 border-blue-600">
                  <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2 mb-1">
                    <i className="fas fa-fire-extinguisher text-blue-600"></i>
                    Brandvattenresultat enligt P83
                  </h3>
                  <p className="text-sm text-gray-600">
                    Brandvattenberäkning för {currentPipeType} enligt P83
                  </p>
                </div>
                
                {/* Content Section */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Sprinklerflöde Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-center text-gray-700 mb-2 uppercase tracking-wide">
                        SPRINKLERFLÖDE
                      </h4>
                      <div className="flex items-baseline gap-1 justify-center  mb-3">
                        <span className="text-3xl font-bold text-blue-600">8.3</span>
                        <span className="text-sm text-gray-500">l/s</span>
                      </div>
                      <div className="bg-green-100 rounded-3xl text-center px-2 py-1">
                        <span className="text-xs font-medium text-green-700">
                          Godkänd enligt P83
                        </span>
                      </div>
                    </div>

                    {/* Brandpostflöde Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-center text-gray-700 mb-2 uppercase tracking-wide">
                        BRANDPOSTFLÖDE
                      </h4>
                      <div className="flex items-baseline gap-1 justify-center  mb-3">
                        <span className="text-3xl font-bold text-blue-600">40</span>
                        <span className="text-sm text-gray-500">l/s</span>
                      </div>
                      <div className="bg-green-100 rounded-3xl text-center px-2 py-1">
                        <span className="text-xs font-medium text-green-700">
                          Godkänd enligt P83
                        </span>
                      </div>
                    </div>

                    {/* Totalt Brandvattenflöde Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-center text-gray-700 mb-2 uppercase tracking-wide">
                        TOTALT BRANDVATTENFLÖDE
                      </h4>
                      <div className="flex items-baseline gap-1 justify-center  mb-3">
                        <span className="text-3xl font-bold text-blue-600">48.3</span>
                        <span className="text-sm text-gray-500">l/s</span>
                      </div>
                      <div className="bg-green-100 rounded-3xl text-center px-2 py-1">
                        <span className="text-xs font-medium text-green-700">
                          Godkänd enligt P83
                        </span>
                      </div>
                    </div>

                    {/* Magasinsvolym Card */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h4 className="text-sm font-semibold text-center text-gray-700 mb-2 uppercase tracking-wide">
                        MAGASINSVOLYM
                      </h4>
                      <div className="flex items-baseline gap-1 justify-center  mb-3">
                        <span className="text-3xl font-bold text-blue-600">174</span>
                        <span className="text-sm text-gray-500">m³</span>
                      </div>
                      <div className="bg-green-100 rounded-3xl text-center px-2 py-1">
                        <span className="text-xs font-medium text-green-700">
                          Godkänd enligt P83
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
    </>
  );
}
