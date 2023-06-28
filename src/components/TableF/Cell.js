import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function Cell({ element, handleClick, searched }) {

  // Event handler for when the cell is clicked
  function handleEvent() {
    handleClick(element);
    console.log(searched)
  }
  // Function to determine the CSS class name of the cell
  function renderClassName()
  {
    return "elementCategory " + 
    (handleClick ? "grow " : " ") + // If handleClick prop is provided, apply the "grow" class
    (searched ? element.category : "notSearched") // If the cell is searched, apply the idiom's category as the class name, otherwise apply "notSearched" class
  }

  return (
    <>
      <OverlayTrigger
        key={element.id}
        placement="top"
        overlay={
          <Tooltip id={`tooltip-top`}>
            <strong>{element.phrase}</strong>
          </Tooltip>
        }
      >
        <div
          className={renderClassName()}
          onClick={handleEvent}
        >
          <div className="elNumber">{element.elNum}</div>
          <div className="elAbbr">{element.abbr}</div>
        </div>
      </OverlayTrigger>
    </>
  );
}
