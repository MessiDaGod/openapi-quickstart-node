import React, { useState, useEffect } from "react";

const Dropdown =  ({ jsonFileName }) => {
  const [selectedItem, setSelectedItem] = useState("Select Connection");
  const [showDropdown, setShowDropdown] = useState(false);
  const [myConnectionStrings, setConnectionStrings] = useState({});

  useEffect(() => {
    // Fetch the JSON data from an API or a local file
    fetch('/data.json')
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
            backgroundColor: "#0d1117",
            color: "white",
            listStyle: "none",
            padding: 0,
            margin: 0,
            zIndex: 1,
            cursor: "pointer",
          }}
        >
          {Object.entries(myConnectionStrings).map(([key, value], index) => (
            <li key={index} onClick={() => handleItemClick(key)}>
              {key}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default Dropdown;