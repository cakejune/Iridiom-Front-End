// Import required modules and dependencies
import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../Navbar Elements/Navbar";
import TableGrid from "./TableF/TableGrid";
import { Route, Routes } from "react-router-dom";
import SpecialThanks from "../Navbar Elements/SpecialThanks";
import IdiomCategoryKey from "./TableF/IdiomCategoryKey";
import SearchBar from "./SearchBar";
import data from "./idioms.json";

// Define the main App component
function App() {
  // Initialize elements array from the data in idioms.json
  const elements = data.idioms;

  // Extract categories from elements and create a deduplicated list
  const categoryList = data.idioms.map((idiom) => {
    return idiom.category;
  });
  
  // Define state variables
  const categories = [...new Set(categoryList)]; 
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category in filter/search
  const [elementToEdit, setElementToEdit] = useState({}); // Used in a private branch for editing elements
  const [searchResults, setSearchResults] = useState([]); // Results from the search/filter

  // Function to filter elements by category and update search results
  function setCategorySearch(category) {
    setSelectedCategory(category);
    const filteredElements = elements.filter((el) => {
      return el.category === category;
    });
    renderSearchResults(filteredElements);
  }
// Function to update the search results and perform additional visual changes
  function renderSearchResults(searchResults) {
    setSearchResults(searchResults);

  }

  useEffect(() => {
    const handleWindowResize = () => {
      const isMobile = window.innerWidth < 768;
      // Perform additional actions based on device type
      if (isMobile) {
        // Code for mobile view
      } else {
        // Code for desktop view
      }
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
    // Return the JSX to render the App component
  return (
    <div className="appDiv">
      <Navbar /> {/* Render the Navbar component */}
      <div className="appContainer">
      <Routes>
        {/* Define the main route (homepage) */}
        <Route
          path="/"
          element={[
            //Render the SearchBar component and pass required props
            <SearchBar
              renderSearchResults={renderSearchResults}
              elements={elements}
              key={0}
            />,
            //Render the TableGrid component and pass required props
            <div className="tableContainer" key={15}>
            <TableGrid
              searchResults={searchResults}
              elements={elements}
              key={1}
            />
            </div>,
            
            //Render the IdiomCategoryKey component and pass required props
            <IdiomCategoryKey
              key={9}
              categories={categories}
              setCategory={setCategorySearch}
            />,
          ]}
        ></Route>
        
        {/* Define the Special Thanks page route */}
        <Route
          path="/special-thanks"
          element={<SpecialThanks key={4} />}
        ></Route>
      </Routes>
      </div>
    </div>
  );
}
// Export the App component
export default App;

//Notes:
//what information is useful to include on idioms?
//should it be crowdsourced?
//- https://api.dictionaryapi.dev/api/v2/entries/en/<word>
// https://api.dictionaryapi.dev/api/v2/entries/en/hello
