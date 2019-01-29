import axios from 'axios';
import React, { Component } from 'react';

class PlayerSelect extends Component {
  state = {
    forces: ''
  };
  componentDidMount() {
    axios
      .get('https://data.police.uk/api/forces')
      .then(({ data }) => {
        this.setState({ forces: [...data] });
      })
      .catch(console.log);
  }
  render() {
    const { forces } = this.state;
    return (
      <select>
        {forces ? (
          forces.map(force => <option>{force.name}</option>)
        ) : (
          <option>Loading...</option>
        )}
      </select>
    );
  }
}

export default PlayerSelect;
