import React from "react";

export default function TagInEquation({tag, handleTagInEquationClick}) {

function handleClickEq(e){
  handleTagInEquationClick(e.target.name);
}

  return (
      <button className="inEquation" onClick={handleClickEq} name={tag}>
        {tag.charAt(0).toUpperCase()}
        <sub>{Math.floor((Math.random() * 10)+1)}</sub>
        {tag.charAt(tag.length - 1).toUpperCase()}
        <sub>{Math.floor(Math.random() * 10)}</sub>
      </button>
  );
}
