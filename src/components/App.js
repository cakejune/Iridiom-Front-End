import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../Navbar Elements/Navbar";
import Categories from "./CategoriesF/Categories";
import SearchResults from "./SearchResults/SearchResults";
import TableGrid from "./TableF/TableGrid";
import { Route, Routes } from "react-router-dom";
import SpecialThanks from "../Navbar Elements/SpecialThanks";
import IdiomCategoryKey from "./TableF/IdiomCategoryKey";
import EditIdiom from "./EditIdiom";
import SearchBar from "./SearchBar";

function App() {
  const [elements, setElements] = useState([]);
  const [tagState, setTagState] = useState([]);
  const [matchedElementsWithTags, setMatchedElementsWithTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [elementToEdit, setElementToEdit] = useState({});
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/idioms");
      const response = await data.json();
      // console.log(response);
      // only save idioms between 1 and 118
      setElements(response);
      let x = response
        .map((idiom) => {
          return idiom.tags;
        })
        .flat();
      let y = new Set(x);
      setTagState([...y]);
    };

    fetchData().catch(console.error);
  }, []);

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

  function refreshIdioms(){
    const fetchData = async () => {
      const data = await fetch("/idioms");
      const response = await data.json();
      // only save idioms between 1 and 118
      setElements(response);
      let x = response
        .map((idiom) => {
          return idiom.tags;
        })
        .flat();
      let y = new Set(x);
      setTagState([...y]);
    };

    fetchData().catch(console.error);
  }

  function renderSearchResults(searchResults){

    setSearchResults(searchResults);
    
    //change the color of all the cells that do not match the search results to grey. Change the background color ofthe whole page to slightly dimmer as well.


  }

 

  return (
    <div className="appDiv">
      <Navbar refreshIdioms={refreshIdioms}/>
      <Routes>
        <Route
          
          path="/"
          element={[
            <SearchBar renderSearchResults={renderSearchResults} elements={elements} key={0}/>,
            <TableGrid searchResults={searchResults} elements={elements} key={1}/>,
            <IdiomCategoryKey key={9}/>,
            <Categories
              elements={elements}
              tagState={tagState}
              filterElementsByTags={filterElementsByTags}
              key={2}
            />,
            <SearchResults matchedElementsWithTags={matchedElementsWithTags} key={3}/>,
          ]}
        ></Route>
        <Route path="/edit/:id" element={<EditIdiom key={5} />}></Route>
        <Route path="/special-thanks" element={<SpecialThanks key={4}/>}></Route>
        
      </Routes>
    </div>
  );

  function AddElement({ postIdiom }) {
    const [newE, setNewE] = React.useState({
      abbr: "",
      phrase: "",
      meaning: "",
      usage: "",
      tags: "",
      elNum: 0,
    });

    function handleSubmit(e) {
      e.preventDefault();
      postIdiom(newE);
    }
    function trackInput(e) {
      {
        const value = e.target.value;
        setNewE({
          ...newE,
          [e.target.name]: value,
        });
      }
    }
    return (
      <div id="add-Idiom">
        <form id="addElement" onSubmit={handleSubmit}>
          <h1>Add An Idiom</h1>
          <div className="field">
            <label htmlFor="abbr">Abbr:</label>
            <input
              type="text"
              id="abbr"
              name="abbr"
              placeholder="Enter the custom abbreviation"
              value={newE.abbr}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="phrase">phrase:</label>
            <input
              type="text"
              id="phrase"
              name="phrase"
              placeholder="Enter the phrase"
              value={newE.phrase}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="meaning">meaning:</label>
            <input
              type="text"
              id="meaning"
              name="meaning"
              placeholder="Enter the meaning"
              value={newE.meaning}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="usage">usage:</label>
            <input
              type="text"
              id="usage"
              name="usage"
              placeholder="Enter the usage"
              value={newE.usage}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="tags">tags:</label>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Enter the tags"
              value={newE.tags}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="elementNumber">elementNumber:</label>
            <input
              type="text"
              id="elementNumber"
              name="elNum"
              placeholder="Enter the element number"
              value={newE.elNum}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <div className="field">
            <label htmlFor="category">category:</label>
            <input
              type="text"
              id="elementCategory"
              name="category"
              placeholder="Enter the category"
              value={newE.category}
              onChange={trackInput}
            />
            <small></small>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;

//Notes:
//what information is useful to include on idioms?
//should it be crowdsourced?
//- https://api.dictionaryapi.dev/api/v2/entries/en/<word>
// https://api.dictionaryapi.dev/api/v2/entries/en/hello
