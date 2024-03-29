import React from "react";
import { useState } from "react";

export default function SearchBar({elements, renderSearchResults}){

    const [searchResults, setSearchResults] = useState([]);

    const handleSubmit = () => {
        console.log(searchResults);
    }

    const handleTyping = (e) => {
        const filteredElements = elements.filter((element) => {
            console.log(e.target.value)
          return element.phrase.toLowerCase().includes(e.target.value.toLowerCase());
        });
      
        setSearchResults(filteredElements);
        renderSearchResults(filteredElements);
      }

    return (
        <div className="searchBar">
            <input type="text" onChange={handleTyping} placeholder="Search for an idiom"/>
            
        </div>
    )
}