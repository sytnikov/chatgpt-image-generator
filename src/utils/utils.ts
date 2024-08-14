export function isChromeExtension() {
  // eslint-disable-next-line no-undef
  return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id
}

export function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}