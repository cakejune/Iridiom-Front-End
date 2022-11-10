import React, { useState } from "react";
import TagInEquation from "./TagInEquation";

export default function Equation({ tagState }) {
  let tagsInEquationDiv = [...tagState].flat();
//   const [selectedTags, setSelectedTags] = useState([...tagState].flat());


  return (
    <div className="Equation">
      Equation Div
      {tagsInEquationDiv.map((tag, i) => {
        return <TagInEquation tag={tag} key={i} />;
      })}
    </div>
  );
}
