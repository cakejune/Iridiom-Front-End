import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navibar">
      <ul className="navibar-content">
        <div className="leftlinks">
            <div className="infolink">
              <a href="#info">🛈</a>
            </div>
        </div>
        <div className="iridiomlink">
          <NavLink to="/">Ir<sub>i</sub>dᶦom</NavLink>
        </div>
        <div className="special-thanks">
          <NavLink to="/special-thanks">❤</NavLink>
        </div>
      </ul>
    </div>
  );
}
//NavLink className="nav-link" exact to="/">Special Thanks</NavLink>
