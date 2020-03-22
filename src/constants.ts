/*
  Constant for API_URL, course and subject names,
  handling odd data
*/
export const API_URL = "https://schedge.torchnyu.com";

export const weirdCourseNames: { [s: string]: string } = {
  "Intro to Computer SCI": "Intro to Computer Science",
  "Computer Systems Org": "Computer Systems Organization",
  "Topics of General Interest:":
    "Topics of General Interest: Drawing on the Web",
  "Spec Tpcs in Prog Lang:": "Special Topics in Programming Languages",
  "Quantitative Reasoning: Prob,Stats & Decisn-Mkng":
    "Quantitative Reasoning: Probability, Statistics & Decision-Making",
  "Expressive Culture: Tpcs": "Expressive Culture: Topics",
  "Expressive Cult: Images": "Expressive Culture: Images",
  "Honors Analy of Algo": "Honors Analysis of Algorithms"
};

export const weirdSubjectNames: { [s: string]: string } = {
  "Child/Adoles Mental Hlth Stds": "Child/Adolescent Mental Health Studies",
  "European and Mediterranean Stu": "European and Mediterranean Studies",
  "Latin Amer-Caribbean Studies": "Latin American-Caribbean Studies",
  "Ctr for Art, Society & Pub Pol": "Center for Art, Society & Public Policy"
};

export const statusMap: { [s: string]: string } = {
  WaitList: "Wait List"
};

export const STOPS_COUNT = 6;
