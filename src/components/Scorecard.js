import React from 'react';
import { Bar } from 'react-chartjs-2';

const Scorecard = ({ player, score }) => {
  const data = {
    labels: Object.keys(score),
    datasets: [
      {
        label: `number of crimes`,
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
      <ul>
        {Object.entries(score).map(entry => (
          <li>
            {entry[0]}: {entry[1]}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Scorecard;
