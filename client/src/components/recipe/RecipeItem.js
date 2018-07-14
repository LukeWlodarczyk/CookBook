import React from 'react';
import { Link } from 'react-router-dom';

const RecipeItem = ({ id, name, imageUrl, category }) => (
	<li
		className="card"
		style={{ background: `url(${imageUrl}) center center / cover no-repeat` }}
	>
		<span className={category}>{category}</span>
		<div className="card-text">
			<Link to={'/recipes/' + id}>
				<h4>{name}</h4>
			</Link>
		</div>
		<p>{category}</p>
	</li>
);

export default RecipeItem;
