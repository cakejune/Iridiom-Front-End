import React from "react";

export default function SpecialPeople({nameAbbr, nameNumber, personName, description}){
    return(
        <div className="specialThanksCell">
            <div className="personElementSquare">
        <div className="personNumber">{nameNumber}</div>
        <div className="personAbbr">{nameAbbr}</div>
        </div>
        <div className="peopleContent">
            Name: {personName} <br/>
            Meaning: {description}
        </div>
        
      </div>
    )
}