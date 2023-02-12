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
        <ul className="dropdown-menu">
          {Object.entries(connectionStrings).map(([key, value], index) => (
            <li key={index} onClick={() => handleSelect(key)}>
              {key}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ConnectionDropdown;
