import React from "react";
import BarLoader from "react-spinners/BarLoader";

import TableRow from "./TableRow";
import styles from "./TableCoin.module.css";

const TableCoins = ({ coins, isLoading}) => {
  return (
    <div className={styles.container}>
      {isLoading ? <BarLoader color="#646cff" /> :
      <table className={styles.table}>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>Total Volume</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <TableRow coin={coin} key={coin.id}/>
        ))}
      </tbody>
    </table>}
    </div>
  );
};

export default TableCoins;
