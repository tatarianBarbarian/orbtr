export function calculateSpheresRotations(itemsCount: number, level?: number): number[] {
  const gap = 180 / itemsCount
  const result = [...Array.from({ length: itemsCount })].fill(0) as number[]

  result.forEach((_item, index) => {
    if (index === 0) {
      result[index] = -90 + gap / 2

      if (level === 1 && result.length === 1) {
        // Move spheres from date label on 1st level
        result[index] = -7
      }

      return
    }

    let position = result[index - 1] + gap

    const isLeftInCenter = position <= 0 && position >= -5
    const isRightInCenter = position >= 0 && position <= 5

    // Move spheres from date label on 1st level

    if (level === 1) {
      if (isLeftInCenter) {
        position = -7
      } else if (isRightInCenter) {
        position = 7
      }
    }

    result[index] = position
  })

  return result
}
