import React from 'react';

import { Query } from 'react-apollo';
import { GET_RECIPE } from '../../queries';

import Error from '../Error';

const RecipePage = ({
	match: {
		params: { id },
	},
}) => (
	<Query query={GET_RECIPE} variables={{ id }}>
		{({ loading, error, data }) => {
			if (loading) return 'loading';
			if (error) return <Error error={error} />;
			console.log(data);
			return <p>page</p>;
		}}
	</Query>
);

export default RecipePage;
