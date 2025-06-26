import type { Vulnerability } from '../types/vulnerability';

export function parseScanResults(rawData: any): Vulnerability[] {
  if (!rawData || !Array.isArray(rawData.Results)) return [];
  return rawData.Results.flatMap((result: any) =>
    Array.isArray(result.Vulnerabilities)
      ? result.Vulnerabilities.map((vuln: any) => {
          const { VulnerabilityID, Severity, PkgName, InstalledVersion } = vuln;
          return {
            cveId: VulnerabilityID,
            severity: Severity,
            package: PkgName,
            version: InstalledVersion,
            actions: 'Dismiss',
          };
        })
      : []
  );
} 