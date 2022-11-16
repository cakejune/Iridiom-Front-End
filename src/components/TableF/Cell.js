import React, { useState } from "react";

export default function Cell({ element, handleClick }) {



  function handleEvent() {
    handleClick(element)
  }

  return (
    <>
      <div
        className={`elementCategory ${handleClick ? "grow " : " "}` + element.category}
        onClick={handleEvent}
      >
        <div className="elNumber">{element.elNum}</div>
        <div className="elAbbr">{element.abbr}</div>
        
      </div>
    </>
  );
}
