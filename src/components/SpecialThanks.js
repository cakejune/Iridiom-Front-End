import SpecialPeople from "./SpecialPeople"

export default function SpecialThanks(){

    return (
        <div className="specialThanksContainer">
            <header className="specialHeader">Special Thanks to the following elemental people</header>
            <div className="specialThanksPeople">
            
                <SpecialPeople personName={"Elisa"} nameAbbr={"El"} nameNumber={"5"} description="Pushes you to be better. Also kind of annoying."/>
                <SpecialPeople personName={"Chett"} nameAbbr={"Ch"} nameNumber={"11"} description="A fantastic instructor (often has an addition to catnip)."/>
                <SpecialPeople personName={"Alina"} nameAbbr={"Aa"} nameNumber={"65"} description="A person with high levels of patience and empathy."/>
                <SpecialPeople personName={"Michael"} nameAbbr={"Mi"} nameNumber={"36"} description="Someone who gets more joy out of other people learning than himself. Does anyone know his real age by the way?"/>
                <SpecialPeople personName={"Grant"} nameAbbr={"Gr"} nameNumber={"1"} description="A digital being who acts as a catalyst for growth."/>
            </div>
        </div>
    )
}