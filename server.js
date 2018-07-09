const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const Recipe = require('./models/Recipe');
const User = require('./models/User');
const { mongoURI } = require('./config/keys');

const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

mongoose
	.connect(
		mongoURI,
		{ useNewUrlParser: true }
	)
	.then(() => {
		console.log('DB connected');
	})
	.catch(err => {
		console.error(err);
	});

const app = express();

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(
	'/graphql',
	express.json(),
	graphqlExpress(() => ({
		schema,
		context: {
			Recipe,
			User,
		},
	}))
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
