import React from "react";
import { useState } from "react";

export default function SearchBar({ elements, renderSearchResults }) {
  const [searchResults, setSearchResults] = useState([]);

  // Event handler for form submission (not currently used)
  const handleSubmit = () => {
    console.log(searchResults);
  };

  // Event handler for typing in the search bar
  const handleTyping = (e) => {
    // Filter the elements based on the search phrase
    const filteredElements = elements.filter((element) => {
      return element.phrase
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    // If there is a search phrase
    if (e.target.value != "") {
      // If there are filtered elements matching the search
      if (filteredElements.length > 0) {
        renderSearchResults(filteredElements); // Render the search results in the parent component
        setSearchResults(filteredElements); // Update the search results state
        return;
      } else {
        // If no results found
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
      // If search bar is empty
      renderSearchResults([]); // Clear the search results in the parent component, which will return color to all cells
      setSearchResults([]); // Clear the search results state
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
