import React, { useEffect, useState } from "react";
import Element from "./Element";

export default function Table({elements}) {
  

  return (
    <div className="App">
      {elements.map((element)=>{
       return <Element key={element.id} element={element}/>
      })}
    </div>
  );
}
