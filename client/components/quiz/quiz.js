import React, { Component } from 'react';
import './quiz.css';
import Header from '../header/header';
import CookieManager from '../../utils/cookieManager';

class Quiz extends Component {
	constructor() {
		super();
		this.state = {
			questionNo: 1
		}
	}

	componentDidMount() {
		const quizID = CookieManager.get("quizID");
		if (quizID == null) {
			window.location.href = 'http://localhost:8080/start';
		}
	}

  	render() {
	  	const { questionNo } = this.state;
	    return (
	    <div>
	        <Header showEndTest={true} leftTime={'00:10:00'} />
	        <div className="container">
	        	<div className='col-sm-10 mt-3 question-header'><h5>Question {questionNo}</h5>
	        		<hr></hr>
	  			</div>
	        </div>
	    </div>   
	    );
  	}
}

export default Quiz;