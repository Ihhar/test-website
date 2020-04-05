import React from 'react';

import '../styles/buttons.css';

const ControlButtons = ({ translate, setTranslate, container }) => {

  const setGalleryScroll = () => {
    const main = container.current;
    main.style.transform = `translateX(-${translate}px)`;
  };
  
  const moveNext = () => {
    const { width } = getComputedStyle(container.current);
    const mainWidth = parseFloat(width.slice(0, 4));
    const positionToStop = mainWidth - window.innerWidth;

    if (translate + 250 >= positionToStop) {
      setTranslate(positionToStop - 5);
      return setGalleryScroll();
    }

    setTranslate(translate + 250);
    setGalleryScroll();
  };

  const movePrev = () => {
    if (translate - 250 <= 0) {
      setTranslate(0);
      return setGalleryScroll();
    }

    setTranslate(translate - 250);
    setGalleryScroll();
  };

  return (
    <div className="btn-float">
      <button className="btn-sm btn-left" onClick={movePrev}></button>
      <button className="btn-sm btn-right" onClick={moveNext}></button>
    </div>
  );
};

export default ControlButtons;
