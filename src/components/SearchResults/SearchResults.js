import React from "react";
import Cell from "../TableF/Cell";
import ElementModal from "../TableF/ElementModal";


export default function SearchResults({matchedElementsWithTags}){
  


    return (
        <div className="SearchResults">
            <h1 className="searchResultsTitle">Search Results</h1>
            {matchedElementsWithTags.map((elementWithTags)=>{
                
            return (
            <Cell element={elementWithTags} key={elementWithTags.id} handleClick={null}/>
            )
            })}
        </div>
    )
}

function SearchedIdiom({elementWithTags}){
    return(
        <div className="elementTag" key={elementWithTags.id}>{elementWithTags.abbr}</div>
    )
}