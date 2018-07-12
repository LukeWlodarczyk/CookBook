import { gql } from 'apollo-boost';

export const GET_ALL_RECIPES = gql`
	query {
		getAllRecipes {
			id
			name
			category
		}
	}
`;

export const GET_RECIPE = gql`
	query($id: ID!) {
		getRecipe(id: $id) {
			name
			category
			id
			description
			instructions
			likes
			createdDate
			username
		}
	}
`;

export const GET_USER_RECIPES = gql`
	query($username: String!) {
		getUserRecipes(username: $username) {
			id
			name
			likes
		}
	}
`;

export const SEARCH_RECIPES = gql`
	query($searchTerm: String!) {
		searchRecipes(searchTerm: $searchTerm) {
			id
			name
			likes
		}
	}
`;

export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			username
			email
			joinDate
			favourites {
				id
				name
			}
		}
	}
`;

export const SIGN_UP_USER = gql`
	mutation($username: String!, $email: String!, $password: String!) {
		signupUser(username: $username, email: $email, password: $password) {
			token
		}
	}
`;

export const SIGN_IN_USER = gql`
	mutation($username: String!, $password: String!) {
		signinUser(username: $username, password: $password) {
			token
		}
	}
`;

export const ADD_RECIPE = gql`
	mutation(
		$name: String!
		$description: String!
		$category: String!
		$instructions: String!
		$username: String!
	) {
		addRecipe(
			name: $name
			description: $description
			category: $category
			instructions: $instructions
			username: $username
		) {
			id
			name
			description
			category
			instructions
			username
		}
	}
`;
