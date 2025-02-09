import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";


const Chart = ({ cleanliness, uniqueness, coin, chartsData, options, httpErrorPlotChart }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  };

  const rowStyle = {
    margin: "0",
    padding: "0", // Remove padding
    margin: "0", // Remove margin
    lineHeight: "1.0",
    whiteSpace: "nowrap",
  };

  const [dataRetrievalStatus, setDataRetrievalStatus] = useState(false);
  const [generatingChartStatus, setGeneratingChartStatus] = useState(false);

  return (
    <>
      <div style={containerStyle}>
        <h4 style={rowStyle}>Database status:&nbsp;</h4>
        <h4
          style={{
            ...rowStyle,
            marginLeft: "8px",
            color: cleanliness ? "green" : "red",
          }}
        >
          {cleanliness}
        </h4>
        <h4 style={{ ...rowStyle, marginLeft: "8px" }}>and</h4>
        <h4
          style={{
            ...rowStyle,
            marginLeft: "8px",
            color: uniqueness ? "green" : "red",
          }}
        >
          {uniqueness}
        </h4>
      </div>
      <div style={containerStyle}>
        <h4 style={rowStyle}>Data retrieval from DB status:&nbsp;</h4>
        <h4
          style={{
            ...rowStyle,
            marginLeft: "8px",
            color: dataRetrievalStatus ? "green" : "red",
          }}
        >
          {dataRetrievalStatus ? "In progress ..." : "Failed"}
        </h4>
      </div>
      <div style={containerStyle}>
        <h4 style={rowStyle}>Generating chart status:&nbsp;</h4>
        <h4 style={{ ...rowStyle, marginLeft: "8px" }}>
          {generatingChartStatus ? "In progress ..." : "Failed"}
        </h4>
      </div>
      <h2 align="center">Price Change Percent Chart: {coin}</h2>
      {httpErrorPlotChart && <div style={{ color: "red" }}>{httpErrorPlotChart}</div>}
      {chartsData.map((chartData, index) => (
        <div key={index} style={{ margin: "20px 0" }}>
          <Line data={chartData} options={options} />
        </div>
      ))}
    </>
  );
};

export default Chart;
