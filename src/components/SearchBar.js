import React from "react";
import { useState } from "react";

export default function SearchBar({ elements, renderSearchResults }) {
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = () => {
    console.log(searchResults);
  };

  const handleTyping = (e) => {
    const filteredElements = elements.filter((element) => {
      return element.phrase
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    if (e.target.value != "") {
      if (filteredElements.length > 0) {
        renderSearchResults(filteredElements);
        setSearchResults(filteredElements);
        return;
      } else {
        setSearchResults([
          {
            phrase: "No results found",
            category: "N/A",
            definition: "N/A",
            example: "N/A",
            id: 1337,
          },
        ]);
        renderSearchResults([
          {
            phrase: "No results found",
            category: "N/A",
            definition: "N/A",
            example: "N/A",
            id: 1337,
          },
        ]);
        return;
      }
    } else {
      renderSearchResults([]);
      setSearchResults([]);
    }
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        onChange={handleTyping}
        placeholder="Search for an idiom"
      />
    </div>
  );
}
