import React from 'react';
import styles from './TopBar.module.css';
import Dropdown from './Dropdown';

const TopBar = ({ jsonFileName }) => {
  return (
    <div className={styles.topbar}>
      <div className={styles.logo}>
        <a href="/">
          <img src="dog.png" alt="Dog Logo" />
        </a>
      </div>
      <div className={styles.links}>
        <a href="/">Home</a>
        <a href="/">Features</a>
        <a href="/">Pricing</a>
      </div>
      <Dropdown jsonFileName={jsonFileName} />
    </div>
  );
};

export default TopBar;
