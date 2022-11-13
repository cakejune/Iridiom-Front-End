import React from "react";

export default function TagCard({tagName, handleTagCardClick}){

    function handleClick(e){
        
        //call a function here that passes the tagname up
        handleTagCardClick(e.target.value);
    }

    return(
        <button className="categorySmall" value={tagName} onClick={handleClick}>
            {tagName}
        </button>
    )
}


// {tagCardBoolean ? "categorySmall" : "inEquation"}