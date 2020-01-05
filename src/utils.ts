export function getOrKey(key: string, obj: { [s: string]: string }): string {
  if (key in obj) {
    return obj[key];
  }
  return key;
}
