import type { Vulnerability } from '../types/vulnerability';
import { Severity } from '../types/severity';

function toSeverityEnum(sev: any): Severity {
  if (!sev || typeof sev !== 'string') return Severity.UNKNOWN;
  switch (sev.toLowerCase()) {
    case 'critical': return Severity.CRITICAL;
    case 'high': return Severity.HIGH;
    case 'medium': return Severity.MEDIUM;
    case 'low': return Severity.LOW;
    default: return Severity.UNKNOWN;
  }
}

export function parseScanResults(rawData: any): Vulnerability[] {
  if (!rawData || !Array.isArray(rawData.Results)) return [];
  return rawData.Results.flatMap((result: any) =>
    Array.isArray(result.Vulnerabilities)
      ? result.Vulnerabilities.map((vuln: any) => {
          const { VulnerabilityID, Severity: Sev, PkgName, InstalledVersion, FixedVersion } = vuln;
          return {
            cveId: VulnerabilityID,
            severity: toSeverityEnum(Sev),
            package: PkgName,
            installed: InstalledVersion,
            fixed: FixedVersion,
            actions: 'Dismiss',
          };
        })
      : []
  );
} 