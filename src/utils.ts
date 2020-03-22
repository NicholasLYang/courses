export function getOrKey(key: string, obj: { [s: string]: string }): string {
  if (key in obj) {
    return obj[key];
  }
  return key;
}

export const delay = (time: number) =>
  new Promise(resolve => setTimeout(resolve, time));

export function fixCredit(minUnits: number, maxUnits: number) : string {
  if(minUnits > 0) {
    return `${minUnits} - ${maxUnits}`
  }
  return `${maxUnits}`;
}

export function fixLocation(location: string): string {
  return location
    .replace("Room:", "Room: ")
    .replace("Bldg:COLU", "Columbia University");
}

const coreClasses = new Set([
  "csci-ua-101",
  "csci-ua-102",
  "csci-ua-201",
  "csci-ua-202",
  "csci-ua-310"
]);

export function findCoreReqs(
  schoolCode: string,
  subjectCode: string,
  deptCourseId: string
): boolean {
  return coreClasses.has(
    `${subjectCode.toLowerCase()}-${schoolCode.toLowerCase()}-${deptCourseId}`
  );
}
