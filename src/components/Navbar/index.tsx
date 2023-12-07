import { NavLink } from "react-router-dom";
import "./style.scss";
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  return (
    <>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={menuOpen ? "open" : ""}>
        <ul className={menuOpen ? "open" : ""}>
          <li>
            <NavLink to="/stack">Stack</NavLink>
          </li>
          <li>
            <NavLink to="/queue">Queue</NavLink>
          </li>
          <li>
            <NavLink to="/linked-list">Linked List</NavLink>
          </li>
          <li>
            <NavLink to="/priority-queue">Priority Queue</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
