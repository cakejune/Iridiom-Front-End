import React, {useState} from "react";
import TagCard from "./TagCard";
import Equation from "./Equation";

export default function Categories({tagState, elements, filterElementsAndPopulateElementCard}){


// const [categoryInOut, setCategoryInOut] = useState(false)

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
             <Equation tagState={tagState}/>
             </div>
        </div>
    )
}