import { useState } from "react";
import './ImageSlider.css'

interface ImageObject {
  url?: string;
}

type Props = {
  slides: ImageObject[]
}

const ImageSlider = ({ slides } : Props) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const slideStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "23px",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div className="slider">
      <div>
        <div id="left-arrow" onClick={goToPrevious}>
          ❰
        </div>
        <div id="right-arrow" onClick={goToNext} >
          ❱
        </div>
      </div>
      <div style={slideStyle}></div>
    </div>
  );
};

export default ImageSlider;