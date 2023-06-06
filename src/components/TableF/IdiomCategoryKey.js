import React, { useEffect } from "react";
import { useState } from "react";
import { Badge } from "react-bootstrap";

export default function IdiomCategoryKey({setCategory, categories}) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const style = {
    "cursor": "pointer",
    "width": "4em",
    "height": "4em",
    "padding": "1px",
    "margin": "1px",
    "border": "1px solid #333",
    "borderRadius": "20%",
    "borderCollapse": "collapse",
    "overflow": "hidden",
    "transition": "all 0.2s ease-in-out",
    "textAlign": "center",
    
  }
 
  const styleKey = {
    "Love": "rgb(247, 160, 238)",
    "Books": "linear-gradient(rgb(255, 153, 0), rgb(255, 179, 0))",
    "Body-parts": "linear-gradient(rgb(221, 169, 90), rgb(231, 77, 77))",
    "Nature": "linear-gradient(rgb(104, 226, 104), rgb(15, 120, 32))",
    "Food": "rgb(255, 157, 0)",
    "Animals": "rgb(127, 191, 255)",
    "Cats": "#8b7868",
    "Clothing": "rgb(42, 104, 108)",
    "Fruits": "peachpuff",
    "Money": "rgb(244, 241, 89)",
    "Country": "#596ef7",
    "Advice": "rgb(212, 233, 180)",
    "Action": "rgb(245, 189, 106)",
    "Website": "linear-gradient(rgb(243, 193, 232), rgb(243, 5, 239))",
  };
      

  function handleClick(e){
    console.log(e.target.className);
    if (selectedCategory === e.target.className){
      setSelectedCategory(null);
      setCategory(null);
      return;
    }
    setSelectedCategory(e.target.className)
    setCategory(e.target.className);
  }

  return (
    <div className="idiomKeyContainer">
         <h4><Badge className="badgeTag" bg="secondary" key={123124}>Category 🔑 Key</Badge></h4>
         
    <div className="idiomkey">
       {categories.map((category) => {
          return (
            <div className="keyItem" key={category}>
              <div onClick={handleClick} className={category} style={{...style, "background": styleKey[category]}}>
               
              </div>
              <div>{category}</div>
            </div>
          );
       }
        )}

    </div>
    </div>
  );
}
/*Love
background-color: rgb(247, 160, 238);

Books
background-image: linear-gradient(rgb(255, 153, 0), rgb(255, 179, 0));
  
Body Parts
background-image: linear-gradient(rgb(221, 169, 90), rgb(231, 77, 77));

Nature
background-image: linear-gradient(rgb(104, 226, 104), rgb(15, 120, 32));

Food
background-color: rgb(255, 157, 0);
  
Animals
background-color: rgb(127, 191, 255);

Cats
background-color: #8b7868;
  
Clothing
background-color: rgb(42, 104, 108);

Fruits
background-color: peachpuff;

Money
background-color: rgb(244, 241, 89);
  
Country
background-color: #596ef7;

Advice
background-color: rgb(212, 233, 180);
  
action 
background-color: rgb(245, 189, 106);

  Website 
    background-image: linear-gradient(rgb(243, 193, 232), rgb(243, 5, 239));

    */
