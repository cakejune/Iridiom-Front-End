import React, { useEffect, useState } from "react";
import "./App.css";
import Table from "./TableF/Table";
import Categories from "./CategoriesF/Categories";
import ElementCard from "./ElementCardF/ElementCard";

function App() {
  const [elements, setElements] = useState([]);
  const [tagState, setTagState] = useState([]);
  const [tagCardElements, setTagCardElements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8008/idioms");
      const response = await data.json();
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

async function postIdiom(newIdiomObject){
    const response = await fetch("http://localhost:8008/idioms",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newIdiomObject)
    })
    const data = response.json();
    setElements([...elements], data)

}

  function filterElementsAndPopulateElementCard(selectedTag) {
    setTagCardElements(
      elements.filter((el) => {
        return el.tags.includes(selectedTag);
      })
    );
  }

  return (
    <div>
      <Table elements={elements} />
      <AddElement postIdiom={postIdiom}/>
      <Categories
        elements={elements}
        tagState={tagState}
        filterElementsAndPopulateElementCard={
          filterElementsAndPopulateElementCard
        }
      />
      <ElementCard tagCardElements={tagCardElements} />
    </div>
  );

function AddElement({postIdiom}){

const [newE, setNewE] = React.useState({
  abbr: "",
  phrase: "",
  meaning: "",
  usage: "",
  tags: "",
  elNum: 0
})

  function handleSubmit(e){
    e.preventDefault();
    console.log(`new element before post: ${newE}`)
    postIdiom(newE);
  }
  function trackInput(e){
    {
      const value = e.target.value;
      setNewE({
        ...newE,
        [e.target.name]: value
      });
    }
  }
  return (
    <div>
    <form id="addElement" onSubmit={handleSubmit}>
	<h1>Add An Idiom</h1>
	<div className="field">
		<label htmlFor="abbr">Abbr:</label>
		<input type="text" id="abbr" name="abbr" placeholder="Enter the custom abbreviation" value={newE.abbr} onChange={trackInput}/>
		<small></small>
	</div>
	<div className="field">
		<label htmlFor="phrase">phrase:</label>
		<input type="text" id="phrase" name="phrase" placeholder="Enter the phrase" value={newE.phrase} onChange={trackInput}/>
		<small></small>
	</div>
	<div className="field">
		<label htmlFor="meaning">meaning:</label>
		<input type="text" id="meaning" name="meaning" placeholder="Enter the meaning" value={newE.meaning} onChange={trackInput}/>
		<small></small>
	</div>
	<div className="field">
		<label htmlFor="usage">usage:</label>
		<input type="text" id="usage" name="usage" placeholder="Enter the usage" value={newE.usage} onChange={trackInput}/>
		<small></small>
	</div>
	<div className="field">
		<label htmlFor="tags">tags:</label>
		<input type="text" id="tags" name="tags" placeholder="Enter the tags" value={newE.tags} onChange={trackInput}/>
		<small></small>
	</div>
	<div className="field">
		<label htmlFor="elementNumber">elementNumber:</label>
		<input type="text" id="elementNumber" name="elNum" placeholder="Enter the element number" value={newE.elNum} onChange={trackInput}/>
		<small></small>
	</div>
	<button type="submit">Submit</button>
</form>
</div>
  )
}

}

export default App;

//Notes:
//what information is useful to include on idioms?
//should it be crowdsourced?
//- https://api.dictionaryapi.dev/api/v2/entries/en/<word>
// https://api.dictionaryapi.dev/api/v2/entries/en/hello
