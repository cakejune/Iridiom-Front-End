import React, {useEffect, useState} from 'react';
import '../App.css';
import Table from './Table';
import Categories from './Categories';
import ElementCard from './ElementCard';

function App() {

  const [elements, setElements] = useState([]);
  const [tagState, setTagState] = useState([]);
  const [tagCardElements, setTagCardElements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  console.log(tagCardElements)

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:8008/idioms");
      const response = await data.json()
      setElements(response)
      let x = response.map((idiom) => {
        return idiom.tags
      }).flat()
      let y = new Set(x)
      setTagState([...y])
    };

    fetchData().catch(console.error);
    
  }, []);

  function filterElementsAndPopulateElementCard(selectedTag)
{
    setTagCardElements((elements.filter((el)=>{
        return (
          el.tags.includes(selectedTag)
    )
  })))
    
}




  return (
    <div>
      <Table elements={elements}/>
      <Categories elements={elements} tagState={tagState} filterElementsAndPopulateElementCard={filterElementsAndPopulateElementCard}/>
      <ElementCard tagCardElements={tagCardElements}/>
    </div>
  );
}

export default App;

//Notes: 
//what information is useful to include on idioms?
//should it be crowdsourced?
//- https://api.dictionaryapi.dev/api/v2/entries/en/<word>
// https://api.dictionaryapi.dev/api/v2/entries/en/hello