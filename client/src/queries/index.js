import { gql } from 'apollo-boost';

import { recipeFragments } from './fragments';

export const GET_ALL_RECIPES = gql`
	query {
		getAllRecipes {
			id
			name
			imageUrl
			category
		}
	}
`;

export const GET_RECIPE = gql`
	query($id: ID!) {
		getRecipe(id: $id) {
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
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
		$imageUrl: String!
		$description: String!
		$category: String!
		$instructions: String!
		$username: String!
	) {
		addRecipe(
			name: $name
			imageUrl: $imageUrl
			description: $description
			category: $category
			instructions: $instructions
			username: $username
		) {
			...CompleteRecipe
		}
	}
	${recipeFragments.recipe}
`;

export const LIKE_RECIPE = gql`
	mutation($id: ID!, $username: String!) {
		likeRecipe(id: $id, username: $username) {
			...LikeRecipe
		}
	}
	${recipeFragments.like}
`;

export const UNLIKE_RECIPE = gql`
	mutation($id: ID!, $username: String!) {
		unlikeRecipe(id: $id, username: $username) {
			...LikeRecipe
		}
	}
	${recipeFragments.like}
`;

export const DELETE_USER_RECIPE = gql`
	mutation($id: ID!) {
		deleteUserRecipe(id: $id) {
			id
		}
	}
`;
