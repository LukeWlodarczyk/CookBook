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

export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			username
			email
			joinDate
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
