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
		getCurrentUser: async (root, args, { authUser, User }) => {
			if (!authUser) {
				return null;
			}

			const user = await User.findOne({ username: authUser.username }).populate(
				{
					path: 'favourites',
					model: 'recipes',
				}
			);

			return user;
		},
	},
	Mutation: {
		addRecipe: async (root, args, { Recipe }) => {
			return await new Recipe(args).save();
		},

		removeRecipe: async (root, { id }, { Recipe }) => {
			return await Recipe.findByIdAndRemove(id);
		},

		signinUser: async (root, { username, password }, { User }) => {
			const user = await User.findOne({ username });
			if (!user) throw new Error('Username / password incorrect');

			const isMatch = await user.comparePassword(password);
			if (!isMatch) throw new Error('Username / password incorrect');

			return {
				token: createToken(user, jwt_secret),
			};
		},

		signupUser: async (root, { username, email, password }, { User }) => {
			const user_username = await User.findOne({ username });
			if (user_username) throw new Error('Username already exist');
			const user_email = await User.findOne({ email });
			if (user_email) throw new Error('Email already exist');

			const newUser = await new User({ username, email, password }).save();

			return {
				token: createToken(newUser, jwt_secret),
			};
		},
	},
};
