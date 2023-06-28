import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import InfoModal from "./InfoModal";

export default function Navbar(refreshIdioms) {
  // State to control the visibility of the InfoModal.
  const [show, setShow] = useState(true);

  // Function to close the InfoModal.
  const handleClose = () => setShow(false);

  // Function to show the InfoModal.
  const handleShow = () => setShow(true);

  // Function to refresh the idioms, passed from parent component.
  const handleRefreshIdioms = () => {
    refreshIdioms();
  };

  return (
    <>
      <div className="navibar">
        <ul className="navibar-content">
          {/* Left section of the Navbar */}
          <div className="leftlinks">
            {/* Button to open the InfoModal */}
            <div className="infolink">
              <button className="info-button" onClick={handleShow}>
                🛈
              </button>
            </div>
          </div>

          {/* Link to Home Page (Idioms Table) */}
          <div className="iridiomlink">
            <NavLink to="/" onClick={handleRefreshIdioms}>
              Ir<sub>i</sub>dᶦom
            </NavLink>
          </div>

          {/* Link to Special Thanks Page */}
          <div className="special-thanks">
            <NavLink to="/special-thanks">❤</NavLink>
          </div>
        </ul>

        {/* InfoModal component */}
        <InfoModal show={show} handleClose={handleClose} />
      </div>

      {/* Description below the navbar */}
      <div className="iridiom-description">A Periodic Table of Idioms</div>
    </>
  );
}
