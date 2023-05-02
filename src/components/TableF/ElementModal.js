import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cell from "./Cell";
import Badge from 'react-bootstrap/Badge';

export default function ElementModal({ element, show, handleClose }) {
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
          <div className="Meaning">Meaning: "{element.meaning}"</div>
          {/*This is part of the body of the modal that will show the tags, but tags aren't in the idiom objects atm */}
          {/* <div className="tagContainer">
            Tags:
            {element.tags.map((tag) => {
              return <Badge className="badgeTag" bg="secondary">{tag}</Badge>;
            })}
          </div> */}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
