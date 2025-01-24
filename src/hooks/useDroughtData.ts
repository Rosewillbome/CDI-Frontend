import { useState, useEffect } from 'react';
import { DroughtIndicator, MapData, DroughtFilters } from '../types/drought';
import { fetchDroughtData } from '../services/api';

export function useDroughtData(filters: DroughtFilters) {
  const [data, setData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const result = await fetchDroughtData(filters);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [filters]);

  return { data, loading, error };
}