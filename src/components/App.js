import React, {useEffect, useState} from 'react';
import '../App.css';
import Table from './Table';
import Categories from './Categories';
import Equation from './Equation';
import ElementCard from './ElementCard';

function App() {

  const [elements, setElements] = useState([]);
  const [tagState, setTagState] = useState([]);
  const [tagCardElements, setTagCardElements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("http://localhost:3000/idioms");
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



  return (
    <div>
      <Table elements={elements}/>
      <Categories elements={elements} tagState={tagState}/>
      <Equation/>
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