import React, { useState, useEffect } from "react";
import styles from './dropdown.module.css';

const Dropdown =  ({ jsonFileName }) => {
  const [selectedItem, setSelectedItem] = useState("Select Connection");
  const [showDropdown, setShowDropdown] = useState(false);
  const [myConnectionStrings, setConnectionStrings] = useState({});
  const [itemEnter, setItemEnter] = useState(false);
  const[itemLeave, setItemLeave] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    // Fetch the JSON data from an API or a local file
    fetch(`${jsonFileName}.json`)
      .then((response) => response.json())
      .then((data) => {
        // Get the ConnectionStrings object from the JSON data
        const { ConnectionStrings } = data;
        setConnectionStrings(ConnectionStrings);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);
  const handleItemClick = (item) => {
    console.info(item + " selected");
    setSelectedItem(item);
    setShowDropdown(false);
  };

  const handleItemMouseEnter = (index) => {
    setItemEnter(index);
    setItemLeave(false);
  };

  const handleItemMouseLeave = (index) => {
    setItemLeave(index);
    setItemEnter(false);
  };

  function Button() {
    return (
      <button className={`${styles.btn} ${styles['btn-101']} ${styles['btn-glow']}`}>
        {selectedItem}
      </button>
    );
  }

  return (
    <div
      className={"dropdown rz-dropdown"}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button label="Select Connection">{selectedItem}</Button>
      {showDropdown && (
        <ul className={styles.ul}>
          {Object.entries(myConnectionStrings).map(([key, value], index) => (
            <li
              key={index}
              onClick={() => handleItemClick(key)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              className={hoveredItem === index ? `${styles['dropdown-item']} ${styles.hovered}` : `${styles['dropdown-item']}`}
            >
              {key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
