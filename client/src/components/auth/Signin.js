import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_IN_USER } from '../../queries';

import Error from '../Error';

const initailState = {
	username: '',
	password: '',
};

class Signin extends Component {
	state = {
		...initailState,
	};

	clearState = () => {
		this.setState({
			...initailState,
		});
	};

	handleChange = ({ target: { value, name } }) => {
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e, signinUser) => {
		e.preventDefault();

		signinUser().then(async ({ data }) => {
			localStorage.setItem('token', data.signinUser.token);
			await this.props.refetch();
			this.clearState();
			this.props.history.push('/');
		});
	};

	validateForm = () => {
		const { username, password } = this.state;

		const isInvalid = !username || !password;

		return isInvalid;
	};

	render() {
		const { username, password } = this.state;

		return (
			<div className="App">
				<h2>Signin</h2>
				<Mutation mutation={SIGN_IN_USER} variables={{ username, password }}>
					{(signinUser, { data, loading, error }) => {
						return (
							<form
								className="form"
								onSubmit={e => this.handleSubmit(e, signinUser)}
							>
								<input
									type="text"
									name="username"
									placeholder="Username"
									onChange={this.handleChange}
									value={username}
								/>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={this.handleChange}
									value={password}
								/>
								<button
									className="button-primary"
									type="submit"
									disabled={loading || this.validateForm()}
								>
									Submit
								</button>
								{error && <Error error={error} />}
							</form>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default Signin;
