import React from "react";

export default function Element({element}) {
    
    function handleClick(){
        console.log(element)

    }

    return(
        <div className="first-row" onClick={handleClick}>
            <div className="elNumber">{element.elNum}</div>
            <div className="elAbbr">{element.abbr}</div>
        </div>
    )
}


/*
Element
*/