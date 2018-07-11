import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import Error from '../Error';

import { ADD_RECIPE, GET_ALL_RECIPES } from '../../queries';

const initialState = {
	name: '',
	instructions: '',
	category: 'Snack',
	description: '',
	username: '',
};

class AddRecipe extends Component {
	state = {
		...initialState,
	};

	componentDidMount() {
		this.setState({
			username: this.props.session.getCurrentUser.username,
		});
	}

	clearState = () => {
		this.setState({
			...initialState,
		});
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value,
		});
	};

	validateForm = () => {
		const { name, category, description, instructions } = this.state;
		const isInvalid = !name || !category || !description || !instructions;
		return isInvalid;
	};

	updateCache = (cache, { data: { addRecipe } }) => {
		const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

		cache.writeQuery({
			query: GET_ALL_RECIPES,
			data: {
				getAllRecipes: [addRecipe, ...getAllRecipes],
			},
		});
	};

	handleSubmit = (e, addRecipe) => {
		e.preventDefault();

		addRecipe()
			.then(({ data }) => {
				this.clearState();
				this.props.history.push('/recipes/' + data.addRecipe.id);
			})
			.catch(err => {
				console.log(err);
			});
	};

	render() {
		const { name, category, description, instructions, username } = this.state;

		return (
			<Mutation
				mutation={ADD_RECIPE}
				variables={{
					name,
					category,
					description,
					instructions,
					username,
				}}
				update={this.updateCache}
			>
				{(addRecipe, { data, loading, error }) => {
					return (
						<div className="App">
							<h2 className="">Add Recipe</h2>
							<form
								className="form"
								onSubmit={e => this.handleSubmit(e, addRecipe)}
							>
								<label htmlFor="name">Recipe Name</label>
								<input
									type="text"
									name="name"
									placeholder="Add Name"
									onChange={this.handleChange}
									value={name}
								/>
								<label htmlFor="category">Category of Recipe</label>
								<select
									name="category"
									onChange={this.handleChange}
									value={category}
								>
									<option value="Breakfast">Breakfast</option>
									<option value="Lunch">Lunch</option>
									<option value="Dinner">Dinner</option>
									<option value="Snack">Snack</option>
								</select>
								<label htmlFor="description">Recipe Description</label>
								<input
									type="text"
									name="description"
									placeholder="Add Description"
									onChange={this.handleChange}
									value={description}
								/>
								<label htmlFor="instructions">Recipe Instructions</label>
								<textarea
									name="instructions"
									placeholder="Add instructions"
									onChange={this.handleChange}
									value={instructions}
								/>
								<button
									disabled={loading || this.validateForm()}
									type="submit"
									className="button-primary"
								>
									Submit
								</button>
								{error && <Error error={error} />}
							</form>
						</div>
					);
				}}
			</Mutation>
		);
	}
}

export default AddRecipe;
