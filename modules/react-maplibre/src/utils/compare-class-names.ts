/** Compare two classNames string and return the difference */
export function compareClassNames(
  prevClassName: string | undefined,
  nextClassName: string | undefined
): [added: string[], removed: string[]] | null {
  if (prevClassName === nextClassName) {
    return null;
  }

  const prevClassList = getClassList(prevClassName);
  const nextClassList = getClassList(nextClassName);
  const added: string[] = [];
  const removed: string[] = [];

  for (const c of prevClassList) {
    if (!nextClassList.has(c)) {
      removed.push(c);
    }
  }

  if (removed.length === 0 && prevClassList.size === nextClassList.size) {
    return null;
  }

  for (const c of nextClassList) {
    if (!prevClassList.has(c)) {
      added.push(c);
    }
  }

  return [added, removed];
}

function getClassList(className: string | undefined) {
  return new Set(className ? className.trim().split(/\s+/) : []);
}
