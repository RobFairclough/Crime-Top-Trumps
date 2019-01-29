import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import DateChooser from './components/DateChooser';
// import dateFormat from 'dateformat';
class App extends Component {
  state = {
    location: { latitude: '53.806648', longitude: '-3.049300' },
    month: '08',
    year: '2018'
  };

  componentDidMount() {
    console.log('mount');
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        const { month, year } = this.state;
        const { latitude, longitude } = position.coords;
        const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=${year}-${month}`;
        this.setState({ latitude, longitude, url });
        axios
          .get(url)
          .then(({ data }) => {
            const tally = data.reduce((tally, { category }) => {
              tally[category] = tally[category] ? tally[category] + 1 : 1;
              return tally;
            }, {});
            this.setState({ tally });
            console.log(tally);
          })
          .catch(console.log);
      });
    else {
      console.log('else');
      const { latitude, longitude } = this.state;
      const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=2018-01`;
      axios
        .get(url)
        .then(({ data }) => this.setState({ data }))
        .catch(console.log);
    }
  }

  setMonth = newMonth => {
    this.setState({ month: newMonth });
  };

  setYear = newYear => {
    this.setState({ year: newYear });
  };

  render() {
    const { tally = {} } = this.state;
    const data = {
      labels: [...Object.keys(tally)],
      datasets: [
        {
          data: [...Object.values(tally)],
          backgroundColor: [
            'red',
            'yellow',
            'pink',
            'green',
            'orange',
            'purple',
            'blue',
            'black',
            'blanchedalmond',
            'grey',
            'magenta',
            'brown',
            'indigo',
            'cyan',
            'yellowgreen'
          ]
        }
      ]
    };
    return (
      <div className="App">
        <h1>Crime in your area (or blackpool)</h1>
        {tally && <Doughnut data={data} />}
        <DateChooser setMonth={this.setMonth} setYear={this.setYear} />
      </div>
    );
  }
}

export default App;
