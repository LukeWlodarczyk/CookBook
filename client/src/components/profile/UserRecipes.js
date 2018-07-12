import React from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { GET_USER_RECIPES } from '../../queries';

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
							<li key={recipe.key}>
								<Link to={'/recipes/' + recipe.id}>
									<p>{recipe.name}</p>
								</Link>
								<p>Likes {recipe.likes}</p>
							</li>
						);
					})}
				</ul>
			);
		}}
	</Query>
);

export default UserRecipes;
