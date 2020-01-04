/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import React from "react";
import { statusMap } from "./constants";
import { IMeeting, ISection } from "./App";

interface Props {
  type: string;
  instructor: string;
  status: string;
  meetings: Array<IMeeting>;
  recitations: null | Array<ISection>;
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
  instructor,
  status,
  meetings
}) => {
  const meetingDateTimes = [];
  const meetingDays: string[] = [];
  const meetingTimes: string[] = [];
  meetings.forEach(m => {
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
          width: "80vw",
          justifyContent: "space-evenly",
          padding: "10px"
        }}
      >
        <div css={{ color: getStatusColor(status), width: "10%" }}>
          {getStatusName(status)}{" "}
        </div>
        <div css={{ width: "25%" }}>{instructor} </div>
        <div css={{ width: "10%" }}> {meetingDays.join("\t")} </div>
        <div css={{ width: "40%", display: "flex", flexDirection: "column" }}>
          {meetingTimes.map(time => (
            <div> {time} </div>
          ))}
        </div>
      </div>
      {recitations && (
        <ul
          css={{
            paddingLeft: "40px",
            backgroundColor: "#d9d9d9",
            width: "60vw"
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
