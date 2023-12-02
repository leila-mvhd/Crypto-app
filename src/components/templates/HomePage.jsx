import React, { useEffect, useState } from "react";
import TableCoins from "../modules/TableCoins";
import { getCoinList } from "../../services/CryptoAPI";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('usd');

  

  useEffect(() => {
    const getData = async () => {
      try{
        setIsLoading(true);
        const res = await fetch(getCoinList(page,currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      }catch(error){
        console.log(error.message);
      }
      
    };

    getData();
  }, [page,currency]);

  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins coins={coins} isLoading={isLoading} />
      <Pagination page={page} setPage={setPage} />
    </>
  );
};

export default HomePage;
