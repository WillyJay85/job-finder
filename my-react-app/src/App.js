import React, { Component } from 'react';
import './App.css';
import Input from './Input.js'
import Networking from './Networking.js'
class App extends Component {
  render() {
    return (
      <div>
        <div className="App">
            <Input></Input>
            
        </div>
        <div className="App2">
          <Networking></Networking>
        </div>
        </div>
      
    )

  }
}



export default App;
