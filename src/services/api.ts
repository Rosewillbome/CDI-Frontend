import { DroughtIndicator, MapData, DistrictData } from '../types/drought';

// API endpoints
const API_ENDPOINTS = {
  DROUGHT_DATA: '/api/drought-data',
  MAPS: '/api/maps',
  DISTRICTS: '/api/districts',
  INDICATORS: '/api/indicators',
};

// Fetch drought data with filters
export async function fetchDroughtData(params: {
  indicator?: DroughtIndicator;
  year?: number;
  month?: string;
  district?: string;
}): Promise<MapData> {
  const queryParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) queryParams.append(key, value.toString());
  });

  const response = await fetch(`${API_ENDPOINTS.DROUGHT_DATA}?${queryParams}`);
  if (!response.ok) throw new Error('Failed to fetch drought data');
  return response.json();
}

// Fetch district data
export async function fetchDistricts(): Promise<DistrictData[]> {
  const response = await fetch(API_ENDPOINTS.DISTRICTS);
  if (!response.ok) throw new Error('Failed to fetch districts');
  return response.json();
}

// Fetch map data for a specific period
export async function fetchMapData(year: number, month: string, indicator: DroughtIndicator): Promise<MapData> {
  const response = await fetch(
    `${API_ENDPOINTS.MAPS}/${year}/${month}/${indicator}`
  );
  if (!response.ok) throw new Error('Failed to fetch map data');
  return response.json();
}

// Download map
export async function downloadMap(year: number, month: string, indicator: DroughtIndicator): Promise<Blob> {
  const response = await fetch(
    `${API_ENDPOINTS.MAPS}/download/${year}/${month}/${indicator}`
  );
  if (!response.ok) throw new Error('Failed to download map');
  return response.blob();
}

// Fetch available indicators
export async function fetchIndicators(): Promise<DroughtIndicator[]> {
  const response = await fetch(API_ENDPOINTS.INDICATORS);
  if (!response.ok) throw new Error('Failed to fetch indicators');
  return response.json();
}