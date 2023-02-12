import React, { useState } from "react";

const ConnectionDropdown = ({ connectionStrings }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (selectedOption) => {
    setSelectedOption(selectedOption);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        onClick={toggleDropdown}
      >
        {selectedOption || "Select Connection"}
      </button>
      {isOpen && (
        <ul style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "white",
              listStyle: "none",
              padding: 0,
              margin: 0,
              zIndex: 1,
              backgroundColor: "#0d1117", color: "white"
            }}>
          {Object.entries(connectionStrings).map(([key, value], index) => (
            <li key={index} onClick={() => handleItemClick(key)}>
              {key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConnectionDropdown;
