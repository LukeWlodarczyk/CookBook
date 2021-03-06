import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import CKEditor from 'react-ckeditor-component';

import Error from '../Error';
import withAuth from '../withAuth';

import { ADD_RECIPE, GET_ALL_RECIPES, GET_USER_RECIPES } from '../../queries';

const initialState = {
	name: '',
	imageUrl: '',
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

	handleEditorChange = e => {
		const newContent = e.editor.getData();
		this.setState({ instructions: newContent });
	};

	validateForm = () => {
		const { name, imageUrl, category, description, instructions } = this.state;
		const isInvalid =
			!name || !imageUrl || !category || !description || !instructions;
		return isInvalid;
	};

	updateCache = (cache, { data: { addRecipe } }) => {
		if (cache.data.data.ROOT_QUERY.getAllRecipes) {
			const { getAllRecipes } = cache.readQuery({ query: GET_ALL_RECIPES });

			cache.writeQuery({
				query: GET_ALL_RECIPES,
				data: {
					getAllRecipes: [addRecipe, ...getAllRecipes],
				},
			});
		}
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
		const {
			name,
			imageUrl,
			category,
			description,
			instructions,
			username,
		} = this.state;

		return (
			<Mutation
				mutation={ADD_RECIPE}
				variables={{
					name,
					imageUrl,
					category,
					description,
					instructions,
					username,
				}}
				refetchQueries={() => [
					{ query: GET_USER_RECIPES, variables: { username } },
				]}
				update={this.updateCache}
			>
				{(addRecipe, { data, loading, error }) => {
					return (
						<div className="App">
							<h2 className="main-title">Add Recipe</h2>
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
								<label htmlFor="imageUrl">Recipe Image</label>
								<input
									type="text"
									name="imageUrl"
									placeholder="Image url"
									onChange={this.handleChange}
									value={imageUrl}
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
								<CKEditor
									name="instructions"
									content={instructions}
									events={{ change: this.handleEditorChange }}
								/>
								<button
									disabled={loading || this.validateForm()}
									type="submit"
									style={{ marginTop: '20px' }}
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

export default withAuth(AddRecipe);
