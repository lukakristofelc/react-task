import React from 'react';
import './AdvertComponent.css';
import ImageSlider from './ImageSlider';

type Props = {
  title: string,
  address: string,
  price: string,
  images: ImageObject[]
}

interface ImageObject {
  url?: string;
}

const containerStyles = {
  width: "15em",
  height: "8.4em",
  margin: "0 auto",
};

const AdvertComponent = ({title, address, price, images} :Props) => {  
 return (
  <div className='advert'>
    <div className="advert-content">
      <div style={containerStyles}><ImageSlider slides={images}/></div>
      <div className='title'>{title}</div>
      <div className='address'>Address: {address}</div>
      <div className='address'>Price: {price}</div>
    </div>
  </div>
 )
}

export default AdvertComponent;