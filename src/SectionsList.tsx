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
    <div>
      {sections.map(
        ({
          type,
          instructors,
          status,
          meetings,
          recitations,
          location,
          sectionName,
          sectionCode
        }) => (
          <Section
            key={sectionCode}
            type={type}
            instructors={instructors}
            status={status}
            meetings={meetings}
            recitations={recitations}
            location={location}
            sectionName={sectionName}
          />
        )
      )}
    </div>
  );
};

export default SectionsList;
