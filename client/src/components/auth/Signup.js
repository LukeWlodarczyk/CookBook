import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

import { SIGN_UP_USER } from '../../queries';

class Signup extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		passwordConf: '',
	};

	handleChange = ({ target: { value, name } }) => {
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e, signupUser) => {
		e.preventDefault();

		signupUser().then(data => {
			console.log(data);
		});
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
									type="text"
									name="password"
									placeholder="Password"
									onChange={this.handleChange}
									value={password}
								/>
								<input
									type="text"
									name="passwordConf"
									placeholder="Password confirmation"
									onChange={this.handleChange}
									value={passwordConf}
								/>
								<button className="button-primary" type="submit">
									Submit
								</button>
							</form>
						);
					}}
				</Mutation>
			</div>
		);
	}
}

export default Signup;
