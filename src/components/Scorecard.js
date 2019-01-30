import React from 'react';
import { Bar } from 'react-chartjs-2';

const Scorecard = ({ player, score }) => {
  const data = {
    labels: Object.keys(score),
    datasets: [
      {
        label: `player ${player}'s crime chart`,
        backgroundColor: 'white',
        hoverBackgroundColor: 'grey',
        borderColor: 'blanchedalmond',
        data: Object.values(score)
      }
    ]
  };
  return (
    <>
      {/* <img>picture of police? random array of images? </img> */}
      <Bar data={data} />
    </>
  );
};

export default Scorecard;
