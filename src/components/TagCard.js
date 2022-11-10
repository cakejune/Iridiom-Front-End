import React from "react";


export default function TagCard({tagName, filterElementsAndPopulateElementCard}){

    function handleTagCardClick(){
        //call a function here that passes the tagname up
        filterElementsAndPopulateElementCard(tagName)
        
    }

    return(
        <button className="categorySmall" value={tagName} onClick={handleTagCardClick}>
            {tagName}
        </button>
    )
}
