import React, { Component } from 'react';
import './Input.css';
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTargetDate: '',
            appSubmittedTo: '',
            interviewDate1: '',
            notesOfInterview1: '',
            offer: false,
            salary: 0.0
        }
        this.validateState = Joi.object().keys({
            jobTargetDate: Joi.date().format('YYYY-MM-DD'),
            appSubmittedTo: Joi.string().allow('', null),
            interviewDate1: Joi.date().format('YYYY-MM-DD'),
            notesOfInterview1: Joi.string().allow('', null),
            offer: Joi.string().allow('', null),
            salary: Joi.number().integer()
        })
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({[event.target.name]:event.value});
      }
      handleSubmit(event) {
        alert('An entry was submitted: ' + this.state.value);
        event.preventDefault();
      }
      componentDidMount() {
        fetch("http://localhost:8000/jobs",
        {
            method: "GET",
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
        .then(response => {
           this.setState({jobTargetDate: response.jobs[0].jobtargetdate})
        })
    }
   

    render() {
        return (
            <div className="App">
            <div className="head"/>
                <h1>Job Tracker</h1>
                <form>
                Job target date:
                <input type="text" name="jobTargetDate" value={this.state.jobTargetDate} onChange={this.handleChange}/><button>Set</button> <br></br>
                Application submitted to:
                <input type="text" name="appSubmittedTo" value={this.state.appSubmittedTo} onChange={this.handleChange}/>
                Interview date 1:
                <input type="text"name="interviewDate1" value={this.state.interviewDate1} onChange={this.handleChange}/>
                Notes of Interview 1:
                 <input type="text"name="notesOfInterview1" value={this.state.notesOfInterview1} onChange={this.handleChange}/> <button>Submit</button><br></br>
                Offer?:
                <input type="text"name="offer" value={this.state.offer} onChange={this.handleChange}/>
                Salary<input type="text" name="Salary" value={this.state.Salary} onChange={this.handleChange}/> <button>Submit</button>
                </form>
            </div>
        )
    }
}
export default Input;