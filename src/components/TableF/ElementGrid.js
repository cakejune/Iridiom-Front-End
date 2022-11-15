import React from "react";

export default function ElementGrid({element}){

    function handleClick(){
        console.log(element)
    }

    return (<div className={"elementCategory "+element.category} onClick={handleClick} >
            <div className="elNumber">{element.elNum}</div>
            <div className="elAbbr">{element.abbr}</div>
       
    </div>)
}