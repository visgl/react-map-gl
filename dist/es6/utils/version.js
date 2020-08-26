export function compareVersions(version1, version2) {
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
//# sourceMappingURL=version.js.map