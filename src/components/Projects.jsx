import { Link } from "react-router-dom";

export default function Projects({ user, onLogout }) {
  const projects = [
    {
      id: 1,
      name: "Malmö Centrum Vattenledning",
      status: "Aktiv",
      progress: 75,
      startDate: "2024-01-15",
      endDate: "2024-06-30",
      description: "Uppgradering av vattenledningssystem i centrala Malmö"
    },
    {
      id: 2,
      name: "Göteborg Avlopp Renovering",
      status: "Planering",
      progress: 25,
      startDate: "2024-03-01",
      endDate: "2024-12-31",
      description: "Renovering av avloppssystem i Göteborgs hamn"
    },
    {
      id: 3,
      name: "Stockholm Dagvatten System",
      status: "Aktiv",
      progress: 60,
      startDate: "2024-02-01",
      endDate: "2024-08-15",
      description: "Nya dagvattenhanteringssystem för Stockholm"
    },
    {
      id: 4,
      name: "Uppsala Pumpstation",
      status: "Slutförd",
      progress: 100,
      startDate: "2023-09-01",
      endDate: "2024-01-31",
      description: "Ny pumpstation för Uppsala kommun"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktiv': return 'bg-green-100 text-green-800';
      case 'Planering': return 'bg-yellow-100 text-yellow-800';
      case 'Slutförd': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <h1 className="text-3xl font-bold text-gray-900">Projekt</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                + Nytt Projekt
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-3">{project.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Start: {project.startDate}</span>
                        <span>Slut: {project.endDate}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Framsteg</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Öppna Projekt
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Redigera
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                      Rapporter
                    </button>
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
