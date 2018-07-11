import './index.css';
import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Navbar from './components/Navbar';
import Search from './components/recipe/Search';
import AddRecipe from './components/recipe/AddRecipe';
import RecipePage from './components/recipe/RecipePage';
import Profile from './components/profile/Profile';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import withSession from './components/withSession';

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

const Root = ({ refetch, session }) => (
	<Router>
		<Fragment>
			<Navbar session={session} />
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/search" component={Search} />
				<Route
					path="/signin"
					render={({ history }) => <Signin {...{ history, refetch }} />}
				/>
				<Route
					path="/signup"
					render={({ history }) => <Signup {...{ history, refetch }} />}
				/>
				<Route
					path="/recipe/add"
					component={({ history }) => <AddRecipe {...{ history, session }} />}
				/>
				<Route path="/profile" component={Profile} />
				<Route path="/recipes/:id" component={RecipePage} />
				<Redirect to="/" />
			</Switch>
		</Fragment>
	</Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
	<ApolloProvider client={client}>
		<RootWithSession />
	</ApolloProvider>,
	document.getElementById('root')
);
