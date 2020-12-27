/*
Created by Eric Golde for ignZixxx 12/26/2020

Now you can have a better subscriber counter!
*/

//imports
var express = require('express');
var app = express();
var path = require('path');
var axios = require('axios');
let programConfig = require('./config.json');

//axios config
var httpConfig = {
	method: 'get',
	url: programConfig.request.url + programConfig.channelID,
	headers: programConfig.request.headers
};

//root
app.get('/', (req, res, next) => {
	res.json([ '/count', '/obs' ]);
});

//return the subscriber count in json
app.get('/count', async (req, res) => {
	const response = await axios(httpConfig).then();
	res.json({ subscribers: response.data });
});

//echo out the obs html file
app.get('/obs', function(req, res) {
	res.sendFile(path.join(__dirname + '/static/obs.html'));
});

//static directory for CSS and JS
app.use('/static', express.static('static'));

//
app.listen(programConfig.serverPort, () => {
	console.log('Server running on port ' + programConfig.serverPort);
});
