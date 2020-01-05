export function withDefault<T> (obj: T | undefined | null, _default: T) {
  if(obj === undefined || obj === null) return _default;
  else return obj;
}