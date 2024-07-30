export function timeSleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
