import React from "react";

export default function TagInEquation({tag}) {
  return (
    <div>
      <button className="chemistry">
        {tag.charAt(0).toUpperCase()}
        <sub>{Math.floor(Math.random() * 10)}</sub>
        {tag.charAt(tag.length - 1).toUpperCase()}
        <sub>{Math.floor(Math.random() * 10)}</sub>
      </button>{" "}
      +
    </div>
  );
}
