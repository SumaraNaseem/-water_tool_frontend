import React, { useState } from "react";

export default function UsersContent() {
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDisablePopup, setShowDisablePopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    {
      id: "Erik Lindqvist",
      name: "Erik Lindqvist",
      email: "erik.lindqvist@company.se",
      role: "Projektledare",
      status: "Aktiv",
      lastLogin: "2025-08-25 14:30"
    },
    {
      id: "Anna Bergström",
      name: "Anna Bergström", 
      email: "anna.bergstrom@company.se",
      role: "Vatten- och avloppsingenjör",
      status: "Aktiv",
      lastLogin: "2025-08-25 09:15"
    },
    {
      id: "Lisa Andersson",
      name: "Lisa Andersson",
      email: "lisa.andersson@company.se", 
      role: "Tekniker",
      status: "Väntar på aktivering",
      lastLogin: "Never"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktiv': return 'bg-green-100 text-green-800';
      case 'Väntar på aktivering': return 'bg-orange-100 text-orange-800';
      default: return 'bg-red-100 text-red-800';
    }
  };

  const handleAddUser = () => {
    setShowAddUserPopup(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditPopup(true);
  };

  const handleDisable = (user) => {
    setSelectedUser(user);
    setShowDisablePopup(true);
  };

  const handleActivate = (user) => {
    setSelectedUser(user);
    setShowDisablePopup(true);
  };

  const closePopups = () => {
    setShowAddUserPopup(false);
    setShowEditPopup(false);
    setShowDisablePopup(false);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Användarhantering</h1>
        </div>
        <button 
          onClick={handleAddUser}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <i className="fas fa-user-plus"></i>
           Lägg till användare
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px] ">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-green-400 rounded-lg flex items-center justify-center ">
              <i className="fas fa-users text-white text-2xl"></i>
            </div>
            <div>
            <p className="text-2xl font-bold text-gray-900 mb-3">89</p>
            <p className="text-md text-gray-600 ">Totalt antal användare</p>
             
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px] ">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-purple-400 rounded-lg flex items-center justify-center ">
              <i className="fas fa-user-check text-white text-2xl"></i>
            </div>
            <div>
            <p className="text-2xl font-bold text-gray-900 mb-3">67</p>
            <p className="text-md text-gray-600">Aktiva användare</p>
              
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[120px] ">
          <div className="space-y-4">
            <div className="w-14 h-14 bg-orange-400 rounded-lg flex items-center justify-center ">
              <i className="fas fa-shield-alt text-white text-2xl"></i>
            </div>
            <div>
            <p className="text-2xl font-bold text-gray-900 mb-3">12</p>
            <p className="text-md text-gray-600">Administratörer</p>
              
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Användare</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Senast inloggad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Åtgärder</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-12 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-gray-700">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div> */}
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="text-gray-600 bg-gray-50 hover:text-gray-900 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                      >
                        Redigera
                      </button>
                      {user.status === 'Väntar på aktivering' ? (
                        <button 
                          onClick={() => handleActivate(user)}
                          className="bg-blue-600 text-white  px-3 py-1 rounded  hover:bg-blue-400"
                        >
                          Aktivera
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleDisable(user)}
                          className="text-gray-600 bg-gray-50 hover:text-gray-900 px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
                        >
                          Inaktivera
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {showAddUserPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Denna sida säger</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ange användarnamn:
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              placeholder="Ange användarnamn"
            />
            
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closePopups}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Avbryt
              </button>
              <button
                onClick={closePopups}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      
      {showEditPopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Denna sida säger</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Redigerar användarinformation för: {selectedUser.name.toLowerCase().split(' ')[0]}
            </label>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closePopups}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

     
      {showDisablePopup && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg mx-auto w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Denna sida säger</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {selectedUser.status === 'Väntar på aktivering' 
                ? `Aktiverar användare: ${selectedUser.name.toLowerCase().split(' ')[0]}`
                : `Inaktiverar användare: ${selectedUser.name.toLowerCase().split(' ')[0]}`
              }
            </label>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closePopups}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  
    
  );
}

