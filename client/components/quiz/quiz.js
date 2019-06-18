import React, { Component } from 'react';
import './quiz.css';
import Header from '../header/header';
import CookieManager from '../../utils/cookieManager';
import axios from 'axios';

class Quiz extends Component {
	constructor() {
		super();
		this.state = {
			questionNo: 1,
			answer : "None",
			errorMsg : "",
			question : "",
			questionID : "",
			options : []
		}
		this.onAnswerSelect = this.onAnswerSelect.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.previousQuestion = this.previousQuestion.bind(this);
		this.submitQuiz = this.submitQuiz.bind(this);
	}

	componentDidMount() {
		const quizID = CookieManager.get("quizID");
		if (quizID == null) {
			window.location.href = 'http://localhost:8080/start';
		}
		let {questionNo} = this.state;
		this.getQuestion(questionNo);
	}

	nextQuestion() {
		let {questionNo} = this.state;
		questionNo = questionNo + 1;
		this.setState({
			questionNo : questionNo
		})
		this.getQuestion(questionNo);
	}

	previousQuestion() {
		let {questionNo} = this.state;
		questionNo = questionNo - 1;
		this.setState({
			questionNo : questionNo
		})
		this.getQuestion(questionNo);
	}

	getQuestion(questionNo) {
	    const self = this;
	    let url = `/api/v1/question/${questionNo}`;
	    axios.get(url)
	        .then(res => self.onGetQuestionSuccess(res.data))
	        .catch(error => self.onGetQuestionFailure(error));
    }

    onGetQuestionSuccess(res) {
    	this.setState({
    	 	question : res.question.question,
    	 	options : res.question.options,
    	 	questionID : res.question.id,
    	 	answer : (CookieManager.get(res.question.id) != null) ? CookieManager.get(res.question.id) : ""
    	});
	}

	submitQuiz() {
		sessionStorage.clear();
		window.location.href = 'http://localhost:8080/finish';
	}

	onGetQuestionFailure(error) {
		if(error.response) {
	      this.setState({
	        errorMsg : (error.response.data.message) ? error.response.data.message : 'Internal server error. Please try again',
	      });
	    } else {
	      this.setState({
	        errorMsg : 'Internal server error. Please try again',
	      });
	    }
	}

	onAnswerSelect(e) {
		console.log(e.currentTarget);
		this.setState({
			answer : e.currentTarget.value
		});
		const { questionID } = this.state;
		CookieManager.set(questionID, e.currentTarget.value);
	}

	

  	render() {
	  	const { answer ,questionNo, errorMsg, options, question } = this.state;
	  	let showPreviousClass = (questionNo > 1) ? '' : 'hidden';
	  	let showSubmitClass = (questionNo == 10) ? '' : 'hidden';
	  	let hideNextClass = (questionNo == 10) ? 'hidden' : '';
	  	const displayError = (errorMsg != '') ? '' : 'hidden';
	    return (
	    <div>
	        <Header showEndTest={true} leftTime={'00:10:00'} />
	        <div className="container">
	        	<div className={`mt-3 col-sm-10 ${displayError}`}>
                	<div className='alert-danger alert col-sm-12'>
                	{errorMsg}
                	</div>
              	</div>
	        	<div className='col-sm-10 mt-3 question-header'><h5>Question {questionNo}</h5>
	        		<hr></hr>
	  			</div>
	  			<div className='col-sm-10 question-box'>{question}</div>
		        <div className="col-sm-10 question-option-box">
			        <div className="form-check">
			            <label className="form-check-label">
			            	<input type="radio" className="form-check-input" name="answer" value={options[0]} onChange={this.onAnswerSelect} checked={answer === options[0]} />{options[0]}
			            </label>
			        </div>
		        </div>
		        <div className="col-sm-10 question-option-box">
		          	<div className="form-check">
		            	<label className="form-check-label">
		              		<input type="radio" className="form-check-input" name="answer" value={options[1]} onChange={this.onAnswerSelect} checked={answer === options[1]}  />{options[1]}
		            	</label>
		          	</div>
		        </div>
		        <div className="col-sm-10 question-option-box">
		          <div className="form-check">
		            <label className="form-check-label">
		              <input type="radio" className="form-check-input" name="answer" value={options[2]} onChange={this.onAnswerSelect} checked={answer === options[2]}  />{options[2]}
		            </label>
		          </div>
		        </div>
		        <div className="col-sm-10 question-option-box">
		          <div className="form-check">
		            <label className="form-check-label">
		              <input type="radio" className="form-check-input" name="answer" value={options[3]}  onChange={this.onAnswerSelect} checked={answer === options[3]}  />{options[3]}
		            </label>
		          </div>
		        </div>
		        <div className='col-sm-10 navigation-box mt-2 flex-row-reverse d-flex'>
		          	<button className={`btn btn-sm btn-primary navigation-btn ml-3 ${hideNextClass}`} type='button'  onClick={this.nextQuestion}>Next</button>
		          	<button className={`btn btn-sm btn-success navigation-btn ml-3 ${showSubmitClass}`} type='button'  onClick={this.submitQuiz}>Submit</button>
		          	<button className={`btn btn-sm btn-secondary navigation-btn ${showPreviousClass}`} type='button'  onClick={this.previousQuestion}>Previous</button>
		        </div>
	        </div>
	    </div>   
	    );
  	}
}

export default Quiz;