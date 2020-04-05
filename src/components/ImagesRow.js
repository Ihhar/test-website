import React from 'react';
import Img from 'gatsby-image';

const ImagesRow = ({ row, openSlider }) => {
  return (
    <div className="row">
      {row.length && row.map(({ id, childImageSharp }) => (
        <div
          className="image-wrapper" 
          key={id} 
          onClick={() => openSlider(id)}
          style={{
            width: `calc(40vh * ${childImageSharp.fluid.aspectRatio})`,
            minWidth: '350px'
          }}
        >
          <Img fluid={childImageSharp.fluid} />
          <span className="overlay"></span>
          <span className="show-icon"></span>
        </div>
      ))}
    </div>
  );
};

export default ImagesRow;
