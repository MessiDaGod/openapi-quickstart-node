import Link from "next/link";
import styles from "./TopBar.module.css";
import Dropdown from "./dropdown";

const TopBar = () => {
  return (
    <nav className={styles.TopBar}>
      <Dropdown jsonFileName="data" />
    </nav>
  );
};

export default TopBar;
