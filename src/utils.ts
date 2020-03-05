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

export function parseSemester(
  semester: string
): { year: string; season: string } {
  switch (semester) {
    case "spring20":
      return { year: "2020", season: "sp" };
    case "fall20":
      return { year: "2020", season: "fa" };
    default:
      throw Error(`Unexpected semester ${semester}`);
  }
}
