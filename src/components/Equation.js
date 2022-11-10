import React, { useEffect, useState } from "react";
import TagInEquation from "./TagInEquation";

export default function Equation({ tagState }) {
  let tagsInEquationDiv = [...tagState].flat();
  const [selectedTags, setSelectedTags] = useState([]);
  
  useEffect(() => {
    setSelectedTags(tagState);
  }, [tagState]);

  return (
    <div className="Equation">
      Equation Div
      {selectedTags.map((tag, i) => {
        return <TagInEquation tag={tag} key={i} />;
      })}
    </div>
  );
}
