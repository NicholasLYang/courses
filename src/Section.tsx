/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import React from "react";
import { statusMap } from "./constants";
import { IMeeting, ISection } from "./types";
import { fixLocation } from "./utils";

interface Props {
  type: string;
  instructors: Array<string>;
  status: string;
  meetings: Array<IMeeting>;
  recitations: null | Array<ISection>;
  location: string;
  sectionName: string;
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

function getStatusName(status: string): string {
  if (status in statusMap) {
    return statusMap[status];
  }
  return status;
}

const Section: React.FC<Props> = ({
  recitations,
  instructors,
  status,
  meetings,
  location,
  sectionName
}) => {
  const meetingDateTimes = [];
  const meetingDays: string[] = [];
  const meetingTimes: string[] = [];
  meetings?.forEach(m => {
    const dateTime = moment.utc(m.beginDate);
    meetingDateTimes.push(dateTime);
    meetingDays.push(dateTime.format("ddd"));
    const endTime = dateTime.clone().add(m.duration, "minutes");
    meetingTimes.push(
      `${dateTime.format("h:mm A")}-${endTime.format("h:mm A")}`
    );
  });
  return (
    <div css={{ display: "flex", flexDirection: "column" }}>
      <div
        css={{
          display: "flex",
          maxWidth: "50vw",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          padding: "10px",
          "@media(max-width: 700px)": {
            flexDirection: "column"
          }
        }}
      >
        <div css={{ color: getStatusColor(status) }}>
          {getStatusName(status)}{" "}
        </div>
        <div css={{ width: "15%" }}>{sectionName}</div>
        <div css={{ display: "flex", width: "15%", flexDirection: "column" }}>
          {instructors.map(i => (
            <div> {i} </div>
          ))}
        </div>
        <div css={{ width: "20%" }}> {fixLocation(location)} </div>
        <div>{meetingDays.join("\t")} </div>
        <div css={{ display: "flex", flexDirection: "column" }}>
          {meetingTimes.map(time => (
            <div key={time}> {time} </div>
          ))}
        </div>
      </div>
      {recitations && (
        <ul
          css={{
            marginLeft: "40px",
            backgroundColor: "#d9d9d9",
            width: "50vw"
          }}
        >
          {recitations.map(r => (
            <Section {...r} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Section;
