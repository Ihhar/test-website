import React, { useState, Fragment } from 'react';

import Contact from './Contact';
import { lockScrolling } from '../utils';
import '../styles/top-bar.css';

const TopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
      lockScrolling(true);
    } else {
      setIsOpen(false);
      lockScrolling(false);
    }
  };

  return (
    <Fragment>
      <Contact isOpen={isOpen} toggleMenu={toggleMenu} />

      <nav className="top-bar">
        <button className={`burger-btn${isOpen ? ' opened' : ''}`} onClick={toggleMenu}>
          <span className="burger burger-top"></span>
          <span className="burger burger-middle"></span>
          <span className="burger burger-bottom"></span>
        </button>
      </nav>
    </Fragment>
  );
};

export default TopBar;
