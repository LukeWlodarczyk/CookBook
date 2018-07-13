import { gql } from 'apollo-boost';

export const recipeFragments = {
	recipe: gql`
		fragment CompleteRecipe on Recipe {
			name
			category
			id
			description
			instructions
			likes
			createdDate
			username
		}
	`,

	like: gql`
		fragment LikeRecipe on Recipe {
			id
			likes
		}
	`,
};
