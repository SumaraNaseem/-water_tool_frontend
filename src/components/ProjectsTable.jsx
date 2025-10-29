import React, { useState } from "react";

function ProjectsTable() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const projects = [
    {
      id: "Malmö",
      name: "Malmö Centrum VA-utbyggnad",
      type: "Hydraulisk analys",
      status: "Aktiv",
      statusColor: "bg-green-200 text-green-800",
      lastUpdated: "2025-08-25 14:30",
      responsible: "Erik Lindqvist"
    },
    {
      id: "Stockholm",
      name: "Stockholm Dagvatten",
      type: "Dagvatten",
      status: "Pågående",
      statusColor: "bg-orange-200 text-amber-500",
      lastUpdated: "2025-08-24 09:15",
      responsible: "Anna Bergström"
    },
    {
      id: "Göteborg",
      name: "Göteborg Projektkalkyl",
      type: "Projektkalkyl",
      status: "Slutförd",
      statusColor: "bg-blue-200 text-blue-800",
      lastUpdated: "2025-08-23 16:45",
      responsible: "Marcus Johansson"
    }
  ];

  const handleView = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
    setShowViewPopup(true);
  };

  const handleEdit = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
    setShowEditPopup(true);
  };

  const closePopups = () => {
    setShowViewPopup(false);
    setShowEditPopup(false);
    setSelectedProject(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="grid grid-cols-6 gap-4 px-6 py-4">
          <div className="text-sm font-semibold text-gray-700">Projektnamn</div>
          <div className="text-sm font-semibold text-gray-700">Typ</div>
          <div className="text-sm font-semibold text-gray-700">Status</div>
          <div className="text-sm font-semibold text-gray-700">Senast uppdaterad</div>
          <div className="text-sm font-semibold text-gray-700">Ansvarig</div>
          <div className="text-sm font-semibold text-gray-700">Åtgärder</div>
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-200">
        {projects.map((project) => (
          <div key={project.id} className="grid grid-cols-6 gap-4 px-6 py-8 hover:bg-gray-50 transition-colors duration-200">
            {/* Projektnamn */}
            <div className="text-sm font-medium text-gray-900">
              {project.name}
            </div>

            {/* Typ */}
            <div className="text-sm text-gray-700">
              {project.type}
            </div>

            {/* Status */}
            <div>
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${project.statusColor}`}>
                {project.status}
              </span>
            </div>

            {/* Senast uppdaterad */}
            <div className="text-sm text-gray-700">
              {project.lastUpdated}
            </div>

            {/* Ansvarig */}
            <div className="text-sm text-gray-700">
              {project.responsible}
            </div>

            {/* Åtgärder */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleView(project.id)}
                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Visa
              </button>
              <button
                onClick={() => handleEdit(project.id)}
                className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors duration-200"
              >
                Redigera
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View Project Popup */}
      {showViewPopup && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50  z-50 ">
          
        <div className=" p-6 bg-white rounded-lg shadow-xl  max-w-lg mx-auto w-full  ">
          
            <h2 className="text-2xl font-bold text-gray-800 mb-6">This page says</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visar projekt: {selectedProject.id}</label>
          
          
          
          
          <div className="mt-6 flex justify-end ">
            
            <button
              onClick={closePopups}
              className=" border-2 border-blue-600 p-[2px] rounded-3xl"
            >
              <div className="flex items-center px-5 py-2 bg-blue-700 text-white rounded-3xl hover:bg-blue-700 transition-colors  ">
                
                
              
              OK
              </div>
            </button>
          </div>
        </div>
      
    </div>
      )}

      {/* Edit Project Popup */}
      {showEditPopup && selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50  z-50 ">
          
            <div className=" p-6 bg-white rounded-lg shadow-xl  max-w-lg mx-auto w-full  ">
              
                <h2 className="text-2xl font-bold text-gray-800 mb-6">This page says</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redigerar projekt: {selectedProject.id}</label>
              
              
              
              
              <div className="mt-6 flex justify-end ">
                
                <button
                  onClick={closePopups}
                  className=" border-2 border-blue-600 p-[2px] rounded-3xl"
                >
                  <div className="flex items-center px-5 py-2 bg-blue-700 text-white rounded-3xl hover:bg-blue-700 transition-colors  ">
                    
                    
                  
                  OK
                  </div>
                </button>
              </div>
            </div>
          
        </div>
      )}
    </div>
  );
}

export default ProjectsTable;
