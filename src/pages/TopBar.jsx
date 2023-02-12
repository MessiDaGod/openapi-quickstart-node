import React from 'react';
import { Link } from 'react-router-dom';

function TopBar({ items }) {
  return (
    <nav className="top-bar">
      {items.map((item) => (
        <Link key={item.id} to={item.url}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export default TopBar;
