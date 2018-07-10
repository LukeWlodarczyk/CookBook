import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_UP_USER } from '../../queries';

import Error from '../Error';

const initailState = {
	username: '',
	email: '',
	password: '',
	passwordConf: '',
};

class Signup extends Component {
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

	handleSubmit = (e, signupUser) => {
		e.preventDefault();

		signupUser().then(({ data }) => {
			console.log(data);
			localStorage.setItem('token', data.signupUser.token);
			this.clearState();
		});
	};

	validateForm = () => {
		const { username, email, password, passwordConf } = this.state;

		const isInvalid =
			!username ||
			!email ||
			!password ||
			!passwordConf ||
			password !== passwordConf;

		return isInvalid;
	};

	render() {
		const { username, email, password, passwordConf } = this.state;
		return (
			<div className="App">
				<h2>Signup</h2>
				<Mutation
					mutation={SIGN_UP_USER}
					variables={{ username, email, password }}
				>
					{(signupUser, { data, loading, error }) => {
						return (
							<form
								className="form"
								onSubmit={e => this.handleSubmit(e, signupUser)}
							>
								<input
									type="text"
									name="username"
									placeholder="Username"
									onChange={this.handleChange}
									value={username}
								/>
								<input
									type="text"
									name="email"
									placeholder="Email"
									onChange={this.handleChange}
									value={email}
								/>
								<input
									type="password"
									name="password"
									placeholder="Password"
									onChange={this.handleChange}
									value={password}
								/>
								<input
									type="password"
									name="passwordConf"
									placeholder="Password confirmation"
									onChange={this.handleChange}
									value={passwordConf}
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

export default Signup;
