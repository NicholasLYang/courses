/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import Section from "./Section";
import { ISection } from "./types";

interface Props {
  sections: Array<ISection>;
}

const SectionsList: React.FC<Props> = ({ sections }) => {
  return (
    <div css={{ padding: "20px" }}>
      {sections.map(
        ({
          type,
          instructors,
          status,
          meetings,
          recitations,
          location,
          name,
          sectionCode,
          description,
          notes
        }) => (
          <Section
            key={sectionCode}
            type={type}
            instructors={instructors}
            status={status}
            meetings={meetings}
            description={description}
            location={location}
            name={name}
            notes={notes}
          />
        )
      )}
    </div>
  );
};

export default SectionsList;
