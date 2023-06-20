import { Button } from "react-bootstrap";
import SpecialPeople from "./SpecialPeople"
import Cell from "../components/TableF/Cell";

export default function SpecialThanks(){

    //"id": 105,
    // "elNum": "105",
    // "abbr": "Bm",
    // "phrase": "Once in a blue moon",
    // "meaning": "Rarely",
    // "usage": "as part of a sentence",
    // "xy": "4,6",
    // "created_at": "2023-04-24T19:29:06.518Z",
    // "updated_at": "2023-04-24T19:29:06.518Z",
    // "category": "Nature"

    const specialPeople = [
        {
        "id": 200,
        "elNum": "5",
        "abbr": "El",
        "phrase": "Elisa",
        "meaning": "Pushes you to be better. Also kind of annoying.",
        "usage": "as part of a cohort",
        "created_at": "2023-04-24T19:29:06.518Z",
        "updated_at": "2023-04-24T19:29:06.518Z",
        "category": "Nature"
        },
        {
            "id": 201,
            "elNum": "11",
            "abbr": "Ch",
            "phrase": "Chett",
            "meaning": "A fantastic instructor (often has an addiction to catnip).",
            "usage": "as part of a cohort",
            "category": "Nature"
            
        },
        {
            "id": 202,
            "elNum": "65",
            "abbr": "Aa",
            "phrase": "Alina",
            "meaning": "A person with high levels of patience and empathy.",
            "usage": "as part of a cohort",
            "category": "Nature"
        },
        {
            "id": 203,
            "elNum": "1",
            "abbr": "Gr",
            "phrase": "Grant",
            "meaning": "A digital being who acts as a catalyst for growth.",
            "usage": "as part of a cohort",
            "category": "Nature"

        }
    ]


    const returnToHomePage = () => {
        window.location.href = "/";

    }


    return (
        <div className="specialThanksContainer">
            <header className="specialHeader">Special Thanks to the following elemental people</header>
            <div className="specialThanksPeople">
                <Cell element={specialPeople[0]} handleClick={null} searched={true}/>
                <Cell element={specialPeople[1]} handleClick={null} searched={true}/>
                <Cell element={specialPeople[2]} handleClick={null} searched={true}/>
                <Cell element={specialPeople[3]} handleClick={null} searched={true}/>

            
                <SpecialPeople personName={"Elisa"} nameAbbr={"El"} nameNumber={"5"} description="Pushes you to be better. Also kind of annoying."/>
                <SpecialPeople personName={"Chett"} nameAbbr={"Ch"} nameNumber={"11"} description="A fantastic instructor (often has an addiction to catnip)."/>
                <SpecialPeople personName={"Alina"} nameAbbr={"Aa"} nameNumber={"65"} description="A person with high levels of patience and empathy."/>
                <SpecialPeople personName={"Grant"} nameAbbr={"Gr"} nameNumber={"1"} description="A digital being who acts as a catalyst for growth."/>
            </div>
            <div className="specialThanksPeople">
                <Button onClick={returnToHomePage} style={{display: "flex"}}>Return to Home Page</Button>
            </div>
        </div>
    )
}