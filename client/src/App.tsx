import './App.css';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AdvertComponent from "./AdvertComponent"
import Pagination from './Pagination';

interface ImageObject {
  url?: string;
}

function App() {
  const [adverts, setAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [advertsPerPage, setAdvertsPerPage] = useState(8);

  const getAdverts = useCallback(async() => {
    try {
      const adverts = await axios.get('/api/values/all');
      console.log(adverts);
      setAdverts(adverts['data']['rows']);
    }
    catch(e) {
      console.log(e);
    }
  }, [])

  useEffect(() => {
    getAdverts();
  }, [])

  const lastAdvertIndex = currentPage * advertsPerPage;
  const firstAdvertIndex = lastAdvertIndex - advertsPerPage;
  const currentAdverts = adverts.slice(firstAdvertIndex, lastAdvertIndex);

  console.log(currentAdverts);

  return (
    <div className="App">
    <h1>APARTMENTS FOR SALE</h1>
    <div style={{ borderTop: "4px solid darkcyan", marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 40}}></div>
    <Pagination totalAdverts={adverts.length} advertsPerPage={advertsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      {currentAdverts.map(advert => <AdvertComponent title={advert['title']} address={advert['address']} price={advert['price']} images={parseImageURLS(advert['images'])} />)}
      <Pagination totalAdverts={adverts.length} advertsPerPage={advertsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  );
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

export default App;