import React from 'react';

const PlayerSelect = props => {
  const {
    forces,
    player,
    setPlayerForce,
    setPlayerNeighbourhood,
    neighbourhoods
  } = props;

  const handlePlayerChoice = e => {
    const force = forces.filter(force => force.name === e.target.value)[0];
    console.log(force);
    setPlayerForce(player, force);
  };

  const handlePlayerNeighbourhood = e => {
    console.log(e.target.value);
    const neighbourhood = neighbourhoods.filter(
      hood => hood.name === e.target.value
    )[0];
    setPlayerNeighbourhood(player, neighbourhood);
  };
  return (
    <>
      <select onChange={handlePlayerChoice}>
        {forces ? (
          forces.map(force => <option key={force.id}>{force.name}</option>)
        ) : (
          <option>Loading...</option>
        )}
      </select>
      {neighbourhoods && (
        <select onChange={handlePlayerNeighbourhood}>
          {neighbourhoods.map(neighbourhood => (
            <option key={neighbourhood.id}>{neighbourhood.name}</option>
          ))}
        </select>
      )}
    </>
  );
};

export default PlayerSelect;
