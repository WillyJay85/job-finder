import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Job Tracker</h1>
       Job target date <input type="text" div/> <button>Set</button> <br></br>
       Application submitted to<input type="text" div/> 
       Interview date <input type="text" div/>
       Notes of Interview <input type="text" div/> <button>Submit</button><br></br>
       Contact <input type="text" div/> 
       # of touches <input type="text" div/> 
       Interview date <input type="text" div/> 
       Notes of Interview <input type="text" div/> <button>Submit</button> <br></br>
       Offer? <input type="text" div/> 
       Salary<input type="text" div/> <button>Submit</button>
      </div>
    );
  }
}

export default App;
