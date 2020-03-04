export function getOrKey(key: string, obj: { [s: string]: string }): string {
  if (key in obj) {
    return obj[key];
  }
  return key;
}

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export function fixLocation(location: string): string {
  return location.replace("Room:", "Room: ");
}
