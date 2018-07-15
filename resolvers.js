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
			return await Recipe.find().sort({ createdDate: 'desc' });
		},
		getRecipe: async (root, { id }, { Recipe }) => {
			return await Recipe.findById(id);
		},
		getUserRecipes: async (root, { username }, { Recipe }) => {
			return await Recipe.find({ username }).sort({ createdDate: 'desc' });
		},
		searchRecipes: async (root, { searchTerm }, { Recipe }) => {
			if (searchTerm) {
				return await Recipe.find(
					{
						$text: { $search: searchTerm },
					},
					{
						score: { $meta: 'textScore' },
					}
				).sort({
					score: { $meta: 'textScore' },
				});
			}

			return await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });
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

		likeRecipe: async (root, { id, username }, { Recipe, User }) => {
			const recipe = await Recipe.findByIdAndUpdate(id, { $inc: { likes: 1 } });

			await User.findOneAndUpdate(
				{ username },
				{
					$addToSet: {
						favourites: id,
					},
				}
			);

			return recipe;
		},

		unlikeRecipe: async (root, { id, username }, { Recipe, User }) => {
			const recipe = await Recipe.findByIdAndUpdate(id, {
				$inc: { likes: -1 },
			});
			const user = await User.findOneAndUpdate(
				{ username },
				{ $pull: { favourites: id } }
			);
			return recipe;
		},

		deleteUserRecipe: async (root, { id }, { Recipe }) => {
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
