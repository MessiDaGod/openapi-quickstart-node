import React, { useState } from 'react';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectItem = item => () => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div
      onMouseEnter={toggleDropdown}
      onMouseLeave={toggleDropdown}
      style={{ position: 'relative' }}
    >
      <button>{selectedItem || 'Select an item'}</button>
      {isOpen && (
        <ul style={{ position: 'absolute', top: '100%' }}>
          <li onClick={selectItem('Item 1')}>Item 1</li>
          <li onClick={selectItem('Item 2')}>Item 2</li>
          <li onClick={selectItem('Item 3')}>Item 3</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
