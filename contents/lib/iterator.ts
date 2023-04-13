export type CustomIterator<T> = {
  [Symbol.iterator](): CustomIterator<T>
  hasNext(): boolean
  next(): CustomIteratorResult<T>
  current(): CustomIteratorResult<T>
  back(): CustomIteratorResult<T>
}

type CustomIteratorResult<T> = {
  value: T
  done: boolean
}

export const makeCustomIterator = <T>(array: T[]): CustomIterator<T> => {
  // TODO 0始まりにしたい
  let index = -1

  return {
    [Symbol.iterator]() {
      return this
    },
    hasNext: function () {
      return index + 1 < array.length
    },
    next: function () {
      if (index + 1 < array.length) {
        return { value: array[++index], done: false }
      } else {
        return { value: undefined, done: true }
      }
    },
    current: function () {
      return { value: array[index], done: false }
    },
    back: function () {
      if (index > 0) {
        return { value: array[--index], done: false }
      } else {
        return { value: array[index], done: false }
      }
    }
  }
}
