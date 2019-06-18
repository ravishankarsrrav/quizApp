import React, { Component } from 'react';
import Header from '../header/header';
import CookieManager from '../../utils/cookieManager';

class Finish extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const quizID = CookieManager.get("quizID");
		if (quizID != null) {
			window.location.href = 'http://localhost:8080/quiz';
		}
	}	

	

  	render() {
    return (
    <div>
        <Header showEndTest={false} />
        <div className="container">
		  	<div className='col-sm-10 mt-4'><h4>Thank you for participating in quiz. Your result will be announced on website soon.</h4>
		  	</div>
       </div>
    </div>   
    );
  	}
}

export default Finish;