import React from 'react';
import Chungus from './Chungus';

const Comparison = ({
  player1Score,
  player2Score,
  player1Neighbourhood,
  player2Neighbourhood
}) => {
  console.log(player1Score, player2Score);
  const categories = [
    ...Object.keys(player1Score),
    ...Object.keys(player2Score)
  ].reduce((acc, curr) => {
    if (!acc.includes(curr)) acc.push(curr);
    return acc;
  }, []);
  const wins = [];
  categories.forEach(cat => {
    if (
      (player1Score[cat] && !player2Score[cat]) ||
      player2Score[cat] < player1Score[cat]
    )
      wins.push({
        category: cat,
        winner: 'player-2',
        player1Score,
        player2Score
      });
    if (
      (!player1Score[cat] && player2Score[cat]) ||
      player1Score[cat] < player2Score[cat]
    )
      wins.push({
        category: cat,
        winner: 'player-1',
        player1Score,
        player2Score
      });
  });
  console.log(wins);
  const p1Total = Object.values(player1Score).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const p2Total = Object.values(player2Score).reduce(
    (acc, curr) => acc + curr,
    0
  );
  const winner =
    p1Total > p2Total
      ? player2Neighbourhood.name
      : p1Total < p2Total
      ? player1Neighbourhood.name
      : 'Chungus';

  return (
    <div>
      <h2 className={`${winner}-text`}>WINNER: {winner}</h2>
      <ul id="compare-list">
        {winner === 'Chungus' ? (
          <Chungus />
        ) : (
          wins.map(win => (
            <>
              <div className={`${win.winner}-arrow`} />
              <li className={`${win.winner}-text`}>
                {win.category}: {win.winner}
              </li>
            </>
          ))
        )}
      </ul>
    </div>
  );
};

export default Comparison;
