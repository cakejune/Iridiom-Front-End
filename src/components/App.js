import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "../Navbar Elements/Navbar";
import Categories from "./CategoriesF/Categories";
import SearchResults from "./SearchResults/SearchResults";
import TableGrid from "./TableF/TableGrid";
import { Route, Routes } from "react-router-dom";
import SpecialThanks from "../Navbar Elements/SpecialThanks";
import IdiomCategoryKey from "./TableF/IdiomCategoryKey";

function App() {
  // let page_1 = [];
  // let page_2 = [];
  const [selectedPage, setSelectedPage] = useState(1);
  const [elements, setElements] = useState([]);
  const [tagState, setTagState] = useState([]);
  const [matchedElementsWithTags, setMatchedElementsWithTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/idioms");
      const response = await data.json();
      // only save idioms between 1 and 118
      const page_1 = await response.filter((idiom) => {
        return idiom.elNum > 0 && idiom.elNum < 119;
      });
      // only save idioms between 119 and 172
      // There may be a case where page_1 and page_2 get duplicates of the same idioms
      const page_2 = await response.filter((idiom) => {
        return idiom.elNum > 118 && idiom.elNum < 173;
      });
      const pages = [page_1, page_2]
      setElements(pages[selectedPage]);
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

  async function updateIdiom(idiomObject) {
    const response = await fetch(
      `idioms/${idiomObject._id}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(idiomObject),
      }
    );
    const data = await response.json();
    console.log(data);
  }




  return (
    <div className="appDiv">
      <Navbar />
      <Routes>
        <Route
          
          path="/"
          element={[
            <TableGrid elements={elements} key={1}/>,
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
      // console.log(`new element before post: ${newE}`)
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
