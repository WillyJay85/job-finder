import React, { Component } from 'react';
import './Input.css';
// import Job from './Job'
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const ListJobs = (props) => {
    return (
        <table>
            <tbody>
                {props.jobs.map((job) => {
                    return (
                        <tr key={job.id} onClick={e => props.onJobSelected(e, job)} >
                            <td></td>
                            <td>jobTargetDate</td>
                            <td>appSubmittedTo</td>
                            <td>interviewDate1</td>
                            <td>notesOfInterview1</td>
                            <td>offer</td>
                            <td>salary</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    )
}
// {
//     this.state.jobs.map(
//         (job, i) => {
//             return (

//             )
//         }
//     )
// }
//     )
// }

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
                Salary: 0.0,
            },
            jobs: []
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
        this.loadjobs = this.loadjobs.bind(this)
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        alert('An entry was submitted: ' + this.state);
        event.preventDefault();
    }

    // load jobs
    loadjobs() {
        fetch("http://localhost:8000/jobs",
            {
                method: "GET",
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({ jobs: response })
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }

    componentDidMount() {
        this.loadjobs()
    }

    insertJob() {
        const test = {
            jobTargetDate: this.state.jobTargetDate,
            appSubmittedTo: this.state.appSubmittedTo,
            interviewDate1: this.state.interviewDate1,
            notesOfInterview1: this.state.notesOfInterview1,
            offer: this.state.offer,
            salary: this.state.salary
        }
    }

    handleButtonClick(event) {
        const test = {
            jobTargetDate: this.state.jobTargetDate,
            appSubmittedTo: this.state.appSubmittedTo,
            interviewDate1: this.state.interviewDate1,
            notesOfInterview1: this.state.notesOfInterview1,
            offer: this.state.offer,
            salary: this.state.salary
        };
        fetch("http://localhost:8000/jobs",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(test)
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.loadjobs()
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }


    updateJobs() {
        const test = {
            jobTargetDate: this.state.jobTargetDate,
            appSubmittedTo: this.state.appSubmittedTo,
            interviewDate1: this.state.interviewDate1,
            notesOfInterview1: this.state.notesOfInterview1,
            offer: this.state.offer,
            salary: this.state.salary
        }
        console.log(test)

        fetch('http://localhost:8000/jobs/${this.state.id}', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(test)
        })
            .then(res => res.json())
            .then(response => {
                this.loadjobs();
            })
            .catch(err => {
                this.setState({ errmessage: err.message })
            })
    }

    // event.preventDefault()
    // const newJobTemp = {
    //     appSubmittedTo: this.state.appSubmittedTo.value,
    //     interviewDate1: this.state.interviewDate1.value,
    //     notesOfInterview1: this.state.notesOfInterview1.value,
    //     offer: this.state.offer.value,
    //     salary: this.state.salary.value
    // }
    // this.setState({ newJob: newJobTemp.jobs })


    showErrorMessage = () => {
        if (this.state.message) {
            return this.state.message
        }
    }

    saveJobs(event) {
        event.preventDefault();
        (this.state.id !== '') ? this.updateJobs() : this.insertJobs()
    }
    // renderJobs = () => {
    //     console.log(this.state)
    //     if (this.state.jobs)
    //     return this.state.jobs.map(
    //         (job, i) => {
    //             return (
    //                 <Job key={i} title={job.title} selectHandler={()=>{this.jobSelected(job)}} deleteHandler={()=>{this.jobDeleted(job._id)}} allowDelete={true} />

    //             )
    //         }
    //     )
    // }

    jobSelected = () => { }

    jobDeleted = () => { }


    allowDelete = true
    render() {
        return (
            <div className="App">
                <div className="head" />
                <h1>Job Tracker</h1>
                <form>
                    Job target date:
                    <input type="text" name="jobTargetDate" value={this.state.appSubmittedTo} onChange={this.handleChange}/> /><button>Set</button> <br></br>
                    Application submitted to:
                <input type="text" name="appSubmittedTo" value={this.state.appSubmittedTo} onChange={this.handleChange}/>
                    Interview date 1:
                    <input type="text" name="interviewDate1" value={this.state.appSubmittedTo} onChange={this.handleChange}/>
                    Notes of Interview 1:
                    <input type="text" name="notesOfInterview1" value={this.state.appSubmittedTo} onChange={this.handleChange}/>
                    Offer?:
                    <input type="text" name="offer" value={this.state.appSubmittedTo} onChange={this.handleChange}/>
                    Salary:
                    <input type="text" name="salary" value={this.state.appSubmittedTo} onChange={this.handleChange}/> <button onClick={e => this.handleButtonClick(e)}>Submit</button>
                </form>
                <ListJobs jobs={this.state.jobs} selectHandler={this.jobSelected} />
            </div>
        )
    }
}

export default Input;