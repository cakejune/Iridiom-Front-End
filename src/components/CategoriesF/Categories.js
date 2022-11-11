import React, {useState, useEffect} from "react";
import TagCard from "./TagCard";
import TagInEquation from "./TagInEquation"

export default function Categories({tagState, elements, filterElementsAndPopulateElementCard}){

    return (
        <div className="categoryDiv">
            <div className="Categories">
             {tagState.map((tag)=>{
                return <TagCard
                filterElementsAndPopulateElementCard={filterElementsAndPopulateElementCard} 
                key={tag} tagName={tag} tagState={tagState}/>
             })}
             </div>
             
             <div>
             <Equation/>
             </div>
        </div>
    )

    function Equation() {
        let tagsInEquationDiv = [...tagState].flat();
        const [selectedTags, setSelectedTags] = useState([]);
        
        useEffect(() => {
          setSelectedTags(tagState);
        }, [tagState]);
      
        return (
          <div className="Equation">
            Equation Div
            {selectedTags.map((tag, i) => {
              return <TagInEquation tag={tag} key={i} />;
            })}
          </div>
        );
      }
}

