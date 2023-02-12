import React, { useState } from "react";

const Dropdown = () => {
  const [selectedItem, setSelectedItem] = useState("Select Connection");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => setShowDropdown(true);
  const handleMouseLeave = () => setShowDropdown(false);
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowDropdown(false);
  };

  return (
    <div
      className={"dropdown rz-dropdown"}
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button>{selectedItem}</button>
      {showDropdown && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            backgroundColor: "white",
            listStyle: "none",
            padding: 0,
            margin: 0,
            zIndex: 1,
          }}
        >
          <li onClick={() => handleItemClick("Item 1")}>Item 1</li>
          <li onClick={() => handleItemClick("Item 2")}>Item 2</li>
          <li onClick={() => handleItemClick("Item 3")}>Item 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;