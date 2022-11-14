import React from "react";

export default function Element({element}) {
    function handleClick(){
        console.log(element)
    }

    return(
        <td className={"elementCategory"+element.category} onClick={handleClick}>
            <div className="elNumber">{element.elNum}</div>
            <div className="elAbbr">{element.abbr}</div>
        </td>
    )
}


/*
Element
*/