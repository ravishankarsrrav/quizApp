'use strict';
const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
const path = require('path');
const fs = require('fs');
let rawdata = fs.readFileSync(path.join(__dirname, '../questions/questions.json'));
let questions = JSON.parse(rawdata);
app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/js', express.static(path.join(__dirname, '../dist')));
app.use('/start', express.static(path.join(__dirname, '../client/views/quizStartup/quizStartup.html')));
app.use('/quiz', express.static(path.join(__dirname, '../client/views/quiz/quiz.html')));
app.use('/finish', express.static(path.join(__dirname, '../client/views/finish/finish.html')));


// api request to get question
app.get('/api/v1/question/:questionNo', (req, res) => {
	let {questionNo} = req.params;
	let data = questions[questionNo - 1];
	res.status(200).json({
		"question" : data,
		"success" : true,
	});
});

// request to redirect to start
app.get('/', (req, res, next) => {
	res.redirect('/start');
});

// robots.txt
app.get('/robots.txt', (req, res) => {
	res.type('text/plain');	
	res.send("User-agent: *\nAllow: /* \n");
})

// request to catch undefined endpoints
app.get('*', (req, res) => {
  res.redirect('/');
});
// start the server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
