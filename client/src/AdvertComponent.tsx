import React from 'react';
import './AdvertComponent.css';
import ImageSlider from './ImageSlider';

type Props = {
  title: string,
  address: string,
  images: ImageObject[]
}

interface ImageObject {
  url?: string;
}

const containerStyles = {
  width: "500px",
  height: "280px",
  margin: "0 auto",
};

const AdvertComponent = ({title, address, images} :Props) => {  
 return (
  <div className='advert'>
    <div className="advert-content">
      <div style={containerStyles}><ImageSlider slides={images}/></div>
      <div className='title'>{title}</div>
      <div className='address'>Address: {address}</div>
    </div>
  </div>
 )
}

export default AdvertComponent;