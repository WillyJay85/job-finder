import React, { Component } from 'react';
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
            contact: '',
            numOfTouches: 0,
            interviewDate2: '',
            notesOfInterview2: '',
            offer: false,
            salary: 0.0
        }
        this.validateState = Joi.object().keys({
            jobTargetDage: Joi.date().format('YYYY-MM-DD'),
            appSubmittedTo: Joi.string().allow('', null),
            interviewDate1: Joi.date().format('YYYY-MM-DD'),
            notesOfInterview1: Joi.string().allow('', null),
            contact: Joi.string().allow('', null),
            numOfTouches: Joi.number().integer(),
            interviewDate2: Joi.date().format('YYYY-MM-DD'),
            notesOfInterview2: Joi.string().allow('', null),
            offer: Joi.string().allow('', null),
            salary: Joi.number().integer()
        })
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(){}
    handleSubmit(){}

    render() {
        return (
            <div className="App">
                <h1>Job Tracker</h1>
                Job target date <input type="text"></input> <button>Set</button> <br></br>
                Application submitted to<input type="text"></input>
                Interview date 1 <input type="text"></input>
                Notes of Interview 1 <input type="text"></input> <button>Submit</button><br></br>
                Contact <input type="text"></input>
                # of touches <input type="text"></input>
                Interview date 2 <input type="text"></input>
                Notes of Interview 2 <input type="text"></input> <button>Submit</button> <br></br>
                Offer? <input type="text"></input>
                Salary<input type="text"></input> <button>Submit</button>
            </div>
        )
    }
}
export default Input;