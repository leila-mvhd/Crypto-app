import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { convertData } from "../../helpers/convertData";

import styles from "./Chart.module.css";

function Chart({ chart, setChart }) {

  const [type, setType] = useState("prices");
  const {name,image,current_price,ath,market_cap} = chart.coin;
  const data = convertData(chart, type);

  return (
    <div className={styles.container}>
      <span className={styles.close} onClick={() => setChart(null)}>
        x
      </span>
      <div className={styles.chart}>
        <div className={styles.name}><img src={image}></img><span>{name}</span></div>
        <div className={styles.graph}>
         <ChartComponent data={data} type={type}/>
        </div>
        <div className={styles.types}>
          <button className={type === "prices"? styles.selected : null} onClick={()=>setType("prices")}>Prices</button>
          <button className={type === "market_caps"? styles.selected : null} onClick={()=>setType("market_caps")}>Market Caps</button>
          <button className={type === "total_volumes"? styles.selected : null} onClick={()=>setType("total_volumes")}>Total Volume</button>
        </div>
        <div className={styles.details}>
          <div>
            <p>Price: </p>
            <span>$ {current_price}</span>
          </div>
          <div>
            <p>ATH: </p>
            <span>$ {ath}</span>
          </div>
          <div>
            <p>Market Cap: </p>
            <span>{market_cap}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chart;

const ChartComponent = ({data,type}) =>{
    return(
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis dataKey={type} domain={["auto", "auto"]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey={type}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
}
export {ChartComponent}
