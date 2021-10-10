export const frameSlideIndex = (i: number | string, LIMIT: number): number => {
  const idx = Number(i)
  if (isNaN(idx)) return 0
  if (idx < 0) return 0
  if (idx >= LIMIT) return LIMIT - 1
  return idx
}
