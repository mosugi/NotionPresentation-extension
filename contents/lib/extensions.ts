export {}

declare global {
  interface Array<T> {
    last(): T
  }
}

Array.prototype.last = function () {
  return this.slice(-1)[0]
}
