import React, { Component } from 'react';

import withSesion from '../withSession';
import { Mutation } from 'react-apollo';
import { LIKE_RECIPE } from '../../queries';

class LikeRecipe extends Component {
	state = {
		username: '',
	};

	componentDidMount() {
		if (this.props.session.getCurrentUser) {
			this.setState({
				username: this.props.session.getCurrentUser.username,
			});
		}
	}

	handleClick = likeRecipe => {
		likeRecipe().then(data => {
			console.log(data);
		});
	};

	render() {
		const { username } = this.state;
		const { id } = this.props;

		return (
			<Mutation mutation={LIKE_RECIPE} variables={{ id, username }}>
				{likeRecipe => {
					console.log(likeRecipe);
					return (
						username && (
							<button onClick={this.handleClick.bind(this, likeRecipe)}>
								Like
							</button>
						)
					);
				}}
			</Mutation>
		);
	}
}

export default withSesion(LikeRecipe);
