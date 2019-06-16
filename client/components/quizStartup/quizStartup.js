import React, { Component } from 'react';
import './QuizStartup.css';
import Header from '../header/header';

class QuizStartup extends Component {
  render() {
    return (
      <div>
        <Header showEndTest={false}/>
      </div>
    );
  }
}

export default QuizStartup;