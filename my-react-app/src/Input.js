import React, { Component } from 'react';
import './Input.css';
// import Job from './Job'
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);

const postJob = (job) => { 
    return fetch("http://localhost:8000/jobs",{    
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
    })
}

const putJob = (job) => {
   return fetch(`http://localhost:8000/jobs/${job.ID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(job)
    })
}

const ListJobs = (props) => {
    return (
        <table>
            <tbody>
                {props.jobs.map((job) => {
                    return (
                        <tr key={job.ID} onClick={e => props.onJobSelected(e, job)} >
                            <td></td>
                            <td>{job.jobTargetDate}</td>
                            <td>{job.appSubmittedTo}</td>
                            <td>{job.interviewDate1}</td>
                            <td>{job.notesOfInterview1}</td>
                            <td>{job.offer}</td>
                            <td>{job.salary}</td>
                        </tr>
                    )
                }
                )}
            </tbody>
        </table>
    )
}

class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            jobTargetDate: '',
            appSubmittedTo: '',
            interviewDate1: '',
            notesOfInterview1: '',
            offer: '',
            salary: '',
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
        this.loadJobs = this.loadJobs.bind(this)
        this.handleJobSubmit = this.handleJobSubmit.bind(this)
        this.insertJob = this.insertJob.bind(this)
        this.updateJob = this.updateJob.bind(this)
        this.jobDeleted = this.jobDeleted.bind(this)
    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        alert('An entry was submitted: ' + this.state);
        event.preventDefault();
    }

    handleDelete(event) {
        event.preventDefault();

        this.state.jobID && this.jobDeleted(this.state.jobID)
    }

    // load jobs
    loadJobs() {
        fetch("http://localhost:8000/jobs",
            {
                method: "GET",
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                this.setState({ jobs: response.jobs })
            })
            .catch(err => {
                console.log(err)
                throw err
            })
    }

    componentDidMount() {
        this.loadJobs()
    }

    insertJob(job) {
        console.log('calling post job')
        postJob(job)
        .then(() => {
            console.log('post job complete')
            this.loadJobs()
        })
        .catch(error =>{
            console.log(error)
            Promise.reject(error)
        })
    }

    handleJobSubmit(event) {
        event.preventDefault()
        const job = {
            jobTargetDate: this.state.jobTargetDate,
            appSubmittedTo: this.state.appSubmittedTo,
            interviewDate1: this.state.interviewDate1,
            notesOfInterview1: this.state.notesOfInterview1,
            offer: this.state.offer,
            salary: this.state.salary
        };
        if (this.state.jobID) {
            job.ID = this.state.jobID
            this.updateJob(job)
        }
        else {
            this.insertJob(job)
        }
        
    }


    updateJob(job) {
        
        putJob(job)
        .then(() =>{
            this.loadJobs()
        }) 
        .catch(error =>{
            console.log(error)
            Promise.reject(error)
        })
    }

    showErrorMessage = () => {
        if (this.state.message) {
            return this.state.message
        }
    }

    saveJobs(event) {
        event.preventDefault();
        (this.state.id !== '') ? this.updateJobs() : this.insertJobs()
    }

    jobSelected = (event, job) => { 
        this.setState({
            jobTargetDate: job.jobTargetDate,
            appSubmittedTo: job.appSubmittedTo,
            interviewDate1: job.interviewDate1,
            notesOfInterview1: job.notesOfInterview1,
            offer: job.offer,
            salary: job.salary,
            jobID: job.ID
        })
    }

    jobDeleted = (event) => { 
        event.preventDefault();
        console.log(`deleting ${this.state.jobID}`)
        fetch(`http://localhost:8000/jobs/${this.state.jobID}`,{
            method: "DELETE"
        })
        .then(res => res.json())
        .then(response => {
            console.log('delete completed')
            this.loadJobs();
        })
        .catch(err =>{
            console.error(err)
            this.setState({errmessage: err.message})
        })
    }


    allowDelete = true
    render() {
        return (
            <div className="App">
                <div className="head" />
                <h1>Job Tracker</h1>
                <form onSubmit = {this.handleJobSubmit}>
                    Job target date:
                    <input type="text" name="jobTargetDate" value={this.state.jobTargetDate} onChange={this.handleChange} /><button>Set</button> <br></br>
                    Application submitted to:
                <input type="text" name="appSubmittedTo" value={this.state.appSubmittedTo} onChange={this.handleChange}/>
                    Interview date 1:
                    <input type="text" name="interviewDate1" value={this.state.interviewDate1} onChange={this.handleChange}/>
                    Notes of Interview 1:
                    <input type="text" name="notesOfInterview1" value={this.state.notesOfInterview1} onChange={this.handleChange}/>
                    Offer?:
                    <input type="text" name="offer" value={this.state.offer} onChange={this.handleChange}/>
                    Salary:
                    <input type="text" name="salary" value={this.state.salary} onChange={this.handleChange}/><br></br> 
                    <button type="submit">Submit</button>
                    <button onClick={e => this.jobDeleted(e)}>Delete</button>
                </form>
                <div className="Data">
                <ListJobs jobs={this.state.jobs} onJobSelected={this.jobSelected} />
                </div>
            </div>
        )
    }
}

export default Input;