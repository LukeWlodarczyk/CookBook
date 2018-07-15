import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../Error';
import Spinner from '../Spinner';

import { Query, Mutation } from 'react-apollo';
import {
	GET_USER_RECIPES,
	DELETE_USER_RECIPE,
	GET_ALL_RECIPES,
	GET_CURRENT_USER,
} from '../../queries';

const handleDelete = deleteUserRecipe => {
	const confirm = window.confirm(
		'Are you sure you want to delete this recipe?'
	);
	if (confirm) {
		deleteUserRecipe();
	}
};

const handleUpdate = username => (cache, { data: { deleteUserRecipe } }) => {
	const { getUserRecipes } = cache.readQuery({
		query: GET_USER_RECIPES,
		variables: { username },
	});

	cache.writeQuery({
		query: GET_USER_RECIPES,
		variables: { username },
		data: {
			getUserRecipes: getUserRecipes.filter(
				recipe => recipe.id !== deleteUserRecipe.id
			),
		},
	});
};

const UserRecipes = ({ username }) => (
	<Query query={GET_USER_RECIPES} variables={{ username }}>
		{({ data, loading, error }) => {
			if (loading) return <Spinner />;
			if (error) return <Error error={error} />;
			return (
				<ul>
					<h3>Your Recipes</h3>
					{!data.getUserRecipes.length && (
						<p>
							<strong>You have not added any recipes yet</strong>
						</p>
					)}
					{data.getUserRecipes.map(recipe => {
						return (
							<li key={recipe.id}>
								<Link to={'/recipes/' + recipe.id}>
									<p>{recipe.name}</p>
								</Link>
								<p style={{ marginBottom: 0 }}>Likes {recipe.likes}</p>
								<Mutation
									mutation={DELETE_USER_RECIPE}
									variables={{ id: recipe.id }}
									refetchQueries={() => [
										{ query: GET_ALL_RECIPES },
										{ query: GET_CURRENT_USER },
									]}
									update={handleUpdate(username)}
								>
									{(deleteUserRecipe, { loading }) => (
										<p
											className="delete-button"
											onClick={handleDelete.bind(this, deleteUserRecipe)}
										>
											{loading ? 'deleteing...' : 'X'}
										</p>
									)}
								</Mutation>
							</li>
						);
					})}
				</ul>
			);
		}}
	</Query>
);

export default UserRecipes;
