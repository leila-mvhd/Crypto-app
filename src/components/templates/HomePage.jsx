import React, { useEffect, useState } from "react";
import TableCoins from "../modules/TableCoins";
import { getCoinList } from "../../services/CryptoAPI";
import Pagination from "../modules/Pagination";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const res = await fetch(getCoinList(page));
      const json = await res.json();
      setCoins(json);
      setIsLoading(false);
    };

    getData();
  }, [page]);
  return (
    <>
      <Pagination page={page} setPage={setPage} />
      <TableCoins coins={coins} isLoading={isLoading} />
    </>
  );
};

export default HomePage;
