import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav aria-label="Main navigation">
      <ul className="nav-list">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/booking">Reservations</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
