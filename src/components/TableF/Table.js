import React, { useEffect, useState } from "react";
import Element from "./Element";

export default function Table({ elements }) {

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <td>Header</td>
            <td>Header</td>
            <td>Header</td>
            <td>Header</td>
            <td>Header</td>
            <td>Header</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {elements.map((element) => {
              return <Element key={element.id} element={element} />;
            })}
          </tr>
          <tr>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
