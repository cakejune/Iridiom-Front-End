import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import ElementModal from "./ElementModal";
import { Button, Spinner } from "react-bootstrap";
import IdiomCategoryKey from "./IdiomCategoryKey";
//import constants from constants.js
import { first_page, second_page, third_page } from "../../constants.js";

export default function TableGrid({ elements, searchResults }) {
  // State to track which page of elements to display.
  const [element_page, setElementPage] = useState(0);
  // State to control the visibility of the ElementModal.
  const [show, setShow] = useState(false);

  // Divide elements into pages.
  const page1 = elements?.slice(0, 118);
  const page2 = elements?.slice(118, 172);
  const pages = [page1, page2];

  // Function to switch to the next page.
  const increasePage = () => {
    setElementPage(1);
  };
  // Function to switch to the previous page.
  const decreasePage = () => {
    setElementPage(0);
  };

  // State to store the selected element.
  const [selectedElement, setSelectedElement] = useState([]);

  // Function to close the ElementModal.
  const handleClose = () => setShow(false);
  // Function to show the ElementModal.
  const handleShow = () => setShow(true);

  // Function to generate a lookup table for the elements based on their coordinates.
  const getLookupTable = (element_page) => {
    let newTable = {};
    for (const el of pages[element_page]) {
      newTable[el.xy] = el;
    }
    return newTable;
  };

  // Function to check if an element should be highlighted based on search results.
  const checkIfSearched = (element) => {
    if (searchResults === undefined) {
      return false;
    }
    if (searchResults.length === 0) {
      return true;
    } //if there are no search results, then all elements should be searched

    if (searchResults.includes(element)) {
      return true;
    } else {
      return false;
    }
  };

  // Function to render a single element on the table grid.
  function renderElement(element, coordinate) {
    if (!element) {
      return <div className="notRow" key={coordinate}></div>;
    } else {
      return (
        <Cell
          searched={checkIfSearched(element)}
          element={element}
          key={coordinate}
          handleClick={handleElementClick}
        />
      );
    }
  }
  // Function to handle click on an element.
  async function handleElementClick(element) {
    setSelectedElement(element);
    setShow(true);
  }

  // Function to render the table grid.
  function render() {
    const table = getLookupTable(element_page);
    const components = [];
    const width = 18;
    const height = 9;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const coordinate = `${x},${y}`;
        const element = table[coordinate];
        components.push(renderElement(element, coordinate));
      }
    }
    return components;
  }

  return (
    <>
      {/* ElementModal component */}
      <ElementModal
        element={selectedElement}
        show={show}
        handleClose={handleClose}
      />

      {/* Table Grid Container */}
      <div
        className="tableGridContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Arrow to switch to previous page */}
        <p onClick={decreasePage}>
          <i className={element_page === 1 ? "arrow left" : null}></i>
        </p>
        {/* Table Grid */}
        <div className="tableGrid">{render()}</div>
        {/* Arrow to switch to next page */}
        <p onClick={increasePage}>
          <i className={element_page === 0 ? "arrow right" : null}></i>
        </p>
      </div>
    </>
  );
}
