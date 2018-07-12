import React from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES, DELETE_USER_RECIPE } from '../../queries';

const handleDelete = deleteUserRecipe => {
	const confirm = window.confirm(
		'Are you sure you want to delete this recipe?'
	);
	if (confirm) {
		deleteUserRecipe();
	}
};

const UserRecipes = ({ username }) => (
	<Query query={GET_USER_RECIPES} variables={{ username }}>
		{({ data, loading, error }) => {
			if (loading) return 'Loading';
			if (error) return <div>Error</div>;
			console.log(data);
			return (
				<ul>
					<h3>Your Recipes</h3>
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
								>
									{deleteUserRecipe => {
										return (
											<button
												className="delete-button"
												onClick={handleDelete.bind(this, deleteUserRecipe)}
											>
												X
											</button>
										);
									}}
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
