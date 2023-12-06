import React from "react";

import {marketChart} from '../../services/cryptoApi'

import chartdown from "../../assets/chart-down.svg";
import chartup from "../../assets/chart-up.svg";
import styles from "./TableRow.module.css";

function TableRow({coin,setChart}) {
  const {id,name,symbol,image,current_price,price_change_percentage_24h : price_change,total_volume} = coin;
const showHandler = async () =>{
  try{
    const res = await fetch(marketChart(id))
    const json = await res.json()
    setChart({...json,coin});
  }catch(error){
    setChart(null);
  }
  
}

  return (
    <tr key={id}>
      <td>
        <div className={styles.symbol} onClick={showHandler}>
        <img src={image}></img>
       <span>{symbol}</span> 
        </div>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? styles.success : styles.error}>{price_change.toFixed(2)}</td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change > 0 ? chartdown : chartup}
        ></img>
      </td>
    </tr>
  );
}

export default TableRow;
