import React, { useEffect, useState } from 'react';
import Img from 'gatsby-image';

import '../styles/slider.css';

const ImageSlider = ({ closeSlider, currentImage, images, changeImage }) => {
  const [image, setImage] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('auto');

  
  const findImage = () => {
    const image = images.find(img => img.id === currentImage);
    setImage(image.childImageSharp.fluid);
    setAspectRatio(image.childImageSharp.fluid.aspectRatio);
  };


  useEffect(() => {
    currentImage ? findImage() : setImage(null);

    document.addEventListener('keydown', closeSlider);

    return () => {
      document.removeEventListener('keydown', closeSlider);
    };
  }, [currentImage, closeSlider]);


  return (
    <div className="slider-container" onClick={closeSlider} role="dialog">
      <button onClick={closeSlider} className="btn close-btn">
        &times;
      </button>
      <button className="btn btn-prev" value="prev" onClick={changeImage}></button>
      <button className="btn btn-next" value="next" onClick={changeImage}></button>

      <div className="btn-container-mobile">
        <button className="btn-prev-mobile" value="prev" onClick={changeImage}></button>
        <button className="btn-next-mobile" value="next" onClick={changeImage}></button>
      </div>

      {
        image &&
        <div className="slider-image" style={{ width: `calc(80vh * ${aspectRatio})` }}>
          <Img fluid={image} />
        </div>
      }
    </div>
  );
};

export default ImageSlider;
