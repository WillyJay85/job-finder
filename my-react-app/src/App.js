import React, { Component } from 'react';
import './App.css';
import Input from './Input.js'
import Networking from './Networking.js'
import Job from './Job'
class App extends Component {
  constructor() {
    super()
    this.state= {
      jobs: []
    }
  }

  render() {
    return (
      <div>
        <div className="App">
            <Input></Input>
            
        </div>
        <div className="App2">
          <Networking></Networking>
          </div>
          <div className="Job">
          <Job></Job>
        </div>
        </div>
      
    )

  }
}



export default App;
