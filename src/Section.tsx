/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import React from "react";
import { IMeeting, ISection } from "./types";
import { fixLocation, fixCredit } from "./utils";

interface Props {
  type: string;
  instructors: Array<string>;
  status: string;
  meetings: Array<IMeeting>;
  location: string;
  name: string;
  notes: string;
  recitations: Array<ISection> | null;
  minUnits: number;
  maxUnits: number;
  isOdd: boolean;
  instructionMode: string;
}

function getStatusColor(status: string): string {
  switch (status) {
    case "WaitList":
      return "orange";
    case "Open":
      return "green";
    case "Closed":
      return "red";
    default:
      return "black";
  }
}

function getSectionColor(isOdd: boolean, instructionType: string): string {
  if (instructionType.includes("Blended")) {
    return "#7d7dff";
  }
  if (instructionType.includes("In-Person")) {
    return "#ff0099";
  }
  if (isOdd) {
    return "#dfdfdf";
  }
  return "#efefef";
}

const styles = {
  Section: (isOdd: boolean, instructionType: string) =>
    ({
      display: "flex",
      flexDirection: "column",
      backgroundColor: getSectionColor(isOdd, instructionType)
    } as const),
  row: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    wordWrap: "break-word",
    padding: "10px",
    "@media(max-width: 700px)": {
      flexDirection: "column",
      paddingLeft: "30px"
    }
  },
  status: (status: string) => ({
    width: "20px",
    height: "20px",
    margin: "10px",
    borderRadius: "50%",
    backgroundColor: getStatusColor(status)
  })
} as const;

const Section: React.FC<Props> = ({
  type,
  instructors,
  status,
  meetings,
  location,
  name,
  minUnits,
  maxUnits,
  isOdd,
  instructionMode
}) => {
  const meetingDateTimes = [];
  const meetingDays: string[] = [];
  const meetingTimes: string[] = [];
  meetings?.forEach(m => {
    const dateTime = moment.utc(m.beginDate);
    meetingDateTimes.push(dateTime);
    meetingDays.push(dateTime.format("ddd"));
    const endTime = dateTime.clone().add(m.minutesDuration, "minutes");
    meetingTimes.push(
      `${dateTime.format("h:mm A")}-${endTime.format("h:mm A")}`
    );
  });
  return (
    <div css={styles.Section(isOdd, instructionMode)}>
      <div css={styles.row}>
        <div css={styles.status(status)} />
        {name && (
          <div
            css={{
              width: "75px",
              padding: "20px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            {name}
          </div>
        )}
        <div
          css={{
            display: "flex",
            width: "65px",
            flexDirection: "column",
            padding: "5px"
          }}
        >
          <div> {instructors.join(", ")} </div>
        </div>
        <div
          css={{
            display: "flex",
            width: "80px",
            flexDirection: "column",
            padding: "5px"
          }}
        >
          <div> {type} </div>
        </div>
        <div css={{ width: "10px", maxWidth: "50vw", padding: "5px" }}>
          {" "}
          {fixCredit(minUnits, maxUnits)}
        </div>
        <div css={{ width: "100px", maxWidth: "40vw", padding: "5px" }}>
          {" "}
          {fixLocation(location)}{" "}
        </div>
        <div css={{ width: "50px", padding: "5px" }}>
          {meetingDays.join("\t")}{" "}
        </div>
        <div
          css={{
            display: "flex",
            flexDirection: "column",
            width: "100px",
            padding: "5px"
          }}
        >
          {meetingTimes.map((time, i) => (
            <div key={i}> {time} </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
