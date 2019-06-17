import React, { Component } from 'react';
import './quiz.css';
import Header from '../header/header';
import CookieManager from '../../utils/cookieManager';

class QuizStartup extends Component {
	constructor() {
		super();
		questionNo : 1
	}

	componentDidMount() {
		const quizID = CookieManager.get("quizID");
		if (quizID != null) {
			// window.location.href = 'http://localhost:8080/start';
		}
	}

  	render() {
    return (
    <div>
        <Header showEndTest={true} leftTime={'00:10:00'} />
    </div>   
    );
  	}
}

export default QuizStartup;