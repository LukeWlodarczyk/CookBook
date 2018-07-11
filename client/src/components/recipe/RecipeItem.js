import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ id, name, category }) => (
	<li>
		<Link to={'/recipes/' + id}>
			<h4>{name}</h4>
		</Link>
		<p>{category}</p>
	</li>
);

export default RecipeItem;
