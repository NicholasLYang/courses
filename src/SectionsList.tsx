import React from "react";
import Section from "./Section";
import { ISection } from "./types";

interface Props {
  sections: Array<ISection>;
}

const SectionsList: React.FC<Props> = ({ sections }) => {
  return (
    <ul>
      {sections.map(
        ({ type, instructors, status, meetings, recitations, location }) => (
          <Section
            type={type}
            instructors={instructors}
            status={status}
            meetings={meetings}
            recitations={recitations}
            location={location}
          />
        )
      )}
    </ul>
  );
};

export default SectionsList;
