export function instanceHasSetter (obj, property) {
  return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj), property)
}
