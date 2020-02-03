export function withDefault<T> (obj: T | undefined | null, _default: T) {
  if(obj === undefined || obj === null) return _default;
  else return obj;
}


export function onEach<T> (obj: T, fn: (key: string) => void) {
  Object
    .keys(obj)
    .forEach(key => fn(key))
}