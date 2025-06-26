import { useState, useEffect } from 'react';
import { parseScanResults } from '../utils/parseScanResults';
import type { Vulnerability } from '../types/vulnerability';
import { fetchCisaKevCatalog } from '../services/cisaKevService';

export function useVulnerabilities() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [scanRes, kevData] = await Promise.all([
          fetch('/scan-results.json').then(res => {
            if (!res.ok) throw new Error('Failed to fetch scan results');
            return res.json();
          }),
          fetchCisaKevCatalog(),
        ]);
        const kevSet = new Set(kevData.map(v => v.cveID));
        setVulnerabilities(
          parseScanResults(scanRes).map(vuln => ({
            ...vuln,
            exploited: kevSet.has(vuln.cveId),
          }))
        );
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { vulnerabilities, loading, error };
}