import axios from 'axios';

/**
 * Fetches the CISA Known Exploited Vulnerabilities (KEV) Catalog as a Set of CVE IDs.
 * This allows efficient checking if a vulnerability is known to be actively exploited.
 *
 * Usage: const kevSet = await fetchCisaKevCatalog(); kevSet.has('CVE-2023-1234')
 */
export async function fetchCisaKevCatalog(): Promise<Set<string>> {
  const url = 'https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json';
  try {
    const response = await axios.get(url);
    // The vulnerabilities are in response.data.vulnerabilities or response.data (array)
    let kevList: any[] = [];
    if (Array.isArray(response.data)) {
      kevList = response.data;
    } else if (Array.isArray(response.data.vulnerabilities)) {
      kevList = response.data.vulnerabilities;
    } else if (Array.isArray(response.data.Known_Exploited_Vulnerabilities)) {
      kevList = response.data.Known_Exploited_Vulnerabilities;
    }
    // Each entry should have a CVE ID field, usually 'cveID' or 'cveId' or 'cve'
    const cveSet = new Set<string>();
    kevList.forEach((item) => {
      const cve = item.cveID || item.cveId || item.cve;
      if (typeof cve === 'string') {
        cveSet.add(cve);
      }
    });
    return cveSet;
  } catch (error) {
    console.error('Failed to fetch CISA KEV catalog:', error);
    return new Set();
  }
} 