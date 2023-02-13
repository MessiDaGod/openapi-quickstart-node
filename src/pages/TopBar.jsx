import Link from "next/link";
import styles from "./TopBar.module.css";
import Dropdown from "./dropdown";

const TopBar = () => {
  return (
    <nav className={styles.TopBar}>
      <ul>
        <li>
          <Dropdown jsonFileName="data" />
        </li>
      </ul>
    </nav>
  );
};

export default TopBar;
