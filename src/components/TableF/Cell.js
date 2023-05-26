import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export default function Cell({ element, handleClick, searched }) {
  function handleEvent() {
    handleClick(element);
    console.log(searched)
  }

  function renderClassName()
  {
    return "elementCategory " + 
    (handleClick ? "grow " : " ") +
    (searched ? element.category : "notSearched")
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
