/** @jsx jsx */
import { jsx } from "@emotion/core";
import moment from "moment";
import React, { useState } from "react";
import { statusMap } from "./constants";
import { IMeeting, ISection } from "./types";
import { fixLocation } from "./utils";

interface Props {
  type: string;
  instructors: Array<string>;
  status: string;
  meetings: Array<IMeeting>;
  description: string;
  location: string;
  name: string;
  notes: string;
  recitations: Array<ISection> | null;
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

const styles = {
  Section: {
    display: "flex",
    flexDirection: "column",
    "&:nth-child(odd)": {
      backgroundColor: "#dfdfdf"
    }
  },
  row: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    wordWrap: "break-word",
    padding: "10px",
    transition: "0.1s background-color",
    "@media(max-width: 700px)": {
      flexDirection: "column",
      paddingLeft: "30px"
    },
    "&:hover": {
      backgroundColor: "rgba(137,0,225,0.45)"
    }
  },
  status: (status: string) => ({
    padding: "10px",
    width: "80px",
    display: "flex",
    justifyContent: "center",
    color: getStatusColor(status)
  })
} as const;

const Section: React.FC<Props> = ({
  description,
  instructors,
  status,
  meetings,
  location,
  name,
  notes
}) => {
  const [showDescription, setShowDescription] = useState(false);
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
    <div css={styles.Section}>
      <div
        css={styles.row}
        onClick={() => setShowDescription(!showDescription)}
      >
        <div css={styles.status(status)}>{getStatusName(status)} </div>
        {name && (
          <div
            css={{
              width: "100px",
              padding: "5px",
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
            width: "120px",
            flexDirection: "column",
            padding: "5px"
          }}
        >
          {instructors.map(i => (
            <div key={i}> {i} </div>
          ))}
        </div>
        <div css={{ width: "200px", maxWidth: "50vw", padding: "5px" }}>
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
          {meetingTimes.map(time => (
            <div key={time}> {time} </div>
          ))}
        </div>
      </div>
      {showDescription && (
        <React.Fragment>
          <div css={{ padding: "20px", backgroundColor: "white" }}>
            {description}
          </div>
          <div css={{ padding: "20px", backgroundColor: "white" }}>{notes}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Section;
