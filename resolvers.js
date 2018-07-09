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
	},
};
