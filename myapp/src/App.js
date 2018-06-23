import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyLink from './components/myLink';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to drive</h1>

        </header>
        <p className="App-intro">
            <MyLink text={'forward'}/><br/>
            <MyLink text={'left'}/>
            <MyLink text={'right'}/><br/>
            <MyLink text={'stop'}/>
        </p>
      </div>
    );
  }
}

export default App;
