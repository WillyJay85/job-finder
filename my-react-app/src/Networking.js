import React, { Component } from 'react';
import './Networking.css';
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

class Networking extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contact: '',
            numOfTouches: '',
            interviewDate2: '',
            notesOfInterview2: '',
            offer: false,
            salary: 0.0
        }
        this.validateState = Joi.object().keys({
            contact: Joi.string().allow('', null),
            numOfTouches: Joi.number().integer(),
            interviewDate2: Joi.date().format('YYYY-MM-DD'),
            notesOfInterview: Joi.string().allow('', null),
            offer: Joi.string().allow('', null),
            salary: Joi.number().integer()
        })
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(event)
      }
      handleSubmit(event) {
        alert('An entry was submitted:' + this.state.value);
        console.log(event)
      }

        render() {
            return (
                <div className="App2">
                    Contact:
                    <input type="text" name="contact" value={this.state.contact} onChange={this.handleChange}/>
                    Num of Touches:
                    <input type="text" name="numOfTouches" value={this.state.numOfTouches} onChange={this.handleChange}/>
                    Interview date2:
                    <input type="text" name="interviewDate2" value={this.state.interviewDate2} onChange={this.handleChange}/>
                    Notes of Interview <input type="text"></input> <button>Submit</button> <br></br>
                    Offer? <input type="text"></input>
                    Salary<input type="text"></input> <button>Submit</button>
                </div>
            )
        }
    }
    export default Networking;