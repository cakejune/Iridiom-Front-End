import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import InfoModal from "./InfoModal";

export default function Navbar(refreshIdioms) {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleRefreshIdioms = () => {
    refreshIdioms();
  };
  
  return (
    <>
    <div className="navibar">
      <ul className="navibar-content">
        <div className="leftlinks">
            <div className="infolink">
              <button className="info-button" onClick={handleShow}>🛈</button>
            </div>
        </div>
        <div className="iridiomlink">
          <NavLink to="/" onClick={handleRefreshIdioms}>Ir<sub>i</sub>dᶦom</NavLink>
        </div>
        <div className="special-thanks">
          <NavLink to="/special-thanks">❤</NavLink>
        </div>
      </ul>
      <InfoModal show={show}
        handleClose={handleClose}/>
    </div>
    <div className="iridiom-description">A Periodic Table of Idioms</div>
    </>
  );
}
//NavLink className="nav-link" exact to="/">Special Thanks</NavLink>
