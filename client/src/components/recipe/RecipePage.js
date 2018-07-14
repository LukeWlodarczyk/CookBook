import React from 'react';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';

import Error from '../Error';
import LikeRecipe from './LikeRecipe';

const RecipePage = ({
	match: {
		params: { id },
	},
}) => (
	<Query query={GET_RECIPE} variables={{ id }}>
		{({ loading, error, data }) => {
			if (loading) return <div className="App">Loading</div>;
			if (error) return <Error error={error} />;
			return (
				<div className="App">
					<h2>{data.getRecipe.name}</h2>
					<p>Category: {data.getRecipe.category}</p>
					<p>Descriprion: {data.getRecipe.description}</p>
					<p
						dangerouslySetInnerHTML={{ __html: data.getRecipe.instructions }}
					/>
					<p>Likes: {data.getRecipe.likes}</p>
					<p>Created by: {data.getRecipe.username}</p>
					<LikeRecipe id={id} />
				</div>
			);
		}}
	</Query>
);

export default RecipePage;
