// Drought severity levels and ranges
export type DroughtSeverityLevel = {
  label: string;
  range: string;
  color: string;
};

export const DROUGHT_SEVERITY_LEVELS: DroughtSeverityLevel[] = [
  { label: '> 1.0 No Drought', range: '> 1.0', color: '#E3F2FD' },
  { label: 'Moderate', range: '0.8 - 0.6', color: '#90CAF9' },
  { label: 'Moderate', range: '< 0.8 - 0.6', color: '#42A5F5' },
  { label: 'Severe', range: '0.6 - 0.4', color: '#1E88E5' },
  { label: 'Extreme', range: '< 0.4', color: '#1565C0' },
];

// Indicator types
export type DroughtIndicator = 'CDI' | 'PDI' | 'TDI';

// Map data structure
export interface MapData {
  id: string;
  year: number;
  month: string;
  indicator: DroughtIndicator;
  districts: DistrictData[];
}

export interface DistrictData {
  id: string;
  name: string;
  severityLevel: DroughtSeverityLevel;
  value: number;
}

// Filter types
export interface DroughtFilters {
  indicator?: DroughtIndicator;
  yearRange?: { start: number; end: number };
  year?: number;
  month?: string;
  district?: string;
}