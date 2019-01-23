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
            salary: 0.0,
            newJob: {
                appSubmittedTo: '',
                interviewDate1: '',
                notesOfInterview1: '',
                offer: '',
                Salary: 0.0
            }
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
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        alert('An entry was submitted: ' + this.state);
        event.preventDefault();
    }
    componentDidMount() {
        fetch("http://localhost:8000/jobs",
            {
                method: "GET",
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({ jobTargetDate: response.jobs[0].jobtargetdate })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleButtonClick(event) {
        event.preventDefault()
        const newJobTemp = {
            appSubmittedTo: this.state.appSubmittedTo.value,
            interviewDate1: this.state.interviewDate1.value,
            notesOfInterview1: this.state.notesOfInterview1.value,
            offer: this.state.offer.value,
            salary: this.state.salary.value
        }
        this.setState({ newJob: newJobTemp })
    }
    render() {
        return (
            <div className="App">
                <div className="head" />
                <h1>Job Tracker</h1>
                <form>
                    Job target date:
                <input type="text" name="jobTargetDate" ref={el => { this.state.jobTargetDate = el }} /><button>Set</button> <br></br>
                    Application submitted to:
                {/* <input type="text" name="appSubmittedTo" value={this.state.appSubmittedTo} onChange={this.handleChange}/> */}
                    <input type="text" name="appSubmittedTo" ref={el => { this.state.appSubmittedTo = el }} />
                    Interview date 1:
                <input type="text" name="interviewDate1" ref={el => { this.state.interviewDate1 = el }} />
                    Notes of Interview 1:
                 <input type="text" name="notesOfInterview1" ref={el => { this.state.notesOfInterview1 = el }} /> <br></br>
                    Offer?:
                <input type="text" name="offer" ref={el => { this.state.offer = el }} />
                    Salary<input type="text" name="Salary" ref={el => { this.state.salary = el }} /> <button onClick={e => this.handleButtonClick(e)}>Submit</button>
                </form>
            </div>
        )
    }
}
export default Input;