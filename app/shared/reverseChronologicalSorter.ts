export function reverseChronologicalSorter(
  a: { date?: string },
  b: { date?: string }
) {
  const now = Date.now();
  return new Date(b.date || now).getTime() - new Date(a.date || now).getTime();
}
