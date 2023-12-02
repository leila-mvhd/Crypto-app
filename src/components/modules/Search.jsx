import React, { useState, useEffect } from "react";
import { searchCoins } from "../../services/CryptoAPI";

import BarLoader from "react-spinners/BarLoader";

import styles from "./Search.module.css";

function Search({ currency, setCurrency }) {
  const [text, setText] = useState("");
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setCoins([]);
    if (!text) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        const res = await fetch(searchCoins(text), {
          signal: controller.signal,
        });
        const json = await res.json();

        if (json.coins) {
          setCoins(json.coins);
          setIsLoading(false);
        } else {
          alert(json.status.error_message);
        }
        // console.log(json);
        // console.log(coins);
      } catch (error) {
        if (error.name !== "AbortError") {
          alert(error.message);
        }
      }
    };
    setIsLoading(true);
    search();
    return () => controller.abort();
  }, [text]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        placeholder="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>
      {(!!coins.length || isLoading ) && (
        <div className={styles.searchResult}>
          {isLoading && <BarLoader color="#646cff" width="50px" height="3px" />}
          <ul>
            {coins.map((coin) => (
              <li key={coin.id}>
                <img src={coin.thumb}></img>
                <p>{coin.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
