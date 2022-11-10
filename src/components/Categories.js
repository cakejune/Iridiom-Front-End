import React, {useState} from "react";
import TagCard from "./TagCard";

export default function Categories({tagState, elements}){
    
// const [categoryInOut, setCategoryInOut] = useState(false)

function filterElementsAndPopulateElementCard(selectedTag){
    const arrayOfElementsWithTags = elements.filter((el)=>{
        el.tags.includes(selectedTag)
  })}

    return (
        <div className="Categories">
             {tagState.map((tag)=>{
                return <TagCard filterElementsAndPopulateElementCard={filterElementsAndPopulateElementCard} key={tag} tagName={tag} tagState={tagState}/>
             })}
        </div>
    )
}