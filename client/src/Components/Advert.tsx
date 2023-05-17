import React from 'react';
import './Advert.css';
import ImageSlider from './ImageSlider';

type Props = {
  title: string,
  address: string,
  price: string,
  images: string
}

interface ImageObject {
  url?: string;
}

const sliderSize = {
  width: "780px",
  height: "437px",
  margin: "0 auto",
};

const Advert = ({title, address, price, images} :Props) => {

  let imageUrls = parseImageURLS(images);

 return (
  <div className='advert'>
    <div className="advert-content">
      <div style={sliderSize}><ImageSlider slides={imageUrls}/></div>
      <div className='title'>{title}</div>
      <div className='address'>Address: {address}</div>
      <div className='address'>Price: {price}</div>
    </div>
  </div>
 )
}

function parseImageURLS(images: string) {
  let parsedImages = images.substring(2, images.length - 2).split('","');
  let imageObjects: ImageObject[] = [];

  parsedImages.forEach((image) => {
    imageObjects.push(
      {
        url: image   
      });
  });

  return imageObjects;
}

export default Advert;