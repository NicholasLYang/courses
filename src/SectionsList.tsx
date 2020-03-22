/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import Section from "./Section";
import { ISection } from "./types";

interface Props {
  sections: Array<ISection>;
  displayDescription: boolean;
  displayNotes: boolean;
}

interface Rec {
  recitations : Array<ISection> | null;
}

const RecitationList : React.FC<Rec> = ({
  recitations  
}) => {
  if(!recitations) {
    return(<div></div>)
  } 
  return(
    <div>
        {recitations.map((recitation, i) => (
          <div css={{ padding: "10px" }} key={recitation.registrationNumber}>
            <Section isOdd={!!(i % 2)} {...recitation} />
          </div>
        ))}
    </div>
  )
}
const SectionsList: React.FC<Props> = ({
  sections,
  displayDescription,
  displayNotes
}) => {
  return (
    <div>
      {sections.map((section, i) => (
        <div css={{ padding: "10px" }} key={section.registrationNumber}>
          <Section isOdd={!!(i % 2)} {...section} />
          <RecitationList recitations = {section.recitations} />
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
