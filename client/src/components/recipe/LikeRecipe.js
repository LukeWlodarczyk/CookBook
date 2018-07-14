import React, { Component } from 'react';

import withSesion from '../withSession';
import { Mutation } from 'react-apollo';
import { LIKE_RECIPE, UNLIKE_RECIPE, GET_RECIPE } from '../../queries';

class LikeRecipe extends Component {
	state = {
		username: '',
		liked: false,
	};

	componentDidMount() {
		if (this.props.session.getCurrentUser) {
			const { username, favourites } = this.props.session.getCurrentUser;
			const { id } = this.props;
			const prevLiked = favourites.some(fav => fav.id === id);

			this.setState({
				username: username,
				liked: prevLiked,
			});
		}
	}

	handleClick = (likeRecipe, unlikeRecipe) => {
		this.setState(
			({ liked }) => ({ liked: !liked }),
			this.handleLike.bind(null, likeRecipe, unlikeRecipe)
		);
	};

	handleLike = (likeRecipe, unlikeRecipe) => {
		if (this.state.liked) {
			likeRecipe().then(async data => {});
		} else {
			unlikeRecipe().then(async data => {});
		}
	};

	updateLike = (cache, { data: { likeRecipe } }) => {
		const { id } = this.props;
		const { getRecipe } = cache.readQuery({
			query: GET_RECIPE,
			variables: { id },
		});

		cache.writeQuery({
			query: GET_RECIPE,
			variables: { id },
			data: {
				getRecipe: { ...getRecipe, likes: likeRecipe.likes + 1 },
			},
		});
	};

	updateUnlike = (cache, { data: { unlikeRecipe } }) => {
		const { id } = this.props;
		const { getRecipe } = cache.readQuery({
			query: GET_RECIPE,
			variables: { id },
		});

		cache.writeQuery({
			query: GET_RECIPE,
			variables: { id },
			data: {
				getRecipe: { ...getRecipe, likes: unlikeRecipe.likes - 1 },
			},
		});
	};

	render() {
		const { username, liked } = this.state;
		const { id } = this.props;

		return (
			<Mutation
				mutation={UNLIKE_RECIPE}
				variables={{ id, username }}
				update={this.updateUnlike}
			>
				{unlikeRecipe => {
					return (
						<Mutation
							mutation={LIKE_RECIPE}
							variables={{ id, username }}
							update={this.updateLike}
						>
							{likeRecipe => {
								return (
									username && (
										<button
											className="like-button"
											onClick={this.handleClick.bind(
												this,
												likeRecipe,
												unlikeRecipe
											)}
										>
											{liked ? 'Unlike' : 'Like'}
										</button>
									)
								);
							}}
						</Mutation>
					);
				}}
			</Mutation>
		);
	}
}

export default withSesion(LikeRecipe);
