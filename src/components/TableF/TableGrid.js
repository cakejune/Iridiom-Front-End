import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import ElementGrid from "./ElementGrid";

export default function TableGrid({ elements }) {
  
  const getLookupTable = () => {
    let newTable = {};
    for (const el of elements) {
      newTable[el.xy] = el;
    }
   return newTable;
  }
 
  // const matchTableLocation = {
  //   '0,0':1,

  // }

  function renderElement(element, coordinate) {
    if (!element) {
      return <div className="notRow" key={coordinate}></div>;
    } else {
      return <ElementGrid element={element} key={coordinate}/>;
    }

  }

  function render() {
    const table = getLookupTable();
    const components = [];
    const width = 18;
    const height = 9;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const coordinate = `${x},${y}`
        const element = table[coordinate];
        components.push(renderElement(element, coordinate));
      }
    }
    return components;
  }


  return (
    <>
  <div className="tableGrid">{render()}</div>
  
  </>
  )
}




