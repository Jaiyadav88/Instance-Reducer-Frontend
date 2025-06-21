export interface Application {
  id: string;
  name: string;
  env: string;
  instances: number;
  last_updated: string;
  memory_usage: string;
  operationalstate: 'running' | 'stopped' | 'pending' | 'error';
  adminstate: 'enabled' | 'disabled' | 'maintenance';
  glb_routes: string[];
}

export interface SealData {
  sealId: string;
  applications: Application[];
}