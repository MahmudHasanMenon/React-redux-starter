// component/NavBar.js

import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li className={styles.a}>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/profile">Profile</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
