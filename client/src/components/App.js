import React from 'react';
import './App.css';

import RecipeItem from './recipe/RecipeItem';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries/index';

const App = () => (
	<div className="App">
		<h1 className="main-title">
			Find recipes you <strong>Love</strong>
		</h1>
		<Query query={GET_ALL_RECIPES}>
			{({ data, loading, error }) => {
				if (loading) return <div>Loading</div>;
				if (error) return <div>Error</div>;
				console.log(data);
				return (
					<ul className="cards">
						{data.getAllRecipes.map(recipe => (
							<RecipeItem key={recipe.id} {...recipe} />
						))}
					</ul>
				);
			}}
		</Query>
	</div>
);

export default App;
