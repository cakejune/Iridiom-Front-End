import React, { useState } from "react";
import "./App.css";
import Navbar from "../Navbar Elements/Navbar";
import TableGrid from "./TableF/TableGrid";
import { Route, Routes } from "react-router-dom";
import SpecialThanks from "../Navbar Elements/SpecialThanks";
import IdiomCategoryKey from "./TableF/IdiomCategoryKey";
import EditIdiom from "./EditIdiom";
import SearchBar from "./SearchBar";
import data from "./idioms.json";
import { Button } from "react-bootstrap";

function App() {
  const elements = data.idioms;
  const categoryList = data.idioms.map((idiom) => {
    return idiom.category;
  });
  const categories = [...new Set(categoryList)];
  const tagState = data.tags;
  const [matchedElementsWithTags, setMatchedElementsWithTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [elementToEdit, setElementToEdit] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  // useEffect(()=>{
  //   console.log(`matchedElementsWithTags: ${matchedElementsWithTags}`)
  // },[matchedElementsWithTags])

  // async function postIdiom(newIdiomObject) {
  //   const response = await fetch("http://localhost:8008/idioms", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newIdiomObject),
  //   });
  //   const data = response.json();
  //   setElements([...elements, data]);
  // }


  function printIdiomPhrases(idioms){
    const phrases = idioms.map((idiom)=>{
      return idiom.phrase;
    })
    console.log(phrases);
  }
  function filterElementsByTags(tagsInEquationArray) {
    //tagsInEquationArray = ['informal', 'here']
    const filteredElements = elements.filter((el) => {
      //use the smaller list of items with .every
      if (tagsInEquationArray.length === 0) {
        return false;
      }
      return tagsInEquationArray.every((tag) => {
        return el.tags.includes(tag);
      });
    });
    setMatchedElementsWithTags(filteredElements);
  }


  function setCategorySearch(category){
    setSelectedCategory(category);
    const filteredElements = elements.filter((el) => {
      return el.category === category;
    });
    renderSearchResults(filteredElements);
  }

  function renderSearchResults(searchResults){

    setSearchResults(searchResults);
    
    //change the color of all the cells that do not match the search results to grey. Change the background color ofthe whole page to slightly dimmer as well.


  }

 

  return (
    <div className="appDiv">
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={[
            <SearchBar renderSearchResults={renderSearchResults} elements={elements} key={0}/>,
            <TableGrid searchResults={searchResults} elements={elements} key={1}/>,
            <IdiomCategoryKey key={9} categories={categories} setCategory={setCategorySearch}/>,
            <Button onClick={()=>{printIdiomPhrases(elements)}}>Print Idiom Phrases</Button>
          ]}
        ></Route>
        <Route path="/edit/:id" element={<EditIdiom key={5} />}></Route>
        <Route path="/special-thanks" element={<SpecialThanks key={4}/>}></Route>
        
      </Routes>
    </div>
  );

}

export default App;

//Notes:
//what information is useful to include on idioms?
//should it be crowdsourced?
//- https://api.dictionaryapi.dev/api/v2/entries/en/<word>
// https://api.dictionaryapi.dev/api/v2/entries/en/hello
