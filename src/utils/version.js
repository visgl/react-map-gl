// @flow

// Helper function for version comparison
// A version is a string in the format of "{major}.{minor}.{patch}"
// Empty/missing version is treated as "0.0.0"
// If version1 is smaller than version2, return -1
// If version1 is larger than version2, return 1
// If equal, return 0
export function compareVersions(version1: string, version2: string): number {
  const v1 = (version1 || '').split('.').map(Number);
  const v2 = (version2 || '').split('.').map(Number);

  for (let i = 0; i < 3; i++) {
    const part1 = v1[i] || 0;
    const part2 = v2[i] || 0;
    if (part1 < part2) {
      return -1;
    }
    if (part1 > part2) {
      return 1;
    }
  }

  return 0;
}
