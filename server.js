const express = require('express');
const mongoose = require('mongoose');

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const { mongoURI } = require('./config/keys');

const User = require('./models/User');
const Recipe = require('./models/Recipe');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = {
	typeDefs,
	resolvers,
};

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

app.use('/graphigl', graphiqlExpress({ endpointURL: '/graphigl' }));

app.use(
	'/graphgl',
	graphqlExpress({
		schema,
		context: {
			Recipe,
			User,
		},
	})
);

app.get('/', (req, res) => {
	res.send({ hello: 'hello' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
