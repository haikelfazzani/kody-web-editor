
export default function useLocalStorage (codeStr = '') {
  const rcsCode = localStorage.getItem('rcscode')
  if (rcsCode) {
    return rcsCode
  }
  else {
    localStorage.setItem('rcscode', codeStr)
  }
}