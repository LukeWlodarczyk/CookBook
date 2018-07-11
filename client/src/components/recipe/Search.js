import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SearchItem from './SearchItem';
import Error from '../Error';

import { ApolloConsumer } from 'react-apollo';
import { SEARCH_RECIPES } from '../../queries';

class Search extends Component {
	state = {
		searchResult: [],
	};

	handleChange = ({ searchRecipes }) => {
		this.setState({
			searchResult: searchRecipes,
		});
	};

	render() {
		return (
			<ApolloConsumer query={SEARCH_RECIPES} variables={{ searchTerm: '' }}>
				{client => {
					return (
						<div className="App">
							<input
								autoFocus
								type="search"
								placeholder="Search for recipes"
								onChange={async e => {
									e.persist();
									const { data } = await client.query({
										query: SEARCH_RECIPES,
										variables: { searchTerm: e.target.value },
									});
									this.handleChange(data);
								}}
							/>
							<ul>
								{this.state.searchResult.map(recipe => (
									<SearchItem key={recipe.id} {...recipe} />
								))}
							</ul>
						</div>
					);
				}}
			</ApolloConsumer>
		);
	}
}
export default Search;
