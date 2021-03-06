import React from 'react';
import { Link } from 'react-router-dom';

const SearchItem = ({ id, name, likes }) => (
	<li>
		<Link to={`/recipes/${id}`}>
			<h4>{name}</h4>
		</Link>
		<p>Likes: {likes}</p>
	</li>
);

export default SearchItem;
