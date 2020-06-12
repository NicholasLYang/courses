export interface ISection {
  registrationNumber: number;
  sectionCode: string;
  instructors: Array<string>;
  type: string;
  status: string;
  meetings: Array<IMeeting>;
  recitations: Array<ISection> | null;
  location: string;
  description: string;
  name: string;
  notes: string;
  minUnits: number;
  maxUnits: number;
}

export interface IMeeting {
  beginDate: Date;
  minutesDuration: number;
  endDate: Date;
}

export interface ICourse {
  name: string;
  deptCourseId: string;
  subjectCode: { code: string; school: string };
  sections: Array<ISection>;
}

export enum LoadingState {
  Loading,
  Success,
  Failed
}

export enum RequirementType {
  Or,
  And,
  Choose,
  One
}

export type IRequirement =
  | { type: RequirementType.One; name: string }
  | {
      type: RequirementType.And | RequirementType.Or;
      args: Array<IRequirement>;
    }
  | {
      type: RequirementType.Choose;
      num: number;
      args: Array<IRequirement>;
    };
