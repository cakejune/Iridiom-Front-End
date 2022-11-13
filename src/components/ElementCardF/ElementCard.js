import React from "react";


export default function ElementCard({matchedElementsWithTags}){

    return (
        <div className="ElementCard">
            Element Card Div
            {matchedElementsWithTags.map((elementWithTags)=>{
            return <div className="elementTag" key={elementWithTags.id}>{elementWithTags.abbr}</div>
            })}
        </div>
    )
}