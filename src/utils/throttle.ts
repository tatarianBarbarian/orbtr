export function throttle(callback: Function, delay: number) {
  let lastCall = 0
  return function (...args: unknown[]) {
    const now = new Date().getTime()
    if (now - lastCall >= delay) {
      callback(...args)
      lastCall = now
    }
  }
}
