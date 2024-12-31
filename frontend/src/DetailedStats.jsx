import React from 'react'

const DetailedStats = (props) => {
    return (
      <>
        <h2 align="center">Detailed Statistics: {props.coin}</h2>
        <p>{props.data}</p>
      </>
    );
}

export default DetailedStats