/**
 * Fetches all CISA Known Exploited Vulnerabilities (KEV) in a single request.
 * Returns an array of vulnerabilities: [{ cveID: ... }, ...]
 *
 * Usage: const vulns = await fetchCisaKevCatalog();
 */
export async function fetchCisaKevCatalog(): Promise<Array<{ cveID: string }>> {
  const url = 'https://cvetracker.onrender.com/kev';
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch CISA KEV catalog');
    const data = await response.json();
    if (data && typeof data.vulnerabilities === 'object' && data.vulnerabilities !== null) {
      // Flatten all arrays from each chunk
      const allVulns = (Object.values(data.vulnerabilities).flat()) as Array<{ cveID?: unknown }>;
      return allVulns.filter((item) => typeof item.cveID === 'string') as Array<{ cveID: string }>;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch CISA KEV catalog:', error);
    return [];
  }
} 