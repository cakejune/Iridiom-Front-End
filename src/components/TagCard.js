import React, {useState} from "react";


export default function TagCard({tagName, filterElementsAndPopulateElementCard}){

    const [tagCardBoolean, setTagCardBoolean] = useState(true)

    function handleTagCardClick(e){
        //call a function here that passes the tagname up
        setTagCardBoolean(!tagCardBoolean)
        return filterElementsAndPopulateElementCard(e.target.value)
        
    }

    return(
        <button className={tagCardBoolean ? "categorySmall" : "blue"} value={tagName} onClick={handleTagCardClick}>
            {tagName}
        </button>
    )
}
