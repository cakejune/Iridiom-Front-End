import { render } from "@testing-library/react";
import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import ElementModal from "./ElementModal";
import { Button, Spinner } from "react-bootstrap";
import SearchResults from "../SearchResults/SearchResults";
import IdiomCategoryKey from "./IdiomCategoryKey";
//import constants from constants.js
import {first_page, second_page, third_page} from "../../constants.js"

export default function TableGrid({ elements, searchResults }) {
  
  const [element_page, setElementPage] = useState(0);
  const [show, setShow] = useState(false);
  const page1 = elements?.slice(0, 118);
  const page2 = elements?.slice(118, 172);
  const pages = [page1, page2];
  const increasePage = () => {
      setElementPage(1);
  }
  const decreasePage = () => {
      setElementPage(0);
  }
  // only save idioms between 119 and 172
  // There may be a case where page_1 and page_2 get duplicates of the same idioms
  const [selectedElement, setSelectedElement] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);




  const getLookupTable = (element_page) => {
    let newTable = {};
    for (const el of pages[element_page]) {
      newTable[el.xy] = el;
    }
    return newTable;
  };

  const checkIfSearched = (element) => {
    if (searchResults.length === 0) {
      return true;
    } //if there are no search results, then all elements should be searched

    if (searchResults.includes(element)) {
      return true;
    } else {
      return false;
    }
  };

  

  // const matchTableLocation = {
  //   '0,0':1,

  // }

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

  async function handleElementClick(element) {
      setSelectedElement(element);
      setShow(true);
  }

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
      <ElementModal
        element={selectedElement}
        show={show}
        handleClose={handleClose}
      />
      {/* <IdiomCategoryKey/> */}
      {/*make this div have a flex property */}
      <div
        className="tableGridContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <p onClick={decreasePage}><i className={element_page === 1 ? "arrow left" : null}></i></p>
        <div className="tableGrid">{render()}</div>
        <p onClick={increasePage}><i className={element_page === 0 ? "arrow right" : null}></i></p>
      </div>
    </>
  );
}
