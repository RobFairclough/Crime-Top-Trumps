import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import DateChooser from './components/DateChooser';
import Chungus from './components/Chungus';
// import dateFormat from 'dateformat';
class App extends Component {
  state = {
    latitude: '53.806648',
    longitude: '-3.049300',
    month: '12',
    year: '2018'
  };

  componentDidMount() {
    console.log('mount');
    const { month, year, latitude, longitude } = this.state;
    if (
      !localStorage.getItem('latitude') &&
      !localStorage.getItem('longitude')
    ) {
      if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
          const { latitude, longitude } = position.coords;
          localStorage.setItem('latitude', latitude);
          localStorage.setItem('longitude', longitude);
          this.setState({ latitude, longitude });
        });
    } else {
      const latitude = localStorage.getItem('latitude');
      const longitude = localStorage.getItem('longitude');
      this.setState({ latitude, longitude });
      console.log(this.state);
    }
    const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=${year}-${month}`;
    console.log(url);
    axios
      .get(url)
      .then(({ data }) => {
        console.log(url);
        const tally = data.reduce((tally, { category }) => {
          tally[category] = tally[category] ? tally[category] + 1 : 1;
          return tally;
        }, {});
        this.setState({ tally });
      })
      .catch(console.log);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('update');
    const { month: prevMonth, year: prevYear } = prevState;
    const { month, year, latitude, longitude } = this.state;
    if (month !== prevMonth || year !== prevYear) {
      const url = `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}&date=${year}-${month}`;
      console.log(url);
      axios
        .get(url)
        .then(({ data }) => {
          console.log(url);
          const tally = data.reduce((tally, { category }) => {
            tally[category] = tally[category] ? tally[category] + 1 : 1;
            return tally;
          }, {});
          this.setState({ tally });
        })
        .catch(console.log);
    }
  }

  setMonth = newMonth => {
    this.setState({ month: newMonth, tally: '' });
  };

  setYear = newYear => {
    this.setState({ year: newYear, tally: '' });
  };

  render() {
    const { tally, month, year } = this.state;
    const data = tally
      ? {
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
              ],
              fontColor: ['white']
            }
          ]
        }
      : '';
    return (
      <div className="App">
        <h1>{tally ? 'Crime in your area (or blackpool)' : 'Loading...'}</h1>
        <DateChooser
          setMonth={this.setMonth}
          month={month}
          year={year}
          setYear={this.setYear}
        />
        {tally && <Doughnut data={data} />}
        <Chungus hidden={tally ? 'true' : 'false'} />
      </div>
    );
  }
}

export default App;
