import React from 'react';

const Chungus = props => {
  return (
    <img
      src="https://vignette.wikia.nocookie.net/battlefordreamisland/images/2/22/Better_chungus.png/revision/latest/scale-to-width-down/480?cb=20181227235801"
      className={props.hidden === 'true' ? 'chung hidden' : 'chung'}
      alt="chungus crime stats"
    />
  );
};

export default Chungus;
