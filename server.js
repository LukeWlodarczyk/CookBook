const express = require('express');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');

require('./models/User');
require('./models/Recipe');

const app = express();

mongoose
	.connect(
		mongoURI,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('DB connected');
	})
	.catch(err => {
		console.log(err);
	});

app.use(express.json());

app.get('/', (req, res) => {
	res.send({ hello: 'hello' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
