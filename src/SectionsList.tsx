/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import Section from "./Section";
import { ISection } from "./types";

interface Props {
  sections: Array<ISection> | null; 
  displayDescription: boolean;
  displayNotes: boolean;
}

const SectionsList: React.FC<Props> = ({
  sections,
  displayDescription,
  displayNotes
}) => {
  if(!sections) {
    return(<div></div>)
  }
  return (
    <div>
      {sections.map((section, i) => (
        <div css={{ padding: "10px" }} key={section.registrationNumber}>
          <Section isOdd={!!(i % 2)} {...section} />
          <SectionsList 
            sections = {section.recitations} 
            displayDescription = {false}
            displayNotes={false}
          />
          {displayDescription && (
            <p>{section.description || "No description available"}</p>
          )}
          {displayNotes && <p> {section.notes}</p>}
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
