const jwt = require('jsonwebtoken');

const { jwt_secret } = require('./config/keys');

const createToken = ({ username, email }, secret, expiresIn = '7d') =>
	jwt.sign(
		{
			username,
			email,
		},
		secret,
		{ expiresIn }
	);

exports.resolvers = {
	Query: {
		getAllRecipes: async (root, args, { Recipe }) => {
			return await Recipe.find();
		},
	},
	Mutation: {
		addRecipe: async (root, args, { Recipe }) => {
			return await new Recipe(args).save();
		},
		removeRecipe: async (root, { id }, { Recipe }) => {
			return await Recipe.findByIdAndRemove(id);
		},
		signupUser: async (root, { username, email, password }, { User }) => {
			const user_username = await User.findOne({ username });
			if (user_username) throw new Error('Username already exist');
			const user_email = await User.findOne({ email });
			if (user_email) throw new Error('Email already exist');

			const newUser = await new User({ username, email, password }).save();

			return {
				token: createToken(newUser, jwt_secret, 60 * 60 * 60 * 60),
			};
		},
	},
};
