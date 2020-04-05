import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ImagesRow from './ImagesRow';
import ImageSlider from './ImageSlider';
import ControlButtons from './ControlButtons';
import { portableDevice, lockScrolling } from '../utils';
import '../styles/gallery.css';

const Gallery = () => {
  const [firstRow, setFirstRow] = useState([]);
  const [secondRow, setSecondRow] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [slider, setSlider] = useState(false);
  const [chosenImage, setChosenImage] = useState('');
  const [imageIndex, setImageIndex] = useState(null);
  const [translate, setTranslate] = useState(0);
  const [hideButtons, setHideButtons] = useState(false);

  const container = useRef(null);

  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }`
  );

  useEffect(() => {
    setHideButtons(portableDevice());
  }, []);

  useEffect(() => {
    const firstRowImages = [];
    const secondRowImages = [];
    const images = [];

    data.allFile.edges.map(({ node }, i) => {
      images.push(node);
      setAllImages(images);

      return data.allFile.edges.length / 2 > i ?
        firstRowImages.push(node) :
        secondRowImages.push(node);
    });

    setFirstRow([ ...firstRowImages ]);
    setSecondRow([ ...secondRowImages ]);
  }, [data.allFile.edges]);

  useEffect(() => {
    const main = container.current;
    main.style.transform = `translateX(-${translate}px)`;
  }, [translate]);

  const openSlider = (imageId) => {
    const imgIndex = allImages.findIndex(img => img.id === imageId);

    setImageIndex(imgIndex);
    setSlider(true);
    setChosenImage(imageId);
    lockScrolling(true);
  };

  const closeSlider = (event) => {
    const { className } = event.target;
    const overlay = 'slider-container';
    const closeBtn = 'btn close-btn';

    if (className === overlay || className === closeBtn || event.keyCode === 27) {
      setSlider(false);
      setChosenImage('');
      lockScrolling(false);
    }
  };
  
  const changeImage = (event) => {
    const { value } = event.target;
    const isLastImg = imageIndex >= allImages.length - 1;
    const isFirstImg = imageIndex <= 0;

    if (value === 'next' && !isLastImg) {
      setChosenImage(allImages[imageIndex + 1].id);
      setImageIndex(imageIndex + 1);
    }

    if (value === 'prev' && !isFirstImg) {
      setChosenImage(allImages[imageIndex - 1].id);
      setImageIndex(imageIndex - 1);
    } 
  };

  return (
    <Fragment>
      <div className="scroll-container" ref={container}>
        <ImagesRow row={firstRow} openSlider={openSlider} />
        <ImagesRow row={secondRow} openSlider={openSlider} />
      </div>

      {
        !hideButtons && <ControlButtons
          container={container}
          setTranslate={setTranslate}
          translate={translate}
        />
      }

      {
        slider &&
        <ImageSlider
          closeSlider={closeSlider}
          currentImage={chosenImage}
          changeImage={changeImage}
          images={allImages}
        />
      }
    </Fragment>
  );
};

export default Gallery;
