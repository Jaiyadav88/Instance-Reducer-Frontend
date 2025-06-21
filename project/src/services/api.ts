import { Application, SealData } from '../types';

// Mock API service - replace with actual API calls
export const apiService = {
  async getApplicationsBySealId(sealId: string): Promise<SealData> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    const mockApplications: Application[] = [
      {
        id: '1',
        name: 'user-service',
        env: 'production',
        instances: 3,
        last_updated: '2025-01-02T10:30:00Z',
        memory_usage: '2.4 GB',
        operationalstate: 'running',
        adminstate: 'enabled',
        glb_routes: ['/api/users', '/api/auth']
      },
      {
        id: '2',
        name: 'payment-service',
        env: 'production',
        instances: 2,
        last_updated: '2025-01-02T09:15:00Z',
        memory_usage: '1.8 GB',
        operationalstate: 'running',
        adminstate: 'enabled',
        glb_routes: ['/api/payments', '/api/billing']
      },
      {
        id: '3',
        name: 'notification-service',
        env: 'staging',
        instances: 1,
        last_updated: '2025-01-01T14:45:00Z',
        memory_usage: '0.9 GB',
        operationalstate: 'pending',
        adminstate: 'maintenance',
        glb_routes: ['/api/notifications']
      },
      {
        id: '4',
        name: 'analytics-service',
        env: 'development',
        instances: 1,
        last_updated: '2025-01-02T08:22:00Z',
        memory_usage: '3.1 GB',
        operationalstate: 'error',
        adminstate: 'disabled',
        glb_routes: ['/api/analytics', '/api/reports']
      }
    ];

    return {
      sealId,
      applications: mockApplications
    };
  }
};