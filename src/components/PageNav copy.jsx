import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.ul}>
        <li>
          <NavLink to={"/pricing"}>Pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>Product</NavLink>
        </li>
        <li>
          <NavLink to={"/"}>Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default PageNav;
