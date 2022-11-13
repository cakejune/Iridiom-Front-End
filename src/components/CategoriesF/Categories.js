import React, { useState, useEffect } from "react";
import TagInEquation from "./TagInEquation";
import TagCard from "./TagCard";

export default function Categories({
  tagState,
  elements,
  filterElementsByTags,
}) {
  //TAGCARD PROPERTIES
  const [tagsInCard, setTagsInCard] = useState(tagState);
  const [tagsInEquation, setTagsInEquation] = useState(tagState);

  useEffect(() => {
    setTagsInCard(tagState);
    setTagsInEquation([]);
  }, [tagState]);

  function handleTagCardClick(clickedTag) {
    const updatedTagsInEquation = [...tagsInEquation, clickedTag];
    setTagsInEquation(updatedTagsInEquation);
    setTagsInCard([...tagsInCard].filter((t) => t != clickedTag));
    filterElementsByTags(updatedTagsInEquation);
  }

  function handleTagInEquationClick(clickedEquation) {
    const updatedTagsInEquation = tagsInEquation.filter((t) => t != clickedEquation)
    setTagsInCard([...tagsInCard, clickedEquation]);
    setTagsInEquation(updatedTagsInEquation);
    filterElementsByTags(updatedTagsInEquation);
  }

  return (
    <div className="categoryDiv">
      <div className="Categories">
        {tagsInCard.map((tag) => {
          return (
            <TagCard
              filterElementsByTags={filterElementsByTags}
              key={tag}
              tagName={tag}
              tagState={tagState}
              handleTagCardClick={handleTagCardClick}
            />
          );
        })}
      </div>

      <div>
        <Equation />
      </div>
    </div>
  );

  function Equation() {
    return (
      <div className="Equation">
        <h3>Equation Div</h3>

        {tagsInEquation.map((tag, i) => {
          return (
            <TagInEquation
              tag={tag.toString()}
              key={i}
              handleTagInEquationClick={handleTagInEquationClick}
            />
          );
        })}
        <span>⟶</span>
      </div>
    );
  }
}
