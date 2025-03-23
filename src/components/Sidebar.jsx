import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav";
import styles from "../components/Sidebar.module.css";
import Logo from "./Logo";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Worldwise Inc.
        </p>
      </footer>
    </div>
  );
};
export default Sidebar;
