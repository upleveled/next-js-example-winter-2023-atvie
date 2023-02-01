// more robust way to get items from localStorage
export function getLocalStorage(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return undefined;
  }
}

// more robust way to set items to localStorage
export function setLocalStorage(key, value) {
  // if we are in the browser
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}
