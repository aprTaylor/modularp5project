export const forceArray = <T>(element: T) => {
  if(Array.isArray(element)) return element;
  else return [element];
}