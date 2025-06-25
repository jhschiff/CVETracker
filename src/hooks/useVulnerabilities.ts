import { useState, useEffect } from 'react';
import { parseScanResults } from '../utils/parseScanResults';
import type { Vulnerability } from '../types/vulnerability';
import { fetchCisaKevCatalog } from '../services/cisaKevService';

export function useVulnerabilities() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/scan-results.json');
        if (!res.ok) throw new Error('Failed to fetch scan results');
        const data = await res.json();
        const kevSet = await fetchCisaKevCatalog();
        const parsed = parseScanResults(data).map(vuln => {
          const alreadyExploited = vuln.exploited === true;
          return {
            ...vuln,
            exploited: alreadyExploited || kevSet.has(vuln.cveId),
          };
        });
        setVulnerabilities(parsed);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { vulnerabilities, loading, error };
}