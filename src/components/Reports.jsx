import { Link } from "react-router-dom";

export default function Reports({ user, onLogout }) {
  const reports = [
    {
      id: 1,
      name: "Månadsrapport - Mars 2024",
      type: "Månadsrapport",
      status: "Slutförd",
      createdDate: "2024-04-01",
      size: "2.4 MB",
      description: "Månatlig sammanfattning av systemaktivitet och prestanda"
    },
    {
      id: 2,
      name: "Hydraulisk Analys - Malmö Centrum",
      type: "Teknisk Rapport",
      status: "Slutförd",
      createdDate: "2024-03-28",
      size: "5.7 MB",
      description: "Detaljerad hydraulisk analys av vattenledningssystem"
    },
    {
      id: 3,
      name: "Säkerhetsaudit Q1 2024",
      type: "Säkerhetsrapport",
      status: "Under granskning",
      createdDate: "2024-03-25",
      size: "1.8 MB",
      description: "Kvartalsvis säkerhetsgranskning av systemet"
    },
    {
      id: 4,
      name: "Användaraktivitet - Februari 2024",
      type: "Användarrapport",
      status: "Slutförd",
      createdDate: "2024-03-01",
      size: "3.2 MB",
      description: "Analys av användaraktivitet och systemanvändning"
    },
    {
      id: 5,
      name: "Projektstatus - Göteborg Avlopp",
      type: "Projektrapport",
      status: "Utkast",
      createdDate: "2024-03-30",
      size: "4.1 MB",
      description: "Aktuell status för Göteborg avloppsrenovering"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Slutförd': return 'bg-green-100 text-green-800';
      case 'Under granskning': return 'bg-yellow-100 text-yellow-800';
      case 'Utkast': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Månadsrapport': return '📊';
      case 'Teknisk Rapport': return '🔧';
      case 'Säkerhetsrapport': return '🔒';
      case 'Användarrapport': return '👥';
      case 'Projektrapport': return '📁';
      default: return '📄';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-semibold">
                ← Tillbaka till Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Inloggad som: {user?.email || 'Admin'}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Logga ut
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Rapporter</h1>
              <div className="flex gap-3">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  + Skapa Rapport
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                  Exportera Alla
                </button>
              </div>
            </div>
            
            {/* Filter and Search */}
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Sök rapporter..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Alla typer</option>
                <option>Månadsrapport</option>
                <option>Teknisk Rapport</option>
                <option>Säkerhetsrapport</option>
                <option>Användarrapport</option>
                <option>Projektrapport</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Alla status</option>
                <option>Slutförd</option>
                <option>Under granskning</option>
                <option>Utkast</option>
              </select>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {reports.map((report) => (
                <div key={report.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl">{getTypeIcon(report.type)}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{report.name}</h3>
                        <p className="text-gray-600 mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Typ: {report.type}</span>
                          <span>Skapad: {report.createdDate}</span>
                          <span>Storlek: {report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                          Visa
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                          Ladda ner
                        </button>
                        <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                          Dela
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
