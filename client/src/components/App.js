import React, { Component } from 'react';
import posed from 'react-pose';
import './App.css';

import RecipeItem from './recipe/RecipeItem';
import Spinner from './Spinner';

import { Query } from 'react-apollo';
import { GET_ALL_RECIPES } from '../queries/index';

const RecipeList = posed.ul({
	shown: {
		x: '0%',
		staggerChildren: 100,
	},
	hidden: {
		x: '-100%',
	},
});

class App extends Component {
	state = { on: false };

	componentDidMount() {
		setTimeout(() => {
			this.setState({
				on: !this.state.on,
			});
		}, 200);
	}

	render() {
		return (
			<div className="App">
				<h1 className="main-title">
					Find recipes you <strong>Love</strong>
				</h1>
				<Query query={GET_ALL_RECIPES}>
					{({ data, loading, error }) => {
						if (loading) return <Spinner />;
						if (error) return <div>Error</div>;

						return (
							<RecipeList
								pose={this.state.on ? 'shown' : 'hidden'}
								className="cards"
							>
								{data.getAllRecipes.map(recipe => (
									<RecipeItem key={recipe.id} {...recipe} />
								))}
							</RecipeList>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default App;
