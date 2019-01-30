import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import DateChooser from './components/DateChooser';
import PlayerSelect from './components/PlayerSelect';
import Scorecard from './components/Scorecard';
import Comparison from './components/Comparison';
class App extends Component {
  state = {
    latitude: '53.806648',
    longitude: '-3.049300',
    month: '12',
    year: '2018',
    forces: '',
    player1Force: '',
    player2Force: '',
    player1Neighbourhood: '',
    player2Neighbourhood: '',
    player1Location: '',
    player2Location: '',
    player1Neighbourhoods: '',
    player2Neighbourhoods: '',
    player1Score: '',
    player2Score: ''
  };

  componentDidMount() {
    console.log('mount');
    axios
      .get('https://data.police.uk/api/forces')
      .then(({ data }) => {
        this.setState({ forces: [...data] });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    const {
      month,
      year,
      player1Force,
      player2Force,
      player1Neighbourhood,
      player2Neighbourhood,
      player1Location,
      player2Location
    } = this.state;
    if (player1Force.id !== prevState.player1Force.id) {
      console.log('sending player 1 request');
      axios
        .get(`https://data.police.uk/api/${player1Force.id}/neighbourhoods`)
        .then(({ data }) =>
          this.setState({
            player1Neighbourhoods: data,
            player1Neighbourhood: '',
            player1Location: '',
            player1Score: ''
          })
        );
    }
    if (player2Force.id !== prevState.player2Force.id) {
      console.log('sending player 2 request');
      axios
        .get(`https://data.police.uk/api/${player2Force.id}/neighbourhoods`)
        .then(({ data }) =>
          this.setState({
            player2Neighbourhoods: data,
            player2Neighbourhood: '',
            player2Location: '',
            player2Score: ''
          })
        );
    }
    if (player1Neighbourhood.id !== prevState.player1Neighbourhood.id) {
      axios
        .get(
          `https://data.police.uk/api/${player1Force.id}/${
            player1Neighbourhood.id
          }`
        )
        .then(({ data }) => {
          const { centre: location } = data;
          this.setState({ player1Location: location });
        });
    }
    if (player2Neighbourhood.id !== prevState.player2Neighbourhood.id) {
      axios
        .get(
          `https://data.police.uk/api/${player2Force.id}/${
            player2Neighbourhood.id
          }`
        )
        .then(({ data }) => {
          const { centre: location } = data;
          this.setState({ player2Location: location });
        });
    }
    if (player1Location !== prevState.player1Location) {
      axios
        .get(
          `https://data.police.uk/api/crimes-street/all-crime?lat=${
            player1Location.latitude
          }&lng=${player1Location.longitude}&date=${year}-${month}`
        )
        .then(({ data }) => {
          const crimeData = data.map(crime => crime.category);
          const crimes = crimeData.reduce((cats, crime) => {
            cats[crime] = cats[crime] ? cats[crime] + 1 : 1;
            return cats;
          }, {});
          this.setState({ player1Score: crimes });
          console.log(crimes);
        });
    }
    if (player2Location !== prevState.player2Location) {
      axios
        .get(
          `https://data.police.uk/api/crimes-street/all-crime?lat=${
            player2Location.latitude
          }&lng=${player2Location.longitude}&date=${year}-${month}`
        )
        .then(({ data }) => {
          const crimeData = data.map(crime => crime.category);
          const crimes = crimeData.reduce((cats, crime) => {
            cats[crime] = cats[crime] ? cats[crime] + 2 : 2;
            return cats;
          }, {});
          this.setState({ player2Score: crimes });
          console.log(crimes);
        });
    }
  }

  setMonth = newMonth => {
    this.setState({ month: newMonth, tally: '' });
  };

  setYear = newYear => {
    this.setState({ year: newYear, tally: '' });
  };

  setPlayerForce = (player, force) => {
    this.setState({ [`player${player}Force`]: force });
  };

  setPlayerNeighbourhood = (player, hood) => {
    this.setState({ [`player${player}Neighbourhood`]: hood });
  };

  render() {
    const {
      tally,
      month,
      year,
      forces,
      player1Neighbourhoods,
      player2Neighbourhoods,
      player1Score,
      player2Score
    } = this.state;
    return (
      <div className="App">
        <h1>Local Police Top Trumps</h1>
        <DateChooser
          setMonth={this.setMonth}
          month={month}
          year={year}
          setYear={this.setYear}
        />
        <div id="players">
          <div id="player1">
            <label className="player-1-text">Player 1: </label>
            <PlayerSelect
              player="1"
              forces={forces}
              neighbourhoods={player1Neighbourhoods}
              setPlayerForce={this.setPlayerForce}
              setPlayerNeighbourhood={this.setPlayerNeighbourhood}
            />
            {player1Score && player2Score && (
              <Scorecard score={player1Score} player="1" />
            )}
          </div>
          {player1Score && player2Score && (
            <Comparison
              player1Score={player1Score}
              player2Score={player2Score}
            />
          )}
          <div id="player2">
            <label className="player-2-text">Player 2: </label>
            <PlayerSelect
              player="2"
              forces={forces}
              neighbourhoods={player2Neighbourhoods}
              setPlayerForce={this.setPlayerForce}
              setPlayerNeighbourhood={this.setPlayerNeighbourhood}
            />
            {player1Score && player2Score && (
              <Scorecard score={player2Score} player="2" />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
