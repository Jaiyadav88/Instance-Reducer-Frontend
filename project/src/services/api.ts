import { Application, SealData } from '../types';

const BASE_URL = 'http://localhost:8080';

export const apiService = {
  /**
   * Fetch applications by sealId via POST
   */
  async getApplicationsBySealId(sealId: string): Promise<SealData> {
    const response = await fetch(`${BASE_URL}/getapp`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sealId }),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
    return response.json();
  },

  /**
   * Stop instances of an application via POST
   */
  async stopInstances(params: { applicationId: string; count: number }): Promise<void> {
    const response = await fetch(`${BASE_URL}/stopInstances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }
  },
};
