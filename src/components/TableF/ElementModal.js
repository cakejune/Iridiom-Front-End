import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Cell from "./Cell";

export default function ElementModal({ element, show, handleClose }) {
  if (!element) {
    return <></>;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="idiomTitle">
            <Cell element={element} handleClick={null}/>
            <div className="idiomPhrase">{element.phrase}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        Meaning:
        {element.meaning}
        <sub>Tags:</sub>
        {element.tags.map((tag) => {
          return (
            <sub className="tagSub" key={tag}>
              | {tag} |
            </sub>
          );
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
