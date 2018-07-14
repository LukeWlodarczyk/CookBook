import React from 'react';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';

import Error from '../Error';
import LikeRecipe from './LikeRecipe';
import Spinner from '../Spinner';

const RecipePage = ({
	match: {
		params: { id },
	},
}) => (
	<Query query={GET_RECIPE} variables={{ id }}>
		{({ loading, error, data }) => {
			if (loading) return <Spinner />;
			if (error) return <Error error={error} />;
			return (
				<div>
					<div
						style={{
							background: `url(${
								data.getRecipe.imageUrl
							}) center center / cover no-repeat`,
						}}
						className="recipe-image"
					/>

					<div className="recipe">
						<div className="recipe-header">
							<h2 className="recipe-name">
								<strong>{data.getRecipe.name}</strong>
							</h2>
							<h5>
								<strong>{data.getRecipe.category}</strong>
							</h5>
							<p>
								Created by <strong>{data.getRecipe.username}</strong>
							</p>
							<p>
								{data.getRecipe.likes}{' '}
								<span role="img" aria-label="heart">
									❤️
								</span>
							</p>
						</div>
						<blockquote className="recipe-description">
							{data.getRecipe.description}
						</blockquote>
						<h3 className="recipe-instructions__title">Instructions</h3>
						<div
							className="recipe-instructions"
							dangerouslySetInnerHTML={{
								__html: data.getRecipe.instructions,
							}}
						/>
						<LikeRecipe id={id} />
					</div>
				</div>
			);
		}}
	</Query>
);

export default RecipePage;
