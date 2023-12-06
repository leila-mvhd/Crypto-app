import React, { useEffect, useState } from "react";

//API
import { getCoinList } from "../../services/cryptoApi";

//components
import TableCoins from "../modules/TableCoins";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from "../modules/Chart";

const HomePage = () => {

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(getCoinList(page, currency));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
  }, [page, currency]);

  return (
    <>
      <Search currency={currency} setCurrency={setCurrency} />
      <TableCoins coins={coins} isLoading={isLoading} setChart={setChart}/>
      <Pagination page={page} setPage={setPage} />
      {!!chart && <Chart chart={chart} setChart={setChart}/>}
    </>
  );
};

export default HomePage;
