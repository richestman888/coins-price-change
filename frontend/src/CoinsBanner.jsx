import { useContext, useState } from "react";
import Coin from "./Coin";
import { AppContext } from "./AppContext";

const CoinsBanner = () => {
  const [selected, setSelected] = useState(0);
  const data = useContext(AppContext);
  return (
    <>
      <Coin
        coinName={"All Coins"}
        isSelected={selected === 0}
        onSelected={() => {
          setSelected(0);
          data.setSelectedCoin("All Coins");
        }}
      />
      <Coin
        coinName={"ADAUSDT"}
        isSelected={selected === 1}
        onSelected={() => {
          setSelected(1);
          data.setSelectedCoin("ADAUSDT");
        }}
      />
      <Coin
        coinName={"ATOMUSDT"}
        isSelected={selected === 2}
        onSelected={() => {
          setSelected(2);
          data.setSelectedCoin("ATOMUSDT");
        }}
      />
      <Coin
        coinName={"BCHUSDT"}
        isSelected={selected === 3}
        onSelected={() => {
          setSelected(3);
          data.setSelectedCoin("BCHUSDT");
        }}
      />
      <Coin
        coinName={"BNBUSDT"}
        isSelected={selected === 4}
        onSelected={() => {
          setSelected(4);
          data.setSelectedCoin("BNBUSDT");
        }}
      />
      <Coin
        coinName={"BTCUSDT"}
        isSelected={selected === 5}
        onSelected={() => {
          setSelected(5);
          data.setSelectedCoin("BTCUSDT");
        }}
      />
      <Coin
        coinName={"CHZUSDT"}
        isSelected={selected === 6}
        onSelected={() => {
          setSelected(6);
          data.setSelectedCoin("CHZUSDT");
        }}
      />
      <Coin
        coinName={"COMPUSDT"}
        isSelected={selected === 7}
        onSelected={() => {
          setSelected(7);
          data.setSelectedCoin("COMPUSDT");
        }}
      />
      <Coin
        coinName={"CRVUSDT"}
        isSelected={selected === 8}
        onSelected={() => {
          setSelected(8);
          data.setSelectedCoin("CRVUSDT");
        }}
      />
      <Coin
        coinName={"DOGEUSDT"}
        isSelected={selected === 9}
        onSelected={() => {
          setSelected(9);
          data.setSelectedCoin("DOGEUSDT");
        }}
      />
      <Coin
        coinName={"DOTUSDT"}
        isSelected={selected === 10}
        onSelected={() => {
          setSelected(10);
          data.setSelectedCoin("DOTUSDT");
        }}
      />
      <Coin
        coinName={"EOSUSDT"}
        isSelected={selected === 11}
        onSelected={() => {
          setSelected(11);
          data.setSelectedCoin("EOSUSDT");
        }}
      />
      <Coin
        coinName={"ETCUSDT"}
        isSelected={selected === 12}
        onSelected={() => {
          setSelected(12);
          data.setSelectedCoin("ETCUSDT");
        }}
      />
      <Coin
        coinName={"ETHUSDT"}
        isSelected={selected === 13}
        onSelected={() => {
          setSelected(13);
          data.setSelectedCoin("ETHUSDT");
        }}
      />
      <Coin
        coinName={"LINKUSDT"}
        isSelected={selected === 14}
        onSelected={() => {
          setSelected(14);
          data.setSelectedCoin("LINKUSDT");
        }}
      />
      <Coin
        coinName={"LTCUSDT"}
        isSelected={selected === 15}
        onSelected={() => {
          setSelected(15);
          data.setSelectedCoin("LTCUSDT");
        }}
      />
      <Coin
        coinName={"SANDUSDT"}
        isSelected={selected === 16}
        onSelected={() => {
          setSelected(16);
          data.setSelectedCoin("SANDUSDT");
        }}
      />
      <Coin
        coinName={"SOLUSDT"}
        isSelected={selected === 17}
        onSelected={() => {
          setSelected(17);
          data.setSelectedCoin("SOLUSDT");
        }}
      />
      <Coin
        coinName={"SUSHIUSDT"}
        isSelected={selected === 18}
        onSelected={() => {
          setSelected(18);
          data.setSelectedCoin("SUSHIUSDT");
        }}
      />
      <Coin
        coinName={"TRXUSDT"}
        isSelected={selected === 19}
        onSelected={() => {
          setSelected(19);
          data.setSelectedCoin("TRXUSDT");
        }}
      />
      <Coin
        coinName={"XRPUSDT"}
        isSelected={selected === 20}
        onSelected={() => {
          setSelected(20);
          data.setSelectedCoin("XRPUSDT");
        }}
      />
    </>
  );
};

export default CoinsBanner;