import React from 'react'

const Coin = ({ coinName, isSelected, onSelected }) => {
  return (
    <button
      className={isSelected ? "Button-coin-selected" : "Button-coin-unselected"}
      onClick={onSelected}
    >
      {coinName}
    </button>
  );
};

export default Coin