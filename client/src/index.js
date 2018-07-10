import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';

import ApolloClinet from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';

const client = new ApolloClinet({
	uri: 'http://localhost:5000/graphql',
	fetchOptions: {
		credentials: 'include',
	},
	request: operation => {
		const token = localStorage.getItem('token');
		operation.setContext({
			headers: {
				authorization: token,
			},
		});
	},
	onError: ({ networkError }) => {
		if (networkError) {
			console.log(networkError);
		}
	},
});

const Root = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={App} />
			<Route path="/signin" component={Signin} />
			<Route path="/signup" component={Signup} />
			<Redirect to="/" />
		</Switch>
	</Router>
);

ReactDOM.render(
	<ApolloProvider client={client}>
		<Root />
	</ApolloProvider>,
	document.getElementById('root')
);
