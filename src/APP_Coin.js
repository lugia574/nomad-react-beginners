// import Button from "./Button";
// import styles from "./App.module.css";
import React, { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const [values, setValues] = useState([]);
  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setValues((values) => ({ ...values, [name]: value }));
  };

  const [exchange, setExchange] = useState(0);
  const onSubmit = (event) => {
    event.preventDefault();
    if (values.money === 0) {
      return;
    }
    const money = values.money;
    const coin = Number(values.coin);

    setExchange(money / coin);
  };
  return (
    <div>
      <h1>The Coins! {loading ? null : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="money"
          type="number"
          placeholder="너의 돈을 입력하라"
        />
        <button>exchange</button>
        <hr />
        {loading ? (
          <strong>loading....</strong>
        ) : (
          <select onChange={onChange} name="coin">
            <option value="none">=== 선택 ===</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </form>
      <h1>${Math.round(exchange * 1000) / 1000}</h1>
    </div>
  );
}

export default App;
