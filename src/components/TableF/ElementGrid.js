import React from "react";

export default function ElementGrid({element}){
    return (<div className={"elementCategory "+element.category} >
            <div className="elNumber">{element.elNum}</div>
            <div className="elAbbr">{element.abbr}</div>
       
    </div>)
}