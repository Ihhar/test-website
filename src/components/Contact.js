import React, { Fragment, useEffect, useState } from 'react';
import { isTablet } from 'react-device-detect';

import '../styles/contact.css';

const Contact = ({ isOpen, toggleMenu }) => {
  const [formClass, setFormClass] = useState('hide');
  const [wrapperClass, setWrapperClass] = useState('form-wrapper');

  useEffect(() => {
    let formClassTimeout = null;
    const forTablet = isTablet && isOpen;
    const otherDevices = !isTablet && isOpen;

    forTablet && setWrapperClass('form-wrapper tablet');
    otherDevices && setWrapperClass('form-wrapper open');
    (!forTablet && !otherDevices) && setWrapperClass('form-wrapper');

    if (isOpen) {
      formClassTimeout = setTimeout(() => {
        setFormClass('show');
      }, 500);
      
      return;
    }
    
    formClassTimeout = formClassTimeout ? formClassTimeout.clearTimeout() : null;
    setFormClass('hide');

  }, [isOpen]);

  return (
    <Fragment>
      <div className={wrapperClass}>
        <form className={`form ${formClass}`}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Twój e-mail</label>
            <input type="email" placeholder="E-mail" id="email" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Imię i nazwisko</label>
            <input type="text" placeholder="Imię i nazwisko" id="name" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="message">Wiadomość</label>
            <textarea placeholder="Wiadomość" className="form-textarea" id="message"></textarea>
          </div>

          <button className="btn-submit" type="submit">Wyślij</button>
        </form>
      </div>
      
      { isOpen && <div className="contact-backdrop" onClick={toggleMenu}></div> }
    </Fragment>
  );
};

export default Contact;
