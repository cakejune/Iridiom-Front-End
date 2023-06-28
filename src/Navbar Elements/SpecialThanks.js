import { Button, Modal } from "react-bootstrap";
import SpecialPeople from "./SpecialPeople";
import Cell from "../components/TableF/Cell";
import React, { useState } from "react";
import ElementModal from "../components/TableF/ElementModal";

export default function SpecialThanks() {

  const [showModal, setShowModal] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const closeModal = () => setShowModal(false);

  const specialPeople = [
    {
      id: 200,
      elNum: "5",
      abbr: "El",
      phrase: "Elisa",
      meaning: "Pushes you to be better. Loyal to a fault. Can't multitask.",
      usage: "as part of a cohort",
      created_at: "2023-04-24T19:29:06.518Z",
      updated_at: "2023-04-24T19:29:06.518Z",
      category: "Dedication Crew",
    },
    {
      id: 201,
      elNum: "11",
      abbr: "Ch",
      phrase: "Chett",
      meaning: "An instructor who dedicates 50% of his time to teaching software concepts, and the other 50% with his cats.",
      usage: "as part of a cohort",
      category: "Dedication Crew",
    },
    {
      id: 202,
      elNum: "65",
      abbr: "Aa",
      phrase: "Alina",
      meaning: "A person with high levels of patience and empathy.",
      usage: "as part of a cohort",
      category: "Dedication Crew",
    },
    {
      id: 203,
      elNum: "1",
      abbr: "Gr",
      phrase: "Grant",
      meaning: "A friend and teacher. Play his game at https://www.https://polygonle.com/",
      usage: "as part of a cohort",
      category: "Dedication Crew",
    },
  ];

  const returnToHomePage = () => {
    window.location.href = "/";
  };

  const openModal = (person) =>{
    setSelectedElement(person);
    setShowModal(true);
  }

  return (
    <>
    <div className="searchBar" style={{flexDirection: "column", paddingBottom: "3em"}}>
      <header className="specialHeader" style={{textAlign: "center"}}>
        Special Thanks to the following elemental people
      </header>
     


      <div className="specialThanksPeople">
        <div
          className="elementCategory Books"
          onClick={() => {
            openModal(specialPeople[0]);
          }}
        >
          <div className="elNumber">{specialPeople[0].elNum}</div>
          <div className="elAbbr">{specialPeople[0].abbr}</div>
        </div>
        <div
          className="elementCategory Animals"
          onClick={() => {
            openModal(specialPeople[1]);
          }}
        >
          <div className="elNumber">{specialPeople[1].elNum}</div>
          <div className="elAbbr">{specialPeople[1].abbr}</div>
        </div>
        <div
          className="elementCategory Body-parts"
          onClick={() => {
            openModal(specialPeople[2]);
          }}
        >
          <div className="elNumber">{specialPeople[2].elNum}</div>
          <div className="elAbbr">{specialPeople[2].abbr}</div>
        </div>
        <div
          className="elementCategory Nature"
          onClick={() => {
            openModal(specialPeople[3]);
          }}
        >
          <div className="elNumber">{specialPeople[3].elNum}</div>
          <div className="elAbbr">{specialPeople[3].abbr}</div>
        </div>
      </div>
        <div className="returnHome">
      {showModal && (
        <ElementModal
          element={selectedElement}
          show={openModal}
          handleClose={closeModal}
        />
      )}
    </div>
    </div>
    <div className="returnHome">
        <Button variant="link" onClick={returnToHomePage} style={{minHeight: "100vh"}}>
            Return to Home Page
        </Button>
    </div>
    </>
  );
}
