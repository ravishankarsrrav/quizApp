import React, { Component } from 'react';
import './header.css';

class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			leftTime : this.props.leftTime,
			showEndTest : this.props.showEndTest,
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			leftTime : nextProps.leftTime
		});
	}	
	render() {
		const { leftTime,showEndTest } = this.state;
    	let showEndTestClass = showEndTest ? 'loading' : 'hidden';
		return (
		<div className='d-flex justify-content-between header'>
			<span className='header-main'>Quiz Application</span>
			<span className={`header-time ${showEndTestClass}`}>{leftTime} left</span>
  			<span className={`header-end-test ml-1 ${showEndTestClass}`}>End Test</span>
		</div>
    );
	}
}

export default Header;