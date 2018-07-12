import React from 'react';

import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../queries';

const withAuth = Component => props => (
	<Query query={GET_CURRENT_USER}>
		{({ data, loading, error }) => {
			if (loading) return loading;
			if (error) return <Redirect to="/signin" />;
			console.log(data);
			{
				return data.getCurrentUser ? (
					<Component {...props} />
				) : (
					<Redirect to="/signin" />
				);
			}
		}}
	</Query>
);

export default withAuth;
