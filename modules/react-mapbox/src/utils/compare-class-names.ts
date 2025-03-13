/** Compare two classNames string and return the difference */
export function compareClassNames(
  prevClassName: string | undefined,
  nextClassName: string | undefined
): string[] | null {
  if (prevClassName === nextClassName) {
    return null;
  }

  const prevClassList = getClassList(prevClassName);
  const nextClassList = getClassList(nextClassName);
  const diff: string[] = [];

  for (const c of nextClassList) {
    if (!prevClassList.has(c)) {
      diff.push(c);
    }
  }
  for (const c of prevClassList) {
    if (!nextClassList.has(c)) {
      diff.push(c);
    }
  }
  return diff.length === 0 ? null : diff;
}

function getClassList(className: string | undefined) {
  return new Set(className ? className.trim().split(/\s+/) : []);
}
