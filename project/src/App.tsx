import React, { useState } from 'react';
import { Search, Database, Settings, Trash2, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface Application {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
}

interface Pool {
  id: string;
  name: string;
  type: 'manual' | 'automatic';
  status: 'running' | 'stopped' | 'error';
  size: string;
  lastModified: string;
}

function App() {
  const [sealId, setSealId] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [pools, setPools] = useState<Pool[]>([]);
  const [selectedPools, setSelectedPools] = useState<Set<string>>(new Set());
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isLoadingPools, setIsLoadingPools] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate API call to get applications
  const fetchApplications = async () => {
    if (!sealId.trim()) return;
    
    setIsLoadingApplications(true);
    setApplications([]);
    setSelectedApplication(null);
    setPools([]);
    setSelectedPools(new Set());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Mock data
    const mockApplications: Application[] = [
      { id: '1', name: 'E-Commerce Platform', status: 'active', createdAt: '2024-01-15' },
      { id: '2', name: 'Analytics Dashboard', status: 'active', createdAt: '2024-01-20' },
      { id: '3', name: 'User Management System', status: 'pending', createdAt: '2024-01-25' },
      { id: '4', name: 'Payment Gateway', status: 'inactive', createdAt: '2024-01-30' },
    ];
    
    setApplications(mockApplications);
    setIsLoadingApplications(false);
  };

  // Simulate API call to get pool details
  const fetchPoolDetails = async (application: Application) => {
    setIsLoadingPools(true);
    setSelectedApplication(application);
    setPools([]);
    setSelectedPools(new Set());
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock data
    const mockPools: Pool[] = [
      { id: '1', name: 'Production Pool', type: 'automatic', status: 'running', size: '2.4 GB', lastModified: '2024-02-01 10:30' },
      { id: '2', name: 'Staging Pool', type: 'manual', status: 'running', size: '1.8 GB', lastModified: '2024-02-01 09:15' },
      { id: '3', name: 'Development Pool', type: 'manual', status: 'stopped', size: '950 MB', lastModified: '2024-01-31 16:45' },
      { id: '4', name: 'Testing Pool', type: 'automatic', status: 'error', size: '1.2 GB', lastModified: '2024-01-31 14:20' },
      { id: '5', name: 'Backup Pool', type: 'automatic', status: 'running', size: '3.1 GB', lastModified: '2024-02-01 08:00' },
    ];
    
    setPools(mockPools);
    setIsLoadingPools(false);
  };

  const togglePoolSelection = (poolId: string) => {
    const newSelection = new Set(selectedPools);
    if (newSelection.has(poolId)) {
      newSelection.delete(poolId);
    } else {
      newSelection.add(poolId);
    }
    setSelectedPools(newSelection);
  };

  const selectAllPools = () => {
    if (selectedPools.size === pools.length) {
      setSelectedPools(new Set());
    } else {
      setSelectedPools(new Set(pools.map(pool => pool.id)));
    }
  };

  const performAction = async (action: 'manual' | 'automatic') => {
    if (selectedPools.size === 0) return;
    
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Remove selected pools from the list
    setPools(prev => prev.filter(pool => !selectedPools.has(pool.id)));
    setSelectedPools(new Set());
    setIsProcessing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return 'text-emerald-600 bg-emerald-50';
      case 'pending':
        return 'text-amber-600 bg-amber-50';
      case 'inactive':
      case 'stopped':
        return 'text-gray-600 bg-gray-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'running':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <RefreshCw className="w-4 h-4" />;
      case 'inactive':
      case 'stopped':
        return <AlertCircle className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Pool Management Dashboard</h1>
                <p className="text-sm text-gray-600">Manage your seal applications and pools</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Settings className="w-4 h-4" />
              <span>System Status: Online</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Seal ID Input Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label htmlFor="sealId" className="block text-sm font-medium text-gray-700 mb-2">
                Seal ID
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="sealId"
                  value={sealId}
                  onChange={(e) => setSealId(e.target.value)}
                  placeholder="Enter seal ID to fetch applications..."
                  className="w-full px-4 py-3 pl-10 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>
            <button
              onClick={fetchApplications}
              disabled={!sealId.trim() || isLoadingApplications}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2 mt-7"
            >
              {isLoadingApplications ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              <span>{isLoadingApplications ? 'Searching...' : 'Fetch Applications'}</span>
            </button>
          </div>
        </div>

        {/* Applications List */}
        {(applications.length > 0 || isLoadingApplications) && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Applications</h2>
            {isLoadingApplications ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading applications...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    onClick={() => fetchPoolDetails(app)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      selectedApplication?.id === app.id
                        ? 'border-blue-500 bg-blue-50/50'
                        : 'border-gray-200 bg-white/50 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{app.name}</h3>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {getStatusIcon(app.status)}
                        <span className="capitalize">{app.status}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Created: {app.createdAt}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Pool Details Table */}
        {(pools.length > 0 || isLoadingPools) && selectedApplication && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Pool Details</h2>
                <p className="text-sm text-gray-600">Application: {selectedApplication.name}</p>
              </div>
              {pools.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={selectAllPools}
                    className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    {selectedPools.size === pools.length ? 'Deselect All' : 'Select All'}
                  </button>
                  <span className="text-sm text-gray-600">
                    {selectedPools.size} of {pools.length} selected
                  </span>
                </div>
              )}
            </div>

            {isLoadingPools ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Loading pool details...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Select</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Pool Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Last Modified</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pools.map((pool) => (
                        <tr
                          key={pool.id}
                          className={`border-b border-gray-100 hover:bg-white/50 transition-colors duration-150 ${
                            selectedPools.has(pool.id) ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <td className="py-3 px-4">
                            <input
                              type="checkbox"
                              checked={selectedPools.has(pool.id)}
                              onChange={() => togglePoolSelection(pool.id)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-900">{pool.name}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              pool.type === 'automatic' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {pool.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium w-fit ${getStatusColor(pool.status)}`}>
                              {getStatusIcon(pool.status)}
                              <span className="capitalize">{pool.status}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">{pool.size}</td>
                          <td className="py-3 px-4 text-gray-600">{pool.lastModified}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                {selectedPools.size > 0 && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>{selectedPools.size} pool{selectedPools.size !== 1 ? 's' : ''} selected</span>
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => performAction('manual')}
                          disabled={isProcessing}
                          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 flex items-center space-x-2"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Settings className="w-4 h-4" />
                          )}
                          <span>Manual Delete</span>
                        </button>
                        <button
                          onClick={() => performAction('automatic')}
                          disabled={isProcessing}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 flex items-center space-x-2"
                        >
                          {isProcessing ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          <span>Automatic Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;