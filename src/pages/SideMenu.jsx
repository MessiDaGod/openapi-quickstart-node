import React from 'react';
import { Link } from 'react-router-dom';

function SideMenu({ items }) {
  return (
    <nav className="side-menu">
      {items.map((item) => (
        <Link key={item.id} to={item.url}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default SideMenu;
