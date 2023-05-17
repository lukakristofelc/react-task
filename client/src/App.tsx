import './App.css';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import AdvertComponent from "./Components/Advert"
import Pagination from './Components/Pagination';

function App() {
  const [adverts, setAdverts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [advertsPerPage, setAdvertsPerPage] = useState(12);

  const getAdverts = useCallback(async() => {
    try {
      const adverts = await axios.get('/api/values/all');
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

  return (
    <div className="App">
    <h1>APARTMENTS FOR SALE</h1>
    <div className='divider'/>
    <Pagination totalAdverts={adverts.length} advertsPerPage={advertsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      {currentAdverts.map(advert => <AdvertComponent key={advert['id']} title={advert['title']} address={advert['address']} price={advert['price']} images={advert['images']} />)}
      <Pagination totalAdverts={adverts.length} advertsPerPage={advertsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
    </div>
  );
}

export default App;