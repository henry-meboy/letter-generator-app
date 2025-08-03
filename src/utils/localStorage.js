// src/utils/localStorage.js

/**
 * Save a new entry (object) into a localStorage array.
 * If the key doesn't exist, creates a new array.
 * @param {string} key - The localStorage key.
 * @param {*} value - The value to append.
 */
export const saveToLocalStorage = (key, value) => {
  try {
    const existing = JSON.parse(localStorage.getItem(key)) || []
    const updated = Array.isArray(existing) ? [...existing, value] : [value]
    localStorage.setItem(key, JSON.stringify(updated))
  } catch (err) {
    console.error('❌ Error saving to localStorage:', err)
  }
}

/**
 * Retrieve an array (or single object coerced to array) from localStorage.
 * @param {string} key - The localStorage key.
 * @returns {Array} - The stored array or empty array if none.
 */
export const getFromLocalStorage = (key) => {
  try {
    const data = JSON.parse(localStorage.getItem(key))
    if (!data) return []
    return Array.isArray(data) ? data : [data]
  } catch (err) {
    console.error('❌ Error reading from localStorage:', err)
    return []
  }
}

/**
 * Overwrite a localStorage key with a fresh array of values.
 * @param {string} key - The localStorage key.
 * @param {Array} valueArray - The array to store.
 */
export const overwriteLocalStorage = (key, valueArray) => {
  try {
    localStorage.setItem(key, JSON.stringify(valueArray))
  } catch (err) {
    console.error('❌ Error overwriting localStorage:', err)
  }
}

/**
 * Remove a specific key from localStorage.
 * @param {string} key - The localStorage key to remove.
 */
export const clearLocalStorageKey = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (err) {
    console.error('❌ Error removing localStorage key:', err)
  }
}

/**
 * Clear all data from localStorage. Use with caution.
 */
export const clearAllLocalStorage = () => {
  try {
    localStorage.clear()
  } catch (err) {
    console.error('❌ Error clearing all localStorage:', err)
  }
}
