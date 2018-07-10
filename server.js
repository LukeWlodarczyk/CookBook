const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const jwt = require('jsonwebtoken');

const Recipe = require('./models/Recipe');
const User = require('./models/User');
const { mongoURI, jwt_secret } = require('./config/keys');

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

const corsOpts = {
	origin: 'http://localhost:3000',
	credentials: true,
};

app.use(cors(corsOpts));

app.use(async (req, res, next) => {
	const token = req.headers['authorization'];
	if (token !== 'null') {
		try {
			const currentUser = await jwt.verify(token, jwt_secret);
			req.authUser = currentUser;
		} catch (err) {
			console.log(err);
		}
	}

	next();
});

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.use(
	'/graphql',
	express.json(),
	graphqlExpress(({ authUser }) => ({
		schema,
		context: {
			Recipe,
			User,
			authUser,
		},
	}))
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('Server running on port ' + port);
});
