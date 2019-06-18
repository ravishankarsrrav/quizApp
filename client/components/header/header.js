import React, { Component } from 'react';
import './header.css';
import CookieManager from '../../utils/cookieManager';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftTime : this.props.leftTime,
			showEndTest : this.props.showEndTest,
		}
		this.stopQuiz = this.stopQuiz.bind(this);
	}
	componentDidMount() {
		let { leftTime, showEndTest } = this.state;
		leftTime = (CookieManager.get("leftTime") != null) ? CookieManager.get("leftTime") : leftTime;
		if ((leftTime != null || leftTime != undefined) && showEndTest) {
			const splitTime = leftTime.split(':');
			let hours = splitTime[0];
			let minutes = splitTime[1];
			let seconds = splitTime[2];
			let phours = '00';
			let pminutes = '00';
			let pseconds = '00';
			const self = this;
			setInterval(() => {
				if (seconds > 0) {
					seconds = seconds - 1;
				}

				if (minutes > 0 && seconds == 0) {
					minutes = minutes - 1;
					seconds = 59;
				}

				if (hours > 0 && minutes == 0 && seconds == 0) {
					hours = hours - 1;
					minutes = 59;
				}

				if (hours == 0 && minutes == 0 && seconds == 0) {
					self.stopQuiz();
				}

				phours = (hours < 10 && hours.length < 2) ? `0${hours}` : hours;  
				pseconds = (seconds < 10 && seconds.length < 2) ? `0${seconds}` : seconds;  
				pminutes = (minutes < 10 && minutes.length < 2) ? `0${minutes}` : minutes;
				leftTime = `${phours}:${pminutes}:${pseconds}`;
				this.setState({
					leftTime : leftTime
				});
				CookieManager.set("leftTime", leftTime);
			}, 1000);
		}
	}

	stopQuiz() {
		sessionStorage.clear();
	}

	render() {
		const { leftTime,showEndTest } = this.state;
		let showEndTestClass = showEndTest ? '' : 'hidden';
		return (
			<div className='d-flex justify-content-between header'>
			<span className='header-main'>Quiz Application</span>
			<span className={`header-time ${showEndTestClass}`}>{leftTime} left</span>
			<span className={`header-end-test ml-1 ${showEndTestClass}`}  onClick={this.stopQuiz}>End Test</span>
			</div>
			);
	}
}

export default Header;