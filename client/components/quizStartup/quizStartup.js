import React, { Component } from 'react';
import './QuizStartup.css';
import Header from '../header/header';
import CookieManager from '../../utils/cookieManager';

const uuid = require("uuid");

class QuizStartup extends Component {
	constructor() {
		super();
		this.startQuiz = this.startQuiz.bind(this);
	}

	startQuiz() {
		let cookie = CookieManager.get("quizID");
		cookie = (cookie == null) ? uuid.v4() : cookie;
		CookieManager.set("quizID", cookie);
		window.location.href = '/quiz';
	}

  	render() {
    return (
    <div>
        <Header showEndTest={false}/>
        <div className="container">
		  	<div className='col-sm-10 mt-4 instruction-header'><h5>Please take a moment to read the instructions.</h5>
		        <hr></hr>
		        <li className='instruction-points'>The quiz will have 10 questions, each question will have four options select one of the correct options.</li>
		        <li className='instruction-points'>The quiz will automatically end in 10 minutes after the start time.</li>
		        <li className='instruction-points'>Don't close the browser tab in-between.</li>
		        <li className='instruction-points'>The quiz is just for fun!</li>
		  	</div>
		  	<div className='col-sm-10 mt-3'>
		  		<button className='btn btn-lg btn-success start-quiz-btn mb-4' onClick={this.startQuiz}>Start quiz</button>
		  	</div>
       </div>
    </div>   
    );
  	}
}

export default QuizStartup;