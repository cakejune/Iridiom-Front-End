import React from "react";


export default function ElementCard({tagCardElements}){

    return (
        <div className="ElementCard">
            Element Card Div
            {tagCardElements.map((tagCardElement)=>{
            return <div className="elementTag" key={tagCardElement.id}>{tagCardElement.abbr}</div>
            })}
        </div>
    )
}