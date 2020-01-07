import React from "react";
import Section from "./Section";
import { ISection } from "./types";

interface Props {
  sections: Array<ISection>;
}

const SectionsList: React.FC<Props> = ({ sections }) => {
  return (
    <ul>
      {sections.map(({ type, instructor, status, meetings, recitations }) => (
        <Section
          type={type}
          instructor={instructor}
          status={status}
          meetings={meetings}
          recitations={recitations}
        />
      ))}
    </ul>
  );
};

export default SectionsList;
