import axios from 'axios';

/**
 * Fetches all CISA Known Exploited Vulnerabilities (KEV) in a single request.
 * Returns an array of vulnerabilities: [{ cveID: ... }, ...]
 *
 * Usage: const vulns = await fetchCisaKevCatalog();
 */
export async function fetchCisaKevCatalog(): Promise<Array<{ cveID: string }>> {
  const url = `/kev?page=1&per_page=2000`;
  try {
    const response = await axios.get(url);
    // If the data is wrapped in a property (e.g., response.data.vulnerabilities)
    if (Array.isArray(response.data.vulnerabilities)) {
      return response.data.vulnerabilities.filter((item: { cveID: string }) => typeof item.cveID === 'string');
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch CISA KEV catalog:', error);
    return [];
  }
} 