import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cell from "./Cell";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";

export default function ElementModal({ element, show, handleClose}) {

  // const [selectedElement, setSelectedElement] = useState(null);
// useEffect(() => {
//   const fetchData = async () => {
//     const data = await fetch(`/idioms/${element.id}`);
//     const response = await data.json();
//     console.log(response);
//   };

//   fetchData().catch(console.error);
// }, [element]);


  const navigate = useNavigate();

  function handleEditIdiom() {
    navigate(`/edit/${element.id}`);
  }

  if (!element) {
    return <></>;
  }


  return (
    <Modal show={show} onHide={handleClose} style={{fontFamily: "Roboto Mono, monospace"}}>
      <Modal.Header closeButton>
        <Modal.Title className="idiomTitle">
          <Cell element={element} handleClick={null} />
          <div className="idiomPhrase">{element.phrase}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBodyContent">
          <div className="Meaning">
            {`Meaning: ${element.meaning}`}
            </div>
          {/*This is part of the body of the modal that will show the tags, but tags aren't in the idiom objects atm */}
          <div className="tagContainer">
            Tags:
            {element.tags?.map((tag) => {
              return <Badge className="badgeTag" bg="secondary" key={tag.id}>{tag.name}</Badge>;
            })}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>

        {/* <Button variant="secondary" className="edit" onClick={changeHandleClick}>
          Edit
        </Button> */}
        <Button variant="secondary" onClick={handleEditIdiom}>Edit</Button>
        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
