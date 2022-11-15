import React from "react";


export default function SearchResults({matchedElementsWithTags}){

    return (
        <div className="SearchResults">
            Search Results DIV
            {matchedElementsWithTags.map((elementWithTags)=>{
            return <SearchedIdiom matchedElementsWithTags={matchedElementsWithTags} elementWithTags={elementWithTags} key={elementWithTags.id}/>
            })}
        </div>
    )
}

function SearchedIdiom({elementWithTags}){
    return(
        <div className="elementTag" key={elementWithTags.id}>{elementWithTags.abbr}</div>
    )
}