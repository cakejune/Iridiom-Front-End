import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function InfoModal({show, handleClose}){
    return(
        <Modal show={show} onHide={handleClose} style={{fontFamily: "Roboto Mono, monospace"}}>
      <Modal.Header closeButton>
        <Modal.Title className="welcomeMessage">
          <div className="welcomeText">Welcome to Iridiom</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modalBodyContent">
          <div className="Meaning">Here you'll find a periodic table of Idioms.</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    )
}