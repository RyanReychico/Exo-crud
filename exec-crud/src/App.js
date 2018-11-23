import React, { Component } from 'react';
import './App.css';
import Chaines from './components/chaines/chaines'


class App extends Component {
  render() {
    return (
      <div className="App">
      <main className="App-body">
               <Chaines></Chaines>          
      </main>    
      </div>
    
    );
  }
}

export default App;
