export type ObjType = { [key: string]: string | number };

export function getValidProperties<T>(obj: T): Partial<T> {
  const validObj: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key]) {
        validObj[key] = obj[key];
      }
    }
  }

  return validObj;
}
