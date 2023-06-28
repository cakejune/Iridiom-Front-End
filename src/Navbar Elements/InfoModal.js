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
          <div className="Meaning">
            {/* Introduction and overview */}
            <p>
              At Iridiom, we turn learning English idioms into an elemental experience, similar to exploring the periodic table. 
              Iridiom, a playful twist on the element 'Iridium' and 'idiom', serves as your portal to an interactive and vibrant world of English idioms. 
            </p>
            <p>
              Here's a quick guide on how to use Iridiom:
            </p>
            {/* List of usage instructions */}
            <ol>
              <li>
                <strong>Exploring Idioms: </strong>
                Each cell on our 'Periodic Table of Idioms' represents a unique idiom, labeled with a distinctive abbreviation. 
                The cells are color-coded based on their categories for easy navigation. 
                Click on any cell to uncover the phrase, meaning, usage, and associated tags of each idiom.
              </li>
              <li>
                <strong>Search Function: </strong>
                Looking for something specific? Use the search bar at the top of the page. 
                As you type, non-matching idioms will fade, leaving only the idioms containing your search phrase. 
                It's a dynamic way to discover idioms related to specific themes or concepts.
              </li>
              <li>
                <strong>Category Filter: </strong>
                Intrigued by a particular category? Use the category key below the table. 
                Clicking on a category will dim idioms from other categories, allowing you to focus on idioms from your chosen category.
              </li>
            </ol>
            {/* Closing remarks */}
            <p>
              We invite you to embark on this educational exploration, dive into the world of idioms, and most importantly, have fun! Welcome to Iridiom!
            </p>
            <p>
              <strong> - 🍰CakeJune☀️ </strong>
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* Close button */}
        <Button variant="secondary" className="close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
    
    )
}